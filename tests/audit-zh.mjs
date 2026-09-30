/* Walks every screen as the Mandarin course and reports what is empty, broken or
   still German. Not a pass/fail suite: a report to read. */
import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
/* Dutch and Mandarin are parked: LIVE_LANGS is ['de']. The preview flag is
   how a parked pack stays reachable, and therefore testable. */
const ALL = BASE + (BASE.includes('?') ? '&' : '?') + 'langs=all';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.addInitScript(()=>{ const m={speak:()=>{},cancel:()=>{},getVoices:()=>[{name:'Google 普通话',lang:'zh-CN'},{name:'Google Deutsch',lang:'de-DE'}],
  set onvoiceschanged(f){},get onvoiceschanged(){return null}};
  Object.defineProperty(window,'speechSynthesis',{value:m,configurable:true,writable:true}); });

await p.goto(ALL); await p.waitForTimeout(300);
await p.click('.pathRow:has-text("Mandarin")'); await p.waitForTimeout(500);
await p.evaluate(()=>{ S.onboarded = true; S.name = 'Shreya'; save(); go('home'); });
await p.waitForTimeout(400);

/* German words that must never appear while the Mandarin course is loaded */
/* anything from another course that must never appear while Mandarin is loaded */
const GERMAN = [/\bDeutsch\b/, /\bGuten\b/, /\bKlara\b/, /\bSanne\b/, /Ich hei\u00dfe/, /\bNederlands\b/,
  /\bGoethe\b/, /\bWortliste\b/, /\bH\u00f6ren\b/, /\bde of het\b/, /\u00df/, /\bIk heet\b/];

const screens = [
  ['home',     () => go('home')],
  ['skills',   () => go('skills')],
  ['scenes',   () => go('scenes')],
  ['test',     () => go('test')],
  ['me',       () => go('me')],
  ['culture',  () => go('culture')],
  ['progress', () => go('progress')],
  ['notebook', () => go('notebook')],
  ['unit z0a', () => go('unit','z0a')],
];

console.log('screen      chars  empty?  German leakage');
console.log('-'.repeat(72));
for(const [name, fn] of screens){
  await p.evaluate(fn); await p.waitForTimeout(400);
  let t = '';
  try { t = (await p.textContent('.screen')).replace(/\s+/g,' ').trim(); } catch(e){ t = '(no .screen)'; }
  const hits = GERMAN.filter(g => g.test(t)).map(g => g.source.replace(/\\b/g,''));
  const empty = t.length < 120;
  console.log(
    name.padEnd(11),
    String(t.length).padStart(5),
    (empty ? ' EMPTY ' : '   -   '),
    hits.length ? hits.join(' ') : '-'
  );
  if(empty || hits.length) console.log('            ', JSON.stringify(t.slice(0,150)));
  await p.screenshot({path:`tests/shots/audit-zh-${name.replace(/\s/g,'-')}.png`, fullPage:true});
}

const tabs = await p.evaluate(()=>Array.from(document.querySelectorAll('.nav button')).map(b=>b.textContent.trim()));
console.log('\nnav tabs offered:', tabs.join(' · '));

/* what the course pack actually provides */
const packs = await p.evaluate(()=>({
  stories: STORIES.length, scenarios: SCENARIOS.length, culture: CULTURE.length,
  mockHoeren: (typeof MOCKTEST!=='undefined' && MOCKTEST.hoeren) ? MOCKTEST.hoeren.length : 0,
  mockIsGerman: (typeof MOCKTEST!=='undefined' && MOCKTEST.hoeren) ? /Berlin|Zug|Euro acht/.test(JSON.stringify(MOCKTEST)) : false,
  hasIntroLesson: UNITS.some(u=>u.id===(course().first||{}).unit),
  withPinyin: Object.values(VOCAB).filter(v=>v.py).length,
  withoutPinyin: Object.values(VOCAB).filter(v=>!v.py).map(v=>v.de),
  units: UNITS.filter(u=>!u.planned).map(u=>u.id)
}));
console.log('\ncontent the Mandarin pack provides:', JSON.stringify(packs, null, 0));
console.log('ERRORS:', errs.length ? errs.slice(0,5) : 'none');
await b.close();
