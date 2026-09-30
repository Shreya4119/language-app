/* ================= ONBOARDING ================= */
/* onboard1 (language) · meetTeacher · onboard3 all live in avatar.js */

function toggleStage(n){ S.openStages = Object.assign({0:true}, S.openStages||{}); S.openStages[n] = !(S.openStages[n]!==undefined ? S.openStages[n] : n===0); save(); go('home'); }
function obDone(level){
  S.onboarded = true;
  if(level>=1){ ['hallo','tschuess','bitte','danke','ja','nein'].forEach(id=>{ const w=wstate(id); w.lv=2; w.seen=1; w.due=Date.now()+864e5; }); }
  if(level>=2){ ['eins','zwei','drei','montag','rot','ich','du'].forEach(id=>{ const w=wstate(id); w.lv=3; w.seen=1; w.due=Date.now()+3*864e5; }); }
  save(); go('home');
  if(level===0){ const first = UNITS.find(u=>!u.planned);
    setTimeout(()=>toast(course().gogo + ' Start with ' + (first ? first.title : 'the first lesson')), 400); }
}

/* ================= HOME ================= */
SCREENS.home = () => {
  const due = dueWords();
  const name = S.name ? `, ${esc(S.name)}` : '';
  const greet = courseGreet();
  const nextUnit = UNITS.find(u=>!u.locked && unlocked(u) &&!unitDone(u.id));
  const cult = CULTURE.length ? CULTURE[new Date().getDate() % CULTURE.length] : null;
  const msReady = milestoneReady();
  const s0total = UNITS.filter(x=>x.stage===0).length;
  const s0doneN = UNITS.filter(x=>x.stage===0 && unitDone(x.id)).length;
  const s1ready = stage0Done() >= 3;
  const s1open = (S.s1open === undefined) ? s1ready : S.s1open;
  const revCard = (typeof revisionCard==='function') ? revisionCard() : '';
  const openStages = S.openStages || {0:true};
  let rows = '';
  STAGES.forEach(stg => {
    const us = UNITS.filter(u=>u.stage===stg.n);
    if(!us.length) return;
    const built = us.filter(u=>!u.planned);
    const doneN = built.filter(u=>unitDone(u.id)).length;
    const open  = openStages[stg.n] !== undefined ? openStages[stg.n] : (stg.n===0);
    const reached = stg.n===0 || built.some(u=>unlocked(u)) || doneN>0;
    const pct = built.length ? Math.round(doneN/built.length*100) : 0;
    rows += `<div class="card" style="padding:12px 14px;margin-bottom:${open?'9px':'8px'};cursor:pointer;${reached?'':'opacity:.72'}" onclick="toggleStage(${stg.n})">
      <div class="row" style="gap:11px">
        <div style="width:38px;height:38px;min-width:38px;border-radius:19px;background:${doneN===built.length&&built.length?'var(--good)':reached?'var(--hi)':'var(--line)'};color:${doneN===built.length&&built.length?'#fff':reached?'var(--hi-ink)':'var(--muted)'};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px">${doneN===built.length&&built.length?'✓':reached?stg.n:'🔒'}</div>
        <div class="grow" style="min-width:0">
          <b style="font-size:14.5px">Stage ${stg.n} · ${esc(stg.name)}</b>
          <div class="usub" style="line-height:1.4">${esc(stg.job)}</div>
          <div class="usub" style="font-size:11px;margin-top:3px">${doneN}/${built.length} done${us.length>built.length?` · ${us.length-built.length} in build`:''}</div>
          ${built.length?`<div class="progress" style="margin-top:6px;height:5px"><i style="width:${pct}%"></i></div>`:''}
        </div>
        <span style="font-size:13px;color:var(--muted);font-weight:800">${open?'▾':'▸'}</span>
      </div></div>`;
    if(!open) return;
    us.forEach(u=>{
      const st = unitState(u.id), isOpen = !u.planned && unlocked(u), done = unitDone(u.id);
      const badge = done ? `<div class="badge" style="background:var(--good);color:#fff">✓</div>`
        : isOpen ? `<div class="badge" style="background:var(--hi);color:var(--hi-ink)">${u.icon}</div>`
        : `<div class="badge" style="background:var(--line);color:var(--muted)">${u.planned?'…':'🔒'}</div>`;
      const sub = done ? `check ${st.check}% · tap to revisit`
        : u.planned ? `${esc(u.concept||u.sub)}`
        : !isOpen ? (u.brief&&u.brief.needs ? 'after '+esc(u.brief.needs) : 'locked')
        : st.lesson ? 'lesson done, take the check!' : u.sub;
      const openAct = u.id==='s0a'
        ? (!st.lesson ? `startLesson1()` : (st.check===null || st.check<70 ? `startCheck('s0a')` : `startLesson1()`))
        : `go('unit','${u.id}')`;
      rows += `<div class="pathRow ${isOpen?'':'locked'}" ${isOpen?`onclick="${openAct}"`:(u.planned?`onclick="toast('Coming soon: ${esc(u.title).replace(/'/g,'')}')"`:'')} style="margin-bottom:9px${u.planned?';opacity:.62':''}">
        ${badge}<div class="grow" style="min-width:0"><div class="uname">${esc(u.title)}</div><div class="usub">${sub}</div></div>
        ${isOpen&&!done?`<span style="color:var(--accent);font-weight:800">→</span>`:(u.planned?`<span style="font-size:10px;color:var(--muted);font-weight:800">SOON</span>`:'')}</div>`;
    });
  });
  app.innerHTML = `<div class="screen">
 <div class="row" style="margin-bottom:14px">
 <div class="grow"><h1 style="font-size:23px">${greet}${name}!</h1><div class="usub">${esc(course().native)} · ${skillStats().words} words met</div></div>
 <div style="text-align:center;cursor:pointer" onclick="go('progress')">
        ${readyRing(56, a1Readiness())}
 <div class="usub" style="font-size:9.5px;font-weight:800;margin-top:2px">A1 READY</div>
</div>
</div>
    ${(typeof voiceWarning==='function') ? voiceWarning() : ''}
    ${revCard}
 <div class="hero" style="position:relative;overflow:hidden">
 <div style="position:absolute;right:0;bottom:-12px">${avatarSVG((S.langPicked||S.onboarded)?'de':'neutral','warm',84)}</div>
 <div style="font-size:12px;font-weight:800;opacity:.8">TODAY'S PLAN</div>
 <div style="font-family:var(--font-head);font-weight:800;font-size:18px;margin:6px 80px 12px 0">${due.length ? `${due.length} word${due.length>1?'s':''} to review` : 'No reviews due'}${nextUnit ? `, then: ${nextUnit.title}` : due.length ? '' : ' · all caught up!'}</div>
 <div class="row">
        ${due.length?`<button class="btn small" style="background:var(--hi);color:var(--hi-ink)" onclick="startReview()">Review · ~${Math.ceil(due.length/3)} min</button>`:''}
        ${nextUnit?`<button class="btn small" style="background:rgba(255,255,255,.22);color:var(--hero-ink)" onclick="${nextUnit.id==='s0a' ? (unitState('s0a').lesson?`startCheck('s0a')`:`startLesson1()`) : `go('unit','${nextUnit.id}')`}">${unitState(nextUnit.id).lesson?'Take the check':'Start lesson'}</button>`:''}
</div>
</div>
    ${msReady &&!milestonePassed() ? `<div class="card" style="margin-top:12px;border-color:var(--warn);cursor:pointer" onclick="go('milestone')"><div class="row"><span style="font-size:20px">📊</span><div class="grow"><b style="font-size:14px">Milestone 1 report is ready</b><div class="usub">See where you really stand → unlock Unit 4</div></div><span style="color:var(--accent);font-weight:800">→</span></div></div>` : ''}
    ${milestonePassed() &&!S.milestoneSeen ? `<div class="card" style="margin-top:12px;border-color:var(--good);cursor:pointer" onclick="go('milestone')"><div class="row"><span class="confetti" style="font-size:20px"></span><div class="grow"><b style="font-size:14px">Milestone 1 passed!</b><div class="usub">Unit 4 unlocked, see your report</div></div></div></div>` : ''}
    ${rows}
    ${cult ? `<div class="card" style="margin-top:10px;cursor:pointer" onclick="go('culture')">
 <div class="row"><span style="font-size:20px">🧭</span><div class="grow"><b style="font-size:13.5px">Culture corner</b>
 <div class="usub">A small heads-up, the things worth knowing before you arrive</div>
 <div style="font-size:12px;color:var(--accent);font-weight:700;margin-top:3px">Today: ${esc(cult.t)}</div></div>
 <span style="color:var(--accent);font-weight:800">→</span></div>
</div>` : ''}
    ${(()=>{ const dn = UNITS.filter(u=>unitState(u.id).lesson).length; if(!dn) return '';
      const pend = (typeof handPending==='function') ? handPending().length : 0;
      return `<div class="card" style="margin-top:10px;cursor:pointer${pend?';border-color:var(--hi)':''}" onclick="go('notebook')">
        <div class="row"><span style="font-size:20px">✎</span><div class="grow"><b style="font-size:13.5px">My notes</b>
        <div class="usub">Grammar, culture and every word from your ${dn} finished lesson${dn===1?'':'s'}</div>
        ${pend?`<div style="font-size:12px;color:var(--accent);font-weight:700;margin-top:3px">${esc((typeof pickNudge==='function' && pickNudge('hand')) || (pend+' still to copy out by hand'))}</div>`:''}</div>
        <span style="color:var(--accent);font-weight:800">→</span></div></div>`; })()}
  ${navBar('home')}</div>`;
};

/* ================= UNIT DETAIL =================
   Before the lesson this page says one line about what you will learn and
   what you need first. Nothing else: the teaching happens in the lesson.
   After the lesson it becomes the revisit page, with the notes and words. */
SCREENS.unit = (uid) => {
  const u = UNITS.find(x=>x.id===uid), st = unitState(uid);
  const words = (u.vocab||[]).filter(id=>VOCAB[id]);
  const br = u.brief || {};
  const steps = (u.teach||[]).length || (uid==='s0f' ? (typeof VB_STEPS!=='undefined'?VB_STEPS.length:6) : 0);

  const head = `<div class="topbar"><button class="x" onclick="go('home')">←</button>
    <div class="grow center"><b>${u.stage===1?'Unit '+u.icon+' · ':''}${esc(u.title)}</b></div>
    <span class="counter">${words.length} words</span></div>`;

  if(!st.lesson){
    app.innerHTML = `<div class="screen">${head}
      ${teacherBox(br.say || 'Here is vhat today is about.', {expr:'warm', size:92})}
      <div class="card" style="margin-bottom:10px">
        <div class="tlabel">IN THIS LESSON</div>
        <b style="font-family:var(--font-head);font-size:16.5px;display:block;line-height:1.42">${esc(br.will || u.sub || '')}</b>
        <div class="usub" style="margin-top:8px">${steps?steps+' steps with '+TN()+' · ':''}${words.length} new words</div>
      </div>
      <div class="card" style="margin-bottom:10px;background:var(--tint);border:none;box-shadow:none">
        <div class="row" style="align-items:flex-start;gap:9px">
          <span style="font-size:15px;line-height:1.3">📌</span>
          <span style="flex:1;min-width:0;font-size:12.5px;line-height:1.55">
            <span style="color:var(--muted)">You need first:</span>
            <b>${esc(br.needs || 'Nothing. You can start here.')}</b></span>
        </div>
      </div>
      <div class="grow" style="min-height:14px"></div>
      <button class="btn" onclick="startLesson('${uid}')">Start lesson</button>
    ${navBar('home')}</div>`;
    return;
  }

  app.innerHTML = `<div class="screen">${head}
    <div class="card" style="margin-bottom:10px;border-color:var(--good)">
      <b style="font-size:14px">✓ Lesson done</b>
      <div class="usub" style="margin-top:3px">${st.check===null?'Now take the check.':'Best check: '+st.check+'%'}</div></div>
    ${u.grammar?`<div class="sec">Grammar · ${esc(u.grammar.title)}</div>
      <div class="card" style="margin-bottom:10px"><div class="gbody">${u.grammar.body}</div></div>`:''}
    ${u.culture?`<div class="sec">Culture · ${esc(u.culture.title)}</div>
      <div class="card" style="margin-bottom:10px;background:var(--tint);border:none"><div class="gbody">${u.culture.body}</div></div>`:''}
    <div class="sec">Vocabulary in this unit</div>
    <div class="card" style="padding:8px 14px">
      ${words.slice(0,6).map(id=>{const v=VOCAB[id],w=S.words[id];return `<div class="row" style="padding:7px 0;border-bottom:1px solid var(--line)"><span style="min-width:0"><b style="font-size:14px">${esc(v.de)}</b>${pyLine(v)}</span><span class="grow usub" style="margin-left:8px">${esc(v.en)}</span><span class="mastery ${w?M_CLASS[w.lv]:'m-new'}">${w?M_LABEL[w.lv]:'new'}</span></div>`;}).join('')}
      ${words.length>6?`<div class="usub center" style="padding:8px 0">+ ${words.length-6} more</div>`:''}
    </div>
    <div class="grow" style="min-height:14px"></div>
    <button class="btn ${st.check===null||st.check<70?'':'sec2'}" onclick="startCheck('${uid}')">${st.check===null?'Take the lesson check · 8 questions':st.check<70?`Retry check (last: ${st.check}%)`:'Redo check (best: '+st.check+'%)'}</button>
    <button class="btn sec2" onclick="go('notes','${uid}')">Quick notes</button>
    <button class="btn ghost" onclick="startLesson('${uid}')">Replay lesson</button>
  ${navBar('home')}</div>`;
};
