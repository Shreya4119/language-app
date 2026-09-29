import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844} });
const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.addInitScript(()=>{ window.speechSynthesis={speak:()=>{},cancel:()=>{},getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'}]}; });
await p.goto(BASE);
await p.waitForTimeout(250);
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(350);
await p.click('button.btn'); await p.waitForTimeout(250);
await p.click('.pathRow'); await p.waitForTimeout(450);
// nav tabs
const tabs = await p.locator('.nav button').count();
for(let i=0;i<tabs;i++){ await p.locator('.nav button').nth(i).click(); await p.waitForTimeout(280); }
console.log('nav tabs visited:', tabs);
// themes
await p.locator('.nav button').last().click(); await p.waitForTimeout(300);
const themes = await p.locator('[onclick*="setTheme"]').count();
for(let i=0;i<themes;i++){ await p.locator('[onclick*="setTheme"]').nth(i).click(); await p.waitForTimeout(120); }
console.log('themes cycled:', themes, '| current:', await p.evaluate(()=>S.theme));
// reload persistence
await p.reload(); await p.waitForTimeout(400);
console.log('after reload → onboarded:', await p.evaluate(()=>S.onboarded), '| nav present:', await p.locator('.nav').count()>0);
console.log('ERRORS:', errs.length? errs.slice(0,6):'none 🎉');
await b.close();
