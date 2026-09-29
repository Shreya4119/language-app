import { chromium } from 'playwright';
const BASE = process.env.SPRAK_URL || 'http://localhost:4173';
const b = await chromium.launch({...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:2 });
const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.addInitScript(()=>{ const m={speak:()=>{},cancel:()=>{},getVoices:()=>[{name:'Google Deutsch',lang:'de-DE'}],set onvoiceschanged(f){},get onvoiceschanged(){return null}};
  Object.defineProperty(window,'speechSynthesis',{value:m,configurable:true,writable:true}); });
await p.goto(BASE); await p.waitForTimeout(250);
await p.click('.pathRow:not(.locked)'); await p.waitForTimeout(300);
await p.click('button.btn'); await p.waitForTimeout(200); await p.click('.pathRow'); await p.waitForTimeout(450);

const s = await p.evaluate(()=>{
  const noConcept = UNITS.filter(u=>!u.concept).map(u=>u.id);
  return {
    stages: STAGES.map(g=>{ const us=UNITS.filter(u=>u.stage===g.n), b=us.filter(u=>!u.planned);
      return [g.n, g.name, b.length+'/'+us.length]; }),
    total: UNITS.length, built: UNITS.filter(u=>!u.planned).length, noConcept,
    unlockedNow: UNITS.filter(u=>unlocked(u)).map(u=>u.id),
    plannedUnlocked: UNITS.filter(u=>u.planned && unlocked(u)).length
  };
});
console.log('stage  name                 built/total');
s.stages.forEach(r=>console.log(`  ${r[0]}    ${r[1].padEnd(20)} ${r[2]}`));
console.log('units total:', s.total, '· built:', s.built);
console.log('units missing a concept:', s.noConcept.length? s.noConcept : 'none');
console.log('unlocked right now:', s.unlockedNow.join(', '));
console.log('planned units wrongly unlocked:', s.plannedUnlocked);

console.log('\nstage cards on home:', await p.locator('text=/Stage \\d ·/').count());
await p.screenshot({path:'tests/shots/p-home.png', fullPage:true});
await p.click('text=Get things done'); await p.waitForTimeout(350);
console.log('after opening Stage 2, rows visible:', await p.locator('.pathRow').count());
console.log('SOON markers:', await p.locator('text=SOON').count());
await p.screenshot({path:'tests/shots/p-stage2.png', fullPage:true});

// progression: finishing stage 0 should open u1 only
await p.evaluate(()=>{ ['s0a','s0f','s0g','s0b','s0c','s0e'].forEach(id=>{const st=unitState(id); st.lesson=true; st.check=90;}); save(); });
const after = await p.evaluate(()=>UNITS.filter(u=>unlocked(u)).map(u=>u.id));
console.log('after finishing stage 0, unlocked:', after.join(', '));
console.log('ERRORS:', errs.length? errs.slice(0,5):'none 🎉');
await b.close();
