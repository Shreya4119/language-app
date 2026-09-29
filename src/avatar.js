/* ============ TEACHERS, one per language ============ */
const TEACHERS = {
  de: {name:'Klara', lang:'German', hello:'Herzlich willkommen! Ich heiße Klara.',
       first:'In our first class you vill introduce yourself to me, zat is how I learn your name.',
       blurb:'I teach German the way I wish somebody had taught me: from ze fundamentals, out loud, and always with ze reason behind ze rule.'},
  fr: {name:'Marie', lang:'French', hello:'Bienvenue! Je m\'appelle Marie.', blurb:'Coming soon.'},
  es: {name:'Lucía', lang:'Spanish', hello:'¡Bienvenido! Me llamo Lucía.', blurb:'Coming soon.'},
  nl: (typeof SANNE !== 'undefined' && SANNE) ? SANNE
      : {name:'Sanne', lang:'Dutch', hello:'Hallo! Ik heet Sanne.', blurb:'Coming soon.'}
};
function TT(){ return TEACHERS[S.lang || 'de'] || TEACHERS.de; }
function TN(){ return TT().name; }

/* ================= TEACHER AVATAR · "Mia" ================= */
/* mode: 'neutral' | 'de' (German trachten look after language pick)
   expr: 'calm' | 'happy' | 'warm'  */
function avatarSVG(mode, expr, size){
  size = size || 120; mode = mode || 'de'; expr = expr || 'calm';
  const skin='#EFC5A2', skin2='#E0B48F', hair='#6B4A33', hairHi='#7C583D', lip='#BE6A52', frame='#7A4A26';
  const eyes = expr==='happy'
    ? `<path d="M63 87 Q70 81 77 87" stroke="#3A2B20" stroke-width="3" fill="none" stroke-linecap="round"/>
 <path d="M107 87 Q114 81 121 87" stroke="#3A2B20" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="70" cy="87" rx="3.9" ry="4.9" fill="#3A2B20"/><ellipse cx="114" cy="87" rx="3.9" ry="4.9" fill="#3A2B20"/>
 <circle cx="71.4" cy="85" r="1.3" fill="#fff"/><circle cx="115.4" cy="85" r="1.3" fill="#fff"/>`;
  const brows = expr==='warm'
    ? `<path d="M60 71 Q69 66 78 70" stroke="${hair}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
 <path d="M106 70 Q115 66 124 71" stroke="${hair}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
    : `<path d="M60 70 Q69 65 78 68" stroke="${hair}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
 <path d="M106 68 Q115 65 124 70" stroke="${hair}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const mouth = expr==='happy'
    ? `<path d="M82 101 Q92 111 102 101 Q92 107 82 101 Z" fill="${lip}"/>`
    : `<path d="M84 101 Q92 108 100 101" stroke="${lip}" stroke-width="3.3" fill="none" stroke-linecap="round"/>`;
  /* the lapel pin is the flag of the language being learned, not always German */
  const FLAG = {de:['#1A1A1A','#C8102E','#E8C33C'], nl:['#AE1C28','#F7F1E4','#21468B'],
                fr:['#0055A4','#F7F1E4','#EF4135'], es:['#AA151B','#F1BF00','#AA151B']};
  const stripes = FLAG[(typeof S !== 'undefined' && S.lang) ? S.lang : 'de'] || FLAG.de;
  const pin = mode!=='neutral'
    ? `<g transform="translate(70,168)"><rect x="0" y="0" width="13" height="4" rx="1" fill="${stripes[0]}"/><rect x="0" y="4" width="13" height="4" fill="${stripes[1]}"/><rect x="0" y="8" width="13" height="4" rx="1" fill="${stripes[2]}"/></g>`
    : '';
  return `<svg width="${size}" height="${size*1.1}" viewBox="0 0 184 202" style="display:block">
 <g transform="translate(-2,-8)">
 <!-- back hair -->
 <path d="M48 94 Q42 30 92 28 Q142 30 136 94 Q138 118 128 134 L56 134 Q46 118 48 94 Z" fill="${hair}"/>
 <!-- loose academic updo -->
 <circle cx="92" cy="30" r="17" fill="${hair}"/>
 <circle cx="76" cy="36" r="10" fill="${hairHi}"/><circle cx="108" cy="36" r="10" fill="${hairHi}"/>
 <path d="M84 22 Q92 16 100 22" stroke="${hairHi}" stroke-width="2.4" fill="none"/>
 <!-- neck -->
 <rect x="81" y="116" width="22" height="38" rx="10" fill="${skin2}"/>
 <path d="M81 136 Q92 145 103 136 L103 156 L81 156 Z" fill="${skin2}"/>
 <!-- face -->
 <circle cx="92" cy="86" r="42" fill="${skin}"/>
 <!-- front hair -->
 <path d="M50 90 Q46 38 92 36 Q138 38 134 90 Q130 60 110 52 Q118 66 114 76 Q108 54 92 54 Q70 56 70 78 Q62 68 72 54 Q52 62 50 90 Z" fill="${hair}"/>
 <!-- escaped strands -->
 <path d="M52 88 Q47 108 58 119" stroke="${hair}" stroke-width="5" fill="none" stroke-linecap="round"/>
 <path d="M132 88 Q137 108 126 119" stroke="${hair}" stroke-width="5" fill="none" stroke-linecap="round"/>
 <!-- ears + pearl studs -->
 <circle cx="50" cy="92" r="6" fill="${skin}"/><circle cx="134" cy="92" r="6" fill="${skin}"/>
 <circle cx="50" cy="101" r="3" fill="#F2F0EA"/><circle cx="134" cy="101" r="3" fill="#F2F0EA"/>
 <!-- tortoiseshell readers on a chain -->
 <circle cx="70" cy="88" r="13" fill="none" stroke="${frame}" stroke-width="2.4"/>
 <circle cx="114" cy="88" r="13" fill="none" stroke="${frame}" stroke-width="2.4"/>
 <path d="M83 88 Q92 84 101 88" stroke="${frame}" stroke-width="2.2" fill="none"/>
 <path d="M57 90 Q48 104 52 120" stroke="#C9A34A" stroke-width="1.3" fill="none"/>
 <path d="M127 90 Q136 104 132 120" stroke="#C9A34A" stroke-width="1.3" fill="none"/>
    ${brows}${eyes}
 <path d="M90 90 Q88 95 92 96" stroke="${skin2}" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${mouth}
 <circle cx="60" cy="97" r="6" fill="#EE9B7E" opacity=".32"/><circle cx="124" cy="97" r="6" fill="#EE9B7E" opacity=".32"/>
 <!-- forest-green cardigan over cream blouse (matches the chalkboard) -->
 <path d="M46 200 Q46 149 92 144 Q138 149 138 200 Z" fill="#2E5D43"/>
 <path d="M75 146 Q92 164 109 146 L109 200 L75 200 Z" fill="#F7F1E4"/>
 <path d="M75 146 L92 168 L109 146" stroke="#F7F1E4" stroke-width="3" fill="none"/>
 <circle cx="92" cy="178" r="3.2" fill="#E8D9B5"/><circle cx="92" cy="192" r="3.2" fill="#E8D9B5"/>
    ${pin}
</g></svg>`;
}

/* calm teacher voice: English explanations */
let enVoice = null;
function pickEnVoice(){
  try{ const vs = speechSynthesis.getVoices();
  enVoice = vs.find(v=>/en(-|_)(GB|US)/.test(v.lang) && /female|Samantha|Google UK English Female|Zira|Aria/i.test(v.name)) || vs.find(v=>v.lang && v.lang.startsWith('en')) || null; }catch(e){}
}
if('speechSynthesis' in window){ pickEnVoice(); const old = speechSynthesis.onvoiceschanged; speechSynthesis.onvoiceschanged = ()=>{ pickVoice(); pickEnVoice(); }; }
/* one voice for the whole app: Klara's German voice, English lines included */
const KLARA = {rate:0.97, pitch:1.14};
function teacherSay(text){ spQueue(Object.assign({text}, KLARA)); }
/* she says the German line, waits for it to finish, then explains */
function sayThenTeacher(de, text){
  spQueue([{text:de, rate:0.9}, Object.assign({text}, KLARA)]);
}
/* explanation first, then she reads the board lines out loud */
function teacherThenLines(text, lines){
  spQueue([Object.assign({text}, KLARA)].concat((lines||[]).map(l=>({text:l, rate:0.86}))));
}

/* teacher + speech bubble component */
function teacherBox(text, opts){
  opts = opts || {};
  const mode = opts.mode || (S.langPicked ? 'de' : 'neutral');
  const expr = opts.expr || 'calm';
  const size = opts.size || 108;
  const de = opts.de || null;  /* optional German line she says first */
  const id = 'tb'+Math.floor(Math.random()*99999);
  const after = opts.after || null;   /* board lines she reads out after explaining */
  window['_say_'+id] = () => {
    const q = [];
    if(de) q.push({text:de, rate:0.9});
    q.push(Object.assign({text}, KLARA));
    (after||[]).forEach(l => q.push({text:l, rate:0.86}));
    spQueue(q);
  };
  if(opts.autoSpeak!== false) setTimeout(window['_say_'+id], 450);
  return `<div class="row" style="align-items:flex-end;gap:10px;margin:6px 0 10px">
 <div style="min-width:${size}px">${avatarSVG(mode, expr, size)}</div>
 <div style="position:relative;flex:1;background:var(--card);border:1.5px solid var(--line);border-radius:18px;border-bottom-left-radius:4px;padding:13px 14px;box-shadow:var(--shadow)">
 <div class="tlabel">${(S.langPicked||S.onboarded)?TN().toUpperCase()+' · YOUR TEACHER':'YOUR TEACHER'}</div>
      ${de?`<div style="font-family:var(--font-head);font-weight:800;font-size:15px;margin-bottom:3px">${esc(de)}</div>`:''}
 <div style="font-size:13.5px;line-height:1.55">${text}</div>
 <button class="chip" style="padding:5px 10px;font-size:11px;margin-top:8px" onclick="window['_say_${id}']()">▶ hear ${(S.langPicked||S.onboarded)?TN():'her'}</button>
</div></div>`;
}

/* ============ ONBOARDING with Mia (overrides) ============ */
/* One entry point for choosing a language: swap the course pack, then the
   voice, then go. The order matters: pickVoice() reads the loaded course. */
function pickLang(id){
  S.lang = id; S.langPicked = true; save();
  loadCourse(id);
  pickVoice();
  go('meetTeacher');
}
SCREENS.onboard1 = () => {
  const langs = [
    ['de','German','Deutsch · full A1 course', true, ['#111','#DE1017','#FFCC00']],
    ['fr','French','Français · coming soon', false, ['#0055A4','#fff','#EF4135']],
    ['es','Spanish','Español · coming soon', false, ['#AA151B','#F1BF00','#AA151B']],
    ['nl','Dutch','Nederlands · Stage 0 ready', true, ['#AE1C28','#fff','#21468B']]];
  app.innerHTML = `<div class="screen noNav">
 <div style="margin-bottom:26px">${sprakWordmark()}</div>
 <h1>Which language are you learning?</h1>
 <p class="sub" style="margin-top:8px">Pick one and your first class starts right away.</p>
 <div style="display:flex;flex-direction:column;gap:10px;margin-top:18px">
    ${langs.map(([id,n,s,on,f])=>`
 <div class="pathRow ${on?'':'locked'}" ${on?`onclick="pickLang('${id}')"`:''}>
 <div style="width:40px;height:28px;border-radius:6px;overflow:hidden;display:flex;flex-direction:column">${f.map(c=>`<div style="flex:1;background:${c}"></div>`).join('')}</div>
 <div class="grow"><div class="uname">${n}</div><div class="usub">${s}</div></div>
        ${on?'<span style="color:var(--accent);font-weight:800">→</span>':'<span style="font-size:12px;color:var(--muted)">soon</span>'}
</div>`).join('')}
</div>
 <div class="grow"></div>
 <p class="sub center" style="font-size:12px">No account, no forms · progress saved on your device</p>
</div>`;
};
SCREENS.onboard2 = () => go('onboard1');
SCREENS.meetTeacher = () => {
  const t = TT();
  app.innerHTML = `<div class="screen noNav">
 <div class="center" style="margin-top:14px">
 <div style="display:flex;justify-content:center" class="confetti">${avatarSVG('de','happy',170)}</div>
 <div class="tag" style="display:inline-block;margin-top:10px">YOUR ${esc(t.lang.toUpperCase())} TEACHER</div>
 <h1 style="margin-top:8px">${esc(t.name)}</h1>
</div>
    ${(typeof voiceWarning==='function') ? voiceWarning() : ''}
 <div class="card" style="margin-top:14px">
 <b style="font-family:var(--font-head);font-size:16px;display:block">${esc(t.hello)}</b>
 <p style="font-size:13.5px;line-height:1.6;margin-top:10px">${esc(t.blurb)}</p>
 <p class="usub" style="font-size:11.5px;margin-top:9px">${esc(t.first || 'In our first class you will introduce yourself to me. That is how I learn your name.')}</p>
</div>
 <div class="grow"></div>
 <button class="btn" onclick="go('onboard3')">Let us begin →</button>
</div>`;
  /* one queue: the greeting finishes in full, then the blurb she has written above */
  setTimeout(()=>sayThenTeacher(t.hello, t.blurb), 500);
};

SCREENS.onboard3 = () => {
  app.innerHTML = `<div class="screen noNav">
    ${teacherBox("Before we start, how much German do you know already? Be honest, I alvays am.", {mode:'de', expr:'warm'})}
 <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px">
 <div class="pathRow" onclick="obDone(0)"><div class="badge" style="background:var(--tint)">🌱</div><div class="grow"><div class="uname">Nothing yet</div><div class="usub">Start from Hallo, perfect</div></div></div>
 <div class="pathRow" onclick="obDone(1)"><div class="badge" style="background:var(--tint)">🌿</div><div class="grow"><div class="uname">A little</div><div class="usub">I know some words & phrases</div></div></div>
 <div class="pathRow" onclick="obDone(2)"><div class="badge" style="background:var(--tint)">🌳</div><div class="grow"><div class="uname">Some</div><div class="usub">I can form simple sentences</div></div></div>
</div>
 <div class="grow"></div>
</div>`;
};

/* ============ CLASSROOM: board + teacher ============ */
function boardScene(title, bodyHTML, bubbleText, opts){
  opts = opts || {};
  const mode = opts.mode || ((S.langPicked||S.onboarded)?'de':'neutral');
  const id = 'bd'+Math.floor(Math.random()*99999);
  window['_say_'+id] = () => {
    const q = [];
    if(opts.de) q.push({text:opts.de, rate:0.9});
    q.push(Object.assign({text:bubbleText}, KLARA));
    (opts.after||[]).forEach(l => q.push({text:l, rate:0.86}));
    spQueue(q);
  };
  if(opts.autoSpeak!== false) setTimeout(window['_say_'+id], 500);
  return `
 <div style="position:relative;margin:2px 0 6px;padding-bottom:6px">
 <div style="background:#6B4A32;border-radius:18px;padding:9px 9px 6px">
 <div style="background:#2F5949;border-radius:10px;padding:16px 96px 20px 16px;min-height:140px;box-shadow:inset 0 0 34px rgba(0,0,0,.28)">
 <div style="font-family:var(--font-head);color:#FDF8EC;font-size:18px;font-weight:800;display:inline-block;border-bottom:2.5px solid rgba(253,248,236,.55);padding-bottom:3px;margin-bottom:9px;transform:rotate(-.5deg)">${title}</div>
 <div style="color:#EFE9D6;font-size:13.5px;line-height:1.62">${bodyHTML}</div>
</div>
 <div class="row" style="padding:5px 10px 3px;gap:6px">
 <div style="width:26px;height:6px;border-radius:3px;background:#FDF8EC"></div>
 <div style="width:16px;height:6px;border-radius:3px;background:#E8B7A0"></div>
 <div class="grow"></div>
 <div style="width:34px;height:9px;border-radius:3px;background:#4A342A"></div>
</div>
</div>
 <div style="position:absolute;right:-4px;bottom:-4px;filter:drop-shadow(0 3px 6px rgba(0,0,0,.18))">${avatarSVG(mode, opts.expr||'warm', 104)}</div>
</div>
 <div style="position:relative;background:var(--card);border:1.5px solid var(--line);border-radius:16px;border-top-right-radius:4px;padding:12px 14px;box-shadow:var(--shadow);margin-bottom:8px">
 <div class="tlabel">${(S.langPicked||S.onboarded)?TN().toUpperCase()+' · YOUR TEACHER':'YOUR TEACHER'}</div>
    ${opts.de?`<div style="font-family:var(--font-head);font-weight:800;font-size:15px;margin-bottom:3px">${esc(opts.de)}</div>`:''}
 <div style="font-size:13.5px;line-height:1.55">${bubbleText}</div>
 <button class="chip" style="padding:5px 10px;font-size:11px;margin-top:8px" onclick="window['_say_${id}']()">▶ hear ${(S.langPicked||S.onboarded)?TN():'her'}</button>
</div>`;
}

/* ============ FACT CARDS (grammar + culture) ============ */
function factCard(kind, f){
  const isG = kind === 'grammar';
  return `<div class="card" style="margin-bottom:10px;${isG?'':'background:var(--tint);border-color:transparent'}">
 <div class="row" style="gap:8px;margin-bottom:7px">
 <span style="font-size:17px">${isG?'💡':'🧭'}</span>
 <span class="tag" style="${isG?'':'background:var(--card)'}">${isG?'GOOD TO KNOW':'CULTURE'}</span>
</div>
 <b style="font-family:var(--font-head);font-size:16.5px">${f.title}</b>
 <div class="gbody" style="margin-top:6px">${f.body}</div>
    ${f.gloss?`<div style="margin-top:11px;border-top:1px solid var(--line);padding-top:9px">
      ${f.gloss.map(([de,en])=>`<div class="row" style="gap:8px;padding:4px 0">
 <span style="flex:1.05;min-width:0"><b style="font-size:13px">${esc(de)}</b></span>
 <span style="flex:1.15;font-size:11.5px;color:var(--muted);line-height:1.35">${esc(en)}</span>
 <button class="ico" style="width:27px;height:27px;min-width:27px;font-size:11px" onclick="sayEnDe('${de.replace(/'/g,"\\'")}','${en.replace(/'/g,"\\'")}')" title="listen · English, then German">🔊</button>
</div>`).join('')}
</div>`:''}
</div>`;
}
function factsBody(u){ return (u.grammar?factCard('grammar',u.grammar):'') + (u.culture?factCard('culture',u.culture):''); }
function openFacts(uid){
  const u = UNITS.find(x=>x.id===uid); if(!u) return;
  spStop();
  const d = document.createElement('div');
  d.className = 'modal';
  d.onclick = e => { if(e.target===d) d.remove(); };
  d.innerHTML = `<div class="inner">
 <div class="row" style="margin-bottom:12px">
 <b class="grow" style="font-family:var(--font-head);font-size:17px">💡 Facts, ${esc(u.title)}</b>
 <button class="chip" style="padding:6px 12px;font-size:12px" onclick="this.closest('.modal').remove()">Close</button>
</div>
    ${factsBody(u)}</div>`;
  app.appendChild(d);
}
