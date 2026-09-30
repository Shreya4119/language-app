/* ================= MILESTONE REPORT ================= */
SCREENS.milestone = () => {
  const stats = skillStats();
  const reqs = milestoneReqs();
  const ready = milestoneReady();
  const passed = milestonePassed();
  if(passed) { S.milestoneSeen = true; save(); }
  const overall = Math.round(stats.vocab*0.35 + stats.grammar*0.35 + Math.max(stats.listening,30)*0.15 + Math.max(stats.speaking,20)*0.15);
  const honest =!ready ? 'Finish Units 1-3 (lesson + check ≥70%) to generate your full report.'
    : passed ? 'Solid work. Your foundations are real. Unit 4 is open.'
    : `${overall}% checkpoint mastery, good, not yet solid. ${reqs.filter(r=>!r.ok).length} thing${reqs.filter(r=>!r.ok).length>1?'s are':' is'} holding you back. Fix ${reqs.filter(r=>!r.ok).length>1?'them':'it'} below, each takes minutes, not days.`;
  const bar = (label, v) => `<div class="row" style="margin-top:9px"><span style="font-size:12.5px;font-weight:600;width:86px">${label}</span>
 <div class="progress"><i style="width:${v}%;background:${v>=75?'var(--good)':v>=55?'var(--warn)':'var(--bad)'}"></i></div>
 <span style="font-size:12.5px;font-weight:800;width:38px;text-align:right;color:${v>=75?'var(--good)':v>=55?'var(--warn)':'var(--bad)'}">${v}%</span></div>`;
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('home')">←</button><div class="grow center"><b>Milestone 1 · Report</b></div><span class="counter"></span></div>
 <div class="sec">Milestone 1 · after Units 1-3</div>
 <h1 style="font-size:21px">${S.name?esc(S.name)+', h':'H'}ere's where you really stand</h1>
    ${teacherBox(honest, {expr: passed?'happy':'warm', size:92, autoSpeak:true})}
 <div class="card" style="margin-top:12px">
 <div class="row"><span class="big">${ready?overall+'%':'·'}</span><span class="sub" style="line-height:1.4">checkpoint mastery, honest numbers, from your real answers</span></div>
      ${ready?bar('Vocabulary',stats.vocab)+bar('Grammar',stats.grammar)+bar('Listening',Math.max(stats.listening,25))+bar('Speaking',Math.max(stats.speaking,15)):''}
</div>
 <div class="sec">To unlock Unit 4 · Einkaufen</div>
 <div style="display:flex;flex-direction:column;gap:8px">
    ${reqs.map((r,i)=>`<div class="card" style="padding:12px 14px;${r.ok?'':'border-color:var(--warn)'}">
 <div class="row">
 <div style="width:28px;height:28px;min-width:28px;border-radius:50%;background:${r.ok?'var(--good)':'color-mix(in srgb,var(--warn) 22%,var(--card))'};color:${r.ok?'#fff':'var(--warn)'};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px">${r.ok?'✓':'!'}</div>
 <div class="grow"><b style="font-size:13.5px">${esc(r.label)}</b><div class="usub">${esc(r.sub)}</div></div>
        ${r.ok?'':r.unit?`<button class="btn small" onclick="startCheck('${r.unit}')">Go</button>`:r.drill&&r.drill.length?`<button class="btn small" onclick='startDrill(${JSON.stringify(r.drill.slice(0,6))},{scr:"milestone"})'>Drill</button>`:''}
</div></div>`).join('')}
</div>
    ${passed?`<div class="card" style="margin-top:12px;border-color:var(--good)" ><div class="row"><span class="confetti"></span><div><b>Unit 4 unlocked!</b><div class="usub">Einkaufen, shopping, Pfand & markets awaits (next release adds full content).</div></div></div></div>`:''}
 <div class="grow" style="min-height:12px"></div>
 <button class="btn" onclick="go('home')">${passed?'Continue to path →':'Back to path'}</button>
  ${navBar('home')}</div>`;
};

/* ================= MOCK TEST ================= */
let MT = null;
SCREENS.test = () => {
  if(!hasMock()) return go('home');   /* no exam authored for this course */
  const ex = course().exam;
  const best = S.mock.best;
  app.innerHTML = `<div class="screen">
 <h1 style="font-size:23px">${esc(ex.name)} · Mock Test</h1>
 <p class="sub" style="margin-top:4px">Mirrors the real ${esc(ex.real)}: ${ex.modules.map(m=>esc(m[0])).join(', ')}. 100 points, pass at ${ex.pass}.</p>
    ${best!==null?`<div class="card" style="margin-top:12px"><div class="row"><span class="big" style="color:${best>=ex.pass?'var(--good)':'var(--warn)'}">${best}</span><div><b style="font-size:14px">${best>=ex.pass?'Passed this mock':'Best so far'}</b><div class="usub">/ 100 points · pass ≥ ${ex.pass}</div></div></div>
      ${S.mock.modules?`<div style="margin-top:8px">${Object.entries(S.mock.modules).map(([k,v])=>`<div class="row" style="margin-top:5px"><span style="width:86px;font-size:12.5px;font-weight:600;text-transform:capitalize">${k}</span><div class="progress"><i style="width:${v/25*100}%"></i></div><span style="font-size:12px;font-weight:700;width:42px;text-align:right">${v}/25</span></div>`).join('')}</div>`:''}</div>`:''}
 <div class="sec">The four modules</div>
 <div class="card" style="padding:8px 14px">
      ${ex.modules.map(([n,t,d])=>`<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line)"><b style="font-size:13.5px;width:86px">${n}</b><span class="usub grow">${d}</span><span style="font-size:11.5px;font-weight:700;color:var(--muted)">${t}</span></div>`).join('')}
</div>
 <p class="sub" style="font-size:12.5px;margin-top:10px">This mini-mock uses only vocabulary the course has taught. The real exam is not modular at A1: all four parts in one sitting.</p>
 <div class="grow" style="min-height:12px"></div>
 <button class="btn" onclick="mtStart()">${best===null?'Start the mock test':'Retake the test'}</button>
  ${navBar('test')}</div>`;
};
function mtStart(){ MT = {part:'hoeren', i:0, hoeren:0, lesen:0, lesenTotal:0, schreiben:0, sprechen:0}; go('mock'); }
SCREENS.mock = () => {
  const m = MT;
  /* HÖREN */
  if(m.part==='hoeren'){
    if(m.i >= MOCKTEST.hoeren.length){ m.part='lesen'; m.i=0; m.qi=0; return go('mock'); }
    const it = MOCKTEST.hoeren[m.i];
    app.innerHTML = `<div class="screen noNav">
 <div class="topbar"><button class="x" onclick="go('test')">✕</button><div class="grow center"><b>Hören · ${m.i+1}/${MOCKTEST.hoeren.length}</b></div><span class="counter">25 P</span></div>
 <div class="hero" style="display:flex;align-items:center;gap:14px;padding:20px;margin-bottom:14px">
 <button class="speak" style="width:60px;height:60px;min-width:60px;background:var(--hi);color:var(--hi-ink);font-size:20px" onclick="speak('${it.tts.replace(/'/g,"\\'")}')">▶</button>
 <div><div style="font-weight:800;font-family:var(--font-head)">Listen, you may replay twice</div><div style="font-size:12.5px;opacity:.85;text-decoration:underline;cursor:pointer" onclick="speak('${it.tts.replace(/'/g,"\\'")}',0.6)">play slower</div></div>
</div>
 <h2>${esc(it.q)}</h2>
 <div style="display:flex;flex-direction:column;gap:9px;margin-top:14px">
        ${it.opts.map((o,i)=>`<button class="chip" style="justify-content:flex-start;padding:14px 16px" onclick="mtHoeren(${i})">${esc(o)}</button>`).join('')}
</div></div>`;
    setTimeout(()=>speak(it.tts), 400);
  }
  /* LESEN */
  else if(m.part==='lesen'){
    const texts = MOCKTEST.lesen;
    if(m.i >= texts.length){ m.part='schreiben'; return go('mock'); }
    const t = texts[m.i];
    if(m.qi >= t.qs.length){ m.i++; m.qi=0; return go('mock'); }
    const q = t.qs[m.qi];
    app.innerHTML = `<div class="screen noNav">
 <div class="topbar"><button class="x" onclick="go('test')">✕</button><div class="grow center"><b>Lesen · Text ${m.i+1}</b></div><span class="counter">25 P</span></div>
 <div class="card" style="margin-bottom:12px"><p style="font-size:14.5px;line-height:1.65">${esc(t.text)}</p></div>
 <h2 style="font-size:17px">${esc(q.q)}</h2>
 <div style="display:flex;flex-direction:column;gap:9px;margin-top:12px">
        ${q.opts.map((o,i)=>`<button class="chip" style="justify-content:flex-start;padding:13px 16px" onclick="mtLesen(${i})">${esc(o)}</button>`).join('')}
</div></div>`;
  }
  /* SCHREIBEN */
  else if(m.part==='schreiben'){
    const t = MOCKTEST.schreiben;
    app.innerHTML = `<div class="screen noNav">
 <div class="topbar"><button class="x" onclick="go('test')">✕</button><div class="grow center"><b>Schreiben</b></div><span class="counter">25 P</span></div>
 <div class="card" style="background:var(--tint);border:none;box-shadow:none;margin-bottom:10px">
 <b style="font-size:13.5px">${esc(t.task)}</b>
        ${t.points.map(p=>`<div style="font-size:12.5px;margin-top:4px">• ${esc(p)}</div>`).join('')}
</div>
 <textarea id="mtw" placeholder="Liebe Lena, …"></textarea>
 <div class="row" style="margin-top:6px">${['ä','ö','ü','ß'].map(c=>`<button class="chip" style="padding:6px 11px" onclick="const w=$('#mtw');w.value+='${c}';w.focus()">${c}</button>`).join('')}</div>
 <div class="sec">Now grade yourself honestly (the real exam has a human examiner)</div>
 <div class="card" style="padding:10px 14px">
        ${t.checklist.map((c,i)=>`<label class="row" style="padding:7px 0;font-size:13.5px;cursor:pointer"><input type="checkbox" id="mck${i}" style="width:18px;height:18px;accent-color:var(--accent)"> ${esc(c)}</label>`).join('')}
</div>
 <div class="grow" style="min-height:10px"></div>
 <button class="btn" onclick="mtSchreiben()">Submit writing →</button></div>`;
  }
  /* SPRECHEN */
  else if(m.part==='sprechen'){
    const t = MOCKTEST.sprechen;
    app.innerHTML = `<div class="screen noNav">
 <div class="topbar"><button class="x" onclick="go('test')">✕</button><div class="grow center"><b>Sprechen</b></div><span class="counter">25 P</span></div>
 <div class="card" style="background:var(--tint);border:none;box-shadow:none;margin-bottom:10px"><p style="font-size:13.5px;line-height:1.55">Introduce yourself OUT LOUD using all six cards. Take your time. Then rate yourself honestly.</p></div>
 <div class="wrap" style="margin-bottom:10px">${t.cards.map(c=>`<div class="chip" style="cursor:default">${esc(c)}</div>`).join('')}</div>
 <div class="card"><b style="font-size:12.5px">Frames:</b><p style="font-size:13px;line-height:1.6;margin-top:4px;color:var(--muted)">${esc(t.model)}</p></div>
 <div class="sec">How did it go, honestly?</div>
 <div style="display:flex;flex-direction:column;gap:8px">
 <button class="chip" style="justify-content:flex-start;padding:13px 15px" onclick="mtSprechen(10)">I struggled, long pauses, missing words (10 P)</button>
 <button class="chip" style="justify-content:flex-start;padding:13px 15px" onclick="mtSprechen(17)">Okay, slow but I covered everything (17 P)</button>
 <button class="chip" style="justify-content:flex-start;padding:13px 15px" onclick="mtSprechen(23)">Confident, flowing sentences (23 P)</button>
</div></div>`;
  }
};
function mtHoeren(i){ const it=MOCKTEST.hoeren[MT.i]; if(i===it.a) MT.hoeren++; MT.i++; go('mock'); }
function mtLesen(i){ const q=MOCKTEST.lesen[MT.i].qs[MT.qi]; MT.lesenTotal++; if(i===q.a) MT.lesen++; MT.qi++; go('mock'); }
function mtSchreiben(){
  const n = ($('#mtw').value.trim().match(/\S+/g)||[]).length;
  const checks = [0,1,2,3].filter(i=>$('#mck'+i).checked).length;
  MT.schreiben = Math.round(Math.min(25, (checks/4*20) + (n>=25&&n<=50?5:n>=15?3:0)));
  MT.part='sprechen'; go('mock');
}
function mtSprechen(p){
  MT.sprechen = p;
  const hoeren = Math.round(MT.hoeren/MOCKTEST.hoeren.length*25);
  const lesen = Math.round(MT.lesen/Math.max(1,MT.lesenTotal)*25);
  const total = hoeren + lesen + MT.schreiben + MT.sprechen;
  const modules = {hören:hoeren, lesen:lesen, schreiben:MT.schreiben, sprechen:MT.sprechen};
  if(S.mock.best===null || total > S.mock.best){ S.mock.best = total; S.mock.modules = modules; }
  save(); bumpStreak();
  const weakest = Object.entries(modules).sort((a,b)=>a[1]-b[1])[0];
  app.innerHTML = `<div class="screen noNav">
 <div class="center" style="margin-top:26px">${total>=60?'<div class="confetti">✓</div>':'<div style="font-size:40px"></div>'}</div>
 <h1 class="center">${total} / 100</h1>
 <div class="center" style="margin-top:8px"><span class="mastery ${total>=60?'m-master':'m-shaky'}" style="font-size:13px;padding:7px 14px">${total>=60?'BESTANDEN · you passed this mock':'NOT YET · 60 is the real exam mark'}</span></div>
 <p class="sub center" style="margin-top:10px">${total>=60?'This mirrors the real pass mark. You would have passed today\u2019s mini-mock.':'Below the bar today, but now you know exactly where the points went.'}</p>
 <div class="card" style="margin-top:16px">
      ${Object.entries(modules).map(([k,v])=>`<div class="row" style="margin-top:7px"><span style="width:86px;font-size:13px;font-weight:700;text-transform:capitalize">${k}</span><div class="progress"><i style="width:${v/25*100}%;background:${v>=15?'var(--good)':'var(--bad)'}"></i></div><span style="font-size:12.5px;font-weight:800;width:44px;text-align:right">${v}/25</span></div>`).join('')}
 <p class="sub" style="font-size:12.5px;margin-top:12px">Weakest: <b style="text-transform:capitalize">${weakest[0]}</b> · ${weakest[0]==='hören'?'do a Diktat sprint in Skills':weakest[0]==='lesen'?'read the stories in Skills':weakest[0]==='schreiben'?'redo the writing task in Skills':'practice scenarios out loud'}.</p>
</div>
 <div class="grow"></div>
 <button class="btn" onclick="go('test')">Done</button>
</div>`;
}

/* ================= ME / PROFILE ================= */
SCREENS.me = () => {
  const st = skillStats();
  const seen = Object.keys(S.words).filter(id=>S.words[id].seen>0 && VOCAB[id]);
  const byLv = [0,1,2,3,4].map(lv=>seen.filter(id=>S.words[id].lv===lv).length);
  const themes = [['sunny','Soft & Sunny','#FF7A59'],['plum','Plum & Cream','#8C3F5B'],['forest','Forest & Chalk','#2E5D43'],['editorial','Warm Editorial','#274FA1'],['night','Night Glow','#C8F65D'],['air','Air & Gradient','#5B5BE7']];
  app.innerHTML = `<div class="screen">
 <div class="row"><div class="grow"><h1 style="font-size:23px">${S.name?esc(S.name):'Your profile'}</h1><div class="usub">${esc(course().native)} · A1 track</div></div>
 <div style="text-align:center">${readyRing(56, a1Readiness())}<div class="usub" style="font-size:9.5px;font-weight:800;margin-top:2px">A1 READY</div></div></div>
 <div class="card" style="margin-top:12px">
 <div class="row" style="margin-bottom:8px"><b class="grow" style="font-size:13.5px">This week</b>
 <span class="usub">${(S.days||[]).length} day${(S.days||[]).length===1?'':'s'} practised</span></div>
      ${weekStrip()}
 <p class="usub" style="font-size:11px;margin-top:9px;line-height:1.45">No streak to break here, miss a day and nothing is lost. Consistency is the goal, not fear.</p>
</div>
 <div class="card" style="margin-top:14px">
 <div class="row" style="justify-content:space-around;text-align:center">
 <div><div class="big" style="font-size:24px">${seen.length}</div><div class="usub">words met</div></div>
 <div><div class="big" style="font-size:24px;color:var(--good)">${byLv[3]+byLv[4]}</div><div class="usub">solid+</div></div>
 <div><div class="big" style="font-size:24px;color:var(--warn)">${byLv[1]}</div><div class="usub">shaky</div></div>
 <div><div class="big" style="font-size:24px">${UNITS.filter(u=>unitDone(u.id)).length}</div><div class="usub">units done</div></div>
</div></div>
 <div class="sec">Theme</div>
 <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
      ${themes.map(([id,n,c])=>`<button class="chip ${S.theme===id?'on':''}" style="flex-direction:column;gap:5px;padding:11px 4px" onclick="setTheme('${id}')"><span class="dot" style="width:20px;height:20px;background:${c}"></span><span style="font-size:10px;text-align:center;line-height:1.25">${n}</span></button>`).join('')}
</div>
 <div class="sec">${TN()}'s voice</div>
 <div class="card" id="voiceBox"></div>
 <div class="sec">Vocabulary book</div>
 <div class="pathRow" onclick="go('vocab')"><div class="badge" style="background:var(--tint)">📒</div><div class="grow"><div class="uname">All my words</div><div class="usub">${seen.length} words · browse by mastery</div></div><span style="color:var(--accent);font-weight:800">→</span></div>
 <div class="sec">Your words are yours, export anytime</div>
 <div class="row" style="gap:8px">
 <button class="chip" style="flex:1;justify-content:center" onclick="expObsidian()">Obsidian .md</button>
 <button class="chip" style="flex:1;justify-content:center" onclick="expCsv('anki')">Anki .txt</button>
 <button class="chip" style="flex:1;justify-content:center" onclick="expCsv('csv')">CSV</button>
</div>
 <div class="sec">Account</div>
 <div class="card" style="padding:12px 14px">
 <p class="usub" style="font-size:12px;line-height:1.5;margin-bottom:10px">Sprak has no account, everything lives on this device. Logging out clears it here, so export your words first if you want to keep them.</p>
 <button class="btn sec2" onclick="logout()">Log out</button>
</div>
 <div class="sec">About</div>
 <div class="card"><p style="font-size:12.5px;line-height:1.6;color:var(--muted)">Sprak v1 · ${esc(course().native)} A1 · ${esc(course().source || '')}. <span style="text-decoration:underline;cursor:pointer" onclick="if(confirm('Reset progress but keep your name and settings?')){S.units={};S.words={};S.scenarios={};S.stories={};S.mock={best:null,modules:null};save();go('home')}">Reset progress only</span></p></div>
  ${navBar('me')}</div>`;
  renderVoices();
};
function logout(){
  /* window.confirm is blocked in sandboxed embeds, so ask in the app instead */
  const d = document.createElement('div');
  d.className = 'modal';
  d.onclick = e => { if(e.target===d) d.remove(); };
  d.innerHTML = `<div class="inner">
    <b style="font-family:var(--font-head);font-size:17px;display:block">Log out of Sprak?</b>
    <p style="font-size:13px;line-height:1.6;margin-top:8px;color:var(--muted)">There is no account. Your progress lives on this device and will be cleared. Export your words first if you want to keep them.</p>
    <button class="btn" style="margin-top:14px;background:var(--bad);color:#fff" onclick="logoutConfirm()">Yes, log out</button>
    <button class="btn ghost" style="margin-bottom:0" onclick="this.closest('.modal').remove()">Cancel</button>
  </div>`;
  app.appendChild(d);
}
function logoutConfirm(){
  const m = app.querySelector('.modal'); if(m) m.remove();
  try{ speechSynthesis.cancel(); }catch(e){}
  try{ localStorage.removeItem('sprak'); localStorage.removeItem('fluently'); }catch(e){}
  store.mem = {};
  S = JSON.parse(JSON.stringify(DEFAULT));
  /* the session globals live outside S, so clear them too */
  SES = null; MT = null; SC = null;
  L1 = null; G = null;
  VB = {step:1};
  TCH = {uid:null, i:0, answered:{}};
  Object.keys(MICCB).forEach(k => delete MICCB[k]);
  app.dataset.theme = S.theme;
  go('onboard1');
  setTimeout(()=>toast('Logged out, see you soon!'), 150);
}

function setTheme(id){ S.theme=id; save(); app.dataset.theme=id; go('me'); toast('Theme: '+id+' ✓'); }
function renderVoices(){
  const box = document.getElementById('voiceBox'); if(!box) return;
  const list = targetVoices();
  if(!list.length){ box.innerHTML = `<p class="usub" style="font-size:12.5px;line-height:1.5">No ${esc(course().native)} voice found on this device yet. Tap anywhere and reopen this screen, some browsers load voices only after you interact. On Android, install one under Settings, Language and input, Text-to-speech.</p>`; return; }
  box.innerHTML = list.map(v=>{
    const on = deVoice && deVoice.name === v.name;
    return `<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line)">
 <div class="grow" style="min-width:0"><b style="font-size:13.5px">${esc(v.name)}</b>
 <div class="usub">${esc(v.lang)} · ${v.localService?'on-device':'cloud'}${on?' · in use':''}</div></div>
 <button class="ico" onclick="speak(TT().hello)" title="test">🔊</button>
 <button class="chip" style="padding:6px 11px;font-size:12px;${on?'border-color:var(--accent);background:var(--tint)':''}" onclick="chooseVoice('${esc(v.name).replace(/'/g,"\\'")}')">${on?'✓ In use':'Use'}</button>
</div>`;
  }).join('') + `<p class="usub" style="font-size:11.5px;margin-top:9px;line-height:1.45">${TN()} speaks ${esc(course().native)} with this voice, and her English explanations too. Voices differ per browser, and only ${esc(course().native)} voices are listed: the app never reads one language with another language's voice.</p>`;
}
function chooseVoice(name){
  S.voiceName = name; save(); pickVoice();
  go('me');
  setTimeout(()=>{ speak(TT().hello); toast(TN()+'\u2019s voice: '+name+' ✓'); }, 120);
}

SCREENS.progress = () => {
  const pct = a1Readiness(), st = skillStats();
  const open = UNITS.filter(u=>!u.locked), doneN = open.filter(u=>unitDone(u.id)).length;
  const checks = Object.values(S.units).filter(u=>u.check!==null).map(u=>u.check);
  const avg = checks.length ? Math.round(checks.reduce((a,b)=>a+b,0)/checks.length) : null;
  const bar = (l,v,sub) => `<div style="margin-top:11px"><div class="row"><span style="font-size:12.5px;font-weight:700" class="grow">${l}</span><span style="font-size:12.5px;font-weight:800;color:var(--accent)">${v}%</span></div>
 <div class="progress" style="margin-top:5px"><i style="width:${v}%"></i></div>
    ${sub?`<div class="usub" style="font-size:10.5px;margin-top:3px">${sub}</div>`:''}</div>`;
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('home')">←</button><div class="grow center"><b>Your A1 progress</b></div><span class="counter"></span></div>
 <div class="card center" style="padding:20px">
 <div style="display:flex;justify-content:center">${readyRing(96, pct)}</div>
 <b style="font-family:var(--font-head);font-size:17px;display:block;margin-top:10px">${pct}% ready for A1</b>
 <p class="sub" style="font-size:12.5px;margin-top:5px">${pct<25?'Early days, every unit moves this.':pct<60?'Coming along. Keep the units and reviews going.':pct<85?'Close. Sit the mock test to find the gaps.':'Exam-ready. Book the real thing.'}</p>
</div>
 <div class="sec">What this is made of</div>
 <div class="card">
      ${bar('Units completed', Math.round(doneN/Math.max(1,open.length)*100), doneN+' of '+open.length+' units · 45% of the score')}
      ${bar('Vocabulary mastery', st.vocab, st.words+' words met · 35% of the score')}
      ${bar('Mock test', S.mock.best!=null?Math.min(100,Math.round(S.mock.best/60*100)):0, S.mock.best!=null?('best '+S.mock.best+'/100 · pass is 60'):'not taken yet · 20% of the score')}
</div>
 <div class="sec">Your marks</div>
 <div class="card">
      ${avg!==null ? `<div class="row"><div class="grow"><b style="font-size:13.5px">Average lesson check</b><div class="usub">${checks.length} check${checks.length===1?'':'s'} taken</div></div>${gradeBadge(avg)}</div>`
        : '<p class="usub" style="font-size:12.5px">No checks taken yet, finish a lesson and ${TN()} will mark it.</p>'}
 <p class="usub" style="font-size:11px;margin-top:10px;line-height:1.5">${(course().grades||{}).legend || ''} A check counts as passed from 70%.</p>
</div>
 <div class="sec">This week</div>
 <div class="card">${weekStrip()}<p class="usub" style="font-size:11px;margin-top:9px">Practised ${(S.days||[]).length} day${(S.days||[]).length===1?'':'s'} in the last 30.</p></div>
  ${navBar('me')}</div>`;
};

SCREENS.vocab = () => {
  const seen = Object.keys(S.words).filter(id=>S.words[id].seen>0 && VOCAB[id]);
  const filt = S.vfilt||'all';
  const list = seen.filter(id=> filt==='all' || (filt==='shaky'&&S.words[id].lv===1) || (filt==='solid'&&S.words[id].lv>=3));
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('me')">←</button><div class="grow center"><b>📒 Vocabulary book</b></div><span class="counter">${list.length}</span></div>
 <div class="row" style="margin-bottom:10px">
      ${[['all','All'],['shaky','Shaky'],['solid','Solid+']].map(([f,l])=>`<button class="chip ${filt===f?'on':''}" onclick="S.vfilt='${f}';save();go('vocab')">${l}</button>`).join('')}
      ${list.filter(id=>S.words[id].lv===1).length?`<button class="btn small" style="margin-left:auto" onclick='startDrill(${JSON.stringify(seen.filter(id=>S.words[id].lv===1).slice(0,6))},{scr:"vocab"})'>Drill shaky</button>`:''}
</div>
 <div class="card" style="padding:6px 14px">
      ${list.length? list.sort((a,b)=>S.words[a].lv-S.words[b].lv).map(id=>{const v=VOCAB[id],w=S.words[id];return `<div class="row" style="padding:8px 0;border-bottom:1px solid var(--line)">
 <div class="grow"><b style="font-size:13.5px">${esc(v.de)}</b>${pyLine(v)}<div class="usub">${esc(v.en)}</div></div>
        ${sayIt(v.de, {en:v.en})}</div>`;}).join('') : '<p class="sub center" style="padding:20px">Nothing here yet, go learn!</p>'}
</div>
  ${navBar('me')}</div>`;
};

/* ---- exports ---- */
function dl(name, text, mime){
  const b = new Blob([text], {type:mime||'text/plain;charset=utf-8'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 3000);
}
function expObsidian(){
  const seen = Object.keys(S.words).filter(id=>S.words[id].seen>0 && VOCAB[id]);
  if(!seen.length) return toast('No words yet!');
  const slug = course().slug;
  let md = `---\ntags: [sprak, ${slug}, vocabulary]\ncluster: ${slug}\nexported: ${today()}\n---\n\n# My Sprak Words 🃏\n\nCompatible with the Obsidian Spaced Repetition plugin.\n\n#flashcards/${slug}/sprak\n\n`;
  seen.forEach(id=>{ const v=VOCAB[id], w=S.words[id]; md += `${v.de}${v.py?' ('+v.py+')':''}::${v.en}\n`; });
  md += `\n## Mastery snapshot\n\n| Word | English | Mastery |\n|---|---|---|\n`;
  seen.forEach(id=>{ const v=VOCAB[id], w=S.words[id]; md += `| ${v.de}${v.py?' ('+v.py+')':''} | ${v.en} | ${M_LABEL[w.lv]} |\n`; });
  dl(`Sprak ${course().native} Words.md`, md, 'text/markdown'); toast('Obsidian note downloaded ✓');
}
function expCsv(kind){
  const seen = Object.keys(S.words).filter(id=>S.words[id].seen>0 && VOCAB[id]);
  if(!seen.length) return toast('No words yet!');
  if(kind==='anki'){
    let t = seen.map(id=>{const v=VOCAB[id];return `${v.de}${v.py?'<br>'+v.py:''}\t${v.en}${v.ex?'<br><i>'+v.ex[0]+'</i>':''}`;}).join('\n');
    dl('sprak-anki.txt', t); toast('Anki import file downloaded ✓ (File → Import, tab-separated)');
  } else {
    let t = course().slug + ',english,mastery,misses\n' + seen.map(id=>{const v=VOCAB[id],w=S.words[id];return `"${v.de}","${v.en}",${M_LABEL[w.lv]},${w.miss}`;}).join('\n');
    dl('sprak-words.csv', t, 'text/csv'); toast('CSV downloaded ✓');
  }
}

/* ================= INIT ================= */
/* Someone who was learning Dutch when Dutch was parked opens German instead.
   Nothing of theirs is deleted: S.units and S.words are keyed by id and stay
   exactly as they were, so the day the pack ships again they carry on from
   where they stopped. parkedLang remembers which one to offer them back. */
if(S.lang && !langLive(S.lang)){ S.parkedLang = S.lang; S.lang = 'de'; save(); }
loadCourse(S.lang || 'de');   /* before the first render: every screen reads UNITS */
pickVoice();
app.dataset.theme = S.theme || 'sunny';
if(!S.onboarded) go('onboard1'); else go('home');
