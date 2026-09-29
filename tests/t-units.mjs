import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844} });
const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.addInitScript(()=>{ window.speechSynthesis={speak:()=>{},cancel:()=>{},getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'}]}; });
await p.goto(BASE); await p.waitForTimeout(250);
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(300);
await p.click('button.btn'); await p.waitForTimeout(200);
await p.click('.pathRow'); await p.waitForTimeout(400);

const r = await p.evaluate(()=>{
  const out = {};
  UNITS.forEach(u=>{
    try{
      const L = buildLesson(u), C = buildCheck(u);
      const bad = [];
      L.items.concat(C).forEach(it=>{
        if(it.t==='mc'){ if(!it.opts || !it.opts.length) bad.push('mc no opts');
          if(it.a===undefined || (typeof it.a==='string' && !it.opts.includes(it.a))) bad.push('mc bad answer: '+it.q); }
        if(it.t==='dict' && !it.answer) bad.push('dict no answer');
        if(it.t==='wb' && (!it.sent || !it.sent.split(' ').length)) bad.push('wb no sentence');
      });
      out[u.id] = {lesson:L.items.length, check:C.length, bad};
    }catch(e){ out[u.id] = {error:e.message}; }
  });
  return out;
});
let ok=true;
for(const [id,v] of Object.entries(r)){
  const flag = v.error ? 'ERROR '+v.error : (v.bad.length? 'BAD '+v.bad.slice(0,2).join('; ') : 'ok');
  if(v.error||v.bad?.length) ok=false;
  console.log(` ${id.padEnd(5)} lesson ${String(v.lesson??'-').padStart(3)} · check ${String(v.check??'-').padStart(2)} · ${flag}`);
}
// step a whole session programmatically
const sim = await p.evaluate(()=>{
  const log=[];
  ['s0f','s0g','s0b','s0e'].forEach(uid=>{
    /* units with a taught sequence build the drill session themselves after teaching */
    const u = UNITS.find(x=>x.id===uid);
    if(typeof hasTeach==='function' && (hasTeach(u) || uid==='s0a' || uid==='s0f')){
      const L = buildLesson(u);
      SES = {kind:'lesson', uid, items:L.items, i:0, results:[], title:u.title, intro:null};
      go('session');
    } else startLesson(uid);
    let guard=0;
    while(SES && SES.i < SES.items.length && guard++ < 200){
      const it = SES.items[SES.i];
      if(!it) break;
      if(it.t==='teach') sesNext(false,true);
      else if(it.t==='mc') sesAnswer(it.opts.indexOf(it.a));
      else if(it.t==='dict'){ SES.results.push({t:'dict',ok:true,id:it.id}); sesNext(); }
      else if(it.t==='wb'){ SES.results.push({t:'wb',ok:true,id:it.id}); sesNext(); }
      else sesNext();
    }
    log.push(uid+':'+guard);
  });
  return log;
});
console.log('sessions stepped:', sim.join(' · '));
console.log('all item shapes valid:', ok);
console.log('ERRORS:', errs.length? errs.slice(0,6):'none 🎉');
await b.close();
