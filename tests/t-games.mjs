/* Games are only worth having if they feed the same memory the lessons do,
   teach the rule and not just the answer, and appear only where a course can
   fill them. This suite checks all three, in German and in Dutch. */
import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
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

const bad = [];

/* ---- 1 · a course only offers a game it can fill ---- */
const offered = await p.evaluate(()=>{
  const out = {};
  ['de','nl','zh'].forEach(l=>{ S.lang=l; loadCourse(l);
    out[l] = {games:gameList().map(g=>g.id), pool:genderPool().length, buckets:(genderSpec()||{}).buckets||null}; });
  S.lang='de'; loadCourse('de'); return out;
});
console.log('per course        :', JSON.stringify(offered));
if(!offered.de.games.includes('gender')) bad.push('German does not offer the gender game');
if(!offered.nl.games.includes('gender')) bad.push('Dutch does not offer the gender game');
if(offered.zh.games.length) bad.push('Mandarin was offered a game it cannot fill: ' + offered.zh.games);
if(String(offered.de.buckets) !== 'der,die,das') bad.push('German buckets wrong: ' + offered.de.buckets);
if(String(offered.nl.buckets) !== 'de,het') bad.push('Dutch buckets wrong: ' + offered.nl.buckets);
if(offered.de.pool < 20) bad.push('German noun pool too small: ' + offered.de.pool);
if(offered.nl.pool < 40) bad.push('Dutch noun pool too small: ' + offered.nl.pool);

/* ---- 2 · every item is a real noun with a real article ---- */
const items = await p.evaluate(()=>{
  startGender();
  return GG.items.map(id => ({id, de:VOCAB[id].de, art:genderOf(id), noun:genderNoun(id), rule:genderRule(id)}));
});
console.log('\n12 items drawn from the learner’s own words:');
items.slice(0,6).forEach(i=>console.log(`   ${i.de.padEnd(22)} -> ${i.art.padEnd(4)} ${i.noun.padEnd(14)} ${i.rule?('· '+i.rule.slice(0,46)):''}`));
if(items.length !== 12) bad.push('expected 12 items, got ' + items.length);
items.forEach(i=>{
  if(!['der','die','das'].includes(i.art)) bad.push(`item ${i.de} has no article`);
  if(!i.noun || i.noun === i.de) bad.push(`item ${i.de} was not split into article + noun`);
  if(/^(der|die|das)\b/.test(i.noun)) bad.push(`the article is still on the board for ${i.de}`);
});
if(new Set(items.map(i=>i.id)).size !== items.length) bad.push('a word was asked twice in one round');

/* ---- 3 · the rule shown is never false ---- */
const ruleCheck = await p.evaluate(()=>{
  const out = [];
  ['de','nl'].forEach(l=>{ S.lang=l; loadCourse(l);
    genderPool().forEach(id => { const r = genderRule(id); if(r) out.push({l, de:VOCAB[id].de, art:genderOf(id), r}); });
  });
  S.lang='de'; loadCourse('de'); return out;
});
const lies = ruleCheck.filter(x => {
  const m = x.r.match(/\bis (der|die|das|de|het)\b|\bare (der|die|das|de|het)\b|-> ?(der|die|das|de|het)/);
  return m && ![m[1],m[2],m[3]].includes(x.art);
});
console.log('\nrules fired       :', ruleCheck.length, '| contradicting the noun they sit on:', lies.length);
if(lies.length) bad.push('a rule contradicts its own noun: ' + JSON.stringify(lies[0]));

/* ---- 4 · a miss reaches the same SRS a lesson writes to ---- */
await p.evaluate(()=>{ S.words = {}; save(); startGender(); go('gGender'); }); await p.waitForTimeout(300);
const first = await p.evaluate(()=>GG.items[0]);
const wrong = await p.evaluate(()=>{ const right = genderOf(GG.items[0]);
  return (genderSpec().buckets.find(b=>b!==right)); });
await p.click(`.gameOpt:has-text("${wrong}")`); await p.waitForTimeout(250);
const afterMiss = await p.evaluate(id=>({w:S.words[id], due:document.querySelector('.card b').textContent}), first);
console.log('\nafter a wrong answer:', JSON.stringify(afterMiss));
if(!afterMiss.w || afterMiss.w.lv !== 1) bad.push('a miss did not mark the word shaky in S.words');
if(!afterMiss.w || !afterMiss.w.miss) bad.push('a miss was not counted');
const shownFull = await p.evaluate(id=>document.querySelector('.screen').textContent.includes(VOCAB[id].de), first);
if(!shownFull) bad.push('the full noun with its article was not shown after a miss');
await p.screenshot({path:'tests/shots/game-gender.png', fullPage:true});

/* ---- 5 · and the round finishes and grades ---- */
const finished = await p.evaluate(async ()=>{
  gNext();
  while(GG.i < GG.items.length){ gGuess(genderOf(GG.items[GG.i])); gNext(); }
  return {screen:(document.querySelector('.screen')||{}).textContent.replace(/\s+/g,' ').slice(0,90), ok:GG.ok};
});
console.log('finished round    :', JSON.stringify(finished));
if(finished.ok !== 11) bad.push('score did not track: ' + finished.ok + ' of 12 with one deliberate miss');
if(!/11 of 12/.test(finished.screen)) bad.push('the result screen did not show the score');
await p.screenshot({path:'tests/shots/game-result.png', fullPage:true});

/* ---- 6 · Dutch gets the same game with no new authoring ---- */
const nl = await p.evaluate(()=>{ S.lang='nl'; loadCourse('nl'); S.words={}; save();
  startGender();
  const out = {name:genderSpec().name, buckets:genderSpec().buckets, items:GG.items.map(id=>VOCAB[id].de).slice(0,5)};
  S.lang='de'; loadCourse('de'); return out; });
console.log('\nDutch, same code  :', JSON.stringify(nl));
if(nl.name !== 'de of het') bad.push('Dutch did not get its own game name');
if(!nl.items.every(s=>/^(de|het) /.test(s))) bad.push('Dutch items are not articled nouns: ' + nl.items);

console.log('\nERRORS:', bad.length ? bad : 'none 🎉');
if(errs.length) console.log('page errors:', errs.slice(0,3));
await b.close();
