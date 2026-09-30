/* EVERY SCREEN, IN BOTH LANGUAGES.
   The wide net before manual testing: open each screen, in German and in
   Dutch, with the state it actually needs, and fail on anything a human
   would report as a bug. Screenshots land in tests/shots/screens/. */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const ALL = BASE + (BASE.includes('?') ? '&' : '?') + 'langs=all';
mkdirSync('tests/shots/screens', {recursive:true});

const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});

/* Words that must never appear while the other course is loaded. Klara and
   Sanne are the sharpest tripwires: a teacher in the wrong classroom is the
   most visible leak there is. */
const LEAK = {
  de: [/Nederlands/, /\bSanne\b/, /\bhet huis\b/, /Goedemorgen/, /\bik heet\b/i],
  nl: [/Deutsch\b/, /\bKlara\b/, /Guten (Morgen|Tag|Abend)/, /\bIch heiße\b/, /\bder\b \w/, /Goethe/]
};
const JUNK = /undefined|NaN|\[object |null(?![a-z])/;
const DASH  = /[–—]/;

/* name, what it needs before it can be opened, and which courses have it */
const SCREENS_TO_WALK = [
  ['onboard1',    () => { S.onboarded=false; go('onboard1'); }, 'both'],
  ['meetTeacher', () => go('meetTeacher'), 'both'],
  ['onboard3',    () => go('onboard3'), 'both'],
  ['home',        () => { S.onboarded=true; S.name='Shreya'; save(); go('home'); }, 'both'],
  ['unit',        () => go('unit', UNITS.filter(u=>!u.planned)[1].id), 'both'],
  ['teachMove',   () => { const u = UNITS.find(x=>(x.teach||[]).length); startTeach(u.id); go('teachMove'); }, 'both'],
  ['lesson1',     () => { startLesson1(UNITS.filter(u=>!u.planned)[0].id, 'all'); }, 'both'],
  ['session',     () => { startCheck(UNITS.filter(u=>!u.planned)[1].id); }, 'both'],
  ['checkResult', () => { const u = UNITS.filter(x=>!x.planned)[1];
                          startCheck(u.id);
                          const scored = SES.items.map((it,i)=>({ok:i%4!==0, id:it.id, item:it}));
                          go('checkResult', {kind:'check', uid:u.id, pct:75, scored}); }, 'both'],
  ['skills',      () => go('skills'), 'both'],
  ['games',       () => go('games'), 'both'],
  ['gGender',     () => { startGender(); }, 'both'],
  ['gResult',     () => { startGender(); GG.i = GG.items.length; GG.ok = 9; GG.missed = GG.items.slice(0,3); go('gResult'); }, 'both'],
  ['writing',     () => go('writing'), 'both'],
  ['speaking',    () => go('speaking'), 'both'],
  ['culture',     () => go('culture'), 'both'],
  ['notes',       () => go('notes', UNITS.filter(u=>!u.planned)[0].id), 'both'],
  ['notebook',    () => go('notebook'), 'both'],
  ['vocab',       () => go('vocab'), 'both'],
  ['progress',    () => go('progress'), 'both'],
  ['me',          () => go('me'), 'both'],
  ['milestone',   () => go('milestone'), 'both'],
  ['stories',     () => go('stories'), 'de'],
  ['story',       () => go('story', STORIES[0].id), 'de'],
  ['scenes',      () => go('scenes'), 'de'],
  ['scene',       () => { scStart(SCENARIOS[0].id); }, 'de'],
  ['test',        () => go('test'), 'de'],
  ['mock',        () => { mtStart(); }, 'de'],
  ['lessonVerbs', () => { startVerbs(); }, 'de'],
];

const bad = [], seen = {};
for(const lang of ['de','nl']){
  const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(()=>{ const m={speak:()=>{},cancel:()=>{},
    getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'},{name:'Google Nederlands',lang:'nl-NL'},{name:'Google 普通话',lang:'zh-CN'}],
    set onvoiceschanged(f){},get onvoiceschanged(){return null}};
    Object.defineProperty(window,'speechSynthesis',{value:m,configurable:true,writable:true}); });
  await p.goto(ALL); await p.waitForTimeout(350);

  /* a learner two units in, so the screens have something real to show */
  await p.evaluate((l)=>{
    S.lang = l; S.langPicked = true; S.onboarded = true; S.name = 'Shreya';
    loadCourse(l); pickVoice();
    UNITS.filter(u=>!u.planned).slice(0,3).forEach(u=>{
      S.units[u.id] = {lesson:true, check:80, doneDay:'2026-01-01'};
      (u.vocab||[]).forEach(id=>{ if(VOCAB[id]) S.words[id] = {lv:3, miss:0, seen:2, due:0}; });
    });
    save(); go('home');
  }, lang); await p.waitForTimeout(300);

  console.log(`\n=================== ${lang.toUpperCase()} ===================`);
  const tabs = await p.$$eval('.nav button', els => els.map(e=>e.textContent.trim()));
  console.log('nav tabs           :', tabs.join(' · '));

  for(const [name, setup, only] of SCREENS_TO_WALK){
    if(only !== 'both' && only !== lang){
      /* the screen does not exist for this course: prove it is not offered */
      const reachable = await p.evaluate(n => {
        if(n === 'stories' || n === 'story') return hasStories();
        if(n === 'scenes'  || n === 'scene')  return hasScenes();
        if(n === 'test'    || n === 'mock')   return hasMock();
        return null;
      }, name);
      if(reachable === true) bad.push(`${lang}/${name} is offered but this course cannot fill it`);
      console.log(`  ${name.padEnd(13)} not in this course${reachable===false?' (and correctly hidden)':''}`);
      continue;
    }
    errs.length = 0;
    let threw = null;
    try { await p.evaluate(`(${setup.toString()})()`); } catch(e){ threw = e.message.split('\n')[0]; }
    await p.waitForTimeout(220);
    const txt = ((await p.textContent('#app').catch(()=>'')) || '').replace(/\s+/g,' ').trim();
    seen[lang] = (seen[lang]||0) + 1;

    const flags = [];
    if(threw)              flags.push('setup threw: ' + threw);
    if(errs.length)        flags.push('page error: ' + errs[0]);
    if(txt.length < 40)    flags.push(`rendered almost nothing (${txt.length} chars)`);
    if(JUNK.test(txt))     flags.push('leaked a value: ' + (txt.match(JUNK)||[])[0]);
    if(DASH.test(txt))     flags.push('contains an em or en dash');
    /* the language picker legitimately names every language */
    if(name !== 'onboard1') (LEAK[lang]||[]).forEach(re => { if(re.test(txt)) flags.push(`other language on screen: ${re}`); });

    console.log(`  ${name.padEnd(13)} ${String(txt.length).padStart(5)} chars  ${flags.length ? '✗ ' + flags.join(' | ') : 'ok'}`);
    flags.forEach(f => bad.push(`${lang}/${name}: ${f}`));
    await p.screenshot({path:`tests/shots/screens/${lang}-${name}.png`, fullPage:true});
  }
  await p.close();
}

console.log(`\nwalked ${seen.de} German screens and ${seen.nl} Dutch screens`);
console.log('ERRORS:', bad.length ? bad : 'none 🎉');
await b.close();
