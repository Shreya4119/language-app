import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844} });
p.on('pageerror',e=>console.log('PAGEERR',e.message));
await p.addInitScript(()=>{
  window.__spoken=[];
  class U { constructor(t){ this.text=t; } }
  window.SpeechSynthesisUtterance = U;
  /* a faithful mock: a real engine fires onend, and the queue chains on it */
  let live=null;
  const mock={ speak:u=>{ window.__spoken.push({t:u.text,lang:u.lang,voice:u.voice&&u.voice.name}); live=u; setTimeout(()=>{ if(live===u && u.onend) u.onend(); }, 40); },
    cancel:()=>{ live=null; },
    getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'},{name:'Google UK English Female',lang:'en-GB'}],
    set onvoiceschanged(f){}, get onvoiceschanged(){return null} };
  Object.defineProperty(window,'speechSynthesis',{value:mock,configurable:true,writable:true});
});
await p.goto(BASE); await p.waitForTimeout(300);
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(1600);  /* let meetTeacher finish greeting */
const r = await p.evaluate(async ()=>{
  const wait = ms => new Promise(r=>setTimeout(r,ms));
  window.__spoken=[];
  const dbg = {deVoice: deVoice && deVoice.name, voices: germanVoices().map(v=>v.name)};
  /* one queue, three lines: each must finish before the next starts */
  spQueue([{text:'Guten Tag'}, {text:'This is an English explanation from Klara.', rate:0.97, pitch:1.14}, {text:'Ich bin Klara'}]);
  await wait(1400);
  const seq = window.__spoken.slice();
  /* a new call replaces whatever was queued, it never overlaps */
  window.__spoken=[];
  spQueue([{text:'erste Zeile'},{text:'zweite Zeile'}]);
  await wait(120);
  spQueue({text:'nur diese'});
  await wait(900);
  return {dbg, spoken: seq, replaced: window.__spoken.map(x=>x.t)};
});
console.log('deVoice:', r.dbg.deVoice, '| german voices:', r.dbg.voices);
console.log('utterances:', r.spoken.length);
r.spoken.forEach(x=>console.log('   ', JSON.stringify(x.t).slice(0,46).padEnd(48), x.lang, '·', x.voice));
console.log('ALL use Klara German voice:', r.spoken.length>0 && r.spoken.every(x=>x.voice==='Google Deutsch' && x.lang==='de-DE'));
console.log('English never spoken:', !r.spoken.some(x=>x.t==='Good day'));
console.log('all three lines spoken in order:', JSON.stringify(r.spoken.map(x=>x.t)));
console.log('nothing is cut off mid-queue:', r.spoken.length===3);
console.log('a new call cancels the old queue:', JSON.stringify(r.replaced), r.replaced.length===1 && r.replaced[0]==='nur diese');
const bad = [];
if(r.spoken.length!==3) bad.push('queue dropped a line');
if(!r.spoken.every(x=>x.lang==='de-DE')) bad.push('a line was not spoken in German');
if(r.spoken.some(x=>x.t==='Good day')) bad.push('English was spoken out loud');
if(!(r.replaced.length===1 && r.replaced[0]==='nur diese')) bad.push('a stale queue survived a new call');
console.log('ERRORS:', bad.length ? bad : 'none 🎉');
await b.close();
