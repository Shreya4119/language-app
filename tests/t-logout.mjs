import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
// sandboxed context: confirm() is a no-op, exactly like the artifact viewer
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.addInitScript(()=>{
  const m={speak:()=>{},cancel:()=>{},getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'}],set onvoiceschanged(f){},get onvoiceschanged(){return null}};
  Object.defineProperty(window,'speechSynthesis',{value:m,configurable:true,writable:true});
  window.confirm = () => false;      // what a sandboxed iframe does
});
await p.goto(BASE); await p.waitForTimeout(250);
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(300);
await p.click('button.btn'); await p.waitForTimeout(200); await p.click('.pathRow'); await p.waitForTimeout(400);

// build up some state first
await p.evaluate(()=>{ S.name='Shreya'; ['s0a','s0b'].forEach(id=>{const st=unitState(id); st.lesson=true; st.check=88;}); S.hand={s0b:'2026-08-01'}; save();
  SES={kind:'lesson'}; L1={step:3}; VB={step:4}; TCH={uid:'s0e',i:2,answered:{0:1}}; MICCB.x='y'; });
await p.evaluate(()=>go('me')); await p.waitForTimeout(350);
console.log('before: name =', await p.evaluate(()=>S.name), '| units done =', await p.evaluate(()=>Object.keys(S.units).length));

await p.click('text=Log out'); await p.waitForTimeout(300);
console.log('dialog appeared (not window.confirm):', await p.locator('.modal').count()>0);
await p.screenshot({path:'tests/shots/logout.png'});

await p.click('text=Cancel'); await p.waitForTimeout(250);
console.log('cancel closes it, state intact:', await p.locator('.modal').count()===0, '·', await p.evaluate(()=>S.name)==='Shreya');

await p.click('text=Log out'); await p.waitForTimeout(250);
await p.click('text=Yes, log out'); await p.waitForTimeout(500);
const after = await p.evaluate(()=>({name:S.name, units:Object.keys(S.units).length, hand:Object.keys(S.hand||{}).length,
  ses:SES, l1:L1, vb:VB.step, tch:TCH.uid, miccb:Object.keys(MICCB).length,
  screen:document.querySelector('h1')?document.querySelector('h1').textContent:'', ls:!!localStorage.getItem('sprak')}));
console.log('after :', after);
console.log('back on the language picker:', after.screen.includes('Which language'));
console.log('storage cleared:', !after.ls, '· session globals cleared:', after.ses===null && after.l1===null && after.vb===1 && after.tch===null && after.miccb===0);
await p.reload(); await p.waitForTimeout(400);
console.log('after reload still logged out:', (await p.textContent('h1')).includes('Which language'));
console.log('ERRORS:', errs.length? errs.slice(0,4):'none 🎉');
await b.close();
