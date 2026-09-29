/* ================= UNIT s0f · Klara teaches sein & haben ================= */
let VB = {step:1};

/* Each line is [German, English, example, example in English].
   `after` is what Klara reads out loud once she has finished explaining,
   so "listen to ze pattern" is followed by an actual pattern to listen to.
   {NAME} is replaced with the student's own name at render time. */
const VB_STEPS = [
  { /* 1 */
    say:'Two verbs carry more German zan all ze others together. <b>sein</b> is to be. <b>haben</b> is to have. Seven forms, and you can already say who you are and vhat you have.',
    title:'sein und haben',
    lines:[
      ['sein','to be','Ich bin hier.','I am here.'],
      ['haben','to have','Ich habe Zeit.','I have time.']
    ],
    after:['sein','haben'],
    readEx:true,
    note:'Every introduction, every description, every possession. Zese two first.'
  },
  { /* 2 */
    say:'<b>sein</b> first. Listen to ze pattern, zen read it aloud vith me.',
    title:'sein · to be',
    lines:[
      ['ich bin','I am','Ich bin Klara.','I am Klara.'],
      ['du bist','you are','Du bist {NAME}.','You are {NAME}.'],
      ['er ist / sie ist','he is / she is','Sie ist {NAME}.','She is {NAME}.'],
      ['wir sind','we are','Wir sind neu hier.','We are new here.'],
      ['Sie sind','you are (formal)','Sind Sie Herr Klein?','Are you Mr Klein?']
    ],
    after:['ich bin','du bist','er ist','sie ist','wir sind','Sie sind'],
    readEx:true,
    words:['sein-bin','sein-bist','sein-ist','sein-sind'],
    note:'<b>sind</b> does double duty: <i>wir sind</i> and <i>Sie sind</i> are ze same word.'
  },
  { /* 3 */
    say:'Now let us learn how to say <b>have</b>. Same idea, four forms, and one small surprise vaiting in ze middle.',
    title:'haben · to have',
    lines:[
      ['ich habe','I have','Ich habe Zeit.','I have time.'],
      ['du hast','you have','Du hast recht.','You are right.'],
      ['er hat / sie hat','he has / she has','Er hat einen Termin.','He has an appointment.'],
      ['wir haben','we have','Wir haben Hunger.','We are hungry.']
    ],
    after:['ich habe','du hast','er hat','wir haben'],
    readEx:true,
    words:['haben-habe','haben-hast','haben-hat'],
    note:'And zere is ze surprise: <b>habe</b> keeps ze <b>b</b>, but <b>hast</b> and <b>hat</b> lose it.'
  },
  { /* 4 */
    say:'Now somezing English keeps togezer and German splits into three. <b>Ich bin</b> for who you are. <b>Mir ist</b> for how you feel right now. <b>Ich habe</b> for vhat you carry. Once you see ze split, it is easy.',
    title:'bin · mir ist · habe',
    lines:[
      ['Ich bin glücklich.','I am happy.','ich bin, who you are'],
      ['Ich bin neugierig.','I am curious.','a quality you keep'],
      ['Ich bin freundlich.','I am friendly.','also who you are'],
      ['Mir ist warm.','I am warm.','mir ist, how you feel now'],
      ['Mir ist langweilig.','I am bored.','ze afternoon, not your character'],
      ['Ich habe Glück.','I am lucky.','ich habe, vhat you carry'],
      ['Ich habe Recht.','I am right.','being right is carried too']
    ],
    after:['Ich bin glücklich.','Mir ist warm.','Ich habe Glück.'],
    note:'<b>Who you are</b> takes ich bin. <b>How you feel now</b> takes mir ist. <b>What you carry</b> takes ich habe.'
  },
  { /* 5 */
    say:'To say no you need two words. <b>nicht</b> goes at ze end and cancels ze sentence. <b>kein</b> goes in front of a noun and means not a, no.',
    title:'nicht und kein',
    lines:[
      ['Ich verstehe das nicht.','I do not understand that.','nicht at ze end.'],
      ['Das ist nicht richtig.','That is not right.','nicht before ze describing word.'],
      ['Ich habe keine Zeit.','I have no time.','die Zeit, so keine.'],
      ['Ich habe kein Geld.','I have no money.','das Geld, so kein.']
    ],
    after:['Ich habe keine Zeit.','Ich habe kein Geld.'],
    words:['nicht','kein'],
    note:'<b>nicht</b> cancels a verb or a sentence. <b>kein</b> cancels a noun, and it takes ze gender: kein / keine.'
  },
  { /* 6 */
    say:'Last: three small words zat join everyzing you have learned today. Und, oder, aber. Nozing changes after zem, ze sentence simply continues.',
    title:'und · oder · aber',
    lines:[
      ['Brot und Butter','bread and butter','und, and'],
      ['Tee oder Kaffee?','tea or coffee?','oder, or'],
      ['Klein, aber schön.','Small, but beautiful.','aber, but'],
      ['Ich habe Zeit, aber kein Geld.','I have time, but no money.','Everyzing from today, in one sentence.']
    ],
    after:['Ich habe Zeit, aber kein Geld.'],
    words:['und','oder','aber'],
    note:'Say ze last line out loud. Zat is a real German sentence, built by you, on day one.'
  }
];

/* the student's own name, wherever a step asks for it */
function vbName(){ return (S && S.name) ? S.name : 'Anna'; }
function vbFill(s){ return String(s||'').replace(/\{NAME\}/g, vbName()); }

function startVerbs(){ VB = {step:1}; go('lessonVerbs'); }

/* [German, English, example, example in English]
   When an example has its own English it is a real sentence, so it gets its
   own listen button and its meaning underneath. */
function vbLine(de, en, ex, exEn){
  de = vbFill(de); ex = vbFill(ex); exEn = vbFill(exEn);
  const spk = (t, sz) => `<button class="ico" style="width:${sz}px;height:${sz}px;min-width:${sz}px;font-size:${sz>30?13:11}px;background:rgba(253,248,236,.14);border-color:rgba(253,248,236,.3);color:#FDF8EC" onclick="speak(this.dataset.de)" data-de="${esc(t)}" title="listen">🔊</button>`;
  return `<div style="display:flex;gap:9px;align-items:flex-start;padding:8px 7px;border-radius:8px">
    ${spk(de,32)}
    <span style="flex:1;min-width:0">
      <b style="font-size:15px">${esc(de)}</b>
      <div style="color:rgba(253,248,236,.62);font-size:11.5px;font-style:italic;margin-top:1px">${esc(en)}</div>
      ${ex ? (exEn
        ? `<div style="display:flex;gap:7px;align-items:flex-start;margin-top:6px;padding-top:6px;border-top:1px solid rgba(253,248,236,.16)">
             ${spk(ex,26)}
             <span style="flex:1;min-width:0">
               <span style="color:#FFE9A8;font-size:12.5px;font-weight:700">${esc(ex)}</span>
               <div style="color:rgba(253,248,236,.55);font-size:11px;font-style:italic;margin-top:1px">${esc(exEn)}</div>
             </span></div>`
        : `<div style="color:rgba(255,233,168,.85);font-size:11px;margin-top:3px">${esc(ex)}</div>`) : ''}
    </span></div>`;
}

SCREENS.lessonVerbs = () => {
  const n = VB.step, total = VB_STEPS.length, s = VB_STEPS[n-1];
  if(!s) return vbFinish();
  const pct = Math.round(n/total*55);
  app.innerHTML = `<div class="screen noNav">${l1Bar(pct, n+'/'+total)}
    ${teacherBox(s.say, {expr: n===4 ? 'happy' : 'warm', after: (s.after||[]).map(vbFill)})}
    ${chalkboard(chalkTitle(s.title) + `<div style="${CHALK};line-height:1.35">
      ${s.lines.map(([de,en,ex,exEn])=>vbLine(de,en,ex,exEn)).join('')}
    </div>`, {anna:false, min:170})}
    ${tchWords(s.words, s.lines)}
    ${s.note ? `<div class="card" style="background:var(--tint);border:none;box-shadow:none">
      <div class="row" style="align-items:flex-start;gap:9px"><span style="font-size:16px">💡</span>
      <span style="font-size:12.5px;line-height:1.5">${s.note}</span></div></div>` : ''}
    <div class="grow" style="min-height:12px"></div>
    <button class="btn sec2" style="margin-bottom:8px" onclick="vbReadAll()">🔊 ${TN()} reads the board</button>
    <button class="btn" onclick="vbNext()">${n<total ? 'Next →' : 'Now test me →'}</button>
    ${n>1 ? `<button class="btn ghost" onclick="VB.step--;go('lessonVerbs')">← Back</button>` : ''}
  </div>`;
};

function vbReadAll(){
  const s = VB_STEPS[VB.step-1]; if(!s) return;
  const q = [];
  s.lines.forEach(([de, en, ex, exEn]) => {
    q.push(vbFill(de));
    if(s.readEx && ex) q.push(vbFill(ex));   /* she reads the example too */
  });
  speakLines(q, 0.86);
}
function vbNext(){
  if(VB.step < VB_STEPS.length){ VB.step++; go('lessonVerbs'); window.scrollTo(0,0); }
  else vbFinish();
}
function vbFinish(){
  const u = UNITS.find(x=>x.id==='s0f');
  const L = buildLesson(u);
  SES = {kind:'lesson', uid:'s0f', items:L.items, i:0, results:[], title:u.title, intro:null};
  go('session');
}
