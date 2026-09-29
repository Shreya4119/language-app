import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844} });
const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.addInitScript(()=>{ window.speechSynthesis={speak:()=>{},cancel:()=>{},getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'}]}; });
await p.goto(BASE);
await p.waitForTimeout(300);

// SCREEN 1 must be the language picker, with no name input
const h1 = await p.textContent('h1');
const inputs = await p.locator('input[type=text]').count();
console.log('screen1 h1:', JSON.stringify(h1), '| text inputs:', inputs);
await p.screenshot({path:'tests/shots/f1-lang.png'});

// pick German -> meet teacher
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(400);
console.log('screen2 h1:', JSON.stringify(await p.textContent('h1')));
console.log('  teacher line:', (await p.textContent('.card')).slice(0,60).replace(/\s+/g,' '));
await p.screenshot({path:'tests/shots/f2-klara.png'});

await p.click('button.btn'); await p.waitForTimeout(300);
console.log('screen3 (level):', (await p.textContent('.bubble, .screen')).slice(0,70).replace(/\s+/g,' '));
await p.click('.pathRow'); await p.waitForTimeout(500);
console.log('home reached:', await p.locator('.nav').count()>0);

// open lesson 1
await p.click('.pathRow'); await p.waitForTimeout(500);
console.log('L1 step1 mic icons (.ico):', await p.locator('.ico').count(), '| speakbar btns:', await p.locator('.speakbar .btn').count());
await p.screenshot({path:'tests/shots/f3-l1step1.png', fullPage:true});

// fill the four blanks -> name is captured
for(const [id,v] of [['b_name','Shreya'],['b_age','27'],['b_country','Indien'],['b_city','Berlin'],['b_lang','Englisch']]){
  await p.fill('#'+id, v);
}
await p.waitForTimeout(200);
console.log('S.name captured:', await p.evaluate(()=>S.name));
await p.click('#l1go'); await p.waitForTimeout(500);

const icons = await p.locator('.ico').count();
const rows  = await p.locator('.linerow').count();
console.log('L1 step3 → linerows:', rows, '| bare .ico icons:', icons, '| speakbar btns:', await p.locator('.speakbar .btn').count());
console.log('selCard:', (await p.textContent('#selCard')).replace(/\s+/g,' ').slice(0,70));
await p.screenshot({path:'tests/shots/f4-board.png', fullPage:true});

// select line 4, check card updates
await p.locator('.linerow').nth(3).click(); await p.waitForTimeout(200);
console.log('after tap line4:', (await p.textContent('#selCard')).replace(/\s+/g,' ').slice(0,50));
// mark two lines done via the fallback path
await p.evaluate(()=>{ l1Tick(0,false); l1Tick(1,false); });
await p.waitForTimeout(300);
console.log('after 2 ticks, sel =', await p.evaluate(()=>L1.sel), '| ok rows:', await p.locator('.linerow.ok').count());
await p.screenshot({path:'tests/shots/f5-ticked.png', fullPage:true});

console.log('ERRORS:', errs.length? errs.slice(0,5) : 'none 🎉');
await b.close();
