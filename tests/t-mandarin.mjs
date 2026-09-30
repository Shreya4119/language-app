/* Mandarin: the first course with no alphabet and two written forms.
   This suite exists to prove the course-pack design is language-neutral
   rather than Germanic-neutral. */
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
  const voices=[{name:'Google Deutsch',lang:'de-DE'},{name:'Google Nederlands',lang:'nl-NL'},
                {name:'Google 普通话（中国大陆）',lang:'zh-CN'}];
  const mock={ speak:u=>{ window.__spoken.push({t:u.text,lang:u.lang,voice:u.voice&&u.voice.name}); live=u;
      setTimeout(()=>{ if(live===u&&u.onend) u.onend(); },25); },
    cancel:()=>{ live=null; }, getVoices:()=>voices,
    set onvoiceschanged(f){}, get onvoiceschanged(){return null} };
  Object.defineProperty(window,'speechSynthesis',{value:mock,configurable:true,writable:true});
});
await p.goto(ALL); await p.waitForTimeout(300);

/* ---- 1 · offered, and Lin greets in Chinese with a Chinese voice ---- */
const rows = await p.$$eval('.pathRow', els => els.map(e => ({t:e.textContent.replace(/\s+/g,' ').trim(), locked:e.classList.contains('locked')})));
const zh = rows.find(r=>/Mandarin/.test(r.t));
console.log('Mandarin offered   :', !!zh, '| locked:', zh ? zh.locked : '?');
await p.evaluate(()=>{ window.__spoken=[]; });
await p.click('.pathRow:has-text("Mandarin")'); await p.waitForTimeout(2600);
const meet = (await p.textContent('.screen')).replace(/\s+/g,' ');
const spoken = await p.evaluate(()=>window.__spoken);
console.log('teacher            :', await p.evaluate(()=>TT().name), '|', await p.evaluate(()=>TT().lang));
console.log('greets in Chinese  :', meet.includes('你好！我叫林。'));
spoken.forEach(s=>console.log('   spoke            ', JSON.stringify(s.t).slice(0,40).padEnd(42), s.lang, '·', s.voice));
const allZh = spoken.length>0 && spoken.every(s=>s.lang==='zh-CN' && /普通话/.test(s.voice||''));
console.log('ALL audio zh-CN    :', allZh);
await p.screenshot({path:'tests/shots/zh-meet.png'});

/* ---- 2 · the pack, and every word carrying both written forms ---- */
await p.evaluate(()=>{ S.onboarded=true; S.name='Shreya'; save(); go('home'); }); await p.waitForTimeout(500);
const pack = await p.evaluate(()=>({
  lang:S.lang, built:UNITS.filter(u=>!u.planned).length, words:Object.keys(VOCAB).length,
  noPinyin:Object.values(VOCAB).filter(v=>!v.py).map(v=>v.de),
  native:course().native, voice:targetLang(), greet:courseGreet(),
  tabs:Array.from(document.querySelectorAll('.nav button')).map(b=>b.textContent.trim())
}));
console.log('\npack               :', JSON.stringify(pack));
console.log('every word has pinyin:', pack.noPinyin.length===0, pack.noPinyin.slice(0,4));
await p.screenshot({path:'tests/shots/zh-home.png', fullPage:true});

/* ---- 3 · the grid teaches tones, because there is no alphabet ---- */
await p.evaluate(()=>{ const u=UNITS.find(x=>x.id==='z0a');
  TCH={uid:'z0a', i:u.teach.length-1, answered:{}}; go('teachMove'); }); await p.waitForTimeout(400);
await p.evaluate(()=>tchNext()); await p.waitForTimeout(600);
const greetTxt = (await p.textContent('.screen')).replace(/\s+/g,' ');
const tonesState = await p.evaluate(()=>({only:L1&&L1.only, unit:L1&&L1.unit, tiles:(course().first.alphabet||[]).length}));
console.log('\nz0a practice       :', JSON.stringify(tonesState));
console.log('  greetings shown  :', greetTxt.includes('你好') && greetTxt.includes('谢谢'));
await p.screenshot({path:'tests/shots/zh-greetings.png', fullPage:true});
await p.evaluate(()=>{ L1.step=5; go('lesson1'); }); await p.waitForTimeout(500);
const gridTxt = (await p.textContent('.screen')).replace(/\s+/g,' ');
const tiles = await p.locator('.abcTile').count();
console.log('  sound tiles      :', tiles);
console.log('  four tones on it :', ['mā','má','mǎ','mà'].every(t=>gridTxt.includes(t)));
console.log('  no latin alphabet:', !/\bB beh\b|\bscharfes S\b/.test(gridTxt));
await p.screenshot({path:'tests/shots/zh-tones.png', fullPage:true});

/* ---- 4 · the introduction board, in characters ---- */
await p.evaluate(()=>{ const u=UNITS.find(x=>x.id==='z0b');
  TCH={uid:'z0b', i:u.teach.length-1, answered:{}}; go('teachMove'); }); await p.waitForTimeout(400);
await p.evaluate(()=>tchNext()); await p.waitForTimeout(600);
const boardTxt = (await p.textContent('.screen')).replace(/\s+/g,' ');
console.log('\nz0b practice       :', await p.evaluate(()=>JSON.stringify({only:L1.only, unit:L1.unit})));
console.log('  Chinese board    :', boardTxt.includes('我的介绍') && boardTxt.includes('我叫'));
console.log('  no German/Dutch  :', !boardTxt.includes('Ich hei') && !boardTxt.includes('Ik heet'));
for(const [id,v] of [['b_name','Shreya'],['b_age','27'],['b_country','India'],['b_city','Amsterdam'],['b_lang','English']]) await p.fill('#'+id,v);
await p.click('#g_f'); await p.waitForTimeout(300);
await p.click('#l1go'); await p.waitForTimeout(500);
const speakTxt = (await p.textContent('.screen')).replace(/\s+/g,' ');
const lineCount = await p.locator('.linerow').count();
console.log('  speaking lines   :', lineCount);
console.log('  country mapped   :', speakTxt.includes('我来自印度'), '| language mapped:', speakTxt.includes('我会说英语'));
console.log('  age, no 是       :', speakTxt.includes('我今年27岁') && !speakTxt.includes('我是27'));
await p.screenshot({path:'tests/shots/zh-intro-board.png', fullPage:true});

/* ---- 5 · pinyin renders under the characters ---- */
await p.evaluate(()=>{ startTeach('z0c'); TCH.i=1; go('teachMove'); }); await p.waitForTimeout(600);
const py = await p.evaluate(()=>{
  const el = document.querySelector('.py');
  return {count: document.querySelectorAll('.py').length, first: el ? el.textContent.trim() : null};
});
console.log('\npinyin on the word strip:', JSON.stringify(py));
await p.screenshot({path:'tests/shots/zh-words.png', fullPage:true});

/* ---- 6 · a mark that is a character, not a number ---- */
const marks = await p.evaluate(()=>{
  const out = {};
  [95,85,75,65,30].forEach(pct=>{ const n = note(pct); out[pct] = n.n + ' ' + n.de; });
  return {marks: out, label: note(90).label, badge: gradeBadge(85).includes('良')};
});
console.log('Chinese marking    :', JSON.stringify(marks));

/* ---- 7 · no bleed between three courses ---- */
const three = await p.evaluate(()=>{
  const out = {};
  ['de','nl','zh'].forEach(l=>{ S.lang=l; loadCourse(l);
    out[l] = {units:UNITS.filter(u=>!u.planned).length, words:Object.keys(VOCAB).length, teacher:TT().name, voice:targetLang()}; });
  S.lang='zh'; loadCourse('zh');
  return out;
});
console.log('three courses      :', JSON.stringify(three));

const bad = [];
if(!zh || zh.locked) bad.push('Mandarin not selectable');
if(!allZh) bad.push('teacher audio was not zh-CN');
if(!meet.includes('你好！我叫林。')) bad.push('Lin did not greet in Chinese');
if(pack.noPinyin.length) bad.push('word without pinyin: ' + pack.noPinyin[0]);
if(pack.built !== 3) bad.push('expected 3 built units, got ' + pack.built);
if(pack.tabs.some(t=>/Test|Scenes/.test(t))) bad.push('a tab was offered that Mandarin cannot fill');
if(tonesState.only !== 'alphabet') bad.push('z0a did not hand off to the sound grid');
if(tiles !== 20) bad.push('sound grid rendered ' + tiles + ' tiles');
if(!boardTxt.includes('我叫')) bad.push('introduction board is not in Chinese');
if(!speakTxt.includes('我来自印度')) bad.push('country was not mapped into Chinese');
if(lineCount !== 10) bad.push('expected 10 introduction lines, got ' + lineCount);
if(!py.count) bad.push('pinyin did not render under the characters');
if(marks.marks[85].indexOf('良') !== 0) bad.push('Chinese marking scale not in use: ' + marks.marks[85]);
if(three.de.teacher !== 'Klara' || three.nl.teacher !== 'Sanne' || three.zh.teacher !== 'Lin') bad.push('teachers crossed between courses');
if(three.de.voice !== 'de-DE' || three.nl.voice !== 'nl-NL' || three.zh.voice !== 'zh-CN') bad.push('voices crossed between courses');
console.log('ERRORS:', bad.length ? bad : 'none 🎉');
if(errs.length) console.log('console errors:', errs.slice(0,4));
await b.close();
