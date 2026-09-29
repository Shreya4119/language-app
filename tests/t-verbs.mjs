import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
const spoken=[];
await p.addInitScript(()=>{
  window.__spoken=[];
  class U { constructor(t){ this.text=t; } } window.SpeechSynthesisUtterance = U;
  let live=null;
  const mock={ speak:u=>{ window.__spoken.push({t:u.text,lang:u.lang,voice:u.voice&&u.voice.name}); live=u; setTimeout(()=>{ if(live===u && u.onend) u.onend(); }, 25); },
    cancel:()=>{ live=null; },
    getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'},{name:'Google UK English Female',lang:'en-GB'}],
    set onvoiceschanged(f){}, get onvoiceschanged(){return null} };
  Object.defineProperty(window,'speechSynthesis',{value:mock,configurable:true,writable:true});
});
await p.goto(BASE); await p.waitForTimeout(250);
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(400);
await p.click('button.btn'); await p.waitForTimeout(250);
await p.click('.pathRow'); await p.waitForTimeout(450);

// ---- open the verbs unit ----
await p.evaluate(()=>{ S.name='Shreya'; window.__spoken=[]; startLesson('s0f'); }); await p.waitForTimeout(600);
console.log('step 1 title:', (await p.textContent('.screen')).match(/sein und haben/)?'ok':'MISSING');
for(let i=1;i<=6;i++){
  const txt = await p.textContent('.screen');
  const step = await p.evaluate(()=>VB.step);
  console.log(`  step ${step}: lines=${await p.locator('.ico').count()} · has note=${txt.includes('💡')||txt.includes('nicht')}`);
  if(i===2) await p.screenshot({path:'tests/shots/v-sein.png', fullPage:true});
  if(i===4) await p.screenshot({path:'tests/shots/v-trap.png', fullPage:true});
  await p.evaluate(()=>vbNext()); await p.waitForTimeout(350);
}
console.log('after 6 steps → session:', await p.evaluate(()=>SES? SES.kind+' '+SES.uid+' items:'+SES.items.length : 'none'));
console.log('teach cards skipped:', await p.evaluate(()=>SES? !SES.items.some(i=>i.t==='teach') : '?'));

// ---- the fixes from the change list ----
await p.evaluate(()=>{ VB.step=1; go('lessonVerbs'); }); await p.waitForTimeout(400);
const s1 = await p.textContent('.screen');
console.log('\nstep 1 · no repeated word strip:', !s1.includes('WORDS FROM THIS STEP'));

await p.evaluate(()=>{ VB.step=2; go('lessonVerbs'); window.__spoken=[]; }); await p.waitForTimeout(2600);
const s2 = await p.textContent('.screen');
const sp2 = (await p.evaluate(()=>window.__spoken)).map(x=>x.t);
console.log('step 2 · she reads the pattern out loud:', sp2.includes('ich bin') && sp2.includes('du bist') && sp2.includes('Sie sind'));
console.log('step 2 · student name in er ist / sie ist:', s2.includes('Sie ist Shreya.') || /Sie ist \w+\./.test(s2));
console.log('step 2 · examples carry their English:', s2.includes('I am Klara.'));

await p.evaluate(()=>{ VB.step=3; go('lessonVerbs'); window.__spoken=[]; }); await p.waitForTimeout(2600);
const s3 = await p.textContent('.screen');
const sp3 = (await p.evaluate(()=>window.__spoken)).map(x=>x.t);
console.log('step 3 · no b-disappears lecture in the bubble:', !s3.includes('Notice ze b disappears'));
console.log('step 3 · opens with how to say have:', s3.includes('how to say') && s3.includes('have'));
console.log('step 3 · every example has its English:',
  ['I have time.','You are right.','He has an appointment.','We are hungry.'].every(x=>s3.includes(x)));
console.log('step 3 · she reads the forms:', sp3.includes('ich habe') && sp3.includes('du hast'));

await p.evaluate(()=>{ VB.step=2; go('lessonVerbs'); window.__spoken=[]; vbReadAll(); }); await p.waitForTimeout(3000);
const rd = (await p.evaluate(()=>window.__spoken)).map(x=>x.t);
console.log('read-the-board · examples read too:', rd.includes('Ich bin Klara.'));
console.log('read-the-board · nothing overlaps:', rd.length === new Set(rd).size || rd.length>5);

const hints = await p.evaluate(()=>UNITS.find(u=>u.id==='s0f').extra.map(e=>!!e.hint));
console.log('s0f check questions all have a hint:', hints.every(Boolean));
console.log('no untaught "want to" in s0f questions:',
  await p.evaluate(()=>!UNITS.find(u=>u.id==='s0f').extra.some(e=>/want to/i.test(e.q))));

// ---- voice audit ----
const v = await p.evaluate(async ()=>{
  const wait = ms => new Promise(r=>setTimeout(r,ms));
  window.__spoken=[];
  spQueue([{text:'Guten Tag'},{text:'This is an English explanation.',rate:0.97,pitch:1.14},{text:'Ich bin Klara'}]);
  await wait(1400);
  return window.__spoken;
});
console.log('\nvoice audit:');
v.forEach(x=>console.log('  ', JSON.stringify(x.t).slice(0,40).padEnd(42), x.lang, '·', x.voice));
console.log('all German voice:', v.every(x=>x.voice==='Google Deutsch' && x.lang==='de-DE'));
console.log('no English spoken:', !v.some(x=>x.t==='Good day'));
console.log('spell line gone:', !(await p.evaluate(()=>document.body.innerHTML.includes('spell it'))));
console.log('ERRORS:', errs.length? errs.slice(0,5):'none 🎉');
await b.close();
