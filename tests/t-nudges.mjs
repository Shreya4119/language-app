/* The copy that brings people back. These assertions encode the seven rules
   at the top of nudges.js, because tone is the thing that decays silently. */
import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
/* Dutch and Mandarin are parked: LIVE_LANGS is ['de']. The preview flag is
   how a parked pack stays reachable, and therefore testable. */
const ALL = BASE + (BASE.includes('?') ? '&' : '?') + 'langs=all';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.addInitScript(()=>{ const m={speak:()=>{},cancel:()=>{},getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'},{name:'Google Nederlands',lang:'nl-NL'},{name:'Google 普通话',lang:'zh-CN'}],
  set onvoiceschanged(f){},get onvoiceschanged(){return null}};
  Object.defineProperty(window,'speechSynthesis',{value:m,configurable:true,writable:true}); });
await p.goto(ALL); await p.waitForTimeout(300);
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(400);
await p.evaluate(()=>{ S.onboarded=true; S.name='Shreya'; save(); go('home'); }); await p.waitForTimeout(300);

/* every bank, every language, with a learner who has real progress */
const all = await p.evaluate(()=>{
  const out = {};
  const seed = () => {
    S.units = {}; S.words = {};
    UNITS.filter(u=>!u.planned).slice(0,3).forEach(u=>{
      S.units[u.id] = {lesson:true, check:80, doneDay:'2026-01-01'};
      (u.vocab||[]).forEach(id=>{ if(VOCAB[id]) S.words[id] = {lv:3, miss:0, seen:2, due:0}; });
    });
    save();
  };
  ['de','nl','zh'].forEach(lang => {
    S.lang = lang; loadCourse(lang); seed();
    out[lang] = {};
    ['away1','away3','away7','away14','due','hand','win'].forEach(k => {
      out[lang][k] = pickNudge(k);
    });
    out[lang].soon = pickNudge(null, {event:'doctor appointment', when:'Thursday'});
  });
  S.lang = 'de'; loadCourse('de');
  return out;
});

const lines = [];
for(const [lang, banks] of Object.entries(all)){
  console.log(`\n--- ${lang} ---`);
  for(const [k, line] of Object.entries(banks)){
    console.log(`  ${k.padEnd(7)} ${line}`);
    lines.push({lang, k, line});
  }
}

/* rule 4: a different line tomorrow */
const rotates = await p.evaluate(()=>{
  const real = Date.now; const out = new Set();
  for(let d=0; d<5; d++){ Date.now = () => real() + d*864e5; out.add(pickNudge('away1')); }
  Date.now = real;
  return out.size;
});

/* how far the escalation actually goes: longer away should not mean harsher */
const GUILT = /forget|forgot|lost your|don't lose|disappoint|slacking|lazy|excuse|shame|guilty|miss you|abandoned/i;
const EMPTY = /^\s*$/;

const bad = [];
lines.forEach(({lang,k,line}) => {
  if(EMPTY.test(line)) bad.push(`${lang}/${k} produced nothing`);
  if(GUILT.test(line)) bad.push(`${lang}/${k} guilts the reader: "${line}"`);
  if(/—|–/.test(line)) bad.push(`${lang}/${k} contains a dash: "${line}"`);
  if(line.length > 140) bad.push(`${lang}/${k} is ${line.length} chars, too long for a notification`);
  if(/undefined|NaN|\[object/.test(line)) bad.push(`${lang}/${k} leaked a value: "${line}"`);
});
/* rule 3: the two-week message must be the gentlest, and must say nothing is lost */
['de','nl','zh'].forEach(l => {
  if(!/still yours|not starting over|nothing/i.test(all[l].away14))
    bad.push(`${l}/away14 does not reassure: "${all[l].away14}"`);
});
/* rule 6: a nudge should carry the language it teaches, at least sometimes */
const carries = ['de','nl','zh'].some(l => Object.values(all[l]).some(s => /[^\x00-\x7F]/.test(s)));
console.log('\nrotates over 5 days :', rotates, 'distinct lines');
console.log('carries the language:', carries);
if(rotates < 3) bad.push('nudges barely rotate: ' + rotates + ' lines over 5 days');
if(!carries) bad.push('no nudge contains a word in the language being taught');

/* and it must actually reach the screen */
await p.evaluate(()=>{
  S.lang='de'; loadCourse('de');
  const u = UNITS.filter(x=>!x.planned)[0];
  S.units[u.id] = {lesson:true, check:80, doneDay:'2026-01-01'};
  S.revised = {}; S.lastDay = '2026-01-01'; save(); go('home');
});
await p.waitForTimeout(400);
const onScreen = (await p.textContent('.screen')).replace(/\s+/g,' ');
const shown = /still here|does not expire|counted|drifting|nothing has been deleted|still yours|tram stop|due/i.test(onScreen);
console.log('return card uses a nudge:', shown);
if(!shown) bad.push('the return card did not render a nudge');

/* the email side, which needs an account the app does not have yet */
const mail = await p.evaluate(()=>{
  S.lang='de'; loadCourse('de');
  UNITS.filter(u=>!u.planned).slice(0,3).forEach(u=>{ S.units[u.id]={lesson:true,check:80,doneDay:'2026-01-01'}; });
  save();
  return {
    empty: (function(){ const w=S.words; S.words={}; const r=buildEmail('weekly'); S.words=w; return r; })(),
    weekly: (function(){ UNITS.filter(u=>!u.planned).slice(0,3).forEach(u=>(u.vocab||[]).forEach(id=>{ if(VOCAB[id]) S.words[id]={lv:4,miss:0,seen:3,due:0}; })); save(); return buildEmail('weekly'); })(),
    away: buildEmail('away'),
    appt: buildEmail('appointment', {event:'appointment at the Ausländerbehörde', when:'on Thursday'})
  };
});
console.log('\n--- email ---');
console.log('  empty weekly suppressed:', mail.empty === null);
Object.entries(mail).forEach(([k,m])=>{ if(m) console.log(`  ${k}: "${m.subject}" / ${m.preview}`); });
console.log('\n' + mail.appt.body);
Object.entries(mail).forEach(([k,m])=>{
  if(k === 'empty'){ if(m !== null) bad.push('an empty weekly email was not suppressed'); return; }
  if(!m || !m.subject || /undefined|NaN/.test(m.subject+m.body)) bad.push(`email ${k} leaked a value`);
  if(m.subject.length > 60) bad.push(`email ${k} subject is ${m.subject.length} chars`);
  if(GUILT.test(m.body)) bad.push(`email ${k} guilts the reader`);
  if(/\ba (?=[aeiouAEIOU])/.test(m.body)) bad.push(`email ${k} has "a" before a vowel`);
  if(/^0 /.test(m.subject)) bad.push(`email ${k} subject starts with zero`);
  if(/\b(for|to) (on|this|next) /i.test(m.subject)) bad.push(`email ${k} subject reads badly: "${m.subject}"`);
});
if(!mail.weekly.body.includes('Ich bin')) bad.push('weekly email lists no real sentences');

console.log('\nERRORS:', bad.length ? bad : 'none 🎉');
if(errs.length) console.log('page errors:', errs.slice(0,3));
await b.close();
