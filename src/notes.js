/* ================= QUICK NOTES · HANDWRITING · REVISION ================= */

/* ---- Klara's hard truth about writing ---- */
function writingTruth(compact){
  if(compact){
    return `<div class="card" style="margin-bottom:10px;background:var(--tint);border:none;box-shadow:none">
      <div class="row" style="align-items:flex-start;gap:9px">
        <span style="font-size:17px">✎</span>
        <span style="font-size:12.5px;line-height:1.5">Copy zese by hand before your next lesson. Ten minutes with a pen beats an hour of tapping, and zat is not a slogan, it is how memory works.</span>
      </div></div>`;
  }
  return teacherBox(`Ze hard truth: you vill not remember vhat you only tapped.
    Tapping goes in through ze eyes and straight out again. Writing by hand is slower, and <b>zat is exactly ze point</b>, your hand has to rebuild every word letter by letter, with ze article, with ze spelling. Zat is ven it sticks.
    So: get a notebook. After every lesson, write ze new words by hand and say zem out loud. Zis is ze part most learners skip, and it is ze part zat works.`, {expr:'calm'});
}

/* ---- has the student written this unit out yet? ---- */
function handDone(uid){ return !!(S.hand && S.hand[uid]); }
function handMark(uid){
  S.hand = S.hand || {}; S.hand[uid] = today(); save();
  const b = document.getElementById('handBtn');
  if(b){ b.outerHTML = `<div class="card" style="border-color:var(--good);background:color-mix(in srgb,var(--good) 8%,var(--card));margin-bottom:8px">
    <b style="font-size:13.5px">✓ Written by hand</b>
    <div class="usub" style="margin-top:3px">That is the work that lasts. Say them out loud once more tonight.</div></div>`; }
  toast('Written by hand ✓ · that is the part that lasts');
}
function handPending(){
  return UNITS.filter(u => unitState(u.id).lesson && !handDone(u.id) && (u.vocab||[]).length);
}

/* ---- the notes for one unit ---- */
function unitNotes(u){
  const words = (u.vocab||[]).filter(id=>VOCAB[id]).map(id=>Object.assign({id}, VOCAB[id]));
  const g = u.grammar || {}, c = u.culture || {};
  const gender = de => { const a = de.split(' ')[0];
    return a==='der' ? 'var(--hero)' : a==='die' ? 'var(--accent)' : a==='das' ? 'var(--good)' : ''; };
  return `
    ${g.title ? `<div class="sec">Grammar · ${esc(g.title)}</div>
      <div class="card" style="margin-bottom:10px"><div class="gbody">${g.body||''}</div>
      ${(g.gloss||[]).length ? `<div style="margin-top:9px;border-top:1px solid var(--line);padding-top:8px">
        ${g.gloss.map(([de,en])=>`<div class="row" style="gap:8px;padding:4px 0">
          <b style="flex:1;font-size:13px;min-width:0">${esc(de)}</b>
          <span style="flex:1.1;font-size:11.5px;color:var(--muted);line-height:1.35">${esc(en)}</span>
        </div>`).join('')}</div>` : ''}</div>` : ''}

    ${c.title ? `<div class="sec">Culture · ${esc(c.title)}</div>
      <div class="card" style="margin-bottom:10px"><div class="gbody">${c.body||''}</div></div>` : ''}

    ${words.length ? `<div class="sec">Vocabulary · ${words.length} words</div>
      <div class="card" style="padding:6px 14px;margin-bottom:10px">
      ${words.map(v=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
        <div class="row" style="gap:8px">
          <b style="flex:1;font-size:14px;min-width:0;color:${gender(v.de)||'var(--ink)'}">${esc(v.de)}</b>
          <span style="flex:1;font-size:12px;color:var(--muted);text-align:right">${esc(v.en)}</span>
        </div>
        ${v.ex ? `<div style="font-size:11.5px;color:var(--muted);font-style:italic;margin-top:2px">${esc(v.ex)}</div>` : ''}
      </div>`).join('')}
      <div class="usub" style="padding:8px 0;font-size:11px">Colour shows the gender: <b style="color:var(--hero)">der</b> · <b style="color:var(--accent)">die</b> · <b style="color:var(--good)">das</b>. Always write the article with the noun, never the noun alone.</div>
      </div>` : ''}`;
}

SCREENS.notes = (uid) => {
  const u = UNITS.find(x=>x.id===uid); if(!u) return go('home');
  const words = (u.vocab||[]).filter(id=>VOCAB[id]);
  app.innerHTML = `<div class="screen">
    <div class="topbar"><button class="x" onclick="go('notebook')">←</button>
      <div class="grow"><b style="font-family:var(--font-head);font-size:15px">Quick notes</b>
        <div class="usub" style="font-size:11px">${esc(u.title)}</div></div></div>
    ${(()=>{ if(!S.wroteSeen){ S.wroteSeen = true; save(); return writingTruth(false); } return writingTruth(true); })()}
    ${unitNotes(u)}
    ${words.length ? (handDone(uid)
      ? `<div class="card" style="border-color:var(--good);background:color-mix(in srgb,var(--good) 8%,var(--card));margin-bottom:8px">
           <b style="font-size:13.5px">✓ Written by hand</b>
           <div class="usub" style="margin-top:3px">On ${esc(S.hand[uid])}. Say them out loud again tonight.</div></div>`
      : `<div class="card" style="margin-bottom:8px;border-color:var(--hi)">
           <b style="font-size:14px">Schreibübung · your writing task</b>
           <div class="usub" style="margin-top:4px;line-height:1.5">Copy all ${words.length} words by hand, with the article, saying each one out loud as you write it. Then come back and tick it off.</div>
           <button class="btn" id="handBtn" style="margin-top:10px;margin-bottom:0" onclick="handMark('${uid}')">I wrote them by hand ✓</button>
         </div>`) : ''}
    <div class="grow" style="min-height:10px"></div>
    ${words.length ? `<button class="btn sec2" onclick='startDrill(${JSON.stringify(words.slice(0,6))},{scr:"notes",arg:"${uid}"})'>Test me on these words</button>` : ''}
    <button class="btn ghost" onclick="go('notebook')">All my notes</button>
  </div>${navBar('home')}`;
};

/* ---- the notebook: every unit the student has finished ---- */
SCREENS.notebook = () => {
  const done = UNITS.filter(u=>unitState(u.id).lesson);
  const pend = handPending().length;
  app.innerHTML = `<div class="screen">
    <div class="topbar"><button class="x" onclick="go('home')">←</button>
      <div class="grow"><b style="font-family:var(--font-head);font-size:15px">My notes</b>
        <div class="usub" style="font-size:11px">${done.length} lesson${done.length===1?'':'s'} finished${pend?` · ${pend} still to write by hand`:''}</div></div></div>
    ${done.length ? '' : `<div class="card"><b style="font-size:14px">Nothing here yet</b>
      <div class="usub" style="margin-top:4px">Finish a lesson and its notes appear here: the grammar, the culture note and every word, ready to copy into your notebook.</div></div>`}
    ${done.length ? writingTruth(true) : ''}
    <div style="display:flex;flex-direction:column;gap:9px">
    ${done.map(u=>{ const n=(u.vocab||[]).filter(id=>VOCAB[id]).length; const h=handDone(u.id);
      return `<div class="pathRow" onclick="go('notes','${u.id}')">
        <div class="badge" style="background:var(--tint)">${u.icon||'✎'}</div>
        <div class="grow"><div class="uname">${esc(u.title)}</div>
          <div class="usub">${n} words${h?' · written by hand ✓':' · not written yet'}</div></div>
        <span style="color:${h?'var(--good)':'var(--muted)'};font-weight:800;font-size:13px">${h?'✓':'✎'}</span>
      </div>`; }).join('')}
    </div>
    <div class="grow" style="min-height:12px"></div>
  </div>${navBar('home')}`;
};

/* ---- revision of what was finished in an earlier session ---- */
function revisionUnits(){
  const t = today();
  return UNITS.filter(u=>{ const st = unitState(u.id);
    return st.doneDay && st.doneDay !== t && (!S.revised || S.revised[u.id] !== t) && (u.vocab||[]).length; });
}
function startRevision(){
  const us = revisionUnits();
  S.revised = S.revised || {};
  us.forEach(u=>{ S.revised[u.id] = today(); });
  save();
  const ids = shuffle(us.flatMap(u=>(u.vocab||[]).filter(id=>VOCAB[id]))).slice(0, 6);
  if(!ids.length) return go('home');
  startDrill(ids, {scr:'home'});
}
function revisionCard(){
  const us = revisionUnits();
  if(!us.length) return '';
  const names = us.slice(0,3).map(u=>u.title).join(', ');
  return `<div class="card" style="margin-bottom:12px;border-color:var(--hi);background:color-mix(in srgb,var(--hi) 10%,var(--card))">
    <div class="row" style="align-items:flex-start;gap:10px">
      <div style="min-width:64px">${avatarSVG((S.langPicked||S.onboarded)?'de':'neutral','warm',64)}</div>
      <div class="grow" style="min-width:0">
        <b style="font-family:var(--font-head);font-size:15px">Welcome back. First, a quick revision.</b>
        <div class="usub" style="margin-top:4px;line-height:1.5">Last time you finished <b>${us.length} unit${us.length===1?'':'s'}</b>: ${esc(names)}${us.length>3?', and more':''}. Zree minutes now and zey stay. Skip it and half of it is gone by Friday.</div>
      </div>
    </div>
    <div class="row" style="gap:8px;margin-top:10px">
      <button class="btn" style="flex:1;margin:0" onclick="startRevision()">Revise now</button>
      <button class="btn sec2" style="flex:1;margin:0" onclick="go('notebook')">Read my notes</button>
    </div>
  </div>`;
}
