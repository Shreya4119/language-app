/* =========================================================================
   NUDGES · what the teacher says to bring you back

   Used today by the return card on Home, and ready for web push and email
   once the service worker exists.

   SEVEN RULES. Breaking them is how an app gets muted.

   1. SPECIFIC BEATS WITTY. "Six words are due" outperforms any joke ever
      written. Wit is the seasoning, never the meal.
   2. NEVER GUILT. These are adults rebuilding a life in a new country after
      a ten-hour shift. "Did you forget about me?" reads as a sneer. Duolingo
      can guilt a hobbyist; you cannot guilt someone who is already tired.
   3. THE LONGER THEY ARE AWAY, THE GENTLER THE TONE. Escalating pressure is
      exactly backwards. At two weeks the message is "nothing is lost".
   4. ROTATE. A line read five times is an insult. Selection is seeded by the
      day so it is stable within a day and different across days.
   5. IT COMES FROM THE TEACHER, NOT THE APP. Klara is a person the learner
      knows. Sprak is a logo.
   6. IT CONTAINS THE LANGUAGE. A nudge with a real word in it is a
      micro-lesson. A nudge without one is an advert.
   7. ONE A DAY, AT AN HOUR THEY CHOSE. Anything more and the permission goes.

   A note on voice: Klara's accent lives in her SPEECH, not in written text.
   Most of this audience reads English as a second language, and "vhat are ze
   vords" costs them real effort on a glanceable notification. Her character
   comes through in what she says, not how it is spelled.
   ========================================================================= */

/* ctx: {name, n, unit, word, en, teacher} — any may be missing */
const NUDGE_DE = {
  /* one day away: light, and about the words */
  away1: [
    c => `${c.n} words are due for review. Four minutes. I have counted.`,
    c => `You left off at ${c.unit}. Shall we finish what we started?`,
    c => `Four minutes today beats forty on Sunday. That is not motivation, it is how memory works.`,
    c => `${c.word} means ${c.en}. Did you have to think about it? Then it is time.`
  ],
  /* three days: name the thing they are losing, without scolding */
  away3: [
    c => `Three days. Your words are still here, and so am I.`,
    c => `${c.n} words are drifting. Five minutes brings all of them back.`,
    c => `${c.word}. Do you still have it? Let us find out.`,
    c => `You were doing well at ${c.unit}. That progress does not expire.`
  ],
  /* a week: no pressure at all, and make returning small */
  away7: [
    c => `A week. No lecture. Open the app, do five words, and we are level again.`,
    c => `I have kept everything exactly where you left it. ${c.unit}, whenever you are ready.`,
    c => `Some weeks there is no time for German. That is allowed. Five words when there is.`
  ],
  /* two weeks and beyond: the honest one */
  away14: [
    c => `${c.name ? c.name + ', y' : 'Y'}ou learned ${c.n} German words. They are still yours. Nothing has been deleted.`,
    c => `Starting again is not starting over. Your words are waiting, at the level you left them.`,
    c => `No streak to lose here, and nothing to apologise for. Five words is a real session.`
  ],
  /* words actually due today */
  due: [
    c => `${c.n} words are due. That is one tram stop.`,
    c => `${c.word}, ${c.en}. Three more like it are waiting.`,
    c => `Review now and these stay. Review Friday and half of them will not.`
  ],
  /* the notebook, which is the strongest commitment device in the app */
  hand: [
    c => `You have not copied out ${c.unit} by hand yet. Ten minutes with a pen beats an hour of tapping.`,
    c => `The notebook. I know. But your hand remembers what your thumb does not.`
  ],
  /* something real is coming up this week */
  soon: [
    c => `Your ${c.event} is ${c.when}. Three minutes on the six sentences you will need.`,
    c => `${c.when}: ${c.event}. Let us rehearse it once so it is not the first time.`
  ],
  /* a win worth naming */
  win: [
    c => `You just said ${c.n} sentences out loud that you could not say a month ago.`,
    c => `${c.n} words at full mastery. That is a real vocabulary, not a score.`
  ]
};

const NUDGE_NL = {
  away1: [
    c => `${c.n} words are due. Six is one tram stop.`,
    c => `You stopped at ${c.unit}. Shall we finish it?`,
    c => `${c.word} means ${c.en}. Sure? Two minutes to be sure.`,
    c => `Half drie is 2:30, not 3:30. You knew that last week. Still?`
  ],
  away3: [
    c => `Three days. Nothing is lost, but ${c.n} words would like a look.`,
    c => `${c.unit} is where you stopped. It is still there, exactly as it was.`,
    c => `De or het? That one needs meeting often. Today is a good day.`
  ],
  away7: [
    c => `A week. No drama. Your words are exactly where you left them.`,
    c => `Dutch people would tell you plainly, so I will: five minutes today is worth more than an hour next month.`,
    c => `Some weeks are full. Open it when one is not.`
  ],
  away14: [
    c => `${c.name ? c.name + ', y' : 'Y'}ou learned ${c.n} Dutch words. They are still yours.`,
    c => `Starting again is not starting over. Everything is at the level you left it.`,
    c => `No streak here, and nothing to explain. Five words counts.`
  ],
  due: [
    c => `${c.n} words are due today.`,
    c => `${c.word}, ${c.en}. And three more waiting.`,
    c => `Now they stay. Friday, half of them will not.`
  ],
  hand: [
    c => `${c.unit} is not written out yet. Pen, paper, ten minutes. It works.`,
    c => `Your hand learns the articles in a way your eyes never will.`
  ],
  soon: [
    c => `Your ${c.event} is ${c.when}. Everything here runs on an afspraak, so let us rehearse yours.`,
    c => `${c.when}: ${c.event}. Three minutes and you will not be improvising.`
  ],
  win: [
    c => `You said ${c.n} sentences out loud today that you could not say a month ago.`,
    c => `${c.n} words solid. That is a real start.`
  ]
};

const NUDGE_ZH = {
  away1: [
    c => `${c.n} characters are due. Two minutes.`,
    c => `妈 mā or 马 mǎ? One is your mother, one is a horse. Worth being sure.`,
    c => `You stopped at ${c.unit}. Shall we go on?`,
    c => `${c.word} · ${c.en}. Still there?`
  ],
  away3: [
    c => `Three days. ${c.n} characters would like a look at you.`,
    c => `Tones fade faster than words. Two minutes keeps all four.`,
    c => `${c.unit} is exactly where you left it.`
  ],
  away7: [
    c => `A week. Nothing is lost. Five characters and you are back.`,
    c => `没关系. No problem. Open it when there is time.`,
    c => `Characters come back faster than you expect. Try five.`
  ],
  away14: [
    c => `${c.name ? c.name + ', y' : 'Y'}ou learned ${c.n} Chinese words. They are still yours.`,
    c => `不着急. No hurry. Everything is saved at the level you left it.`,
    c => `Starting again is not starting over.`
  ],
  due: [
    c => `${c.n} characters are due today.`,
    c => `${c.word} · ${c.en}. Three more are waiting.`,
    c => `Review now and they stay.`
  ],
  hand: [
    c => `${c.unit} is not written out yet. Characters live in the hand before they live in the eye.`,
    c => `Ten minutes with a pen. For characters it is not optional.`
  ],
  soon: [
    c => `Your ${c.event} is ${c.when}. Three minutes on what you will need.`,
    c => `${c.when}: ${c.event}. Let us rehearse it once.`
  ],
  win: [
    c => `${c.n} sentences you could not say a month ago.`,
    c => `${c.n} characters solid. 很好.`
  ]
};

/* ---- choosing one -------------------------------------------------------
   Seeded by the day so the same line is stable for a whole day and different
   the next. Rule 4: a line read five times is an insult. */
function nudgeBank(){
  const byLang = {de:NUDGE_DE, nl:NUDGE_NL, zh:NUDGE_ZH};
  return byLang[(typeof S !== 'undefined' && S.lang) || 'de'] || NUDGE_DE;
}
function daysAway(){
  if(!S.lastDay) return 0;
  const a = new Date(S.lastDay + 'T00:00:00'), b = new Date(today() + 'T00:00:00');
  return Math.max(0, Math.round((b - a) / 864e5));
}
/* which bank fits the situation, in order of how much it respects the reader:
   something real this week, then their own unfinished work, then the words */
function nudgeKind(ctx){
  if(ctx && ctx.event) return 'soon';
  const d = daysAway();
  if(d >= 14) return 'away14';
  if(d >= 7)  return 'away7';
  if(d >= 3)  return 'away3';
  if(d >= 1)  return 'away1';
  return 'due';
}
function nudgeContext(){
  const due = (typeof dueWords === 'function') ? dueWords() : [];
  const first = due.length ? VOCAB[due[0]] : null;
  const pend = (typeof handPending === 'function') ? handPending() : [];
  const last = UNITS.filter(u => unitState(u.id).lesson).slice(-1)[0];
  const solid = Object.keys(S.words).filter(id => VOCAB[id] && S.words[id].lv >= 3).length;
  return {
    name: S.name || '',
    n: due.length || solid || Object.keys(S.words).filter(id => VOCAB[id]).length,
    word: first ? first.de : '',
    en: first ? first.en : '',
    unit: last ? last.title : (UNITS.find(u => !u.planned) || {}).title || '',
    pending: pend.length ? pend[0].title : '',
    teacher: (typeof TN === 'function') ? TN() : ''
  };
}
/* kind can be forced (for the handwriting or win nudges); otherwise inferred */
function pickNudge(kind, extra){
  const ctx = Object.assign(nudgeContext(), extra || {});
  const bank = nudgeBank();
  const k = kind || nudgeKind(ctx);
  const lines = bank[k] || bank.due;
  if(!lines || !lines.length) return '';
  /* stable within a day, different across days, and per-bank so two nudges on
     the same day do not land on the same index */
  const seed = Math.floor(Date.now() / 864e5) + k.length;
  try { return lines[seed % lines.length](ctx); }
  catch(e){ return ''; }
}

/* =========================================================================
   EMAIL

   A caveat before the copy. The app's promise today is "no account, no
   forms, nothing leaves the device", and it is printed on the first screen.
   Email needs an address, which means an account, a server, a privacy
   policy and a GDPR basis. That is a product decision, not a copy decision,
   and it is worth being deliberate about: the no-account promise is part of
   why this audience trusts the app.

   If you do add it, ask for the address at a moment of success (after a
   passed check, never at signup), make it optional, and send weekly at most.
   Push notifications need none of that, which is why they come first.

   Subject lines are short on purpose: most of this will be read on a phone
   with the preview text doing half the work.
   ========================================================================= */
const EMAILS = {
  /* weekly, and the only one worth sending often */
  weekly: ctx => ({
    subject: `${ctx.newWords} things you can now say`,
    preview: `Six weeks ago you could not say any of them.`,
    body: [
      `Hello${ctx.name ? ' ' + ctx.name : ''},`,
      ``,
      `This week you learned ${ctx.newWords} new words and reviewed ${ctx.reviewed}.`,
      `Here is what that adds up to, in sentences you can say out loud today:`,
      ``,
      ...(ctx.sentences || []).slice(0, 5).map(s => `    ${s}`),
      ``,
      `None of those were available to you a month ago. That is the whole point.`,
      ``,
      `${ctx.due} words are due for review. Four minutes.`,
      ``,
      `${ctx.teacher}`
    ].join('\n')
  }),

  /* they have been away a while: gentle, concrete, easy to restart */
  away: ctx => ({
    subject: `Your ${ctx.language} is still here`,
    preview: `Nothing has been deleted.`,
    body: [
      `Hello${ctx.name ? ' ' + ctx.name : ''},`,
      ``,
      `It has been a few weeks. That is allowed: some weeks have no room in them.`,
      ``,
      `Everything is exactly where you left it. ${ctx.n} words, ${ctx.units} units,`,
      `all at the level you reached. Nothing has been deleted and nothing expires.`,
      ``,
      `If you want the smallest possible way back in: five words takes two minutes,`,
      `and it genuinely counts.`,
      ``,
      `${ctx.teacher}`
    ].join('\n')
  }),

  /* something real is coming up, which is the only email anyone opens twice */
  appointment: ctx => ({
    subject: `Ready for ${String(ctx.when||'').replace(/^(on|this|next)\s+/i,'')}?`,
    preview: `The six sentences you will need.`,
    body: [
      `Hello${ctx.name ? ' ' + ctx.name : ''},`,
      ``,
      `Your ${ctx.event} is ${ctx.when}. Here is what to have ready:`,
      ``,
      ...(ctx.sentences || []).slice(0, 6).map(s => `    ${s}`),
      ``,
      `Three minutes rehearsing these out loud is worth more than an hour of reading.`,
      `Open the app and say them once, and it will not be the first time when it matters.`,
      ``,
      `${ctx.teacher}`
    ].join('\n')
  })
};

/* Build the context an email needs. Kept separate from pickNudge so the
   email side can be tested without a push subscription existing. */
function emailContext(){
  const ctx = nudgeContext();
  const done = UNITS.filter(u => unitState(u.id).lesson);
  const solid = Object.keys(S.words).filter(id => VOCAB[id] && S.words[id].lv >= 3);
  return Object.assign(ctx, {
    language: (typeof course === 'function') ? course().native : '',
    units: done.length,
    due: (typeof dueWords === 'function') ? dueWords().length : 0,
    newWords: solid.length,
    reviewed: Object.keys(S.words).filter(id => VOCAB[id] && S.words[id].seen > 1).length,
    /* real sentences, taken from the frames the learner has actually finished */
    sentences: done.map(u => u.frame).filter(Boolean).slice(0, 6)
  });
}
/* Returns null rather than sending something embarrassing. An email that
   says "0 things you can now say" is worse than no email, and a weekly
   report with nothing in it is how an unsubscribe happens. */
function buildEmail(kind, extra){
  const f = EMAILS[kind]; if(!f) return null;
  const ctx = Object.assign(emailContext(), extra || {});
  if(kind === 'weekly' && (!ctx.newWords || !(ctx.sentences || []).length)) return null;
  if(kind === 'away' && !ctx.n) return null;
  if(kind === 'appointment' && (!ctx.event || !ctx.when)) return null;
  return f(ctx);
}
