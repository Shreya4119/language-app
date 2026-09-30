/* ================= SESSION RUNNER (lesson / check / review / drill) ================= */
let SES = null;
function startLesson(uid){
  if(uid === (course().first||{}).unit && !hasTeach(UNITS.find(x=>x.id===uid))) return startLesson1(uid);
  if(uid==='s0f') return startVerbs();
  const uu = UNITS.find(x=>x.id===uid);
  if(hasTeach(uu)) return startTeach(uid);
  const u = UNITS.find(x=>x.id===uid);
  const L = buildLesson(u);
  const items = L.teach.map(id=>({t:'teach', id})).slice(0,10).concat(L.items);
  SES = {kind:'lesson', uid, items, i:0, results:[], title:u.title, intro:L.intro};
  go('session');
}
function startCheck(uid){
  const u = UNITS.find(x=>x.id===uid);
  SES = {kind:'check', uid, items:buildCheck(u), i:0, results:[], title:'Lesson check'};
  go('session');
}
function startReview(){
  const ids = dueWords();
  const items = ids.map((id,i)=>{
    const v = VOCAB[id]; const others = pickOthers(Object.keys(VOCAB).filter(k=>S.words[k]&&S.words[k].seen>0||Math.random()<0.1), id, 2).map(o=>VOCAB[o]);
    return i%2===0
      ? {t:'mc', q:`Review: \u201e${withPyText(v)}" means…`, tts:v.de, opts:shuffle([v.en,...others.map(o=>o.en)]), a:v.en, id, why:`${v.de} = ${v.en}`}
      : {t:'mc', q:`Review: "${v.en}" in ${course().native}?`, opts:shuffle([v.de,...others.map(o=>o.de)]), a:v.de, id, say:true, why:`${v.en} → ${v.de}`};
  });
  SES = {kind:'review', items, i:0, results:[], title:'Daily review'};
  go('session');
}
function startDrill(ids, back){
  const items = ids.flatMap(id=>{
    const v = VOCAB[id]; const others = pickOthers(Object.keys(VOCAB), id, 2).map(o=>VOCAB[o]);
    const arr = [{t:'mc', q:`\u201e${withPyText(v)}" means…`, tts:v.de, opts:shuffle([v.en,...others.map(o=>o.en)]), a:v.en, id, why:`${v.de} = ${v.en}`},
                 {t:'mc', q:`"${v.en}" in ${course().native}?`, opts:shuffle([v.de,...others.map(o=>o.de)]), a:v.de, id, say:true, why:`${v.en} → ${v.de}`}];
    if(!v.de.includes(' ')) arr.push({t:'dict', id, q:'Type what you hear', tts:v.de.replace(/^(der|die|das) /,''), answer:v.de.replace(/^(der|die|das) /,''), why:`It was: ${v.de}`});
    return arr;
  });
  SES = {kind:'drill', items:shuffle(items).slice(0,8), i:0, results:[], title:'Quick drill', back};
  go('session');
}

SCREENS.session = () => {
  const s = SES;
  if(s.i === 0 && s.intro &&!s.introShown){
    s.introShown = true;
    const u = UNITS.find(x=>x.id===s.uid) || {};
    const br = u.brief || {};
    const nWords = (u.vocab||[]).filter(id=>VOCAB[id]).length;
    app.innerHTML = `<div class="screen noNav">
 <div class="topbar"><button class="x" onclick="sesQuit()">✕</button><div class="grow center"><b>${esc(s.title)}</b></div><span class="counter"></span></div>
      ${teacherBox(br.say || 'Here is vhat today is about.', {expr:'warm', size:92})}
      <div class="card" style="margin-bottom:10px">
        <div style="font-size:10.5px;font-weight:800;letter-spacing:.05em;color:var(--accent)">IN THIS LESSON</div>
        <b style="font-family:var(--font-head);font-size:16px;display:block;margin-top:5px;line-height:1.4">${esc(br.will || u.sub || '')}</b>
        <div class="usub" style="margin-top:7px">${nWords} new word${nWords===1?'':'s'}</div>
        ${br.needs ? `<div style="margin-top:9px;border-top:1px solid var(--line);padding-top:9px;font-size:12.5px">
          <span style="color:var(--muted)">You will need first:</span> <b>${esc(br.needs)}</b></div>` : ''}
      </div>
      <div class="grow" style="min-height:8px"></div>
      <button class="btn" onclick="go('session')">Start →</button>
</div>`;
    return;
  }
  if(s.i >= s.items.length){ return sesFinish(); }
  const it = s.items[s.i];
  const pct = Math.round(s.i / s.items.length * 100);
  let body = '';
  if(it.t === 'teach'){
    const v = VOCAB[it.id];
    body = `<div class="grow" style="display:flex;flex-direction:column;justify-content:center;gap:14px">
 <div class="card center" style="padding:30px 18px">
 <div class="tag" style="display:inline-block;margin-bottom:14px">NEW WORD</div>
 <div class="big" style="font-size:30px">${esc(v.de)}</div>
        ${v.py?`<div class="py" style="font-size:15px;margin-top:4px">${esc(v.py)}</div>`:''}
 <div class="sub" style="margin-top:6px;font-size:16px">${esc(v.en)}</div>
 <div style="display:flex;justify-content:center;margin-top:16px">${sayIt(v.de, {en:v.en})}</div>
 <div class="usub" style="font-size:11px;margin-top:6px">🔊 English → ${esc(course().native)} · 🎤 say it back</div>
        ${v.ex?`<div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--line);font-size:14px"><i>${esc(v.ex[0])}</i><div class="usub" style="margin-top:3px">${esc(v.ex[1])}</div></div>`:''}
</div></div>
 <button class="btn" onclick="sesNext(true,true)">Next →</button>`;
    setTimeout(()=>sayEnDe(v.de, v.en), 350);
  }
  else if(it.t === 'mc'){
    body = `<div class="grow" style="padding-top:8px">
 <h2 style="margin-bottom:4px">${esc(it.q)}</h2>
      ${it.hint?`<div class="row" style="align-items:flex-start;gap:8px;margin-top:9px;padding:9px 11px;border-radius:12px;background:var(--tint)">
        <span style="font-size:14px;line-height:1.2">💡</span>
        <span style="flex:1;min-width:0;font-size:12.5px;line-height:1.5;color:var(--ink)">${esc(it.hint)}</span></div>`:''}
      ${it.tts?`<div style="margin:10px 0">${sayIt(it.tts)}</div>`:''}
 <div style="display:flex;flex-direction:column;gap:9px;margin-top:16px">
        ${it.opts.map((o,idx)=>`<button class="chip" style="justify-content:flex-start;padding:14px 16px" id="opt${idx}" onclick="sesAnswer(${idx})">${esc(o)}</button>`).join('')}
</div>
 <div class="feedback" id="fb"></div></div>
 <button class="btn" id="nextBtn" style="visibility:hidden" onclick="sesNext()">Continue</button>`;
    if(it.tts) setTimeout(()=>speak(it.tts), 300);
  }
  else if(it.t === 'dict'){
    body = `<div class="grow" style="padding-top:8px">
 <h2>${esc(it.q)}</h2>
 <div class="hero" style="margin:14px 0;display:flex;align-items:center;gap:14px;padding:20px">
 <button class="speak" style="width:60px;height:60px;min-width:60px;background:var(--hi);color:var(--hi-ink);font-size:20px" onclick="speak('${it.tts.replace(/'/g,"\\'")}')">▶</button>
 <div><div style="font-weight:800;font-family:var(--font-head)">Listen carefully</div><div style="font-size:12.5px;opacity:.85">Tap to replay · <span style="text-decoration:underline;cursor:pointer" onclick="speak('${it.tts.replace(/'/g,"\\'")}',0.55)">play slow</span></div></div>
</div>
 <input type="text" id="dictIn" placeholder="Type the word you hear…" autocomplete="off" autocapitalize="off">
 <div class="row" style="margin-top:10px;gap:7px">${['ä','ö','ü','ß'].map(c=>`<button class="chip" style="min-width:50px;justify-content:center" onclick="insChar('${c}')">${c}</button>`).join('')}<span class="usub" style="margin-left:4px">tap to insert</span></div>
 <div class="feedback" id="fb"></div></div>
 <button class="btn" id="checkBtn" onclick="sesDict()">Check</button>
 <button class="btn" id="nextBtn" style="display:none" onclick="sesNext()">Continue</button>`;
    setTimeout(()=>{ speak(it.tts); const el=$('#dictIn'); el&&el.focus(); }, 350);
  }
  else if(it.t === 'wb'){
    const words = it.sent.split(' ');
    s.wb = {target: words, placed: [], bank: shuffle(words.concat(it.distract||[]))};
    body = `<div class="grow" style="padding-top:8px">
 <h2>${esc(it.q)}</h2>
 <div class="card" style="min-height:64px;margin:14px 0;background:var(--tint);border:none;box-shadow:none"><div class="wrap" id="placed"></div></div>
 <div class="wrap" id="bank"></div>
 <div class="feedback" id="fb"></div></div>
 <button class="btn" id="checkBtn" onclick="sesWb()">Check</button>
 <button class="btn" id="nextBtn" style="display:none" onclick="sesNext()">Continue</button>`;
  }
  app.innerHTML = `<div class="screen noNav">
 <div class="topbar"><button class="x" onclick="sesQuit()">✕</button><div class="progress"><i style="width:${pct}%"></i></div><span class="counter">${s.i+1}/${s.items.length}</span></div>
    ${body}</div>`;
  if(it.t==='wb') wbRender();
  if(it.t==='dict'){ const el=$('#dictIn'); el&&el.addEventListener('keydown',e=>{ if(e.key==='Enter') sesDict(); }); }
};
function insChar(c){ const el=$('#dictIn'); if(el){ el.value+=c; el.focus(); } }
function wbRender(){
  const s=SES, w=s.wb;
  $('#placed').innerHTML = w.placed.map((word,i)=>`<button class="chip on" onclick="wbTake(${i})">${esc(word)}</button>`).join('') || '<span class="usub" style="padding:6px">tap words below in order…</span>';
  $('#bank').innerHTML = w.bank.map((word,i)=> w.usedIdx&&w.usedIdx.includes(i) ? `<button class="chip ghosted">${esc(word)}</button>` : `<button class="chip" onclick="wbPut(${i})">${esc(word)}</button>`).join('');
}
function wbPut(i){ const w=SES.wb; w.usedIdx=w.usedIdx||[]; if(w.usedIdx.includes(i))return; w.usedIdx.push(i); w.placed.push(w.bank[i]); wbRender(); }
function wbTake(pi){ const w=SES.wb; const word=w.placed.splice(pi,1)[0]; const bi=w.bank.findIndex((b,idx)=>b===word&&w.usedIdx.includes(idx)); if(bi>-1) w.usedIdx.splice(w.usedIdx.indexOf(bi),1); wbRender(); }
function norm(x){ return x.toLowerCase().trim().replace(/[.,!?]/g,''); }

function sesAnswer(idx){
  const s=SES, it=s.items[s.i];
  const chosen = it.opts[idx], ok = chosen === it.a;
  it.opts.forEach((o,i2)=>{ const el=$('#opt'+i2); el.classList.add(o===it.a?'correct': i2===idx?'wrong':'ghosted'); el.onclick=null; });
  const fb = $('#fb'); fb.className = 'feedback ' + (ok?'good':'bad');
  const german = it.say ? it.a : (it.tts || null);
  fb.innerHTML = (ok?'<b>Richtig! ✓</b> ':'<b>Not quite.</b> ') + esc(it.why||'')
    + (german ? `<div class="row" style="margin-top:9px;gap:8px"><b style="font-size:14px">${esc(german)}</b>${sayIt(german)}</div>` : '');
  if(ok && it.say){ speak(it.a); }
  if(!ok && it.a && /[äöüß]|^[A-ZÄÖÜ]|der |die |das /.test(it.a)) speak(it.a);
  sesRecord(ok);
  $('#nextBtn').style.visibility='visible';
}
function sesDict(){
  const s=SES, it=s.items[s.i];
  const val = norm($('#dictIn').value), ans = norm(it.answer);
  const ok = val === ans;
  const fb=$('#fb'); fb.className='feedback '+(ok?'good':'bad');
  fb.innerHTML = (ok ? '<b>Perfekt! ✓</b> '+esc(it.answer) : `<b>Not quite.</b> ${esc(it.why||('It was: '+it.answer))}${val&&levDist(val,ans)<=2?', so close!':''}`)
    + `<div class="row" style="margin-top:9px;gap:8px"><b style="font-size:14px">${esc(it.answer)}</b>${sayIt(it.answer)}</div>`;
  const w = wstate(it.id); w.dict=true; if(ok) w.dictOk=(w.dictOk||0)+1;
  sesRecord(ok);
  $('#checkBtn').style.display='none'; $('#nextBtn').style.display='flex';
}
function levDist(a,b){ if(Math.abs(a.length-b.length)>6) return 999; const m=[...Array(a.length+1)].map((_,i)=>[i,...Array(b.length).fill(0)]); for(let j=0;j<=b.length;j++)m[0][j]=j; for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]!==b[j-1]?1:0)); return m[a.length][b.length]; }
function sesWb(){
  const s=SES, it=s.items[s.i];
  const ok = norm(s.wb.placed.join(' ')) === norm(it.sent);
  const fb=$('#fb'); fb.className='feedback '+(ok?'good':'bad');
  fb.innerHTML = (ok ? '<b>Richtig! ✓</b> '+esc(it.sent) : `<b>Not quite.</b> Correct: <b>${esc(it.sent)}</b>${it.why?'<br>'+esc(it.why):''}`)
    + `<div class="row" style="margin-top:9px;gap:8px">${sayIt(it.sent, {loose:true})}<span class="usub">say it back</span></div>`;
  speak(it.sent);
  sesRecord(ok);
  $('#checkBtn').style.display='none'; $('#nextBtn').style.display='flex';
}
function sesRecord(ok){
  const s=SES, it=s.items[s.i];
  s.results.push({id:it.id, ok, q:it.q, why:it.why, t:it.t});
  if(it.id) wordResult(it.id, ok);
}
function sesNext(auto, isTeach){
  const s=SES;
  if(isTeach){ const w=wstate(s.items[s.i].id); w.seen=Math.max(1,w.seen); if(w.lv===0)w.lv=1; w.due=Date.now(); save(); }
  s.i++;
  go('session');
}
function sesQuit(){
  const s = SES;
  if(s.kind==='lesson' || s.kind==='check') go(s.uid==='s0a' ? 'home' : 'unit', s.uid==='s0a' ? undefined : s.uid);
  else if(s.kind==='drill' && s.back) go(s.back.scr, s.back.arg);
  else go('home');
}
function sesFinish(){
  const s = SES;
  const answered = s.results.filter(r=>r.t!=='teach' && r.t!==undefined && r.id!==undefined || r.t==='mc'||r.t==='dict'||r.t==='wb');
  const scored = s.results.filter(r=>['mc','dict','wb'].includes(r.t));
  const okN = scored.filter(r=>r.ok).length;
  const pct = scored.length ? Math.round(okN/scored.length*100) : 100;
  bumpStreak();
  if(s.kind==='lesson'){ const st0=unitState(s.uid); st0.lesson = true; if(!st0.doneDay) st0.doneDay = today(); save(); go('checkResult', {kind:'lesson', uid:s.uid, pct, scored}); }
  else if(s.kind==='check'){
    const st = unitState(s.uid);
    st.check = Math.max(st.check||0, pct);
    if(st.check >= 70) st.doneDay = today();
    save();
    go('checkResult', {kind:'check', uid:s.uid, pct, scored});
  }
  else if(s.kind==='review'){ toast(`Review done · ${okN}/${scored.length} ✓`); go('home'); }
  else { if(s.back){ toast('Drill done!'); go(s.back.scr, s.back.arg); } else go('home'); }
}

/* ================= LESSON / CHECK RESULTS ================= */
SCREENS.checkResult = ({kind, uid, pct, scored}) => {
  const u = UNITS.find(x=>x.id===uid);
  const missed = scored.filter(r=>!r.ok);
  const wordIds = [...new Set(scored.filter(r=>r.id).map(r=>r.id))];
  const shaky = wordIds.filter(id=>S.words[id] && S.words[id].lv<=1);
  const passed = pct>=70;
  const spk = (kind==='lesson' && uid==='s0a' && S.speakTest)
    ? ` You read ${S.speakTest.ok}/${S.speakTest.total} introduction lines and ${(S.greetTest||{ok:0}).ok}/${(S.greetTest||{total:9}).total} greetings aloud, all of it out loud, in ${course().native}.` : '';
  const headline = kind==='lesson' ? 'Lesson finished!'
    : passed ? `${note(pct).label} ${note(pct).n} · ${note(pct).de}!`
             : `${note(pct).label} ${note(pct).n} · not yet`;
  const honest = kind==='lesson' ? 'Now prove it, the check makes it stick.' + spk
    : pct>=90 ? 'Excellent. This unit is genuinely solid.'
    : passed && shaky.length ? `Good, but ${shaky.length} word${shaky.length>1?'s aren\u2019t':' isn\u2019t'} sticking yet. Let\u2019s be honest about ${shaky.length>1?'them':'it'}.`
    : passed ? 'Good, clean pass.' : 'Below 70%, the unit stays in progress. Drill the misses, then retry. That\u2019s how it\u2019s supposed to work.';
  app.innerHTML = `<div class="screen noNav">
 <div style="display:flex;justify-content:center;margin-top:8px" class="${passed||kind==='lesson'?'confetti':''}">${avatarSVG((S.langPicked||S.onboarded)?'de':'neutral', (passed||kind==='lesson')?'happy':'warm', 118)}</div>
 <h1 class="center" style="margin-top:8px">${headline}</h1>
 <p class="sub center" style="margin-top:6px">${honest}</p>
    ${(kind==='check' || (kind==='lesson' && uid==='s0a')) ? `<div class="center" style="margin:14px 0 6px">${gradeBadge(pct)}</div>
 <p class="usub center" style="font-size:11.5px;margin-bottom:10px">${(course().grades||{}).legend || ''}</p>` : ''}
 <div class="progress" style="margin:${(kind==='check'||(kind==='lesson'&&uid==='s0a'))?'4px':'16px'} 0 16px"><i style="width:${pct}%;background:${passed?'var(--good)':'var(--warn)'}"></i></div>
    ${wordIds.length?`<div class="sec">Words this session</div>
 <div class="card" style="padding:6px 14px;max-height:230px;overflow-y:auto">
      ${wordIds.map(id=>{const v=VOCAB[id],w=S.words[id];return `<div class="row" style="padding:7px 0;border-bottom:1px solid var(--line)"><b style="font-size:13.5px">${esc(v.de)}</b><span class="grow usub">${esc(v.en)}</span><span class="mastery ${M_CLASS[w.lv]}">${M_LABEL[w.lv]}${w.lv===1&&w.miss?' · '+w.miss+' miss':''}</span></div>`;}).join('')}
</div>`:''}
    ${missed.length?`<div class="card" style="margin-top:10px;background:color-mix(in srgb,var(--bad) 8%,var(--card))"><b style="font-size:13.5px">You missed:</b>
      ${missed.slice(0,3).map(m=>`<div style="font-size:12.5px;margin-top:6px;line-height:1.45">· ${esc(m.q||'')}, <i>${esc(m.why||'')}</i></div>`).join('')}</div>`:''}
 <div class="grow" style="min-height:14px"></div>
    ${(u && (u.vocab||[]).length && !handDone(uid)) ? `<div class="card" style="margin-top:10px;border-color:var(--hi)">
      <div class="row" style="align-items:flex-start;gap:9px"><span style="font-size:17px">✎</span>
      <span style="font-size:12.5px;line-height:1.5"><b>Before your next lesson:</b> copy these words into a notebook by hand, with the article, saying each one out loud. The tapping you just did is the easy half.</span></div></div>` : ''}
    ${shaky.length?`<button class="btn" onclick='startDrill(${JSON.stringify(shaky)},{scr:"unit",arg:"${uid}"})'>Drill the ${shaky.length} shaky word${shaky.length>1?'s':''} · 2 min</button>`:''}
    ${kind==='lesson'?`<button class="btn ${shaky.length?'sec2':''}" onclick="startCheck('${uid}')">Take the lesson check →</button>`
      : passed?`<button class="btn ${shaky.length?'sec2':''}" onclick="go('home')">Back to path →</button>`
      : `<button class="btn ${shaky.length?'sec2':''}" onclick="startCheck('${uid}')">Retry check</button>`}
 <button class="btn sec2" onclick="go('notes','${uid}')">✎ Quick notes for this lesson</button>
 <button class="btn ghost" onclick="${uid==='s0a' ? `go('home')` : `go('unit','${uid}')`}">${uid==='s0a' ? 'Back to path' : 'Back to unit'}</button>
</div>`;
  if(shaky.length===0 && (passed||kind==='lesson')) toast('Shaky words return in tomorrow\u2019s review');
  setTimeout(()=>teacherSay(honest), 600);
};
