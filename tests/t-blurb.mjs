import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.addInitScript(()=>{ window.__spoken=[];
  class U { constructor(t){ this.text=t; } } window.SpeechSynthesisUtterance = U;
  /* a real engine fires onend when a line finishes; the queue chains on it */
  let live=null;
  const m={ speak:u=>{ window.__spoken.push(u.text); live=u; setTimeout(()=>{ if(live===u && u.onend) u.onend(); }, 60); },
    cancel:()=>{ live=null; },
    getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'}], set onvoiceschanged(f){}, get onvoiceschanged(){return null} };
  Object.defineProperty(window,'speechSynthesis',{value:m,configurable:true,writable:true}); });
await p.goto(BASE); await p.waitForTimeout(250);
await p.evaluate(()=>{ window.__spoken=[]; });
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(4200);
const written = (await p.textContent('.card')).replace(/\s+/g,' ').trim();
const spoken = await p.evaluate(()=>window.__spoken);
const blurb = await p.evaluate(()=>TEACHERS.de.blurb);
console.log('written on card contains blurb:', written.includes(blurb));
console.log('spoken utterances:', spoken.length);
spoken.forEach(s=>console.log('   ·', JSON.stringify(s).slice(0,90)));
const hello = await p.evaluate(()=>TEACHERS.de.hello);
console.log('\nSAME STRING spoken and written:', spoken.includes(blurb));
console.log('greeting spoken in full:', spoken.includes(hello));
console.log('  (both sentences, nothing clipped):', spoken.some(s=>s.includes('Herzlich willkommen') && s.includes('Ich heiße Klara')));
console.log('greeting is NOT cut short by the blurb:', spoken.indexOf(hello) === 0 && spoken.indexOf(blurb) === 1);
console.log('both lines reached the engine:', spoken.length === 2);
console.log('no separate short version left:', await p.evaluate(()=>TEACHERS.de.says===undefined));
await p.screenshot({path:'tests/shots/blurb.png'});
console.log('ERRORS:', errs.length? errs.slice(0,4):'none 🎉');
await b.close();
