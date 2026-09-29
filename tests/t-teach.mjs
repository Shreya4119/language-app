import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.addInitScript(()=>{ const mock={speak:()=>{},cancel:()=>{},getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'}],set onvoiceschanged(f){},get onvoiceschanged(){return null}};
  Object.defineProperty(window,'speechSynthesis',{value:mock,configurable:true,writable:true}); });
await p.goto(BASE); await p.waitForTimeout(250);
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(350);
await p.click('button.btn'); await p.waitForTimeout(250);
await p.click('.pathRow'); await p.waitForTimeout(450);

await p.evaluate(()=>startLesson('s0e')); await p.waitForTimeout(500);
const moves = await p.evaluate(()=>UNITS.find(u=>u.id==='s0e').teach.map(m=>m.m));
console.log('moves:', moves.join(' → '));

// check Klara never reads the board
const dup = await p.evaluate(()=>{
  const t = UNITS.find(u=>u.id==='s0e').teach, bad=[];
  t.forEach((m,i)=>{ const written=[m.board,m.note,m.after,m.concept].filter(Boolean).join(' ');
    if(written && m.say && written.replace(/<[^>]+>/g,'').trim()===m.say.replace(/<[^>]+>/g,'').trim()) bad.push(i); });
  return bad;
});
console.log('moves where she reads the board aloud:', dup.length? dup : 'none');

for(let i=0;i<moves.length;i++){
  const st = await p.evaluate(()=>TCH.i);
  const kind = moves[st];
  if(kind==='elicit'){
    const opts = await p.locator('.opt').count();
    await p.locator('.opt').first().click();          // deliberately guess wrong
    await p.waitForTimeout(250);
    const fb = await p.textContent('.card');
    console.log(`  ${st} elicit: ${opts} options · wrong guess handled: ${fb.includes('Guessing is how')}`);
    if(st===1) await p.screenshot({path:'tests/shots/t-elicit.png', fullPage:true});
  } else {
    console.log(`  ${st} ${kind}`);
    if(kind==='trap') await p.screenshot({path:'tests/shots/t-trap.png', fullPage:true});
  }
  await p.evaluate(()=>tchNext()); await p.waitForTimeout(280);
}
console.log('after teaching → session:', await p.evaluate(()=>SES?SES.kind+' '+SES.uid+' items:'+SES.items.length:'none'));
console.log('no teach cards repeated:', await p.evaluate(()=>SES?!SES.items.some(i=>i.t==='teach'):'?'));
console.log('elicit guesses were NOT scored:', await p.evaluate(()=>Object.keys(S.words).length===0));
console.log('ERRORS:', errs.length? errs.slice(0,5):'none 🎉');
await b.close();
