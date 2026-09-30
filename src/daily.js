/* =========================================================================
   THE DAILY TASK

   One card, four items, five to eight minutes. It is the answer to "why
   would I open this today", and it is what every push nudge points at.

   The order is not arbitrary. It is the one thing on this screen that comes
   from teaching rather than from design:

   1. RETRIEVAL FIRST. Pulling a word out of memory strengthens it far more
      than meeting it again, and it works best while attention is fresh. So
      the day opens with words due, never with new material.
   2. THEN INPUT. A story paragraph or a culture card: comprehension while
      warm, with nothing to perform.
   3. THEN FORM. One game, aimed at the mistake this language actually
      causes. Interleaved against items 1 and 2 on purpose, because four
      short different things beat one long same thing.
   4. AND IT ENDS IN PRODUCTION. Something said out loud. Choosing option B
      is recognition; only production transfers to a real conversation.

   Nothing here is hand-authored. Every item is assembled from content that
   already exists, which is the only way a daily anything survives past a
   fortnight. A course that cannot fill a step simply does not show it.
   ========================================================================= */

function dailyState(){
  const d = today();
  if(!S.daily || S.daily.day !== d){ S.daily = {day:d, done:{}}; save(); }
  return S.daily;
}
function dailyMark(k){
  const s = dailyState();
  if(!s.done[k]){ s.done[k] = true; save(); }
}

/* The story the learner has unlocked and not yet read, else today's culture
   card. Dutch has no stories yet, so it lands on culture, and that is fine. */
function dailyInput(){
  const open = STORIES.filter(st => !st.needs || unitDone(st.needs));
  const unread = open.find(st => !(S.stories[st.id] && S.stories[st.id].score != null));
  if(unread) return {kind:'story', id:unread.id, title:unread.title, sub:'2 short paragraphs, 3 questions'};
  if(CULTURE.length){
    const c = CULTURE[new Date().getDate() % CULTURE.length];
    return {kind:'culture', title:c.t, sub:'One thing worth knowing today'};
  }
  if(open.length) return {kind:'story', id:open[0].id, title:open[0].title, sub:'Read it again, it is quicker the second time'};
  return null;
}

function dailySteps(){
  const st = dailyState().done;
  const due = dueWords();
  const steps = [];

  steps.push({k:'review', icon:'🔁',
    label: due.length ? `${due.length} word${due.length>1?'s':''} to review` : 'Reviews all caught up',
    sub: due.length ? `About ${Math.max(1, Math.ceil(due.length/3))} min` : 'Nothing is due today',
    act: due.length ? 'startReview()' : '',
    done: !due.length});

  const inp = dailyInput();
  if(inp) steps.push({k:'input', icon: inp.kind==='story' ? '📖' : '🧭',
    label: inp.title, sub: inp.sub,
    act: inp.kind==='story' ? `go('story','${inp.id}')` : `go('culture')`,
    done: !!st.input});

  const games = (typeof gameList === 'function') ? gameList().filter(g=>g.ready) : [];
  if(games.length) steps.push({k:'game', icon: games[0].icon,
    label: games[0].name, sub:'12 rounds, from your own words',
    act:`startGame('${games[0].id}')`, done: !!st.game});

  steps.push({k:'say', icon:'🗣', label:'Say it out loud',
    sub:'Your introduction, spoken', act:`go('speaking')`, done: !!st.say});

  return steps;
}

/* The hero on Home. Replaces the old "today's plan" block rather than
   sitting beside it: two lists of what to do today is one too many. */
function dailyCard(){
  const steps = dailySteps();
  const doneN = steps.filter(s=>s.done).length;
  const all = doneN === steps.length;
  const next = steps.find(s=>!s.done && s.act);
  const t = (typeof TN === 'function') ? TN() : '';

  /* No teacher portrait here. She is already on the return card above this
     one, and two of her on one screen reads as decoration. */
  return `<div class="hero">
 <div class="row" style="margin:0 0 10px 0">
 <div style="font-size:12px;font-weight:800;opacity:.85;letter-spacing:.04em">TODAY</div>
 <div class="grow"></div>
 <div style="font-size:12px;font-weight:800;opacity:.85">${doneN} / ${steps.length}</div>
</div>
 <div class="dailyBar">${steps.map(s=>`<i class="${s.done?'on':''}"></i>`).join('')}</div>
 <div class="dailyList">
    ${steps.map(s=>`
 <div class="dailyRow ${s.done?'done':''}" ${s.act?`onclick="${s.act}"`:''}>
 <span class="di">${s.done?'✓':s.icon}</span>
 <span class="grow"><b>${esc(s.label)}</b><span class="ds">${esc(s.sub)}</span></span>
        ${s.act && !s.done ? '<span class="dgo">→</span>' : ''}
</div>`).join('')}
</div>
    ${all
      ? `<div class="dailyDone" style="padding-right:0">Everything for today is done. ${esc(t)} will have something new tomorrow.</div>`
      : next ? `<button class="btn small" style="margin-top:11px;background:rgba(255,255,255,.22);color:var(--hero-ink)" onclick="${next.act}">Start · ${esc(next.label)}</button>` : ''}
</div>`;
}
