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

const audit = await p.evaluate(()=>{
  const strip = s => String(s||'').replace(/<[^>]+>/g,'');
  return UNITS.map(u=>({
    id:u.id, brief:!!(u.brief&&u.brief.will), needs:(u.brief||{}).needs||'-',
    cultWords: u.culture ? strip(u.culture.body).split(/\s+/).length : 0,
    cultTitle: u.culture ? u.culture.title : '(none)'
  }));
});
console.log('unit  brief  cultureWords  culture');
audit.forEach(a=>console.log(` ${a.id.padEnd(5)} ${String(a.brief).padEnd(6)} ${String(a.cultWords).padStart(3)}          ${a.cultTitle}`));
const longC = audit.filter(a=>a.cultWords>32);
console.log('culture notes over 32 words:', longC.length? longC.map(a=>a.id+':'+a.cultWords) : 'none');
console.log('s0f culture removed (was grammar):', audit.find(a=>a.id==='s0f').cultWords===0);

await p.evaluate(()=>startLesson('s0c')); await p.waitForTimeout(500);
const t = await p.textContent('.screen');
console.log('\nintro screen:');
console.log('  has IN THIS LESSON:', t.includes('IN THIS LESSON'));
console.log('  shows prerequisite:', t.includes('You will need first'));
console.log('  no grammar dump:', !t.includes('halb sieben'));
console.log('  no notes-first button:', await p.locator('text=Show me the notes first').count()===0);
await p.screenshot({path:'tests/shots/b-intro.png', fullPage:true});

/* the pre-lesson unit page is now the brief, not a grammar dump */
await p.evaluate(()=>go('unit','s0f')); await p.waitForTimeout(400);
const ut = await p.textContent('.screen');
console.log('\nunit page before the lesson:');
console.log('  IN THIS LESSON:', ut.includes('IN THIS LESSON'));
console.log('  prerequisite shown:', ut.includes('You need first'));
console.log('  no grammar dump:', !ut.includes('Three ways to say how you are'));
console.log('  no vocabulary list:', !ut.includes('Vocabulary in this unit'));
console.log('  one-liner:', (ut.match(/sein and haben, the seven forms[^]*?no\./)||[''])[0].slice(0,70));
await p.screenshot({path:'tests/shots/b-unit.png', fullPage:true});
console.log('ERRORS:', errs.length? errs.slice(0,5):'none 🎉');
await b.close();
