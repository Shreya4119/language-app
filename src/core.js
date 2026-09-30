/* ================= CORE ENGINE ================= */
const $ = sel => document.querySelector(sel);
const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---- safe storage (works as file; degrades in restricted previews) ---- */
const store = {
  ok:(()=>{ try{ localStorage.setItem('_t','1'); localStorage.removeItem('_t'); return true; }catch(e){ return false; } })(),
  mem:{},
  get(k){ if(this.ok){ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } } return this.mem[k]||null; },
  set(k,v){ if(this.ok){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} } this.mem[k]=v; }
};

/* ---- state ---- */
const DEFAULT = { name:'', lang:'de', openStages:{0:true}, micOk:false, theme:'plum', voiceName:'Google Deutsch', onboarded:false, streak:0, lastDay:'', days:[],
  words:{}, units:{}, scenarios:{}, stories:{}, hand:{}, revised:{}, wroteSeen:false, writingDone:false, mock:{best:null,modules:null}, milestoneSeen:false };
let S = Object.assign(JSON.parse(JSON.stringify(DEFAULT)), store.get('sprak') || store.get('fluently') || {});
function save(){ store.set('sprak', S); }
function today(){ return new Date().toISOString().slice(0,10); }
function bumpStreak(){
  const t = today();
  S.days = (S.days || []).filter(d => d > new Date(Date.now()-30*864e5).toISOString().slice(0,10));
  if(!S.days.includes(t)) S.days.push(t);
  if(S.lastDay === t){ save(); return; }
  const y = new Date(Date.now()-864e5).toISOString().slice(0,10);
  S.streak = (S.lastDay === y) ? S.streak+1 : 1;
  S.lastDay = t; save();
}

/* ---- grading, on the school scale of the country you are learning for ----
   German counts backwards (1 best, 6 worst). Dutch marks out of 10.
   The scale lives in the course pack; this just reads it. */
const NOTE_DE = {note:'Note', best:1,
  scale:[[92,1,'sehr gut','very good'],[81,2,'gut','good'],[67,3,'befriedigend','satisfactory'],
         [50,4,'ausreichend','sufficient'],[30,5,'mangelhaft','weak'],[0,6,'ungenügend','not yet']]};
function gradeScale(){ return (typeof course === 'function' && course().grades) || NOTE_DE; }
function note(pct){
  const g = gradeScale();
  for(let i = 0; i < g.scale.length; i++){
    const [min, n, native, en] = g.scale[i];
    if(pct >= min) return {n, de:native, en, label:g.note, i, of:g.scale.length};
  }
  const i = g.scale.length - 1, last = g.scale[i];
  return {n:last[1], de:last[2], en:last[3], label:g.note, i, of:g.scale.length};
}
/* passed = in the better half of whatever scale is in use */
function notePassed(pct){ const n = note(pct); return n.i < Math.ceil(n.of / 2); }
/* a mark is "good" when it is nearer the best end of whichever scale is in use */
/* colour by how near the mark is to the best end of whichever scale is in use */
/* Colour by position in the scale rather than by the mark's value: a Chinese
   \u4f18 is a top mark and a German 1 is a top mark, and neither is comparable
   as a number. */
function noteColor(i, of){
  const frac = 1 - (i / Math.max(1, (of || 1) - 1));   /* 1 = best band, 0 = worst */
  return frac >= 0.7 ? 'var(--good)' : frac >= 0.4 ? 'var(--warn)' : 'var(--bad)';
}
function gradeBadge(pct){
  const g = note(pct);
  return `<span class="grade"><span class="n" style="color:${noteColor(g.i, g.of)}">${esc(String(g.n))}</span>
 <span style="line-height:1.25"><b style="font-size:13px">${g.de}</b>
 <div class="usub" style="font-size:10.5px">${esc(g.label)} ${g.n} · ${pct}%</div></span></span>`;
}
/* ---- A1 readiness: the honest north star ---- */
function a1Readiness(){
  const open = UNITS.filter(u=>!u.locked);
  const doneN = open.filter(u=>unitDone(u.id)).length;
  const st = skillStats();
  const unitPart  = open.length ? doneN/open.length : 0;
  const vocabPart = (st.vocab||0)/100;
  const mockPart  = (S.mock && S.mock.best!=null) ? Math.min(1, S.mock.best/60) : 0;
  return Math.round((unitPart*0.45 + vocabPart*0.35 + mockPart*0.20) * 100);
}
function readyRing(size, pct){
  size = size||56; const r = 22, circ = 2*Math.PI*r;
  return `<svg width="${size}" height="${size}" viewBox="0 0 56 56" style="display:block">
 <circle cx="28" cy="28" r="${r}" fill="none" stroke="var(--line)" stroke-width="6"/>
 <circle cx="28" cy="28" r="${r}" fill="none" stroke="var(--accent)" stroke-width="6" stroke-linecap="round"
      stroke-dasharray="${circ}" stroke-dashoffset="${circ*(1-pct/100)}" transform="rotate(-90 28 28)"/>
 <text x="28" y="31" text-anchor="middle" font-family="var(--font-head)" font-weight="800" font-size="15" fill="var(--ink)">${pct}</text>
</svg>`;
}
/* ---- practice days (gentle, never shaming) ---- */
function weekStrip(){
  const days = S.days || [];
  const names = ['S','M','D','M','D','F','S'];
  let out = '';
  for(let i=6;i>=0;i--){
    const d = new Date(Date.now() - i*864e5);
    const iso = d.toISOString().slice(0,10);
    out += `<div class="weekdot ${days.includes(iso)?'on':''} ${i===0?'today':''}">${names[d.getDay()]}</div>`;
  }
  return `<div class="row" style="gap:6px">${out}</div>`;
}

/* ---- mastery / SRS ---- */
const M_LABEL = ['new','shaky','learning','solid','mastered'];
const M_CLASS = ['m-new','m-shaky','m-new','m-solid','m-master'];
function wstate(id){ if(!S.words[id]) S.words[id] = {lv:0, miss:0, seen:0, due:0}; return S.words[id]; }
function wordResult(id, ok){
  const w = wstate(id); w.seen++;
  if(ok){ w.lv = Math.min(4, Math.max(w.lv + 1, 2)); } else { w.lv = 1; w.miss++; }  /* lv 1 = shaky, reserved for misses */
  const days = [0, .3, 1, 3, 7][w.lv];
  w.due = Date.now() + days*864e5; save();
}
function dueWords(){
  return Object.keys(S.words).filter(id => S.words[id].seen>0 && S.words[id].due <= Date.now() && VOCAB[id]).slice(0,12);
}
function shakyWords(unit){
  const pool = unit ? unit.vocab : Object.keys(S.words);
  return pool.filter(id => S.words[id] && S.words[id].lv===1);
}
function unitState(id){ if(!S.units[id]) S.units[id] = {lesson:false, check:null}; return S.units[id]; }
function unitDone(id){ const u = unitState(id); return u.lesson && u.check!== null && u.check >= 70; }
function stage0Done(){ return UNITS.filter(u=>u.stage===0 && !u.planned && unitDone(u.id)).length; }
function unlocked(u){
  if(u.planned) return false;
  if(u.stage===0) return true;
  const built = UNITS.filter(x=>!x.planned);
  const i = built.indexOf(u);
  if(i<=0) return stage0Done() >= 3;
  const prev = built[i-1];
  if(prev.stage===0) return stage0Done() >= 3;
  return unitDone(prev.id);
}
/* The milestone is "after the first three units of Stage 1", not "after u1,
   u2 and u3". Those ids are German. A course without three built Stage 1
   units simply has no milestone yet, and says so rather than throwing. */
function milestoneUnits(){ return UNITS.filter(u=>!u.planned && u.stage===1).slice(0,3); }
function hasMilestone(){ return milestoneUnits().length === 3; }
function milestoneNext(){
  const built = UNITS.filter(u=>u.stage===1);
  return built[3] || null;
}
function milestoneReady(){ return hasMilestone() && milestoneUnits().every(u=>unitDone(u.id)); }
function milestoneReqs(){
  const reqs = [];
  milestoneUnits().forEach(u=>{
    const id = u.id, st = unitState(id);
    reqs.push({ok:(st.check||0)>=80, label:`Unit „${u.title}" check ≥ 80%`, sub:st.check!==null?`currently ${st.check}%`:'not taken yet', unit:id});
  });
  const sh = ['u1','u2','u3'].flatMap(id=>shakyWords(UNITS.find(x=>x.id===id)));
  reqs.push({ok:sh.length<=3, label:'At most 3 shaky words across Units 1-3', sub:`currently ${sh.length} shaky`, drill:sh});
  return reqs;
}
function milestonePassed(){ return milestoneReady() && milestoneReqs().every(r=>r.ok); }

/* ---- skill estimates (honest, from real data) ---- */
function skillStats(){
  /* Progress is saved across every course, so scope it to the loaded one.
     Without this, mastering a German word inflates the Dutch word count. */
  const ids = Object.keys(S.words).filter(id=>S.words[id].seen>0 && VOCAB[id]);
  const mine = new Set(UNITS.map(u=>u.id));
  const avg = arr => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;
  const vocab = avg(ids.map(id=>S.words[id].lv/4*100));
  const checks = Object.keys(S.units).filter(id=>mine.has(id) && S.units[id].check!==null).map(id=>S.units[id].check);
  const grammar = avg(checks);
  const listening = avg(ids.filter(id=>S.words[id].dict).map(id=>Math.min(100,(S.words[id].dictOk||0)*50)));
  const stories = Object.values(S.stories).filter(s=>s.score!=null).map(s=>s.score);
  const reading = avg(stories);
  const scen = Object.values(S.scenarios).filter(x=>x.done);
  const speaking = Math.min(100, scen.length*30 + (scen.reduce((a,x)=>a+(x.goodPct||0),0)/Math.max(1,scen.length))*0.1);
  return {vocab, grammar, listening: listening || (S.dictScore||0), reading, speaking:Math.round(speaking), words:ids.length};
}

/* ---- TTS ---- */
/* deVoice is the TARGET-LANGUAGE voice. The name is historical: it follows
   S.lang, so it holds a Dutch voice when the Dutch course is loaded.
   This matters more than it looks. A German voice reading `het huis` teaches
   the learner the wrong pronunciation, which is worse than no audio at all. */
let deVoice = null;
const VOICE_PREF = {
  de: ['Google Deutsch','Google Deutsch (Deutschland)','Microsoft Katja','Microsoft Seraphina','Anna','Petra','Helena'],
  nl: ['Google Nederlands','Microsoft Frank','Microsoft Fenna','Xander','Ellen','Claire','Lotte'],
  zh: ['Google 普通话','Google Chinese','Microsoft Xiaoxiao','Microsoft Huihui','Tingting','Ting-Ting'],
  fr: ['Google français','Amelie','Thomas'],
  es: ['Google español','Monica','Jorge']
};
function targetLang(){ return (typeof courseVoiceLang === 'function') ? courseVoiceLang() : 'de-DE'; }
function targetVoices(){
  const want = targetLang().slice(0,2).toLowerCase();
  try{ return speechSynthesis.getVoices().filter(v=>v.lang && v.lang.toLowerCase().startsWith(want)); }
  catch(e){ return []; }
}
/* kept for the voice picker in Settings, which calls it by name */
function germanVoices(){ return targetVoices(); }
function pickVoice(){
  const pool = targetVoices();
  if(!pool.length){ deVoice = null; return; }
  if(S && S.voiceName){
    const saved = pool.find(v=>v.name === S.voiceName);
    if(saved){ deVoice = saved; return; }
  }
  const lang = targetLang().slice(0,2).toLowerCase();
  for(const p of (VOICE_PREF[lang] || [])){
    const hit = pool.find(v=>v.name === p) || pool.find(v=>v.name.toLowerCase().includes(p.toLowerCase()));
    if(hit){ deVoice = hit; return; }
  }
  deVoice = pool.find(v=>v.lang === targetLang()) || pool[0];
}
/* true when the device has no voice for the course language at all */
function voiceMissing(){ return 'speechSynthesis' in window && targetVoices().length === 0; }
/* Say so rather than going quietly silent. Falling back to another language's
   voice would be worse: it teaches the wrong pronunciation. */
function voiceWarning(){
  if(!voiceMissing()) return '';
  const name = (typeof TT === 'function') ? TT().lang : 'this language';
  return `<div class="card" style="margin-bottom:12px;border-color:var(--warn);background:color-mix(in srgb,var(--warn) 8%,var(--card))">
    <div class="row" style="align-items:flex-start;gap:9px">
      <span style="font-size:16px;line-height:1.2">\u26A0</span>
      <span style="flex:1;min-width:0;font-size:12.5px;line-height:1.55">
        <b>No ${esc(name)} voice on this device.</b>
        <div class="usub" style="margin-top:3px">Lessons still work, but nothing will be read aloud. On Android install the ${esc(name)} voice under Settings, then Language and input, then Text-to-speech.</div>
      </span></div></div>`;
}
if('speechSynthesis' in window){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
/* ---- SPEECH QUEUE ------------------------------------------------------
   Web Speech has two failure modes we kept hitting:
   1. speak() called in the same tick as cancel() loses the first word,
      so "Herzlich willkommen!" came out as "...willkommen!".
   2. Chaining two lines on a fixed setTimeout truncates the first one,
      so "Ich heisse Klara." was cut off mid-sentence.
   Everything now goes through one queue that chains on `onend`.
   A generation counter makes a stale onend (fired by cancel) harmless.
------------------------------------------------------------------------ */
let SPQ = [], SPQ_GEN = 0, SPQ_BUSY = false;

function spStop(){
  SPQ_GEN++; SPQ = []; SPQ_BUSY = false;
  try{ speechSynthesis.cancel(); }catch(e){}
}
function spClean(t){
  return String(t == null ? '' : t)
    .replace(/<[^>]+>/g,' ')
    .replace(/…/g,'')
    .replace(/„|“|”|"/g,'')
    .replace(/\s+/g,' ').trim();
}
function _spMake(it){
  const u = new SpeechSynthesisUtterance(spClean(it.text));
  u.lang = targetLang();
  try{ if(deVoice) u.voice = deVoice; }catch(e){}
  u.rate  = it.rate  || 0.92;
  u.pitch = it.pitch || 1;
  return u;
}
function _spPump(gen){
  if(gen !== SPQ_GEN) return;
  const it = SPQ.shift();
  if(!it){ SPQ_BUSY = false; return; }
  if(!spClean(it.text)){ return _spPump(gen); }
  SPQ_BUSY = true;
  let u; try{ u = _spMake(it); }catch(e){ SPQ_BUSY = false; return; }
  let fired = false;
  const done = () => {
    if(fired) return; fired = true;
    if(gen !== SPQ_GEN) return;
    SPQ_BUSY = false;
    setTimeout(()=>_spPump(gen), it.gap === undefined ? 170 : it.gap);   /* a breath between lines */
  };
  u.onend = done; u.onerror = done;
  /* some engines never fire onend: a length-based safety net */
  const guard = Math.max(2200, spClean(it.text).length * 95);
  setTimeout(done, guard);
  try{ speechSynthesis.speak(u); }catch(e){ done(); }
}
/* queue one line or a list of lines. Always replaces whatever was speaking. */
function spQueue(items){
  if(typeof singing !== 'undefined' && singing) return;   /* never interrupt the song */
  const list = (Array.isArray(items) ? items : [items])
    .map(x => (typeof x === 'string' ? {text:x} : x))
    .filter(x => x && spClean(x.text));
  if(!list.length) return;
  spStop();
  const gen = SPQ_GEN;
  SPQ = list.slice();
  /* cancel() needs a tick to settle or the first word is swallowed */
  setTimeout(()=>_spPump(gen), 180);
}

function speak(text, rate){ spQueue({text, rate}); }
/* several German lines, one after the other, each finishing before the next */
function speakLines(arr, rate){ spQueue((arr||[]).map(t => ({text:t, rate}))); }

function speakBtns(text, small){
  return `<div class="row" style="gap:8px">
 <button class="speak" onclick="speak('${esc(text).replace(/'/g,"\\'")}')" title="listen">▶</button>
 <button class="speak slow" onclick="speak('${esc(text).replace(/'/g,"\\'")}',0.55)" title="slow">0.5×</button>
</div>`;
}

/* ---- German only: the English is on screen, no need to hear it ---- */
function sayEnDe(de, en){ return speak(de); }

/* ---- a second written form, for languages that need one ----
   Mandarin shows the characters and the pinyin together: characters alone
   cannot be pronounced, pinyin alone never teaches reading. Languages with
   one written form have no `py` and nothing changes for them. */
function pyLine(v, size){
  if(!v || !v.py) return '';
  return `<div class="py" style="font-size:${size||11.5}px">${esc(v.py)}</div>`;
}
function withPy(v){ return v && v.py ? `${esc(v.de)} <span class="pyi">${esc(v.py)}</span>` : esc(v && v.de || ''); }
/* plain-text version, for question strings that are escaped downstream */
function withPyText(v){ return v && v.py ? `${v.de} (${v.py})` : (v && v.de || ''); }

/* ---- toast ---- */
function toast(msg){
  const t = document.createElement('div'); t.className='toast'; t.textContent=msg;
  app.appendChild(t); setTimeout(()=>t.remove(), 2400);
}

/* ---- router ---- */
const SCREENS = {};
let currentScreen = 'home';
function go(name, arg){
  spStop();                     /* leaving a screen stops whatever she was saying */
  currentScreen = name;
  window.scrollTo(0,0);
  app.innerHTML = '';
  SCREENS[name](arg);
}
function navBar(active){
  const items = [['home','🗺','Path'],['skills','🎧','Skills']];
  if(hasScenes()) items.push(['scenes','💬','Scenes']);
  if(hasMock())   items.push(['test','📋','Test']);
  items.push(['me','👤','Me']);
  return `<div class="nav">` + items.map(([id,ic,lb]) =>
 `<button class="${active===id?'on':''}" onclick="go('${id}')"><span class="ic">${ic}</span>${lb}</button>`).join('') + `</div>`;
}

/* ---- exercise generator ---- */
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function pickOthers(pool, exclude, n){ return shuffle(pool.filter(x=>x!==exclude)).slice(0,n); }

function normEx(e){
  if(e.t==='mc' && typeof e.a==='number') return Object.assign({}, e, {opts:e.opts.slice(), a:e.opts[e.a]});
  return e;
}
function buildLesson(unit){
  const ex = [];
  const vocab = unit.vocab.filter(id=>VOCAB[id]);
  vocab.forEach(id=>{ ex.push({t:'teach', id}); });
  const drills = [];
  vocab.forEach((id,i)=>{
    const v = VOCAB[id];
    const others = pickOthers(vocab, id, 2).map(o=>VOCAB[o]);
    if(i%3===0) drills.push({t:'mc', q:`What does \u201e${withPyText(v)}" mean?`, tts:v.de, opts:shuffle([v.en, ...others.map(o=>o.en)]), a:v.en, id, why:`${v.de} = ${v.en}`});
    else if(i%3===1) drills.push({t:'mc', q:`How do you say "${v.en}"?`, opts:shuffle([v.de, ...others.map(o=>o.de)]), a:v.de, id, say:true, why:`${v.en} → ${v.de}`});
    else drills.push({t:'dict', id, q:'Listen and type what you hear', tts:v.de.replace(/^(der|die|das) /,''), answer:v.de.replace(/^(der|die|das) /,''), why:`It was: ${v.de} (${v.en})`});
  });
  const wb = vocab.filter(id=>VOCAB[id].ex).slice(0,3).map(id=>{
    const [de,en] = VOCAB[id].ex;
    const words = de.replace(/[.!?]/g,'').split(' ');
    return {t:'wb', q:`Build: "${en}"`, sent:words.join(' '), distract:pickOthers(unit.vocab,id,2).map(o=>VOCAB[o].de.replace(/^(der|die|das) /,'').split(' ')[0]), id, why:de};
  });
  return { intro: unit.grammar, items: shuffle(drills).slice(0,7).concat(wb).concat((unit.extra||[]).slice(0,2).map(normEx)), teach: vocab };
}
function buildCheck(unit){
  const vocab = unit.vocab.filter(id=>VOCAB[id]);
  const qs = [];
  shuffle(vocab).slice(0,5).forEach((id,i)=>{
    const v = VOCAB[id];
    const others = pickOthers(vocab, id, 2).map(o=>VOCAB[o]);
    if(i%2===0) qs.push({t:'mc', q:`\u201e${withPyText(v)}" means…`, opts:shuffle([v.en, ...others.map(o=>o.en)]), a:v.en, id, why:`${v.de} = ${v.en}`});
    else qs.push({t:'mc', q:`"${v.en}" in ${course().native}?`, opts:shuffle([v.de, ...others.map(o=>o.de)]), a:v.de, id, why:`${v.en} → ${v.de}`});
  });
  (unit.extra||[]).forEach(e=>qs.push(normEx(e)));
  const d = shuffle(vocab.filter(id=>!VOCAB[id].de.includes(' ')))[0];
  if(d){ const v=VOCAB[d]; qs.push({t:'dict', id:d, q:'Dictation: type what you hear', tts:v.de.replace(/^(der|die|das) /,''), answer:v.de.replace(/^(der|die|das) /,''), why:`It was: ${v.de}`}); }
  return shuffle(qs).slice(0,8);
}

/* ============ SPEAK-IT-BACK: listen 🔊 + say it 🎤 with tick ============ */
function hasMic(){ return ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window); }
function speechMatch(heard, target, loose){
  const h = norm(heard), t = norm(target).replace(/[!.?]/g,'');
  if(!h) return false;
  if(h === t || h.includes(t)) return true;
  if(Math.abs(h.length - t.length) <= Math.max(3, Math.round(t.length*0.22))
     && levDist(h,t) <= Math.max(2, Math.round(t.length*0.25))) return true;
  if(loose){
    const w = t.split(' ');
    const key = w.slice(0, w.length>2?2:1).join(' ');
    if(key.length >= 4 && h.includes(key)) return true;
  }
  return false;
}
let MIC = null, MICCB = {}, MICUID = 0;
async function ensureMic(){
  if(S.micOk) return true;
  try{
    if(!navigator.mediaDevices ||!navigator.mediaDevices.getUserMedia) return true;
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    stream.getTracks().forEach(t=>t.stop());          /* we only needed the grant */
    S.micOk = true; save();
    return true;
  }catch(e){ return false; }
}
function micLine(uid, text, loose){
  if(!S.micOk){ ensureMic().then(ok=>{ if(!ok) toast('Microphone blocked, allow it in the browser, or tap ✓ to self-mark'); }); }
  const btn = document.getElementById('mic_'+uid);
  const R = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!R){ toast('No microphone in this browser, use 🔊 and read along'); return; }
  if(btn && btn.classList.contains('live')){ try{ MIC && MIC.stop(); }catch(e){} return; }
  try{
    spStop();
    const r = new R(); MIC = r; r.lang=targetLang(); r.maxAlternatives=3; r.interimResults=false; r.continuous=false;
    let done = false;
    if(btn){ btn.classList.add('live'); btn.textContent='●'; }
    r.onresult = e => { done = true;
      const alts = Array.from(e.results[0]).map(a=>a.transcript);
      micResult(uid, text, alts.some(a=>speechMatch(a, text, loose)), alts[0]);
    };
    r.onerror = ev => { if(!done){ micReset(uid); if(ev.error==='not-allowed') toast('Microphone blocked in browser settings'); } };
    r.onend = () => { if(!done) micReset(uid); };
    r.start();
  }catch(e){ micReset(uid); }
}
function micReset(uid){
  const btn = document.getElementById('mic_'+uid);
  if(btn && btn.classList.contains('live')){ btn.classList.remove('live'); btn.textContent='🎤'; }
}
function micResult(uid, text, ok, heard){
  const btn = document.getElementById('mic_'+uid), tk = document.getElementById('tk_'+uid);
  const msg = document.getElementById('msg_'+uid);
  if(btn){ btn.classList.remove('live'); btn.textContent = ok ? '✓' : '🎤'; btn.classList.toggle('done', ok); btn.classList.toggle('miss',!ok); }
  if(tk) tk.textContent = ok ? '✓' : '';
  if(ok){
    if(msg) msg.innerHTML = `<span style="color:var(--good);font-weight:700">Sehr gut! ✓ Perfekt gesprochen.</span>`;
    else toast('Richtig! ✓');
    if(MICCB[uid]) { try{ new Function(MICCB[uid])(); }catch(e){} }
  } else {
    if(msg) msg.innerHTML = `<span style="color:var(--bad);font-weight:700">Noch einmal!</span> <span class="usub">I heard „${esc(heard||'…')}". Listen once more and tap 🎤 again.</span>`;
    else toast('Heard: „'+(heard||'…')+'", noch einmal!');
    speak('Noch einmal. ' + text, 0.62);
    setTimeout(()=>{ if(btn) btn.classList.remove('miss'); }, 2500);
  }
}
/* sayIt(text, {loose, cb, small}) → 🔊 + 🎤 pair */
function sayIt(text, opts){
  opts = opts || {};
  const uid = opts.uid || ('s' + (++MICUID));
  if(opts.cb) MICCB[uid] = opts.cb;
  const esc2 = text.replace(/'/g,"\\'");
  const dk = opts.dark
    ? 'width:30px;height:30px;min-width:30px;font-size:12px;background:rgba(253,248,236,.14);border-color:rgba(253,248,236,.3);color:#FDF8EC'
    : '';
  const dkM = opts.dark
    ? 'width:30px;height:30px;min-width:30px;font-size:12px;background:rgba(255,233,168,.22);border-color:transparent;color:#FFE9A8'
    : '';
  const enTxt = opts.en ? opts.en.replace(/'/g,"\\'") : '';
  const playFn = opts.en ? `sayEnDe('${esc2}','${enTxt}')` : `speak('${esc2}')`;
  return `<span class="sayit" id="si_${uid}">
    ${opts.noPlay ? '' : `<button class="ico" style="${dk}" onclick="${playFn}" title="${opts.en?'listen':'listen'}">🔊</button>`}
    ${hasMic()?`<button class="ico mic" style="${dkM}" id="mic_${uid}" onclick="micLine('${uid}','${esc2}',${opts.loose?'true':'false'})" title="say it · I'll listen">🎤</button>`:''}
 <span class="tickmark" id="tk_${uid}" style="${opts.dark?'color:#8FE3A8':''}"></span></span>`;
}

/* ============ SPRAK LOGO, the umlaut bubble ============ */
function sprakLogo(size){
  size = size || 44;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" style="display:block;border-radius:${size*0.23}px">
 <rect width="128" height="128" rx="30" fill="var(--accent)"/>
 <path d="M28 40 Q46 32 62 42 L62 92 Q46 82 28 90 Z" fill="var(--bg)"/>
 <path d="M100 40 Q82 32 66 42 L66 92 Q82 82 100 90 Z" fill="var(--hi)"/>
 <path d="M50 92 L50 108 L66 94 Z" fill="var(--bg)"/>
</svg>`;
}
function sprakWordmark(){
  return `<div class="row" style="gap:11px">${sprakLogo(44)}
 <div><div style="font-family:var(--font-head);font-weight:800;font-size:23px;line-height:1.05;color:var(--ink)">Sprak</div>
 <div class="usub" style="font-size:10.5px;font-weight:700">Learn the language. Live the place.</div></div></div>`;
}
