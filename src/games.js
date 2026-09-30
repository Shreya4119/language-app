/* =========================================================================
   GAMES · short, generated, form-focused practice

   A game here is not decoration and it is not a reward for doing the real
   work. It is the real work, arranged so that an adult who is tired will
   still do it. Five teaching rules decide what is allowed in this file.

   1. IT TARGETS A KNOWN FAILURE. Not "vocabulary" in general: the specific
      thing learners of THIS language get wrong and keep getting wrong.
      German gender and verb-second. Dutch de/het. Numbers under pressure.
      A game that practises what is already easy is a waste of a session.
   2. IT GENERATES ITSELF. Every item is built from VOCAB and from the unit
      frames that already exist, so a game written once works in German,
      Dutch and any course added later, with no new authoring. Content that
      has to be hand-written daily is content that stops after a fortnight.
   3. IT DRAWS ON THE LEARNER'S OWN WORDS, weighted toward the ones they are
      shaky on. Practice is worth most at the edge of what you know.
   4. IT FEEDS THE SAME MEMORY MODEL. Every answer calls wordResult(), so a
      miss inside a game schedules that word for review exactly as a miss in
      a lesson does. A game with its own private score teaches nothing that
      lasts.
   5. IT TEACHES THE RULE, NOT ONLY THE ANSWER. Getting der/die/das wrong and
      being told "it is die" teaches one noun. Being told "-ung is always die"
      teaches a few hundred. Feedback carries the pattern wherever one exists.

   And one rule about tone: a wrong answer is information, never a failure.
   No buzzers, no lost lives, no streak to break. Most of this audience is
   already being corrected all day in a language they are still learning.
   ========================================================================= */

/* ---- what this course can actually offer -------------------------------
   Same discipline as navBar(): a course only shows a game it can fill.
   Mandarin has no articles, so the gender game simply does not appear. */
function gameList(){
  const out = [];
  const g = genderSpec();
  if(g){
    const n = genderPool().length;
    out.push({id:'gender', icon:'⚖️', name:g.name, sub:g.sub,
              ready:n >= 6, why:`Learn ${6-n} more nouns to unlock`, count:n});
  }
  return out;
}

SCREENS.games = () => {
  const games = gameList();
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('skills')">←</button><div class="grow center"><b>Games</b></div><span class="counter"></span></div>
 <p class="sub" style="margin-top:2px;margin-bottom:14px">Short drills built from your own words, aimed at the mistakes this language actually causes.</p>
 <div style="display:flex;flex-direction:column;gap:10px">
    ${games.length ? games.map(g=>`
 <div class="pathRow ${g.ready?'':'locked'}" ${g.ready?`onclick="startGame('${g.id}')"`:''}>
 <div class="badge" style="background:var(--tint)">${g.icon}</div>
 <div class="grow"><div class="uname">${esc(g.name)}</div><div class="usub">${g.ready?esc(g.sub):esc(g.why)}</div></div>
        ${g.ready?'<span style="color:var(--accent);font-weight:800">→</span>':'<span>🔒</span>'}
</div>`).join('')
    : `<div class="card"><p style="font-size:13.5px;line-height:1.55">No games for this course yet.</p></div>`}
</div>
  ${navBar('skills')}</div>`;
};
function startGame(id){ if(id === 'gender') startGender(); }

/* =========================================================================
   GENDER SORT

   German gender is the single most expensive thing an A1 learner gets wrong,
   because a noun learned without its article is learned wrong permanently and
   every adjective and pronoun downstream inherits the error. Dutch de/het is
   the same problem with two buckets instead of three.

   The pack supplies the buckets and the rules, so this screen knows nothing
   about any particular language.
   ========================================================================= */
function genderSpec(){ return (course().genders) || null; }

/* every noun in the loaded course that carries an article */
function genderPool(){
  const g = genderSpec(); if(!g) return [];
  const re = new RegExp('^(' + g.buckets.join('|') + ')\\s+\\S');
  return Object.keys(VOCAB).filter(id => re.test(VOCAB[id].de || ''));
}
function genderOf(id){ return (VOCAB[id].de || '').split(/\s+/)[0]; }
function genderNoun(id){ return (VOCAB[id].de || '').replace(/^\S+\s+/, ''); }

/* Rule 5: find the pattern behind this noun, if the pack knows one. */
function genderRule(id){
  const g = genderSpec(); if(!g || !g.rules) return '';
  const noun = genderNoun(id), art = genderOf(id);
  const hit = g.rules.find(r => new RegExp(r[0]).test(noun) && r[1] === art);
  return hit ? hit[2] : '';
}

/* Rule 3: shaky and unseen words first, then a few solid ones so the round
   is not relentlessly hard. Interleaving beats a block of the same thing. */
function genderItems(n){
  const pool = genderPool();
  const rank = id => { const w = S.words[id]; if(!w || !w.seen) return 1; return w.lv <= 1 ? 0 : (w.lv >= 3 ? 2 : 1); };
  const tier = [[],[],[]];
  shuffle(pool).forEach(id => tier[rank(id)].push(id));
  return tier[0].concat(tier[1], tier[2]).slice(0, n);
}

let GG = null;
function startGender(){
  const items = genderItems(12);
  if(items.length < 6) return toast('Learn a few more nouns first');
  GG = {items, i:0, ok:0, missed:[], answered:null};
  go('gGender');
}

SCREENS.gGender = () => {
  const g = genderSpec(), s = GG;
  const id = s.items[s.i], noun = genderNoun(id), right = genderOf(id);
  const done = s.answered !== null;
  const correct = done && s.answered === right;
  app.innerHTML = `<div class="screen">
 <div class="topbar"><button class="x" onclick="go('games')">✕</button>
 <div class="grow center"><b>${esc(g.name)}</b></div>
 <span class="counter">${s.i+1} / ${s.items.length}</span></div>

 <div class="gameDots">${s.items.map((x,i)=>`<i class="${i<s.i?(s.missed.includes(s.items[i])?'bad':'good'):(i===s.i?'now':'')}"></i>`).join('')}</div>

 <div class="card center" style="margin-top:16px;padding:26px 16px">
 <div class="gameWord">${esc(noun)}</div>
    ${VOCAB[id].py ? pyLine(VOCAB[id], 14) : ''}
 <div class="sub" style="margin-top:6px">${esc(VOCAB[id].en)}</div>
 <button class="chip" style="margin-top:12px" onclick="speak('${esc(VOCAB[id].de).replace(/'/g,'')}')">🔊 hear it</button>
</div>

 <div class="gameOpts">
    ${g.buckets.map(b=>{
      let cls = '';
      if(done) cls = (b === right) ? 'right' : (b === s.answered ? 'wrong' : 'dim');
      return `<button class="gameOpt ${cls}" ${done?'':`onclick="gGuess('${b}')"`}>${esc(b)}</button>`;
    }).join('')}
</div>

    ${done ? `<div class="card" style="margin-top:14px;border-color:${correct?'var(--good)':'var(--bad)'}">
 <b style="font-family:var(--font-head);font-size:16px">${esc(VOCAB[id].de)}</b>
      ${genderRule(id) ? `<p style="font-size:13px;line-height:1.55;margin-top:7px"><b>${esc(genderRule(id))}</b></p>` : ''}
      ${!correct && g.hint ? `<p class="sub" style="font-size:12px;margin-top:7px">${g.hint}</p>` : ''}
 <button class="btn" style="margin-top:12px" onclick="gNext()">${s.i+1 < s.items.length ? 'Next →' : 'Finish'}</button>
</div>` : ''}
</div>`;
};

function gGuess(art){
  const s = GG, id = s.items[s.i], right = genderOf(id), ok = art === right;
  s.answered = art;
  if(ok) s.ok++; else s.missed.push(id);
  /* Rule 4: the game and the lesson write to the same memory. */
  wordResult(id, ok);
  go('gGender');
}
function gNext(){
  const s = GG;
  s.i++; s.answered = null;
  if(s.i >= s.items.length) return go('gResult');
  go('gGender');
}

SCREENS.gResult = () => {
  const s = GG, g = genderSpec();
  const pct = Math.round(s.ok / s.items.length * 100);
  const n = note(pct);
  app.innerHTML = `<div class="screen">
 <div class="center" style="margin-top:20px">
 <div class="tag" style="display:inline-block">${esc(g.name).toUpperCase()}</div>
 <h1 style="margin-top:8px">${s.ok} of ${s.items.length}</h1>
 <div style="margin-top:8px">${gradeBadge(pct)}</div>
</div>

    ${s.missed.length ? `<div class="sec">Worth meeting again</div>
 <div class="card">
      ${s.missed.map(id=>`<div style="display:flex;gap:10px;align-items:baseline;padding:6px 0;border-bottom:1px solid var(--line)">
 <b style="font-family:var(--font-head);font-size:15px">${esc(VOCAB[id].de)}</b>
 <span class="sub" style="font-size:12px">${esc(VOCAB[id].en)}</span></div>`).join('')}
 <p class="sub" style="font-size:12px;margin-top:10px">These are back in your review queue for tomorrow.</p>
</div>` : `<div class="card" style="margin-top:14px"><p style="font-size:13.5px;line-height:1.55">Every one right. ${esc(g.allRight || 'That is the hard part of this language, done.')}</p></div>`}

 <div class="grow"></div>
 <button class="btn" onclick="startGender()">Again</button>
 <button class="btn ghost" style="margin-top:8px" onclick="go('games')">Back to games</button>
</div>`;
};
