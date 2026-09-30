/* ================= LESSON 1 · "Intro & Alphabets" ================= */
const COUNTRY_DE = {'india':'Indien','germany':'Deutschland','france':'Frankreich','spain':'Spanien','italy':'Italien','turkey':'der Türkei','poland':'Polen','netherlands':'den Niederlanden','holland':'den Niederlanden','usa':'den USA','united states':'den USA','america':'den USA','uk':'Großbritannien','england':'England','china':'China','japan':'Japan','brazil':'Brasilien','mexico':'Mexiko','russia':'Russland','ukraine':'der Ukraine','syria':'Syrien','iran':'dem Iran','pakistan':'Pakistan','vietnam':'Vietnam','south korea':'Südkorea','korea':'Korea','greece':'Griechenland','portugal':'Portugal','austria':'Österreich','switzerland':'der Schweiz','sweden':'Schweden','norway':'Norwegen','denmark':'Dänemark','finland':'Finnland','canada':'Kanada','australia':'Australien','egypt':'Ägypten','morocco':'Marokko','nigeria':'Nigeria','kenya':'Kenia','indonesia':'Indonesien','thailand':'Thailand','philippines':'den Philippinen','bangladesh':'Bangladesch','sri lanka':'Sri Lanka','nepal':'Nepal','afghanistan':'Afghanistan','iraq':'dem Irak','israel':'Israel','romania':'Rumänien','bulgaria':'Bulgarien','hungary':'Ungarn','czech republic':'Tschechien','croatia':'Kroatien','serbia':'Serbien','albania':'Albanien','colombia':'Kolumbien','argentina':'Argentinien','chile':'Chile','peru':'Peru','ireland':'Irland','scotland':'Schottland','belgium':'Belgien'};
const LANG_DE = {'english':'Englisch','hindi':'Hindi','marathi':'Marathi','gujarati':'Gujarati','tamil':'Tamil','telugu':'Telugu','bengali':'Bengali','urdu':'Urdu','punjabi':'Punjabi','arabic':'Arabisch','turkish':'Türkisch','spanish':'Spanisch','french':'Französisch','italian':'Italienisch','portuguese':'Portugiesisch','russian':'Russisch','ukrainian':'Ukrainisch','polish':'Polnisch','romanian':'Rumänisch','chinese':'Chinesisch','mandarin':'Chinesisch','japanese':'Japanisch','korean':'Koreanisch','vietnamese':'Vietnamesisch','thai':'Thai','indonesian':'Indonesisch','persian':'Persisch','farsi':'Persisch','dutch':'Niederländisch','greek':'Griechisch','swedish':'Schwedisch','german':'Deutsch','serbian':'Serbisch','croatian':'Kroatisch','albanian':'Albanisch','somali':'Somali','swahili':'Swahili','filipino':'Filipino','tagalog':'Tagalog','nepali':'Nepali','sinhala':'Singhalesisch','pashto':'Paschtu','kurdish':'Kurdisch','hebrew':'Hebräisch','czech':'Tschechisch','hungarian':'Ungarisch','bulgarian':'Bulgarisch'};
/* The course pack owns everything language-shaped in this lesson. */
function F(){ return (typeof course === 'function' && course().first) || COURSES.de.first; }
function countryDe(c){ return (F().countries || {})[(c||'').toLowerCase().trim()] || c; }
function langDe(l){ return (F().languages || {})[(l||'').toLowerCase().trim()] || l; }

/* letter · German name · example word · English · picture */
const ALPHABET = [
 ['A','ah','der Apfel','the apple','🍎'],
 ['B','beh','die Banane','the banana','🍌'],
 ['C','tseh','der Computer','the computer','💻'],
 ['D','deh','der Delfin','the dolphin','🐬'],
 ['E','eh','das Ei','the egg','🥚'],
 ['F','eff','der Fisch','the fish','🐟'],
 ['G','geh','die Gitarre','the guitar','🎸'],
 ['H','hah','das Haus','the house','🏠'],
 ['I','ih','der Igel','the hedgehog','🦔'],
 ['J','jott','die Jacke','the jacket','🧥'],
 ['K','kah','die Katze','the cat','🐱'],
 ['L','ell','der Löwe','the lion','🦁'],
 ['M','emm','der Mond','the moon','🌙'],
 ['N','enn','die Nase','the nose','👃'],
 ['O','oh','die Orange','the orange','🍊'],
 ['P','peh','das Pferd','the horse','🐴'],
 ['Q','kuh','die Qualle','the jellyfish','🎐'],
 ['R','err','das Rad','the wheel / bike','🚲'],
 ['S','ess','die Sonne','the sun','☀️'],
 ['T','teh','der Tee','the tea','🍵'],
 ['U','uh','die Uhr','the clock','⏰'],
 ['V','fau','der Vogel','the bird','🐦'],
 ['W','weh','das Wasser','the water','💧'],
 ['X','iks','das Xylofon','the xylophone','🎵'],
 ['Y','ypsilon','das Yoga','yoga','🧘'],
 ['Z','tsett','die Zitrone','the lemon','🍋'],
 ['Ä','äh','die Ärztin','the doctor (f.)','👩‍⚕️'],
 ['Ö','öh','das Öl','the oil','🫒'],
 ['Ü','üh','die Übung','the exercise','📝'],
 ['ß','scharfes S','der Fuß','the foot','🦶']
];

let L1 = null, G = null;
const GREETINGS = [
  ['Hallo','hello','anytime, anyone','hallo'],
  ['Guten Morgen','good morning','until about eleven','guten-morgen'],
  ['Guten Tag','good day','the formal hello','guten-tag'],
  ['Guten Abend','good evening','after about six',''],
  ['Gute Nacht','good night','only at bedtime','gute-nacht'],
  ['Danke','thank you','','danke'],
  ['Bitte','please / you are welcome','','bitte'],
  ['Tschüss','bye','informal','tschuess'],
  ['Auf Wiedersehen','goodbye','formal','']
];
function greetTick(i, total, id){
  if(!G) G = {done:[], total};
  if(G.done.includes(i)) return;
  G.done.push(i);
  if(id && VOCAB[id]) wordResult(id, true);
  save();
  const row = document.getElementById('gr'+i);
  if(row){ row.style.borderColor = 'var(--good)'; row.style.background = 'color-mix(in srgb,var(--good) 7%,var(--card))'; }
  const n = G.done.length;
  const msg = document.getElementById('grmsg');
  if(msg) msg.innerHTML = n>=total
    ? `<span style="color:var(--good);font-weight:800">All ${total} greetings said correctly ✓</span>`
    : `<span class="usub">${n}/${total} said correctly, keep going.</span>`;
  const b = document.getElementById('grgo');
  if(b){ b.textContent = n>=total ? 'Perfekt! Next: the alphabet →' : `Continue (${n}/${total} said)`;
         if(n>=total) b.classList.remove('sec2'); }
  if(n>=total) setTimeout(()=>teacherSay('Alle Begrüßungen! Now you can greet anybody in Germany, at any hour.'), 300);
}
function l1GreetDone(){
  S.greetTest = {ok: G ? G.done.length : 0, total: (F().greetings||[]).length};
  save(); l1Next();
}
/* `only` picks which half of the lesson runs:
     'intro'    the introduction board, then reading it aloud
     'alphabet' the greetings, then the letter drill
     undefined  all four steps, which is what German does  */
function startLesson1(unit, only){
  L1 = {step: only==='alphabet' ? 4 : 1, unit: unit || F().unit, only: only||'all',
        speakIdx:0, speakOk:0, speakItems:[]};
  go('lesson1');
}
function l1Next(){ L1.step++; go('lesson1'); }
function l1Bar(pct, label){
  return `<div class="topbar"><button class="x" onclick="l1StopMic();go(L1&&L1.unit&&L1.unit!==F().unit?'unit':'home', L1&&L1.unit)">✕</button><div class="progress"><i style="width:${pct}%"></i></div><span class="counter">${label}</span></div>`;
}
/* chalkboard shell, optional teacher standing beside it */
function chalkboard(inner, opts){
  opts = opts||{};
  return `<div style="position:relative;margin:2px 0 8px">
 <div style="background:#6B4A32;border-radius:18px;padding:9px 9px 6px">
 <div style="background:#2F5949;border-radius:10px;padding:16px ${opts.anna===false?'16px':'92px'} 18px 16px;min-height:${opts.min||150}px;box-shadow:inset 0 0 34px rgba(0,0,0,.28)">${inner}</div>
 <div class="row" style="padding:5px 10px 3px;gap:6px">
 <div style="width:26px;height:6px;border-radius:3px;background:#FDF8EC"></div>
 <div style="width:16px;height:6px;border-radius:3px;background:#E8B7A0"></div>
 <div class="grow"></div><div style="width:34px;height:9px;border-radius:3px;background:#4A342A"></div>
</div></div>
    ${opts.anna===false?'':`<div style="position:absolute;right:-4px;bottom:-2px;filter:drop-shadow(0 3px 6px rgba(0,0,0,.18))">${avatarSVG((S.langPicked||S.onboarded)?'de':'neutral', opts.expr||'warm', 100)}</div>`}
</div>`;
}
function chalkTitle(t){ return `<div style="font-family:var(--font-head);color:#FDF8EC;font-size:17px;font-weight:800;display:inline-block;border-bottom:2.5px solid rgba(253,248,236,.55);padding-bottom:3px;margin-bottom:11px;transform:rotate(-.5deg)">${t}</div>`; }
const CHALK = 'color:#FDF8EC;font-size:14.5px;line-height:2.15';
function blankInput(id, ph, val, w){
  return `<input id="${id}" placeholder="${ph}" value="${esc(val||'')}" oninput="l1Fill()" autocomplete="off"
    style="background:transparent;border:none;border-bottom:2px dashed rgba(253,248,236,.65);color:#FFE9A8;font-family:var(--font-head);font-weight:800;font-size:15px;width:${w||118}px;outline:none;text-align:center;padding:0 2px 1px;caret-color:#FFE9A8">`;
}
/* who you are, in the words a beginner can actually say on day one */
const L1_GENDER = {
  f: {de:'eine Frau',   en:'a woman'},
  m: {de:'ein Mann',    en:'a man'},
  d: {de:'eine Person', en:'a person'}
};
function l1GenderChips(g){
  const G = F().gender || {};
  return Object.keys(G).map(k =>
    `<button type="button" class="gchip${g===k?' on':''}" id="g_${k}" onclick="l1Gender('${k}')">${esc(G[k].de)}</button>`
  ).join('');
}
function l1Gender(k){
  S.intro = S.intro || {};
  S.intro.g = (S.intro.g === k) ? '' : k;
  save();
  Object.keys(F().gender || {}).forEach(x => {
    const e = document.getElementById('g_'+x);
    if(e) e.classList.toggle('on', S.intro.g === x);
  });
  l1Fill();
}

/* the board lines, built from the course's own template */
function l1Lines(){
  const d = S.intro || {};
  const g = (F().gender || {})[d.g];
  const out = [];
  for(const L of F().lines){
    if(L.gender){ if(g) out.push({de:`${L.pre||''}${g.de}.`, en:`${L.enPrefix||'I am '}${g.en}.`}); continue; }
    if(L.blank){
      const raw = d[L.blank] || '';
      const val = L.map === 'countries' ? countryDe(raw) : L.map === 'languages' ? langDe(raw) : raw;
      out.push({de:`${L.pre||''}${val || '…'}${L.post||''}`,
                en:`${L.en.replace(/…\s*$/,'')}${raw || '…'}${/\.$/.test(L.post||'') ? '.' : ''}`});
      continue;
    }
    out.push({de:L.de, en:L.en});
  }
  return out;
}

function l1Fill(){
  const g = id => (document.getElementById(id) ? document.getElementById(id).value.trim() : '');
  S.intro = Object.assign({}, S.intro || {}, {
    name:g('b_name'), age:g('b_age').replace(/\D/g,'').slice(0,3),
    country:g('b_country'), city:g('b_city'), lang:g('b_lang')
  });
  if(S.intro.name) S.name = S.intro.name;
  save();
  const prev = document.getElementById('l1prev');
  if(prev){
    const d = S.intro, ready = d.name && d.age && d.country && d.city && d.lang;
    prev.innerHTML = ready
      ? `<span style="color:var(--good);font-weight:800">✓ Perfekt, that is your introduction in German!</span>`
      : `<span class="usub">Fill all five blanks, ${TN()} is watching</span>`;
    const b = document.getElementById('l1go'); if(b) b.disabled =!ready;
  }
}

SCREENS.lesson1 = () => {
  const name = S.name || 'my friend';
  const st = L1.step;
  /* ---------- 1 · HERZLICH WILLKOMMEN + YOUR INTRODUCTION ---------- */
  if(st===1){
    const d = S.intro || {name:S.name||'', age:'', g:'', country:S.country||'', city:'', lang:''};
    const EN = 'color:rgba(253,248,236,.55);font-size:11px;font-style:italic;margin:-4px 0 6px 0';
    app.innerHTML = `<div class="screen noNav">${l1Bar(15,'1/4')}
      ${teacherBox(F().say, {expr:'happy', de:F().hello})}
 <div class="sec" style="margin-top:0">Your introduction · fill in the blanks</div>
      ${chalkboard(chalkTitle(F().boardTitle) + `<div style="${CHALK};line-height:1.9">
        ${F().lines.map(L => {
          const body = L.gender
            ? `<span style="display:inline-flex;flex-wrap:wrap;align-items:center;gap:6px;row-gap:7px">${esc(L.pre||'')}${l1GenderChips(d.g)}</span>`
            : L.blank
              ? `${esc(L.pre||'')}${blankInput('b_'+L.blank, L.ph, d[L.blank], L.w)}${esc(L.post||'')}`
              : esc(L.de);
          return body + `<div style="${EN}">${esc(L.en)}</div>`;
        }).join('\n        ')}
</div>`, {anna:false, min:320})}
 <div class="center" id="l1prev" style="font-size:12.5px;margin:2px 0 8px"><span class="usub">Fill all five blanks, ${TN()} is watching</span></div>
 <div class="grow"></div>
 <button class="btn" id="l1go" disabled onclick="l1SpeakInit()">Read it aloud →</button>
</div>`;
    l1Fill();
  }

  /* ---------- 3 · SPEAKING & READING TEST (tap a line, say it) ---------- */
  else if(st===3){
    const lines = L1.speakItems;
    const doneN = L1.ticks.filter(Boolean).length;
    const pct = 25 + Math.round(doneN / lines.length * 30);
    if(typeof L1.sel!== 'number' || L1.ticks[L1.sel]){ const n = L1.ticks.findIndex(t=>!t); L1.sel = n<0 ? 0 : n; }
    app.innerHTML = `<div class="screen noNav">${l1Bar(pct, doneN+'/'+lines.length+' ✓')}
 <div class="sec">Read your introduction aloud · tap a line, then say it</div>
      ${chalkboard(chalkTitle('Meine Vorstellung · my introduction') + `<div style="${CHALK};line-height:1.4">
        ${lines.map((l,i)=>`<div id="ln${i}" class="linerow${L1.ticks[i]?' ok':(i===L1.sel?' sel':'')}" onclick="l1Sel(${i})">
 <span class="lnum" id="tk${i}">${L1.ticks[i]?'✓':(i+1)}</span>
 <span style="flex:1;min-width:0">${esc(l.de)}<div style="color:rgba(253,248,236,.55);font-size:11px;font-style:italic">${esc(l.en)}</div></span>
</div>`).join('')}
</div>`, {anna:false, min:230})}
 <div class="card" id="selCard" style="margin-bottom:8px"></div>
 <div id="heard" class="center usub" style="font-size:12px;min-height:18px;margin-bottom:6px"></div>
 <div class="feedback" id="fb"></div>
 <div id="congrats"></div>
 <div class="grow" style="min-height:8px"></div>
 <button class="btn sec2" style="margin-bottom:8px" onclick="l1ReadAll()">🔊 ${TN()} reads the whole introduction</button>
 <button class="btn ${doneN<lines.length?'sec2':''}" id="contBtn" onclick="l1AfterTest()">${doneN>=lines.length?'Perfekt! Continue →':'Continue ('+doneN+'/'+lines.length+' read)'}</button>
</div>`;
    l1RenderSel();
    if(doneN===0) setTimeout(()=>teacherSay('Tap a line, zen tap Say it. Every correct line gets a tick.'), 400);
  }

  /* ---------- 4 · GREETINGS ---------- */
  else if(st===4){
    const items = F().greetings || [];
    if(!G || G.total!== items.length) G = {done:[], total:items.length};
    app.innerHTML = `<div class="screen noNav">${l1Bar(70,'3/4')}
      ${teacherBox(F().greetSay, {expr:'happy'})}
 <div style="display:flex;flex-direction:column;gap:7px">
        ${items.map((it,i)=>{ const [de,en,note,id] = it; const done = G.done.includes(i);
          return `<div class="card" id="gr${i}" style="padding:10px 12px;${done?'border-color:var(--good);background:color-mix(in srgb,var(--good) 7%,var(--card))':''}">
 <div class="row" style="gap:8px">
 <div class="grow" style="min-width:0"><b style="font-size:14.5px">${de}</b>
 <div class="usub">${en}${note?' · '+note:''}</div></div>
              ${sayIt(de, {uid:'gr_'+i, en:en, cb:`greetTick(${i},${items.length},'${id||''}')`})}
              ${hasMic()?'':`<button class="chip" style="padding:6px 10px;font-size:11px" onclick="greetTick(${i},${items.length},'${id||''}')">✓</button>`}
</div></div>`;
        }).join('')}
</div>
 <div class="center" id="grmsg" style="font-size:12.5px;margin-top:10px">
 <span class="usub">Say each greeting out loud, ${TN()} marks every one.</span></div>
      ${(()=>{ const u = UNITS.find(x=>x.id===(L1.unit||F().unit)); return u && u.culture ? factCard('culture', u.culture) : ''; })()}
 <div class="grow" style="min-height:10px"></div>
 <button class="btn ${G.done.length>=items.length?'':'sec2'}" id="grgo" onclick="l1GreetDone()">${G.done.length>=items.length?'Perfekt! Next: the alphabet →':`Continue (${G.done.length}/${items.length} said)`}</button>
</div>`;
  }

  /* ---------- 5 · ALPHABET ---------- */
  else if(st===5){
    app.innerHTML = `<div class="screen noNav">${l1Bar(92,'4/4')}
      ${(()=>{ const g = (UNITS.find(x=>x.id===(L1.unit||F().unit))||{}).grammar || {};
        return chalkboard(chalkTitle(g.title || F().abcTitle || 'Alphabet') + `<div style="${CHALK};line-height:1.7">${g.body || ''}</div>`, {expr:'calm', min:170}); })()}
      ${teacherBox(F().abcSay, {expr:'warm'})}
      ${(()=>{ const g = (UNITS.find(x=>x.id===(L1.unit||F().unit))||{}).grammar || {};
        return g.gloss ? `<div class="card" style="margin-bottom:10px">${g.gloss.map(([de,en])=>`<div class="row" style="gap:8px;padding:4px 0">
 <span style="flex:1.05;min-width:0"><b style="font-size:13px">${esc(de)}</b></span>
 <span style="flex:1.15;font-size:11.5px;color:var(--muted);line-height:1.35">${esc(en)}</span>
 <button class="ico" style="width:27px;height:27px;min-width:27px;font-size:11px" onclick="sayEnDe('${de.replace(/'/g,"\\'")}','${en.replace(/'/g,"\\'")}')">🔊</button>
</div>`).join('')}</div>` : ''; })()}
 <div id="abcFocus" style="margin-bottom:10px"></div>
 <div class="center" id="abcMsg" style="font-size:12px;margin-bottom:8px"><span class="usub">Tap any letter, it teaches you a word.</span></div>
 <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:7px" id="abcGrid">
        ${(F().alphabet||[]).map((row,i)=>{ const said = (L1.abcOk||[]).includes(i);
          return `<button class="chip abcTile${said?' abcDone':''}" id="abc${i}" style="position:relative;flex-direction:column;gap:1px;padding:9px 4px;justify-content:center${said?';border-color:var(--good);background:color-mix(in srgb,var(--good) 10%,var(--card))':''}" onclick="abcPick(${i})">
 <b style="font-size:17px">${row[0]}</b><span style="font-size:9.5px;color:var(--muted)">${row[1]}</span>
 <span class="abcCheck" id="abcOk${i}" style="position:absolute;top:3px;right:5px;font-size:10px;font-weight:800;color:var(--good)">${said?'✓':''}</span>
</button>`; }).join('')}
</div>
 <div id="abcCongrats"></div>
 <div class="grow" style="min-height:10px"></div>
 <button class="btn" id="abcGo" onclick="l1Finish()">${(L1.abcOk||[]).length>=(F().alphabet||[]).length?'Well done! Finish the lesson ✓':`Finish Lesson 1 (${(L1.abcOk||[]).length}/${(F().alphabet||[]).length} said) ✓`}</button>
</div>`;
  }

  /* ---------- 6 · ABC SONG · ARCHIVED (not in the flow; call go('lesson1') with L1.step=6 to restore) ---------- */
  else if(st===6){
    app.innerHTML = `<div class="screen noNav">${l1Bar(95,'5/5')}
      ${teacherBox(F().songSay, {expr:'happy'})}
 <div class="card center" style="padding:18px 12px">
 <div class="wrap" style="justify-content:center;gap:5px" id="songGrid">
          ${(F().alphabet||[]).slice(0,29).map(([l],i)=>`<span class="songL" id="sl${i}" style="font-family:var(--font-head);font-weight:800;font-size:19px;padding:4px 7px;border-radius:8px;transition:all .18s">${l}</span>`).join('')}
</div>
 <button class="btn" style="margin-top:14px" id="songBtn" onclick="l1Song(false)">🎵 Sing the ABC, ${TN()}!</button>
 <button class="btn ghost" style="margin-top:2px" onclick="l1Song(true)">🐢 Sing it slowly</button>
</div>
 <div class="grow"></div>
 <button class="btn sec2" onclick="l1Finish()">Finish Lesson 1 ✓</button>
</div>`;
  }
};

function l1ReadAll(){ speakLines(l1Lines().map(l=>l.de), 0.85); }
function l1HasMic(){ return ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window); }
function l1SpeakInit(){
  L1.speakItems = l1Lines().map((l,i,a)=>Object.assign({}, l, {loose: i>=2 && i<=a.length-3}));
  L1.ticks = L1.speakItems.map(()=>false);
  L1.speakOk = 0; L1.step = 3; go('lesson1');
}
/* ---- continuous listening: ticks each line as it is read ---- */
let REC = null, recOn = false;
function l1LineMatch(heard, line){
  const h = norm(heard), t = norm(line.de).replace(/[!.]/g,'');
  if(!h) return false;
  if(h === t || h.includes(t)) return true;
  if(Math.abs(h.length - t.length) <= Math.max(3, Math.round(t.length * 0.22))
     && levDist(h, t) <= Math.max(2, Math.round(t.length * 0.25))) return true;
  const words = t.split(' ');
  const key = words.slice(0, words.length>2?2:1).join(' ');
  if(key.length >= 4 && h.includes(key)) return true;
  return false;
}
function l1Heard(txt, isFinal){
  const hEl = document.getElementById('heard');
  if(hEl) hEl.innerHTML = txt ? `<i>heard: „${esc(txt)}"</i>` : '';
  if(!isFinal) return;
  let got = false;
  L1.speakItems.forEach((l,i)=>{ if(!L1.ticks[i] && l1LineMatch(txt, l)){ l1Tick(i, true); got = true; } });
  if(!got && txt.trim().length > 2){
    const fb = document.getElementById('fb');
    const next = L1.ticks.indexOf(false);
    if(fb && next > -1){
      const tgt = L1.speakItems[next];
      fb.className = 'feedback bad';
      fb.innerHTML = `<b>Hmm, I heard „${esc(txt)}".</b> Zat one is tricky! Tap <b>▶</b> before <b>${esc(tgt.de)}</b> to hear me say it, zen read it again. <span style="opacity:.8">(${esc(tgt.en)})</span>
 <div style="margin-top:8px"><button class="chip" style="padding:6px 12px;font-size:12px" onclick="sayEnDe('${tgt.de.replace(/'/g,"\\'")}','${tgt.en.replace(/'/g,"\\'")}')">🔊 Hear it</button></div>`;
      const row = document.getElementById('ln'+next);
      if(row){ row.style.borderLeftColor='#F2C14E'; row.style.background='rgba(242,193,78,.16)'; }
      speak(tgt.de, 0.62);
    }
  }
}
function l1Tick(i, verified){
  if(L1.ticks[i]) return;
  L1.ticks[i] = true; L1.speakOk++;
  const tk = document.getElementById('tk'+i), row = document.getElementById('ln'+i);
  if(tk){ tk.textContent = '✓'; tk.style.transform='scale(1.35)'; setTimeout(()=>tk.style.transform='scale(1)', 220); }
  if(row){ row.classList.remove('sel'); row.classList.add('ok'); }
  const nxt = L1.ticks.findIndex(t=>!t);
  if(nxt >= 0){ L1.sel = nxt; const nr = document.getElementById('ln'+nxt); if(nr) nr.classList.add('sel'); l1RenderSel(); }
  else { const sc = document.getElementById('selCard'); if(sc) sc.style.display = 'none'; }
  const doneN = L1.ticks.filter(Boolean).length, total = L1.speakItems.length;
  const cnt = document.querySelector('.counter'); if(cnt) cnt.textContent = doneN+'/'+total+' ✓';
  const bar = document.querySelector('.progress i'); if(bar) bar.style.width = (25 + doneN/total*30) + '%';
  const cb = document.getElementById('contBtn');
  if(cb){ cb.textContent = doneN>=total ? 'Perfekt! Continue →' : 'Continue ('+doneN+'/'+total+' read)'; if(doneN>=total) cb.classList.remove('sec2'); }
  const fb = document.getElementById('fb');
  if(fb){ fb.className='feedback good';
    fb.innerHTML = doneN>=total ? `<b>Alle acht! ✓</b> You just introduced yourself in German, out loud. Zat is ze hardest part, and you did it.`
      : (verified ? `<b>Sehr gut! ✓</b> „${esc(L1.speakItems[i].de)}" · next line, please.` : `<b>Marked ✓</b>, „${esc(L1.speakItems[i].de)}".`);
  }
  if(doneN>=total){
    l1StopMic();
    const fbb = document.getElementById('fb'); if(fbb) fbb.className = 'feedback';
    const box = document.getElementById('congrats');
    if(box){
      box.innerHTML = `<div class="card" style="border-color:var(--good);background:color-mix(in srgb,var(--good) 8%,var(--card));margin-bottom:8px">
 <div class="row" style="align-items:flex-start;gap:10px">
 <div class="confetti" style="min-width:88px">${avatarSVG((S.langPicked||S.onboarded)?'de':'neutral','happy',88)}</div>
 <div><b style="font-family:var(--font-head);font-size:16px">Perfekt, ${esc(S.name||'my friend')}!</b>
 <p style="font-size:13.5px;line-height:1.55;margin-top:5px">All eight lines, <b>a perfect introduction in your first class.</b> Zis is exactly what you vill say at ze Bürgeramt and ze bakery. I am proud.</p></div>
</div></div>`;
      box.scrollIntoView({behavior:'smooth', block:'center'});
    }
    setTimeout(()=>teacherSay('Perfekt! All eight lines, a perfect introduction in your first class. I am proud.'), 350);
  }
}
function l1Sel(i){
  if(L1.ticks[i]) return;
  L1.sel = i;
  L1.speakItems.forEach((_,k)=>{ const r = document.getElementById('ln'+k); if(r &&!L1.ticks[k]) r.classList.toggle('sel', k===i); });
  l1RenderSel();
}
function l1RenderSel(){
  const c = document.getElementById('selCard'); if(!c) return;
  const l = L1.speakItems[L1.sel]; if(!l) return;
  c.style.display = '';
  c.innerHTML = `<div style="font-size:10.5px;font-weight:800;letter-spacing:.05em;color:var(--accent)">LINE ${L1.sel+1} OF ${L1.speakItems.length}</div>
 <b style="font-family:var(--font-head);font-size:17px;display:block;margin-top:3px">${esc(l.de)}</b>
 <div class="usub">${esc(l.en)}</div>
 <div class="speakbar">
 <button class="btn sec2" onclick="l1HearSel()">🔊 Hear it</button>
      ${l1HasMic()?`<button class="btn" id="micBtn2" style="background:var(--hi);color:var(--hi-ink)" onclick="l1SaySel()">🎤 Say it</button>`
                  :`<button class="btn" onclick="l1Tick(${L1.sel},false)">✓ I read it</button>`}
</div>`;
}
function l1HearSel(){ const l = L1.speakItems[L1.sel]; if(l) sayEnDe(l.de, l.en); }
function l1SaySel(){ l1MicOne(L1.sel); }

function l1MicOne(i){
  const line = L1.speakItems[i];
  const btn = document.getElementById('micBtn2');
  const R = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!R) return toast('No microphone here, tap „I read it" instead');
  if(btn && btn.dataset.live==='1'){ try{ MIC && MIC.stop(); }catch(e){} return; }
  l1StopMic();
  const reset = ()=>{ const b = document.getElementById('micBtn2');
    if(b){ b.dataset.live=''; b.textContent='🎤 Say it'; b.style.background='var(--hi)'; b.style.color='var(--hi-ink)'; } };
  try{
    speechSynthesis.cancel();
    const r = new R(); MIC = r; r.lang=targetLang(); r.maxAlternatives=3; r.continuous=false; r.interimResults=false;
    let done=false;
    if(btn){ btn.dataset.live='1'; btn.textContent='● Listening…'; btn.style.background='var(--bad)'; btn.style.color='#fff'; }
    r.onresult = e => { done = true; reset();
      const alts = Array.from(e.results[0]).map(a=>a.transcript);
      const hEl = document.getElementById('heard'); if(hEl) hEl.innerHTML = `<i>heard: „${esc(alts[0]||'')}"</i>`;
      if(alts.some(a=>speechMatch(a, line.de, line.loose))) l1Tick(i, true);
      else {
        const fb = document.getElementById('fb');
        if(fb){ fb.className='feedback bad';
          fb.innerHTML = `<b>Heard „${esc(alts[0]||'…')}".</b> Tap <b>Hear it</b>, listen once, and say zis line again.`; }
        speak(line.de, 0.62);
      }
    };
    r.onerror = ev => { done = true; reset();
      const m = { 'not-allowed':'Microphone blocked, allow it in your browser, or tap the line number to mark it',
 'no-speech':'I did not hear anything, tap 🎤 Say it and try again',
 'audio-capture':'No microphone found on this device',
 'network':'Speech recognition needs a connection right now' }[ev.error];
      if(m) toast(m);
    };
    r.onend = ()=>{ if(!done) reset(); };
    r.start();
  }catch(e){ reset(); toast('Mic unavailable'); }
}
function l1Mic(){
  if(recOn) return l1StopMic();
  const R = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!R) return toast('No microphone support, tap the ○ marks instead');
  try{
    const r = new R(); REC = r; recOn = true;
    r.lang=targetLang(); r.continuous = true; r.interimResults = true; r.maxAlternatives = 3;
    r.onresult = e => {
      let fin = '', itm = '';
      for(let i=e.resultIndex; i<e.results.length; i++){
        const res = e.results[i];
        if(res.isFinal){ Array.from(res).slice(0,3).forEach(alt=>{ fin += alt.transcript + ' | '; }); }
        else itm += res[0].transcript + ' ';
      }
      if(itm) l1Heard(itm, false);
      if(fin) fin.split('|').forEach(part => { if(part.trim()) l1Heard(part.trim(), true); });
    };
    r.onerror = ev => { if(ev.error==='not-allowed'){ recOn=false; toast('Mic blocked, tap the ○ marks instead'); l1MicBtn(); } };
    r.onend = () => { if(recOn){ try{ r.start(); }catch(e){} } else l1MicBtn(); };
    r.start(); l1MicBtn();
    toast('Listening, read the board from the top 🎙');
  }catch(e){ recOn=false; toast('Mic unavailable, tap the ○ marks instead'); }
}
function l1StopMic(){ recOn = false; try{ if(REC) REC.stop(); }catch(e){} l1MicBtn(); }
function l1MicBtn(){
  const b = document.getElementById('micBtn'); if(!b) return;
  b.textContent = recOn ? '⏹ Stop listening' : `🎙 Read all lines, ${TN()} is listening`;
  b.className = 'btn';
  b.style.background = recOn ? 'var(--bad)' : 'var(--hi)';
  b.style.color = recOn ? '#fff' : 'var(--hi-ink)';
  b.style.marginBottom = '8px';
}
function l1AfterTest(){
  l1StopMic();
  if(L1.only === 'intro') return l1Finish();   /* no alphabet in this half */
  L1.step = 4; go('lesson1');
}

function abcMsgUpdate(){
  const msg = document.getElementById('abcMsg'); if(!msg) return;
  const said = (L1.abcOk||[]).length, seen = (L1.abc||[]).length, total = (F().alphabet||[]).length;
  msg.innerHTML = said >= total
    ? `<span style="color:var(--good);font-weight:800">All ${total} letters said correctly ✓</span>`
    : `<span class="usub">${seen}/${total} letters opened · <b style="color:var(--good)">${said}</b> said correctly</span>`;
}
function abcSaid(i){
  L1.abcOk = L1.abcOk || [];
  if(L1.abcOk.includes(i)) return;
  L1.abcOk.push(i);
  const tile = document.getElementById('abc'+i), ok = document.getElementById('abcOk'+i);
  if(tile){ tile.classList.add('abcDone'); tile.style.borderColor='var(--good)'; tile.style.background='color-mix(in srgb,var(--good) 10%,var(--card))'; }
  if(ok) ok.textContent = '✓';
  abcMsgUpdate();
  const n = L1.abcOk.length, total = (F().alphabet||[]).length;
  const btn = document.getElementById('abcGo');
  if(btn) btn.textContent = n >= total ? 'Perfekt! Finish Lesson 1 ✓' : `Finish Lesson 1 (${n}/${total} said) ✓`;
  if(n >= total){
    const box = document.getElementById('abcCongrats');
    if(box){
      box.innerHTML = `<div class="card" style="border-color:var(--good);background:color-mix(in srgb,var(--good) 8%,var(--card));margin-top:10px">
 <div class="row" style="align-items:flex-start;gap:10px">
 <div class="confetti" style="min-width:84px">${avatarSVG('de','happy',84)}</div>
 <div><b style="font-family:var(--font-head);font-size:16px">Das ganze Alphabet!</b>
 <p style="font-size:13.5px;line-height:1.55;margin-top:5px">Every letter <i>and</i> every word · ${total} of zem, said out loud in German. You can now spell your name at any office and order an <b>Apfel</b> at ze market. Zat is a real first day, ${esc(S.name||'my friend')}.</p></div>
</div></div>`;
      box.scrollIntoView({behavior:'smooth', block:'nearest'});
    }
    setTimeout(()=>teacherSay('Das ganze Alphabet! Every letter and every word, said out loud. Wunderbar.'), 350);
  }
}
function abcPick(i){
  const [L, name, word, en, pic] = (F().alphabet||[])[i];
  L1.abc = L1.abc || [];
  if(!L1.abc.includes(i)) L1.abc.push(i);
  document.querySelectorAll('.abcTile').forEach(t=>{ t.classList.remove('on'); t.style.transform=''; });
  const tile = document.getElementById('abc'+i);
  if(tile){ tile.classList.add('on'); tile.style.transform='scale(1.06)'; }
  const box = document.getElementById('abcFocus');
  if(box){
    const isSS = L === 'ß';
    box.innerHTML = `<div class="card" style="border-color:var(--accent);animation:fade .25s ease">
 <div class="row" style="gap:14px;align-items:flex-start">
 <div style="width:74px;min-width:74px;height:74px;border-radius:20px;background:var(--tint);display:flex;align-items:center;justify-content:center;font-size:38px">${pic}</div>
 <div class="grow" style="min-width:0">
 <div class="row" style="gap:8px"><span style="font-family:var(--font-head);font-weight:800;font-size:30px;line-height:1">${L}</span>
 <span class="usub" style="font-size:12px">spoken „${name}"</span></div>
 <div style="font-family:var(--font-head);font-weight:800;font-size:16.5px;margin-top:6px">${L} wie ${esc(word.replace(/^(der|die|das) /,''))}</div>
 <div class="usub" style="font-size:13px">${esc(word)}, ${esc(en)}</div>
</div>
</div>
 <div class="row" style="gap:10px;margin-top:11px">
        ${sayIt(word, {uid:'abc_'+i, noPlay:true, cb:`abcSaid(${i})`})}
 <span class="usub" style="font-size:11.5px">🎤 say it back</span>
</div>
      ${isSS ? `<div class="usub" style="font-size:11.5px;margin-top:9px;line-height:1.45">⚠️ <b>ß never starts a word</b>, it only appears in the middle or at the end, like <b>Fuß</b>.</div>` : ''}
</div>`;
    box.scrollIntoView({behavior:'smooth', block:'nearest'});
  }
  abcMsgUpdate();
  speak(L === 'ß' ? 'scharfes S' : L);
  setTimeout(()=>speak(word), 900);
}
/* ---- ARCHIVED: the ABC song, real melody (Twinkle Twinkle) + a voice pitched to each note.
   Kept intact for later; nothing links to it right now. ---- */
const N = {C:261.63, D:293.66, E:329.63, F:349.23, G:392.00, A:440.00};
/* [letter, note, beats], the tune every German child learns */
const ABC_SONG = [
 ['A','C',1],['B','C',1],['C','G',1],['D','G',1],['E','A',1],['F','A',1],['G','G',2],
 ['H','F',1],['I','F',1],['J','E',1],['K','E',1],['L','D',1],['M','D',1],['N','D',1],['O','D',1],['P','C',2],
 ['Q','G',1],['R','G',1],['S','F',2],
 ['T','E',1],['U','E',1],['V','D',2],
 ['W','G',1],['X','G',1],['Y','F',1],['Z','E',2],
 ['Ä','D',1],['Ö','D',1],['Ü','C',2]
];
const NOTE_PITCH = {C:0.82, D:0.94, E:1.06, F:1.18, G:1.34, A:1.52};
let ABC_AC = null, singing = false;
function abcTone(note, dur){
  try{
    ABC_AC = ABC_AC || new (window.AudioContext || window.webkitAudioContext)();
    if(ABC_AC.state === 'suspended') ABC_AC.resume();
    const t = ABC_AC.currentTime;
    const osc = ABC_AC.createOscillator(), gain = ABC_AC.createGain();
    osc.type = 'triangle'; osc.frequency.value = N[note];
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.16, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain); gain.connect(ABC_AC.destination);
    osc.start(t); osc.stop(t + dur + 0.06);
  }catch(e){}
}
function songTileIndex(letter){ return (F().alphabet||[]).findIndex(r => r[0] === letter); }
function l1Song(slow){
  if(singing){ singing = false; speechSynthesis.cancel(); return; }
  singing = true;
  const btn = document.getElementById('songBtn');
  if(btn){ btn.textContent = '⏹ Stop'; }
  const beat = slow ? 0.62 : 0.44;
  let i = 0;
  function step(){
    if(!singing || i >= (F().song||[]).length) return finish();
    const [L, note, beats] = (F().song||[])[i];
    const dur = beat * beats;
    abcTone(note, dur);
    document.querySelectorAll('.songL').forEach(s=>{ s.style.background='transparent'; s.style.color='var(--ink)'; s.style.transform=''; });
    const tile = document.getElementById('sl' + songTileIndex(L));
    if(tile){ tile.style.background='var(--accent)'; tile.style.color='var(--accent-ink)'; tile.style.transform='scale(1.18)'; }
    let advanced = false;
    const next = () => { if(advanced) return; advanced = true; i++; setTimeout(step, 40); };
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(L);
      u.lang = targetLang(); try{ if(deVoice) u.voice = deVoice; }catch(e){}
      u.rate = slow ? 0.72 : 0.9;
      u.pitch = NOTE_PITCH[note];
      u.onend = () => setTimeout(next, Math.max(0, dur*1000 - 340));
      u.onerror = next;
      speechSynthesis.speak(u);
      setTimeout(next, dur*1000 + 900);   /* safety, so the song never stalls */
    }catch(e){ setTimeout(next, dur*1000); }
  }
  function finish(){
    singing = false;
    document.querySelectorAll('.songL').forEach(s=>{ s.style.background='var(--tint)'; s.style.color='var(--accent)'; s.style.transform=''; });
    const b = document.getElementById('songBtn');
    if(b) b.textContent = '🎵 Sing it again';
    setTimeout(()=>teacherSay('Now you sing it with me, zat is how every German child learns it.'), 500);
  }
  step();
}
function l1Finish(){
  const uid = L1.unit || F().unit;
  unitState(uid).lesson = true;
  if(L1.only !== 'alphabet') S.speakTest = {ok:L1.speakOk, total:L1.speakItems.length||8};
  if(L1.only !== 'intro' && !S.greetTest) S.greetTest = {ok: G?G.done.length:0, total:(F().greetings||[]).length};
  if(S.intro && S.intro.country) S.country = S.intro.country;
  bumpStreak(); save();
  const sp = (L1.only === 'alphabet') ? {ok:0,total:0} : (S.speakTest || {ok:0,total:0});
  const gr = (L1.only === 'intro')    ? {ok:0,total:0} : (S.greetTest || {ok:0,total:0});
  const abc = (L1.abcOk||[]).length, abcTotal = (L1.only === 'intro') ? 0 : (F().alphabet||[]).length;
  const ok = sp.ok + gr.ok + abc, total = Math.max(1, sp.total + gr.total + abcTotal);
  go('checkResult', {kind:'lesson', uid, pct: Math.round(ok/total*100), scored:[]});
}


/* ================= THE GERMAN FIRST-LESSON PACK =================
   Everything language-shaped in this file lives here. A second language
   supplies the same shape and the whole lesson works unchanged.
   ================================================================ */
COURSES.de.first = {
  unit: 's0a',
  hello: 'Herzlich willkommen!',
  say: 'Let us start vith ze most useful zing you can own: your own introduction. Fill in ze blanks and it becomes yours.',
  boardTitle: 'Meine Vorstellung \u00b7 my introduction',
  greetSay: 'Now ze greetings. <b>Guten Morgen</b> until eleven, <b>Guten Tag</b> until evening, <b>Guten Abend</b> after. <b>Gute Nacht</b> only at bedtime, say it in ze office and zey think you are moving in!',
  abcSay: 'Tap a letter \u00b7 I say it <i>and</i> give you a word that starts with it. Zirty letters, zirty new words.',
  abcTitle: 'Das Alphabet',
  songSay: 'Every German child learns ze ABC to zis melody, ze same one as ze English song. Follow ze letters and sing with me. My voice is\u2026 <i>enthusiastic</i>.',
  lines: [
    {de:'Hallo!', en:'Hello!'},
    {de:'Guten Morgen!', en:'Good morning!'},
    {pre:'Ich hei\u00dfe ', blank:'name', ph:'your name', post:'.', en:'My name is \u2026'},
    {pre:'Ich bin ', blank:'age', ph:'age', w:62, post:' Jahre alt.', en:'I am \u2026 years old.'},
    {pre:'Ich bin ', gender:true, en:'I am a woman / a man \u00b7 tap one, optional'},
    {pre:'Ich komme aus ', blank:'country', ph:'country', post:'.', en:'I come from \u2026', map:'countries'},
    {pre:'Ich wohne in ', blank:'city', ph:'your city', w:108, post:'.', en:'I live in \u2026'},
    {pre:'Ich spreche ', blank:'lang', ph:'language', w:108, post:'.', en:'I speak \u2026', map:'languages'},
    {de:'Ich lerne Deutsch.', en:'I am learning German.'},
    {de:'Danke! Tsch\u00fcss!', en:'Thank you! Bye!'}
  ],
  gender: L1_GENDER,
  countries: COUNTRY_DE,
  languages: LANG_DE,
  alphabet: ALPHABET,
  greetings: GREETINGS,
  song: ABC_SONG
};
