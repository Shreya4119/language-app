/* One language ships. The other two are compiled in, tested, and parked.
   This suite guards the seam: a parked course must be unreachable by tapping,
   unreachable by a stale save, and must lose nothing while it waits. */
import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const ALL = BASE + (BASE.includes('?') ? '&' : '?') + 'langs=all';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.addInitScript(()=>{ const m={speak:()=>{},cancel:()=>{},getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'}],
  set onvoiceschanged(f){},get onvoiceschanged(){return null}};
  Object.defineProperty(window,'speechSynthesis',{value:m,configurable:true,writable:true}); });

const bad = [];

/* ---- 1 · the picker as a new learner sees it ---- */
await p.goto(BASE); await p.waitForTimeout(350);
const rows = await p.$$eval('.pathRow', els => els.map(e => ({
  t: e.textContent.replace(/\s+/g,' ').trim(), locked: e.classList.contains('locked') })));
rows.forEach(r => console.log(`  ${r.locked?'locked ':'OPEN   '} ${r.t}`));
const open = rows.filter(r => !r.locked);
console.log('\ntappable rows      :', open.length, open.map(r=>r.t.split(' ')[0]));
if(open.length !== 1) bad.push(`${open.length} languages are tappable, expected 1`);
if(open.length && !/German/.test(open[0].t)) bad.push('the open row is not German: ' + open[0].t);
const shouted = rows.filter(r => r.locked && !/soon/i.test(r.t)).map(r=>r.t.split(' ')[0]);
if(shouted.length) bad.push('a locked row is not marked soon: ' + shouted.join(', '));
/* a parked row must not advertise content the learner cannot open */
if(/Stage 0 ready|tones, introduction/.test(rows.map(r=>r.t).join(' ')))
  bad.push('a parked row still advertises its content');
await p.screenshot({path:'tests/shots/focus-picker.png', fullPage:true});

/* ---- 2 · and cannot be reached by calling the handler directly ---- */
const forced = await p.evaluate(()=>{ pickLang('nl'); return {lang:S.lang, picked:!!S.langPicked}; });
console.log('pickLang("nl")     :', JSON.stringify(forced), '(must not take)');
if(forced.lang === 'nl') bad.push('pickLang let a parked language through');

/* ---- 3 · a learner who was mid-Dutch when it was parked ---- */
await p.evaluate(()=>{
  const st = JSON.parse(localStorage.getItem('sprak') || '{}');
  st.lang = 'nl'; st.onboarded = true; st.langPicked = true; st.name = 'Shreya';
  st.units = Object.assign(st.units||{}, {n0a:{lesson:true,check:80,doneDay:'2026-01-01'}});
  st.words = Object.assign(st.words||{}, {'nl-hallo':{lv:3,miss:0,seen:2,due:0}});
  localStorage.setItem('sprak', JSON.stringify(st));
});
await p.goto(BASE); await p.waitForTimeout(400);
const parked = await p.evaluate(()=>({
  lang: S.lang, parkedLang: S.parkedLang, native: course().native, voice: targetLang(),
  keptUnit: !!(S.units && S.units.n0a), keptWord: !!(S.words && S.words['nl-hallo']),
  screen: (document.querySelector('.screen')||{}).textContent.replace(/\s+/g,' ').slice(0,70)
}));
console.log('\nsaved as Dutch, opens as:', JSON.stringify(parked));
if(parked.lang !== 'de') bad.push('a saved Dutch learner did not fall back to German');
if(parked.parkedLang !== 'nl') bad.push('the parked language was not remembered');
if(parked.native !== 'Deutsch' || parked.voice !== 'de-DE') bad.push('the course or voice did not follow');
if(!parked.keptUnit || !parked.keptWord) bad.push('parking deleted the learner’s Dutch progress');
if(/het |Nederlands|Sanne/.test(parked.screen)) bad.push('Dutch leaked onto the screen: ' + parked.screen);
await p.screenshot({path:'tests/shots/focus-parked.png', fullPage:true});

/* ---- 4 · nothing German-shaped broke on the way ---- */
const de = await p.evaluate(()=>({
  units: UNITS.filter(u=>!u.planned).length, words: Object.keys(VOCAB).length,
  teacher: TT().name, mock: hasMock(),
  tabs: Array.from(document.querySelectorAll('.nav button')).map(b=>b.textContent.trim())
}));
console.log('German course      :', JSON.stringify(de));
if(de.teacher !== 'Klara' || !de.mock) bad.push('the German course is not intact');

/* ---- 5 · the parked packs are still there, and still whole ---- */
await p.evaluate(()=>localStorage.removeItem('sprak'));
await p.goto(ALL); await p.waitForTimeout(350);
const preview = await p.$$eval('.pathRow', els => els.filter(e=>!e.classList.contains('locked'))
  .map(e => e.textContent.replace(/\s+/g,' ').trim().split(' ')[0]));
const packs = await p.evaluate(()=>{
  const out = {};
  ['de','nl','zh'].forEach(l=>{ S.lang=l; loadCourse(l);
    out[l] = {units:UNITS.filter(u=>!u.planned).length, words:Object.keys(VOCAB).length, teacher:TT().name}; });
  S.lang='de'; loadCourse('de'); return out;
});
console.log('\nwith ?langs=all    :', preview.join(', '));
console.log('parked packs intact:', JSON.stringify(packs));
if(preview.length !== 3) bad.push('the preview flag did not open all three courses');
if(packs.nl.units !== 9 || packs.zh.units !== 3) bad.push('a parked pack lost units while parked');
if(packs.nl.teacher !== 'Sanne' || packs.zh.teacher !== 'Lin') bad.push('a parked teacher went missing');

console.log('\nERRORS:', bad.length ? bad : 'none 🎉');
if(errs.length) console.log('page errors:', errs.slice(0,3));
await b.close();
