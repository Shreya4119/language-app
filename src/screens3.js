/* ================= SKILLS HUB ================= */
SCREENS.skills = () => {
  const seen = Object.keys(S.words).filter(id=>S.words[id].seen>0 && VOCAB[id]);
  const sk = course().skillNames || {reading:'Reading', listening:'Listening', writing:'Writing', speaking:'Speaking'};
  app.innerHTML = `<div class="screen">
 <h1 style="font-size:23px">Skills Studio</h1>
 <p class="sub" style="margin-top:4px">${hasMock() ? 'The four exam skills, practice what\u2019s weakest.' : 'Practise whichever is weakest.'}</p>
 <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
        ${hasStories() ? `<div class="pathRow" onclick="go('stories')"><div class="badge" style="background:var(--tint)">📖</div><div class="grow"><div class="uname">${esc(sk.reading)}</div><div class="usub">Stories with tap-to-translate + questions</div></div><span style="color:var(--accent);font-weight:800">→</span></div>` : ''}
 <div class="pathRow ${seen.length>=5?'':'locked'}" ${seen.length>=5?`onclick="startDictSprint()"`:''}><div class="badge" style="background:var(--tint)">🎧</div><div class="grow"><div class="uname">${esc(sk.listening)}</div><div class="usub">${seen.length>=5?'Listen-and-type sprint from your words':'Learn 5+ words to unlock'}</div></div>${seen.length>=5?'<span style="color:var(--accent);font-weight:800">→</span>':'<span>🔒</span>'}</div>
 <div class="pathRow" onclick="go('writing')"><div class="badge" style="background:var(--tint)">✍️</div><div class="grow"><div class="uname">${esc(sk.writing)}</div><div class="usub">Exam-style short message (30-40 words)</div></div><span style="color:var(--accent);font-weight:800">→</span></div>
 <div class="pathRow" onclick="go('speaking')"><div class="badge" style="background:var(--tint)">🗣</div><div class="grow"><div class="uname">${esc(sk.speaking)}</div><div class="usub">Self-introduction drill (exam part 1)</div></div><span style="color:var(--accent);font-weight:800">→</span></div>
      ${gameList().length ? `<div class="pathRow" onclick="go('games')"><div class="badge" style="background:var(--tint)">🎲</div><div class="grow"><div class="uname">Games</div><div class="usub">${esc(gameList()[0].name)}${gameList().length>1?` and ${gameList().length-1} more`:''} · built from your own words</div></div><span style="color:var(--accent);font-weight:800">→</span></div>` : ''}
</div>
    ${hasScenes() ? `<div class="sec">Tip</div>
 <div class="card"><p style="font-size:13.5px;line-height:1.55">Scenario practice (💬 Scenes tab) trains listening <i>and</i> speaking at once, it's the closest thing to real life in the app.</p></div>` : ''}
  ${navBar('skills')}</div>`;
};
function startDictSprint(){
  const seen = shuffle(Object.keys(S.words).filter(id=>S.words[id].seen>0 && VOCAB[id] &&!VOCAB[id].de.includes(' '))).slice(0,8);
  const items = seen.map(id=>{ const v=VOCAB[id]; const w=v.de.replace(/^(der|die|das) /,''); return {t:'dict', id, q:'Type what you hear', tts:w, answer:w, why:`It was: ${v.de} (${v.en})`}; });
  SES = {kind:'drill', items, i:0, results:[], title:'Diktat sprint', back:{scr:'skills'}};
  go('session');
}

/* ================= STORIES ================= */
SCREENS.stories = () => {
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('skills')">←</button><div class="grow center"><b>Lesen · Stories</b></div><span class="counter"></span></div>
 <div style="display:flex;flex-direction:column;gap:10px">
    ${STORIES.map(st=>{
      const done = S.stories[st.id] && S.stories[st.id].score!=null;
      return `<div class="pathRow" onclick="go('story','${st.id}')"><div class="badge" style="background:${done?'var(--good)':'var(--hi)'};color:${done?'#fff':'var(--hi-ink)'}">${done?'✓':'A1'}</div>
 <div class="grow"><div class="uname">${st.title}</div><div class="usub">${done?`score ${S.stories[st.id].score}% · read again`:'2 short paragraphs · 3 questions'}</div></div><span style="color:var(--accent);font-weight:800">→</span></div>`;
    }).join('')}</div>
  ${navBar('skills')}</div>`;
};
SCREENS.story = (sid) => {
  const st = STORIES.find(x=>x.id===sid);
  const stst = S.stories[sid] = S.stories[sid] || {qi:0, ok:0, score:null};
  stst.qi = 0; stst.ok = 0;
  const para = st.text.map(words=>`<p style="font-size:16px;line-height:1.8;margin-bottom:12px">${
    words.map(w=>{ const clean=w; const g = st.gloss[clean];
      return g ? `<span class="glossw" onclick="toast('${esc(clean.replace(/[.,]/g,''))} = ${esc(g)}')">${esc(w)}</span>` : esc(w);
    }).join(' ')}</p>`).join('');
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('stories')">←</button><div class="grow center"><b>${st.title}</b></div><span class="counter" style="color:var(--good)">A1</span></div>
 <div class="card">${para}
 <div class="row" style="margin-top:6px">${speakBtns(st.text.flat().join(' '))}<span class="usub">listen to the story · tap dotted words</span></div>
</div>
 <div class="grow" style="min-height:14px"></div>
 <button class="btn" onclick="storyQ('${sid}')">Answer the questions →</button>
  ${navBar('skills')}</div>`;
};
function storyQ(sid){
  const st = STORIES.find(x=>x.id===sid), stst = S.stories[sid];
  if(stst.qi >= st.qs.length){
    stst.score = Math.round(stst.ok/st.qs.length*100); save(); bumpStreak(); dailyMark('input');
    toast(`Story done · ${stst.ok}/${st.qs.length} ✓`);
    return go('stories');
  }
  const q = st.qs[stst.qi];
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('story','${sid}')">←</button><div class="progress"><i style="width:${stst.qi/st.qs.length*100}%"></i></div><span class="counter">${stst.qi+1}/${st.qs.length}</span></div>
 <div class="sec">Question ${stst.qi+1}</div>
 <h2>${esc(q.q)}</h2>
 <div style="display:flex;flex-direction:column;gap:9px;margin-top:14px">
      ${q.opts.map((o,i)=>`<button class="chip" style="justify-content:flex-start;padding:14px 16px" id="opt${i}" onclick="storyA('${sid}',${i})">${esc(o)}</button>`).join('')}
</div>
 <div class="feedback" id="fb"></div>
 <div class="grow"></div>
 <button class="btn" id="nextBtn" style="visibility:hidden" onclick="storyNext('${sid}')">Continue</button>
  ${navBar('skills')}</div>`;
}
function storyA(sid, idx){
  const st = STORIES.find(x=>x.id===sid), stst=S.stories[sid], q=st.qs[stst.qi];
  const ok = idx===q.a;
  q.opts.forEach((o,i)=>{ const el=$('#opt'+i); el.classList.add(i===q.a?'correct':i===idx?'wrong':'ghosted'); el.onclick=null; });
  if(ok) stst.ok++;
  const fb=$('#fb'); fb.className='feedback '+(ok?'good':'bad'); fb.innerHTML=(ok?'<b>Richtig! ✓</b> ':'<b>Not quite.</b> ')+esc(q.why);
  $('#nextBtn').style.visibility='visible';
}
function storyNext(sid){ S.stories[sid].qi++; save(); storyQ(sid); }

/* ================= WRITING ================= */
SCREENS.writing = () => {
  const t = MOCKTEST.schreiben;
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('skills')">←</button><div class="grow center"><b>Schreiben · Kurze Nachricht</b></div><span class="counter"></span></div>
 <div class="card" style="background:var(--tint);border:none;box-shadow:none">
 <div class="tag" style="background:var(--card);display:inline-block;margin-bottom:8px">EXAM-STYLE TASK · 30-40 WORDS</div>
 <b style="font-size:14px">${esc(t.task)}</b>
      ${t.points.map(p=>`<div style="font-size:13px;margin-top:5px">• ${esc(p)}</div>`).join('')}
</div>
 <textarea id="wr" placeholder="Liebe Lena, …" style="margin-top:12px">${S.writingDraft?esc(S.writingDraft):''}</textarea>
 <div class="row" style="margin-top:6px"><span class="usub" id="wc">0 words</span><div class="grow"></div>
      ${['ä','ö','ü','ß'].map(c=>`<button class="chip" style="padding:6px 11px" onclick="const w=$('#wr');w.value+='${c}';w.focus();wCount()">${c}</button>`).join('')}
</div>
 <div class="sec">Self-check before submitting</div>
 <div class="card" style="padding:10px 14px">
      ${t.checklist.map((c,i)=>`<label class="row" style="padding:7px 0;font-size:13.5px;cursor:pointer"><input type="checkbox" id="ck${i}" style="width:18px;height:18px;accent-color:var(--accent)"> ${esc(c)}</label>`).join('')}
</div>
 <div id="model" style="display:none" class="card" style="margin-top:10px"><b style="font-size:13px">Model answer:</b><p style="font-size:13.5px;line-height:1.6;margin-top:6px;white-space:pre-line">${esc(t.model)}</p></div>
 <div class="grow" style="min-height:12px"></div>
 <div class="row">
 <button class="btn sec2" style="flex:1" onclick="$('#model').style.display='block';this.style.display='none'">Model answer</button>
 <button class="btn" style="flex:1" onclick="wrSubmit()">Done ✓</button>
</div>
  ${navBar('skills')}</div>`;
  const w = $('#wr');
  window.wCount = () => { const n = (w.value.trim().match(/\S+/g)||[]).length; $('#wc').textContent = n + ' / 30-40 words'; S.writingDraft = w.value; save(); };
  w.addEventListener('input', wCount); wCount();
};
function wrSubmit(){
  const checks = [0,1,2,3].filter(i=>$('#ck'+i) && $('#ck'+i).checked).length;
  const n = ($('#wr').value.trim().match(/\S+/g)||[]).length;
  if(n < 15){ toast('Keep going, aim for 30-40 words!'); return; }
  S.writingDone = true; save(); bumpStreak();
  toast(checks>=3 ? 'Strong message! ✍️ Great work.' : 'Done! Check the model answer to compare.');
  go('skills');
}

/* ================= SPEAKING ================= */
/* The self-introduction drill. It used to read MOCKTEST.sprechen directly,
   which is the German exam, so a Dutch learner was handed "Ich heiße" to
   practise. The prompts now come from the exam when the course has one, and
   otherwise from the learner's own introduction in Lesson 1, which every
   course has. Sentences are theirs, in their language, with their name. */
function speakingDrill(){
  const ex = hasMock() && MOCKTEST.sprechen;
  const mine = (typeof l1Lines === 'function') ? l1Lines() : [];
  const lines = mine.length ? mine.map(l=>l.de)
    : (ex && ex.model ? ex.model.split(' / ') : []);
  return {
    intro: ex ? ex.intro : `Say your introduction out loud, the whole way through, without reading ahead. This is the first thing anyone will ask you.`,
    cards: ex ? ex.cards : (course().first && course().first.lines || [])
      .map(L => L.ph || L.blank || (L.gender ? 'man / woman' : '')).filter(Boolean),
    lines
  };
}
SCREENS.speaking = () => {
  dailyMark('say');
  const t = speakingDrill();
  const sk = (course().skillNames || {}).speaking || 'Speaking';
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('skills')">←</button><div class="grow center"><b>${esc(sk)}</b></div><span class="counter"></span></div>
 <div class="card" style="background:var(--tint);border:none;box-shadow:none"><p style="font-size:13.5px;line-height:1.55">${esc(t.intro)}</p></div>
    ${t.cards.length ? `<div class="sec">Your cards, answer each out loud</div>
 <div class="wrap" style="margin-bottom:12px">${t.cards.map(c=>`<div class="chip" style="cursor:default">${esc(c)}</div>`).join('')}</div>` : ''}
    ${t.lines.length ? `<div class="card"><b style="font-size:13px">Your sentences (tap to hear):</b>
      ${t.lines.map(m=>`<div class="row" style="margin-top:8px"><button class="speak" style="width:34px;height:34px;min-width:34px;font-size:12px" onclick="speak('${esc(m).replace(/'/g,"\\'").replace(/…/g,'')}')">▶</button><span style="font-size:13.5px">${esc(m)}</span></div>`).join('')}
</div>` : `<div class="card"><p style="font-size:13.5px;line-height:1.55">Finish your first lesson and your own introduction appears here, in your words.</p></div>`}
 <div class="grow" style="min-height:12px"></div>
 <button class="btn" onclick="S.speakDone=true;save();bumpStreak();toast('Well said. Again tomorrow, a little faster.');go('skills')">I said it all out loud ✓</button>
  ${navBar('skills')}</div>`;
};

/* ================= SCENARIOS ================= */
SCREENS.scenes = () => {
  app.innerHTML = `<div class="screen">
 <h1 style="font-size:23px">Scenario practice</h1>
 <p class="sub" style="margin-top:4px">Real situations, real ${course().native}. Wrong answers don't fail you, locals just react like locals.</p>
 <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
    ${SCENARIOS.map(sc=>{
      const stt = S.scenarios[sc.id];
      const needUnit = UNITS.find(u=>u.id===sc.needs);
      const open =!sc.needs || unitState(sc.needs).lesson || unitDone(sc.needs);
      return `<div class="pathRow ${open?'':'locked'}" ${open?`onclick="scStart('${sc.id}')"`:''}>
 <div class="badge" style="background:${stt&&stt.done?'var(--good)':'var(--hi)'};color:${stt&&stt.done?'#fff':'var(--hi-ink)'}">${stt&&stt.done?'✓':'💬'}</div>
 <div class="grow"><div class="uname">${sc.title}</div><div class="usub">${open?sc.sub+(stt&&stt.done?' · replay':''):'unlocks with '+(needUnit?needUnit.title:'later units')}</div></div>
        ${open?'<span style="color:var(--accent);font-weight:800">→</span>':'<span>🔒</span>'}</div>`;
    }).join('')}</div>
 <div class="sec">Assist level</div>
 <div class="row">
 <button class="chip ${!S.noHints?'on':''}" onclick="S.noHints=false;save();go('scenes')">Hints ON (English shown)</button>
 <button class="chip ${S.noHints?'on':''}" onclick="S.noHints=true;save();go('scenes')">${esc(course().native)} only</button>
</div>
  ${navBar('scenes')}</div>`;
};
let SC = null;
function scStart(id){
  const sc = SCENARIOS.find(x=>x.id===id);
  SC = {sc, node:sc.start, log:[], good:0, total:0};
  go('scene');
}
SCREENS.scene = () => {
  const {sc} = SC, node = sc.nodes[SC.node];
  const hints =!S.noHints;
  const logHtml = SC.log.map(l => l.who==='npc'
    ? `<div class="bubble npc"><div class="row" style="gap:8px;align-items:flex-start"><span>${esc(l.de)}</span><button class="speak" style="width:28px;height:28px;min-width:28px;font-size:10px" onclick="speak('${esc(l.de).replace(/'/g,"\\'")}')">▶</button></div>${hints?`<div class="en">${esc(l.en)}</div>`:''}</div>`
    : `<div class="bubble me">${esc(l.de)}</div>`).join('');
  const current = `<div class="bubble npc"><div class="row" style="gap:8px;align-items:flex-start"><span>${esc(node.npc[0])}</span><button class="speak" style="width:28px;height:28px;min-width:28px;font-size:10px" onclick="speak('${esc(node.npc[0]).replace(/'/g,"\\'")}')">▶</button></div>${hints?`<div class="en">${esc(node.npc[1])}</div>`:''}</div>`;
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('scenes')">←</button><div class="grow center"><b>${sc.title}</b><div class="usub">${sc.place}</div></div>
 <button class="chip" style="padding:6px 10px;font-size:11px" onclick="S.noHints=!S.noHints;save();go('scene')">${hints?'DE only':'Hints'}</button></div>
 <div style="display:flex;flex-direction:column;gap:10px;padding-bottom:8px">${logHtml}${current}</div>
    ${node.done ? `
 <div class="card" style="margin-top:14px;border-color:var(--good)"><div class="row"><span class="confetti" style="font-size:22px"></span><div><b style="font-size:14px">Geschafft!</b><p style="font-size:13px;line-height:1.5;margin-top:4px">${esc(node.win)}</p></div></div>
 <div class="usub" style="margin-top:8px">Smooth replies: ${SC.good}/${SC.total}</div></div>
 <div class="grow"></div>
 <button class="btn" onclick="scFinish()">Finish scenario ✓</button>`
    : `
 <div class="sec" style="margin-top:14px">Your reply, say it out loud, then tap</div>
 <div style="display:flex;flex-direction:column;gap:8px">
      ${node.choices.map((c,i)=>`<button class="chip" style="justify-content:flex-start;text-align:left;padding:13px 15px;line-height:1.4" onclick="scChoose(${i})"><div><div>${esc(c.de)}</div>${hints&&c.en?`<div class="usub" style="font-weight:500">${esc(c.en)}</div>`:''}</div></button>`).join('')}
</div>`}
  ${navBar('scenes')}</div>`;
  setTimeout(()=>speak(node.npc[0]), 300);
  window.scrollTo(0, document.body.scrollHeight);
};
function scChoose(i){
  const node = SC.sc.nodes[SC.node], c = node.choices[i];
  SC.log.push({who:'npc', de:node.npc[0], en:node.npc[1]});
  SC.log.push({who:'me', de:c.de});
  SC.total++; if(c.good) SC.good++;
  if(c.react) SC.log.push({who:'npc', de:c.react[0], en:c.react[1]});
  SC.node = c.next;
  go('scene');
}
function scFinish(){
  const st = S.scenarios[SC.sc.id] = S.scenarios[SC.sc.id] || {};
  st.done = true; st.goodPct = Math.round(SC.good/Math.max(1,SC.total)*100);
  save(); bumpStreak(); go('scenes');
}

/* ================= CULTURE ================= */
SCREENS.culture = () => {
  dailyMark('input');
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('home')">←</button><div class="grow center"><b>🧭 Culture corner</b></div><span class="counter"></span></div>
 <p class="sub" style="margin:-4px 0 12px">A small cultural heads-up, the must-know things before (and after) you arrive in a new country. Nobody tells you these; ${TN()} does.</p>
 <div style="display:flex;flex-direction:column;gap:10px">
    ${CULTURE.map(c=>`<div class="card"><b style="font-size:14.5px">${esc(c.t)}</b><p style="font-size:13.5px;line-height:1.55;margin-top:5px;color:var(--muted)">${esc(c.b)}</p></div>`).join('')}
</div>
  ${navBar('home')}</div>`;
};
