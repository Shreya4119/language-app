/* The Dutch pack, end to end.
   The voice assertions are the point of this suite: a German voice reading
   `het huis` teaches the wrong pronunciation, which is worse than silence. */
import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
/* Dutch and Mandarin are parked: LIVE_LANGS is ['de']. The preview flag is
   how a parked pack stays reachable, and therefore testable. */
const ALL = BASE + (BASE.includes('?') ? '&' : '?') + 'langs=all';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));

await p.addInitScript(()=>{
  window.__spoken=[];
  class U { constructor(t){ this.text=t; } } window.SpeechSynthesisUtterance = U;
  let live=null;
  const voices=[{name:'Google Deutsch',lang:'de-DE'},{name:'Google Nederlands',lang:'nl-NL'},{name:'Google UK English Female',lang:'en-GB'}];
  const mock={ speak:u=>{ window.__spoken.push({t:u.text,lang:u.lang,voice:u.voice&&u.voice.name}); live=u; setTimeout(()=>{ if(live===u&&u.onend) u.onend(); },25); },
    cancel:()=>{ live=null; }, getVoices:()=>voices,
    set onvoiceschanged(f){}, get onvoiceschanged(){return null} };
  Object.defineProperty(window,'speechSynthesis',{value:mock,configurable:true,writable:true});
});
await p.goto(ALL); await p.waitForTimeout(300);

/* ---- 1 · Dutch is offered, not greyed out ---- */
const rows = await p.$$eval('.pathRow', els => els.map(e => ({t:e.textContent.replace(/\s+/g,' ').trim(), locked:e.classList.contains('locked')})));
const nl = rows.find(r=>/Dutch/.test(r.t));
console.log('Dutch offered      :', !!nl, '| locked:', nl ? nl.locked : '?');
console.log('subtitle           :', nl ? nl.t.replace('Dutch','').trim() : '-');

/* ---- 2 · pick it, and Sanne greets in Dutch with a Dutch voice ---- */
await p.evaluate(()=>{ window.__spoken=[]; });
await p.click('.pathRow:has-text("Dutch")'); await p.waitForTimeout(2600);
const meet = (await p.textContent('.screen')).replace(/\s+/g,' ');
const spoken = await p.evaluate(()=>window.__spoken);
console.log('\nteacher            :', await p.evaluate(()=>TT().name), '|', await p.evaluate(()=>TT().lang));
console.log('greets in Dutch    :', meet.includes('Hallo! Ik heet Sanne.'));
console.log('blurb is not stub  :', !meet.includes('Coming soon'));
spoken.forEach(s=>console.log('   spoke            ', JSON.stringify(s.t).slice(0,44).padEnd(46), s.lang, '·', s.voice));
const allNl = spoken.length>0 && spoken.every(s=>s.lang==='nl-NL' && s.voice==='Google Nederlands');
console.log('ALL audio nl-NL    :', allNl);
console.log('no German voice    :', !spoken.some(s=>s.voice==='Google Deutsch'));
await p.screenshot({path:'tests/shots/nl-meet.png'});

/* ---- 3 · the course pack actually swapped ---- */
await p.evaluate(()=>{ S.onboarded=true; save(); go('home'); }); await p.waitForTimeout(500);
const course = await p.evaluate(()=>({
  lang:S.lang, units:UNITS.length, built:UNITS.filter(u=>!u.planned).length,
  stage0:UNITS.filter(u=>u.stage===0).length, words:Object.keys(VOCAB).length,
  first:UNITS[0].id, title:UNITS[0].title, stages:STAGES.map(s=>s.name)
}));
console.log('\ncourse loaded      :', JSON.stringify(course));
console.log('Stage 0 has 9      :', course.stage0===9);
console.log('174 Dutch words    :', course.words===174);
console.log('no German leaked   :', await p.evaluate(()=>!UNITS.some(u=>u.id==='s0a')));
const ns = await p.evaluate(()=>{
  const ids = Object.keys(VOCAB);
  const bare = ids.filter(id=>!id.startsWith('nl-'));
  const refs = UNITS.flatMap(u=>(u.vocab||[]).concat((u.teach||[]).flatMap(m=>m.words||[])));
  return {bare, unresolved: [...new Set(refs)].filter(id=>!VOCAB[id])};
});
console.log('ids namespaced     :', ns.bare.length===0, ns.bare.length?ns.bare.slice(0,5):'');
console.log('all refs resolve   :', ns.unresolved.length===0, ns.unresolved.length?ns.unresolved.slice(0,5):'');
await p.screenshot({path:'tests/shots/nl-home.png', fullPage:true});

/* ---- 4 · a unit teaches, and every board line is Dutch-voiced ---- */
await p.evaluate(()=>{ window.__spoken=[]; go('unit','n0d'); }); await p.waitForTimeout(700);
const brief = (await p.textContent('.screen')).replace(/\s+/g,' ');
console.log('\nn0d brief          :', brief.includes('IN THIS LESSON'), '| prerequisite:', brief.includes('You need first'));
await p.evaluate(()=>startLesson('n0d')); await p.waitForTimeout(700);
let moves = 0;
for(let i=0;i<10;i++){
  const scr = await p.evaluate(()=>TCH && TCH.uid==='n0d' ? TCH.i : null);
  if(scr===null) break;
  moves++;
  const adv = await p.evaluate(()=>{
    if(typeof TCH.i==='number' && TCH.i>=0){
      const mv=(UNITS.find(u=>u.id==='n0d').teach||[])[TCH.i];
      if(mv && mv.m==='elicit' && TCH.answered[TCH.i]===undefined){ tchGuess(TCH.i, mv.a); return 'guessed'; }
    }
    if(TCH.i===-1){ TCH.i=0; go('teachMove'); return 'started'; }
    tchNext(); return 'next';
  });
  await p.waitForTimeout(450);
  if(await p.evaluate(()=>!!(SES && SES.uid==='n0d'))) break;
}
console.log('teach moves walked :', moves);
console.log('reached the drills :', await p.evaluate(()=>SES ? SES.kind+' '+SES.uid+' items:'+SES.items.length : 'none'));
const said = await p.evaluate(()=>window.__spoken);
const badLang = said.filter(s=>s.lang!=='nl-NL');
console.log('utterances in unit :', said.length, '| any not nl-NL:', badLang.length ? badLang.map(s=>s.lang) : 'none');
await p.screenshot({path:'tests/shots/nl-teach.png', fullPage:true});

/* ---- 4b · n0a ends in the alphabet drill, not multiple choice ---- */
await p.evaluate(()=>{ startLesson('n0a'); }); await p.waitForTimeout(600);
await p.evaluate(()=>{ const u=UNITS.find(x=>x.id==='n0a');
  TCH={uid:'n0a', i:u.teach.length-1, answered:{}}; go('teachMove'); }); await p.waitForTimeout(400);
await p.evaluate(()=>tchNext()); await p.waitForTimeout(600);
const alpha = await p.evaluate(()=>({ screen: currentScreen, step: L1&&L1.step, only: L1&&L1.only,
  unit: L1&&L1.unit, letters: (course().first.alphabet||[]).length, greetings: (course().first.greetings||[]).length }));
const alphaTxt = (await p.textContent('.screen')).replace(/\s+/g,' ');
console.log('\nn0a practice       :', JSON.stringify(alpha));
console.log('  greetings shown  :', alphaTxt.includes('Goedemorgen') && alphaTxt.includes('Welterusten'));
await p.screenshot({path:'tests/shots/nl-greetings.png', fullPage:true});
await p.evaluate(()=>{ L1.step=5; go('lesson1'); }); await p.waitForTimeout(500);
const abcTxt = (await p.textContent('.screen')).replace(/\s+/g,' ');
const tiles = await p.locator('.abcTile').count();
console.log('  alphabet tiles   :', tiles, '| has IJ:', abcTxt.includes('lange ij'), '| no German letters:', !/\u00e4|\u00f6|\u00fc|\u00df/.test(abcTxt));
await p.screenshot({path:'tests/shots/nl-alphabet.png', fullPage:true});

/* ---- 4c · n0b ends in the introduction board ---- */
await p.evaluate(()=>{ const u=UNITS.find(x=>x.id==='n0b');
  TCH={uid:'n0b', i:u.teach.length-1, answered:{}}; go('teachMove'); }); await p.waitForTimeout(400);
await p.evaluate(()=>tchNext()); await p.waitForTimeout(600);
const boardTxt = (await p.textContent('.screen')).replace(/\s+/g,' ');
const intro = await p.evaluate(()=>({ step:L1&&L1.step, only:L1&&L1.only, unit:L1&&L1.unit }));
console.log('n0b practice       :', JSON.stringify(intro));
console.log('  Dutch board      :', boardTxt.includes('Mijn introductie') && boardTxt.includes('Ik heet'));
console.log('  no German lines  :', !boardTxt.includes('Ich hei') && !boardTxt.includes('Guten Morgen'));
console.log('  blanks + chips   :', await p.locator('input[type=text]').count(), '+', await p.locator('.gchip').count());
await p.screenshot({path:'tests/shots/nl-intro-board.png', fullPage:true});

/* fill it in and read it aloud */
for(const [id,v] of [['b_name','Shreya'],['b_age','27'],['b_country','India'],['b_city','Amsterdam'],['b_lang','Engels']]) await p.fill('#'+id,v);
await p.click('#g_f'); await p.waitForTimeout(300);
await p.click('#l1go'); await p.waitForTimeout(500);
const spoken2 = (await p.textContent('.screen')).replace(/\s+/g,' ');
const lineCount = await p.locator('.linerow').count();
console.log('  speaking lines   :', lineCount);
console.log('  name in Dutch    :', spoken2.includes('Ik heet Shreya'));
console.log('  country mapped   :', spoken2.includes('Ik kom uit India'));
console.log('  age line         :', spoken2.includes('27 jaar oud'));
console.log('  gender line      :', spoken2.includes('een vrouw'));
await p.screenshot({path:'tests/shots/nl-speak.png', fullPage:true});

/* ---- 5 · switching back restores German, and progress is kept apart ---- */
await p.evaluate(()=>{ S.units=S.units||{}; S.units['n0a']={lesson:true,check:90,doneDay:today()}; save(); pickLang('de'); }); await p.waitForTimeout(600);
const back = await p.evaluate(()=>({
  lang:S.lang, units:UNITS.length, first:UNITS[0].id, words:Object.keys(VOCAB).length,
  teacher:TT().name, voiceLang:targetLang(), voice:deVoice&&deVoice.name,
  dutchProgressKept: !!(S.units && S.units['n0a'] && S.units['n0a'].lesson)
}));
console.log('\nback to German     :', JSON.stringify(back));
console.log('German restored    :', back.first==='s0a' && back.teacher==='Klara' && back.voiceLang==='de-DE');
console.log('Dutch progress kept:', back.dutchProgressKept);

/* the ten ids that exist in both packs must not share SRS state */
const bleed = await p.evaluate(()=>{
  loadCourse('de');
  ['hallo','ja','vier','acht','elf','euro','morgen','hier','links','rechts'].forEach(id=>{
    if(VOCAB[id]){ const w = wstate(id); w.lv = 4; w.seen = 9; }
  });
  save();
  const deWords = skillStats().words;
  loadCourse('nl'); S.lang='nl';
  const nlWords = skillStats().words;
  const leaked = ['hallo','ja','vier','acht','elf','euro','morgen','hier','links','rechts']
    .filter(id => VOCAB['nl-'+id] && S.words['nl-'+id] && S.words['nl-'+id].seen > 0);
  S.lang='de'; loadCourse('de');
  return {deWords, nlWords, leaked};
});
console.log('German mastery set :', bleed.deWords, 'words · Dutch then shows', bleed.nlWords);
console.log('no SRS bleed       :', bleed.leaked.length===0, bleed.leaked.length?bleed.leaked:'');

/* ---- 6 · a device with no Dutch voice must say so, not fall back ---- */
const noVoice = await p.evaluate(()=>{
  const real = speechSynthesis.getVoices;
  speechSynthesis.getVoices = () => [{name:'Google Deutsch',lang:'de-DE'}];
  S.lang='nl'; loadCourse('nl'); pickVoice();
  const r = {missing: voiceMissing(), fellBackToGerman: !!(deVoice && /de/i.test(deVoice.lang))};
  speechSynthesis.getVoices = real; S.lang='de'; loadCourse('de'); pickVoice();
  return r;
});
console.log('\nno nl voice on device:', noVoice.missing, '| silently used German:', noVoice.fellBackToGerman);

/* the learner must be told, not left in silence */
await p.evaluate(()=>{
  const real = speechSynthesis.getVoices;
  window.__realVoices = real;
  speechSynthesis.getVoices = () => [{name:'Google Deutsch',lang:'de-DE'}];
  S.lang='nl'; loadCourse('nl'); pickVoice(); go('home');
});
await p.waitForTimeout(400);
const warned = (await p.textContent('.screen')).includes('No Dutch voice on this device');
console.log('learner is warned  :', warned);
await p.screenshot({path:'tests/shots/nl-novoice.png'});
await p.evaluate(()=>{ speechSynthesis.getVoices = window.__realVoices; S.lang='de'; loadCourse('de'); pickVoice(); });

const bad = [];
if(!nl || nl.locked) bad.push('Dutch not selectable');
if(!allNl) bad.push('teacher audio was not nl-NL');
if(course.stage0!==9) bad.push('Stage 0 is not 9 units');
if(course.words!==174) bad.push('Dutch vocabulary did not load');
if(ns.bare.length) bad.push('word id not namespaced: '+ns.bare[0]);
if(ns.unresolved.length) bad.push('unresolved word id: '+ns.unresolved[0]);
if(badLang.length) bad.push('a lesson line was spoken in '+badLang[0].lang);
if(!(back.first==='s0a' && back.teacher==='Klara')) bad.push('switching back to German failed');
if(!back.dutchProgressKept) bad.push('Dutch progress lost on switch');
if(bleed.leaked.length) bad.push('German SRS progress leaked into Dutch: '+bleed.leaked.join(', '));
if(bleed.nlWords !== 0) bad.push('Dutch word count polluted by German progress');
if(noVoice.fellBackToGerman) bad.push('fell back to a German voice for Dutch');
if(alpha.only !== 'alphabet') bad.push('n0a did not hand off to the alphabet drill');
if(alpha.letters !== 27) bad.push('Dutch alphabet is not 27 letters, got ' + alpha.letters);
if(tiles !== 27) bad.push('alphabet grid rendered ' + tiles + ' tiles');
if(intro.only !== 'intro') bad.push('n0b did not hand off to the introduction board');
if(!boardTxt.includes('Ik heet')) bad.push('introduction board is not in Dutch');
if(!spoken2.includes('Ik kom uit India')) bad.push('country was not mapped into Dutch');
if(lineCount !== 10) bad.push('expected 10 introduction lines, got ' + lineCount);
if(!warned) bad.push('no warning shown when the device has no Dutch voice');
console.log('ERRORS:', bad.length ? bad : 'none 🎉');
await b.close();
