import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.addInitScript(()=>{ window.speechSynthesis={speak:()=>{},cancel:()=>{},getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'}]}; });
await p.goto(BASE); await p.waitForTimeout(250);
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(350);
await p.click('button.btn'); await p.waitForTimeout(250);
await p.click('.pathRow'); await p.waitForTimeout(450);

// simulate: two units finished YESTERDAY
await p.evaluate(()=>{
  const y = new Date(Date.now()-864e5).toISOString().slice(0,10);
  ['s0b','s0c'].forEach(id=>{ const st=unitState(id); st.lesson=true; st.check=88; st.doneDay=y; });
  save(); go('home');
});
await p.waitForTimeout(400);
const rev = await p.locator('text=quick revision').count();
console.log('revision card shown:', rev>0);
console.log('card text:', (await p.textContent('.card')).replace(/\s+/g,' ').slice(0,130));
await p.screenshot({path:'tests/shots/n1-home.png'});

// notes entry on home
console.log('My notes row:', await p.locator('text=My notes').count()>0);
await p.click('text=My notes'); await p.waitForTimeout(400);
console.log('notebook rows:', await p.locator('.pathRow').count());
await p.screenshot({path:'tests/shots/n2-notebook.png', fullPage:true});

await p.locator('.pathRow').first().click(); await p.waitForTimeout(400);
const t = await p.textContent('.screen');
console.log('notes has grammar:', t.includes('Grammar'), '| culture:', t.includes('Culture'), '| vocab:', t.includes('Vocabulary'));
console.log('writing task present:', t.includes('Schreib'));
await p.screenshot({path:'tests/shots/n3-notes.png', fullPage:true});

// tick the handwriting task
await p.click('#handBtn'); await p.waitForTimeout(300);
console.log('hand marked:', await p.evaluate(()=>Object.keys(S.hand)));
await p.click('text=All my notes'); await p.waitForTimeout(350);
console.log('notebook shows written ✓:', (await p.textContent('.screen')).includes('written by hand'));

// revision drill runs
await p.click('.nav button'); await p.waitForTimeout(350);
await p.click('text=Revise now'); await p.waitForTimeout(500);
console.log('drill started:', await p.evaluate(()=>SES && SES.kind), '| items:', await p.evaluate(()=>SES?SES.items.length:0));
console.log('revised stamped:', await p.evaluate(()=>Object.keys(S.revised)));
console.log('ERRORS:', errs.length? errs.slice(0,5):'none 🎉');
await b.close();
