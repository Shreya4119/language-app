/* Unit tests for the pure logic that produces every number a learner sees.
   This layer has never been tested. Start here, then widen. */
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SOURCES } from '../vite.config.js';

let app;
beforeAll(() => {
  /* Run the app's scripts in a jsdom-free sandbox with the DOM bits stubbed,
     then hand back the globals we want to assert on. */
  const src = SOURCES.map(f => readFileSync(resolve('src', f), 'utf8')).join('\n');
  const shim = `
    const el = () => ({ dataset:{}, style:{}, innerHTML:'', textContent:'', value:'',
      classList:{ add(){}, remove(){}, toggle(){}, contains:()=>false },
      appendChild(){}, remove(){}, addEventListener(){}, focus(){},
      querySelector: () => null, querySelectorAll: () => [], closest: () => null,
      scrollIntoView(){}, getBoundingClientRect: () => ({width:390,height:844}) });
    const document = { getElementById: el, querySelector: el, querySelectorAll: () => [],
      createElement: el, addEventListener(){}, body: el() };
    const window = { addEventListener(){}, scrollTo(){}, matchMedia: () => ({matches:false}) };
    const localStorage = { getItem: () => null, setItem(){}, removeItem(){} };
    const speechSynthesis = { speak(){}, cancel(){}, getVoices: () => [] };
    class SpeechSynthesisUtterance { constructor(t){ this.text = t; } }
    const setTimeout = () => 0;
  `;
  const expose = `; return { note, a1Readiness, unlocked, unitDone, stage0Done,
      speechMatch, levDist, wordResult, wstate, S, UNITS, VOCAB, STAGES, milestoneReqs,
      skillStats, unitState, loadCourse, COURSES, DEFAULT };`;
  app = new Function(shim + src + expose)();
});

describe('grading', () => {
  it('maps percentages to German Noten 1-6', () => {
    expect(app.note(100).n).toBe(1);
    expect(app.note(50).n).toBeGreaterThanOrEqual(4);   // 50% is 'ausreichend'
    expect(app.note(0).n).toBe(6);
  });
  it('never returns a Note outside 1-6', () => {
    for (let p = 0; p <= 100; p++) {
      const n = app.note(p).n;
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(6);
    }
  });
});

describe('content integrity', () => {
  it('every unit vocab id has a matching W() entry', () => {
    const missing = [];
    app.UNITS.forEach(u => (u.vocab || []).forEach(id => { if (!app.VOCAB[id]) missing.push(`${u.id}:${id}`); }));
    expect(missing).toEqual([]);
  });
  it('every teach move names words that exist', () => {
    const missing = [];
    app.UNITS.forEach(u => (u.teach || []).forEach(m => (m.words || []).forEach(id => {
      if (!app.VOCAB[id]) missing.push(`${u.id}:${id}`);
    })));
    expect(missing).toEqual([]);
  });
  it('every unit declares a concept', () => {
    expect(app.UNITS.filter(u => !u.concept).map(u => u.id)).toEqual([]);
  });
  it('Klara never reads the board aloud', () => {
    const strip = s => String(s || '').replace(/<[^>]+>/g, '').trim();
    const bad = [];
    app.UNITS.forEach(u => (u.teach || []).forEach((m, i) => {
      const written = strip([m.board, m.note, m.after, m.concept].filter(Boolean).join(' '));
      if (written && m.say && written === strip(m.say)) bad.push(`${u.id}[${i}]`);
    }));
    expect(bad).toEqual([]);
  });
  it('no em dashes or decorative emoji in learner-facing copy', () => {
    const text = JSON.stringify(app.UNITS) + JSON.stringify(app.STAGES);
    expect(text).not.toMatch(/[—–]/);
    expect(text).not.toMatch(/[😊👋🎉💪👀🥨👇]/u);
  });
});

describe('progression', () => {
  it('stage 0 is always open, planned units never are', () => {
    app.UNITS.filter(u => u.stage === 0 && !u.planned).forEach(u => expect(app.unlocked(u)).toBe(true));
    app.UNITS.filter(u => u.planned).forEach(u => expect(app.unlocked(u)).toBe(false));
  });
});

describe('speech matching', () => {
  it('accepts an exact match and rejects an unrelated utterance', () => {
    expect(app.speechMatch('Guten Morgen', 'Guten Morgen')).toBe(true);
    expect(app.speechMatch('Pizza', 'Guten Morgen')).toBe(false);
  });
  it('does not accept a short utterance for a long line', () => {
    expect(app.speechMatch('Hallo', 'Ich komme aus Indien und wohne in Berlin')).toBe(false);
  });
});

/* ------------------------------------------------------------------ SRS ---
   These transitions decide when a word comes back. Until now nothing checked
   them, and they produce the review queue the learner sees every session. */
describe('spaced repetition', () => {
  const DAY = 864e5;
  const fresh = id => { delete app.S.words[id]; return app.wstate(id); };
  const daysUntilDue = w => (w.due - Date.now()) / DAY;

  it('a new word starts unseen at level 0', () => {
    const w = fresh('t1');
    expect(w).toEqual({ lv: 0, miss: 0, seen: 0, due: 0 });
  });

  it('the first correct answer jumps to level 2, skipping 1', () => {
    fresh('t2');
    app.wordResult('t2', true);
    /* level 1 is reserved for words that have been missed, so a clean first
       answer must not land there */
    expect(app.wstate('t2').lv).toBe(2);
  });

  it('climbs one level per correct answer and stops at 4', () => {
    fresh('t3');
    const seen = [];
    for (let i = 0; i < 6; i++) { app.wordResult('t3', true); seen.push(app.wstate('t3').lv); }
    expect(seen).toEqual([2, 3, 4, 4, 4, 4]);
  });

  it('a miss drops straight to level 1 from any height', () => {
    for (const climb of [0, 1, 2, 3]) {
      fresh('t4');
      for (let i = 0; i < climb; i++) app.wordResult('t4', true);
      app.wordResult('t4', false);
      expect(app.wstate('t4').lv).toBe(1);
    }
  });

  it('counts every answer as seen, and only failures as misses', () => {
    fresh('t5');
    app.wordResult('t5', true);
    app.wordResult('t5', false);
    app.wordResult('t5', true);
    expect(app.wstate('t5').seen).toBe(3);
    expect(app.wstate('t5').miss).toBe(1);
  });

  it('spaces each level further out: 0.3, 1, 3, 7 days', () => {
    const at = lv => { fresh('t6'); const w = app.wstate('t6'); w.lv = lv - 1;
      app.wordResult('t6', true); return daysUntilDue(app.wstate('t6')); };
    expect(at(2)).toBeCloseTo(1, 1);
    expect(at(3)).toBeCloseTo(3, 1);
    expect(at(4)).toBeCloseTo(7, 1);
  });

  it('brings a missed word back within hours, not days', () => {
    fresh('t7');
    app.wordResult('t7', true);
    app.wordResult('t7', false);
    const d = daysUntilDue(app.wstate('t7'));
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThan(1);
  });
});

/* ------------------------------------------------------- A1 readiness ---
   The ring on the home screen. It is the single number the learner uses to
   judge whether they are ready, so it must never lie in either direction. */
describe('A1 readiness', () => {
  const reset = () => {
    app.S.units = {}; app.S.words = {}; app.S.mock = {};
  };

  it('is 0 before anything is done', () => {
    reset();
    expect(app.a1Readiness()).toBe(0);
  });

  it('never leaves the 0 to 100 range, however the state is abused', () => {
    for (const mock of [-10, 0, 59, 60, 100, 1e6]) {
      reset();
      app.S.mock = { best: mock };
      app.UNITS.forEach(u => { app.S.units[u.id] = { lesson: true, check: 100, doneDay: '2026-01-01' }; });
      Object.keys(app.VOCAB).forEach(id => { app.S.words[id] = { lv: 4, miss: 0, seen: 1, due: 0 }; });
      const r = app.a1Readiness();
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(100);
    }
  });

  it('a perfect mock alone is worth at most a fifth of the ring', () => {
    reset();
    app.S.mock = { best: 100 };
    expect(app.a1Readiness()).toBeLessThanOrEqual(20);
  });

  it('can actually reach 100 when everything reachable is finished', () => {
    reset();
    app.S.mock = { best: 60 };
    app.UNITS.filter(u => !u.locked).forEach(u => {
      app.S.units[u.id] = { lesson: true, check: 100, doneDay: '2026-01-01' };
    });
    Object.keys(app.VOCAB).forEach(id => { app.S.words[id] = { lv: 4, miss: 0, seen: 1, due: 0 }; });
    /* If this fails the ring is unreachable, and the learner can never see it full */
    expect(app.a1Readiness()).toBe(100);
  });

  it('counts progress only for the loaded course', () => {
    reset();
    app.loadCourse('de');
    Object.keys(app.VOCAB).forEach(id => { app.S.words[id] = { lv: 4, miss: 0, seen: 1, due: 0 }; });
    const germanWords = app.skillStats().words;
    app.S.lang = 'nl'; app.loadCourse('nl');
    const dutchWords = app.skillStats().words;
    app.S.lang = 'de'; app.loadCourse('de');
    expect(germanWords).toBeGreaterThan(100);
    expect(dutchWords).toBe(0);
  });
});
