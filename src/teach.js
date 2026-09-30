/* ================= TEACHING MOVES =================
   A unit's concept is authored as a sequence of MOVES, not a paragraph.
   Klara performs the moves; she never reads the board aloud.

   m:'hook'      why this matters, or a problem the learner cannot solve yet
   m:'elicit'    ask BEFORE telling. The guess is the lesson, it is never scored.
   m:'reveal'    confirm and name the pattern, in plain words, no grammar jargon
   m:'contrast'  the wrong version beside the right one
   m:'model'     spoken examples
   m:'trap'      the predictable error, named before it happens
   m:'recap'     the concept in one sentence

   Every move has `say` (short, spoken by Klara) and optional board content.
   RULE: `say` and the written text must never be the same string. If they are,
   she is reading, not teaching.
================================================================= */
let TCH = {uid:null, i:0, answered:{}};


/* ---- the words this step just taught ---- */
/* `lines` is the board that was just shown. Any word already spelled out up
   there is dropped, so the card never repeats what the learner just read. */
function tchNorm(s){ return String(s||'').toLowerCase().replace(/^(der|die|das)\s+/,'').replace(/[.,!?;:]/g,'').trim(); }
function tchWords(ids, lines){
  const shown = new Set((lines||[]).map(l => tchNorm(Array.isArray(l) ? l[0] : l)));
  const ws = (ids||[]).filter(id=>VOCAB[id]).map(id=>VOCAB[id]).filter(v=>!shown.has(tchNorm(v.de)));
  if(!ws.length) return '';
  const gender = de => { const a = de.split(' ')[0];
    return a==='der' ? 'var(--hero)' : a==='die' ? 'var(--accent)' : a==='das' ? 'var(--good)' : 'var(--ink)'; };
  return `<div class="card" style="margin-bottom:10px;padding:6px 14px">
    <div style="font-size:10.5px;font-weight:800;letter-spacing:.05em;color:var(--accent);padding:8px 0 2px">WORDS FROM THIS STEP</div>
    ${ws.map(v=>`<div class="row" style="gap:9px;padding:8px 0;border-top:1px solid var(--line)">
      <button class="ico" style="width:34px;height:34px;min-width:34px;font-size:13px" onclick="speak(this.dataset.de)" data-de="${esc(v.de)}" title="listen">🔊</button>
      <span style="flex:1;min-width:0"><b style="font-size:14.5px;color:${gender(v.de)}">${esc(v.de)}</b>
        ${pyLine(v)}
        <div class="usub" style="font-size:11.5px">${esc(v.en)}</div></span>
    </div>`).join('')}
  </div>`;
}

function hasTeach(u){ return !!(u && u.teach && u.teach.length); }

function startTeach(uid){
  TCH = {uid, i:-1, answered:{}};   /* -1 is the lesson brief */
  go('teachMove');
}

function tchBoardLines(lines){
  return lines.map(([de,en,hint])=>`<div style="display:flex;gap:9px;align-items:flex-start;padding:6px 6px">
    <button class="ico" style="width:32px;height:32px;min-width:32px;font-size:13px;background:rgba(253,248,236,.14);border-color:rgba(253,248,236,.3);color:#FDF8EC" onclick="speak(this.dataset.de)" data-de="${esc(de)}" title="listen">🔊</button>
    <span style="flex:1;min-width:0"><b style="font-size:15px">${esc(de)}</b>
      ${en?`<div style="color:rgba(253,248,236,.62);font-size:11.5px;font-style:italic;margin-top:1px">${esc(en)}</div>`:''}
      ${hint?`<div style="color:rgba(255,233,168,.85);font-size:11px;margin-top:3px">${esc(hint)}</div>`:''}
    </span></div>`).join('');
}

SCREENS.teachMove = () => {
  const u = UNITS.find(x=>x.id===TCH.uid); if(!u) return go('home');
  const moves = u.teach, n = TCH.i;

  if(n === -1){   /* the brief: what today is about, and what you need first */
    const br = u.brief || {};
    const nWords = (u.vocab||[]).filter(id=>VOCAB[id]).length;
    app.innerHTML = `<div class="screen noNav">
 <div class="topbar"><button class="x" onclick="go('home')">✕</button><div class="grow center"><b>${esc(u.title)}</b></div><span class="counter"></span></div>
      ${teacherBox(br.say || 'Here is vhat today is about.', {expr:'warm', size:92})}
      <div class="card" style="margin-bottom:10px">
        <div style="font-size:10.5px;font-weight:800;letter-spacing:.05em;color:var(--accent)">IN THIS LESSON</div>
        <b style="font-family:var(--font-head);font-size:16px;display:block;margin-top:5px;line-height:1.4">${esc(br.will || u.sub || '')}</b>
        <div class="usub" style="margin-top:7px">${moves.length} steps with ${TN()} · ${nWords} new words</div>
        ${br.needs ? `<div style="margin-top:9px;border-top:1px solid var(--line);padding-top:9px;font-size:12.5px">
          <span style="color:var(--muted)">You will need first:</span> <b>${esc(br.needs)}</b></div>` : ''}
      </div>
      <div class="grow" style="min-height:8px"></div>
      <button class="btn" onclick="TCH.i=0;go('teachMove')">Start →</button>
</div>`;
    return;
  }

  const mv = moves[n];
  if(!mv) return tchFinish();
  const pct = Math.round((n+1)/moves.length*55);
  const ans = TCH.answered[n];

  let body = '';

  if(mv.m === 'elicit'){
    /* ask first. A wrong guess costs nothing: guessing IS the lesson. */
    body = `<div class="card" style="border-color:var(--hi);margin-bottom:10px">
      <div style="font-size:10.5px;font-weight:800;letter-spacing:.05em;color:var(--accent)">YOUR TURN, HAVE A GUESS</div>
      <b style="font-family:var(--font-head);font-size:19px;display:block;margin-top:5px">${esc(mv.prompt)}</b>
      ${mv.hint?`<div class="usub" style="margin-top:4px">${esc(mv.hint)}</div>`:''}
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px">
        ${mv.options.map((o,i)=>{
          const picked = ans !== undefined;
          const right = i === mv.a;
          const bg = !picked ? '' : right ? 'border-color:var(--good);background:color-mix(in srgb,var(--good) 10%,var(--card))'
                   : (i===ans ? 'border-color:var(--warn);background:color-mix(in srgb,var(--warn) 10%,var(--card))' : 'opacity:.55');
          return `<button class="opt" style="${bg}" ${picked?'disabled':''} onclick="tchGuess(${n},${i})">${esc(o)}</button>`;
        }).join('')}
      </div>
      ${ans !== undefined ? `<div style="margin-top:11px;font-size:13px;line-height:1.55;border-top:1px solid var(--line);padding-top:10px">
        <b style="color:${ans===mv.a?'var(--good)':'var(--warn)'}">${ans===mv.a?'Genau. That is it.':'Not quite, and zat is fine. Guessing is how you find ze pattern.'}</b>
        <div style="margin-top:4px">${mv.after}</div></div>` : ''}
    </div>`;
  }
  else if(mv.m === 'contrast' || mv.m === 'trap'){
    body = `<div class="card" style="margin-bottom:10px;${mv.m==='trap'?'border-color:var(--warn)':''}">
      ${mv.m==='trap'?`<div style="font-size:10.5px;font-weight:800;letter-spacing:.05em;color:var(--warn)">THE TRAP</div>`:''}
      <div class="row" style="gap:10px;align-items:stretch;margin-top:6px">
        <div style="flex:1;padding:10px 11px;border-radius:12px;background:color-mix(in srgb,var(--bad) 9%,var(--card));border:1px solid color-mix(in srgb,var(--bad) 35%,var(--line))">
          <div style="font-size:10.5px;font-weight:800;color:var(--bad)">✕ NOT</div>
          <b style="font-size:14.5px;display:block;margin-top:3px">${esc(mv.wrong)}</b></div>
        <div style="flex:1;padding:10px 11px;border-radius:12px;background:color-mix(in srgb,var(--good) 9%,var(--card));border:1px solid color-mix(in srgb,var(--good) 35%,var(--line))">
          <div style="font-size:10.5px;font-weight:800;color:var(--good)">✓ YES</div>
          <b style="font-size:14.5px;display:block;margin-top:3px">${esc(mv.right)}</b></div>
      </div>
      ${mv.note?`<div style="font-size:12.5px;line-height:1.5;margin-top:10px">${mv.note}</div>`:''}
      <button class="chip" style="padding:6px 12px;font-size:12px;margin-top:9px" onclick="speak('${esc(mv.right).replace(/'/g,"\\'")}')">🔊 hear ze correct one</button>
    </div>`;
  }
  else if(mv.m === 'recap'){
    body = `<div class="card" style="border-color:var(--good);background:color-mix(in srgb,var(--good) 7%,var(--card));margin-bottom:10px">
      <div style="font-size:10.5px;font-weight:800;letter-spacing:.05em;color:var(--good)">TODAY'S CONCEPT</div>
      <b style="font-family:var(--font-head);font-size:17px;display:block;margin-top:5px;line-height:1.35">${esc(mv.concept)}</b>
      ${mv.note?`<div class="usub" style="margin-top:6px;line-height:1.5">${mv.note}</div>`:''}</div>`;
  }
  else if(mv.lines){
    body = chalkboard(chalkTitle(mv.title || u.title) + `<div style="${CHALK};line-height:1.35">${tchBoardLines(mv.lines)}</div>`, {anna:false, min:150});
  }
  else if(mv.board){
    body = `<div class="card" style="margin-bottom:10px"><div style="font-size:13.5px;line-height:1.6">${mv.board}</div></div>`;
  }

  app.innerHTML = `<div class="screen noNav">${l1Bar(pct, (n+1)+'/'+moves.length)}
    ${teacherBox(mv.say, {expr: mv.m==='trap' ? 'happy' : mv.m==='elicit' ? 'calm' : 'warm'})}
    ${body}
    ${tchWords(mv.words, mv.lines)}
    <div class="grow" style="min-height:12px"></div>
    ${mv.m==='elicit' && ans===undefined
      ? `<div class="center usub" style="font-size:12px;margin-bottom:10px">Take a moment. A wrong guess costs nozing here.</div>`
      : `<button class="btn" onclick="tchNext()">${n < moves.length-1 ? 'Next →' : 'Now let us practise →'}</button>`}
    ${n>0 ? `<button class="btn ghost" onclick="TCH.i--;go('teachMove')">← Back</button>` : ''}
  </div>`;
};

function tchGuess(n, i){
  TCH.answered[n] = i;
  go('teachMove');
  const mv = UNITS.find(x=>x.id===TCH.uid).teach[n];
  setTimeout(()=>teacherSay(i===mv.a ? 'Genau. ' + stripTags(mv.after) : stripTags(mv.after)), 300);
}
function stripTags(s){ return String(s||'').replace(/<[^>]+>/g,''); }
function tchNext(){
  const moves = UNITS.find(x=>x.id===TCH.uid).teach;
  if(TCH.i < moves.length-1){ TCH.i++; go('teachMove'); }
  else tchFinish();
}
function tchFinish(){
  const u = UNITS.find(x=>x.id===TCH.uid);
  /* A unit can declare that its practice is a real activity rather than
     multiple choice: building your own introduction and saying it out loud
     teaches more than picking option B. */
  if(u.practice === 'intro' || u.practice === 'alphabet') return startLesson1(u.id, u.practice);
  const L = buildLesson(u);
  SES = {kind:'lesson', uid:u.id, items:L.items, i:0, results:[], title:u.title, intro:null};
  go('session');
}
