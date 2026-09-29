# Architecture

## The shape of it

One HTML file. No framework, no bundler at runtime, no network calls. Source files are plain scripts concatenated in a fixed order into a single `<script>` block, so **everything shares one global scope**. That is the central fact about this codebase and the source of most of its hazards.

```
head.html   → all CSS, opens <body><div id="app">
content.js  → data
core.js     → engine
screens*.js → views
build.sh    → cat, in order, into index.html
```

## Rendering

There is no virtual DOM and no component system. A screen is a function that writes `app.innerHTML` wholesale.

```js
SCREENS.home = () => { app.innerHTML = `…`; };
go('home');            // clears #app, calls SCREENS.home
go('notes', 's0g');    // passes an argument
```

`go()` is the only navigation primitive:

```js
function go(name, arg){ app.innerHTML=''; SCREENS[name](arg); window.scrollTo(0,0); }
```

Two consequences worth holding in mind:

- **A throw inside a screen leaves a blank page.** `innerHTML` is cleared first, and the nav bar goes with it. Only a reload recovers. This is why a bad vocab id is fatal rather than cosmetic.
- **Handlers are written as `onclick` strings inside template literals.** That is why escaping matters so much here — see the XSS rule in `CLAUDE.md`.

Because every render is a full rewrite, there is no partial update path except by hand: `l1RenderSel()` and `handMark()` reach into the DOM directly for the few places where a full re-render would lose transient state.

## State

A single object `S`, persisted to one localStorage key.

```js
let S = Object.assign(JSON.parse(JSON.stringify(DEFAULT)), store.get('sprak') || store.get('fluently') || {});
function save(){ store.set('sprak', S); }
```

`store` degrades to an in-memory object when localStorage throws, so the app still runs in restricted previews. It currently swallows quota errors silently — see `KNOWN_ISSUES.md`.

Shape:

| Key | Meaning |
|---|---|
| `name`, `lang`, `theme`, `voiceName` | preferences |
| `words{id}` | `{lv, miss, seen, due}` — spaced repetition, level 0–4 |
| `units{id}` | `{lesson, check, doneDay}` |
| `hand{id}`, `revised{id}` | date strings: handwriting done, revision done |
| `intro` | the learner's Lesson 1 blanks (name, country, city, language) |
| `scenarios`, `stories`, `mock` | scores |

**Module-level session globals** live outside `S` and are deliberately not persisted: `SES` (current session), `L1` (Lesson 1), `VB` (verbs lesson), `G` (greetings), `SC`, `MT`. They are lost on reload — which is a known defect for `L1`, not a design choice.

## Content model

```js
W('hallo', 'Hallo', 'hello', ['Hallo, ich bin Klara.', 'Hello, I am Klara.']);
```

Units reference vocabulary by id:

```js
{ id:'s0g', stage:0, icon:'Wo', title:'Wo ist …?', sub:'ask · point · find your way',
  vocab:[ …ids… ],
  grammar:{ title, body, gloss:[[de,en],…] },
  culture:{ title, body, gloss },
  extra:[ …hand-written items… ] }
```

`stage: 0` = foundations, `stage: 1` = A1 core. Order in the `UNITS` array is display order; the stage header is emitted when the stage value changes, so a unit must sit inside its stage's run.

## The session runner

One screen, `SCREENS.session`, renders every kind of practice. It reads `SES`:

```js
SES = { kind, uid, items, i, results, title, intro, back }
```

`kind` is `lesson` | `check` | `review` | `drill`. Items are generated, not authored:

| Builder | Produces |
|---|---|
| `buildLesson(unit)` | teach cards + mixed drills + word-bank items + the unit's `extra` |
| `buildCheck(unit)` | the scored check |
| `startReview()` | from `dueWords()` |
| `startDrill(ids, back)` | ad-hoc, returns to `back` when done |

Item types: `teach`, `mc`, `dict`, `wb` (word bank). `sesFinish()` scores, stamps `unitState`, and routes to `SCREENS.checkResult`.

**Two units bypass the generic flow** because they are taught, not drilled:

- `s0a` → `startLesson1()` in `lesson1.js` (alphabet, greetings, the introduction board)
- `s0f` → `startVerbs()` in `verbs.js` (sein & haben, six explained steps)

Both end by constructing `SES` themselves and handing over to the normal runner, skipping the teach cards since the teaching already happened.

## Progression

```js
unlocked(u)      // stage 0 always open; u1 needs 3 foundation units; u2 needs u1; …
unitDone(id)     // lesson done AND check ≥ 70
stage0Done()     // count of finished foundation units
milestoneReqs()  // per-unit ≥ 80 plus at most 3 shaky words across u1–u3
a1Readiness()    // 45% units + 35% vocab + 20% mock
```

Grading is German school Noten 1–6, computed in `note(pct)`.

## Speech

Everything funnels through a small number of functions, which is what makes the native port cheap:

| Function | Job |
|---|---|
| `speak(text, rate)` | German TTS |
| `sayEnDe(de, en)` | speaks German only; the English is on screen |
| `teacherSay(text)` | Klara's voice, same German voice, higher pitch |
| `hasMic()` / `l1HasMic()` | capability check |
| `micLine(uid, text, loose)` | single-shot recognition against one target |
| `l1MicOne(i)` | Lesson 1 board line |
| `speechMatch(heard, target, loose)` | fuzzy match, Levenshtein-based |

`pickVoice()` selects a German voice, preferring `DE_PREF` and any voice saved in `S.voiceName`.

**These seven functions are the entire native-platform seam.** See `MIGRATION.md`.

## Themes

CSS custom properties on `#app[data-theme]`. Six themes, `plum` is default. Components reference tokens only — no literal colours in component rules. Adding a theme means adding one token block in `head.html` and one entry to the theme grid in `screens4.js`.
