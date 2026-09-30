# Sprak

A1 learning app for people who have just moved country. Mic-first: the learner speaks from the first minute. A teacher character explains everything: **Klara** for German, **Sanne** for Dutch, **Lin** for Mandarin.

**One course ships: German.** Dutch Stage 0 and the Mandarin proof are authored, tested and **parked** behind `LIVE_LANGS` in `content.js`. They stay compiled in and reachable at `?langs=all`, so their suites keep running, but no learner can tap them. Shipping one finished language beats shipping three unfinished ones; add a code to `LIVE_LANGS` and that language is back. See `docs/LANGUAGES.md` before touching anything language-shaped.

Single-page app, no framework, no runtime dependencies. Source files are concatenated into one HTML file at build time.

---

## Commands

```bash
npm run dev            # dev server, reachable from your phone on the LAN
npm run dev:https      # the same, over https, so the MIC works on the phone
npm run build          # production build to dist/
npm run single         # the one-file version to sprak.html
npm test               # unit tests, then every flow suite
npm run test:unit      # vitest only, fast, run this after content changes
npm run test:e2e       # build, preview, run all Playwright suites
```

Every flow suite must print `ERRORS: none`. `tests/run-all.mjs` fails the build if any of them does not.

**Testing on your phone:** `npm run dev`, then open `http://<laptop-ip>:5173`. Hot reload reaches the phone in about a second. The microphone will **not** work there: the Web Speech API needs a secure context and a LAN IP over http is not one. Use `npm run dev:https` for mic testing, and add `?langs=all` to reach a parked language. Full loop, including reading the phone's console from the laptop: `docs/DEV_ON_PHONE.md`.

## Rules that break the app if ignored

**1. The build order is load-bearing.** `SOURCES` in `vite.config.js` pins it:

```
content.js dutch.js mandarin.js core.js screens1.js screens2.js screens3.js avatar.js lesson1.js verbs.js teach.js notes.js nudges.js games.js screens4.js
```

`dutch.js` and `mandarin.js` must follow `content.js`: they register themselves into the `COURSES` table that `content.js` declares.

`avatar.js` deliberately **overrides** `SCREENS.onboard1/3` defined earlier. `screens4.js` ends with the boot code and must stay last. Never sort these alphabetically. Never add a file without adding it to `SOURCES`.

**2. The app is a CLASSIC script, on purpose.** Every control in the UI is an inline `onclick`, and inline handlers resolve against **global** scope. Bundling the sources as an ES module puts them in module scope, and every button throws `go is not defined`. `vite.config.js` injects them as one plain `<script>` instead. Converting to real modules means adding exports *and* replacing every inline handler with `addEventListener`: a genuine refactor, not a config change.

**3. Never interpolate user input into an `onclick` attribute.** `esc()` escapes only `& < > "`. It does **not** escape `'` or `\`. Any value reaching a JS-in-attribute site needs full escaping, or better: render the element, then attach the listener in JS. The learner's name and the Lesson 1 blanks are persisted user input and have already caused a stored-XSS bug here.

**4. Deep-clone `DEFAULT` when resetting state.** `Object.assign({}, DEFAULT, …)` shares nested object references and silently pollutes `DEFAULT`, so reset and logout stop working. Use `JSON.parse(JSON.stringify(DEFAULT))`.

**5. Adding a vocab id to a unit without a matching `W(...)` call blanks the whole app.** `go()` clears `innerHTML` before rendering and has no try/catch, so a throw inside a screen wipes the nav bar too. Run `node t-units.mjs` after any content edit.

---

## Voice and copy

- **Audio is the target language only.** `sayEnDe(de, en)` speaks the target word and ignores the English — the translation is on screen to be read. Do not reintroduce English speech.
- **One voice per course**, including the teacher's English explanations. `targetLang()` returns the course's BCP-47 tag and `deVoice` holds the matching voice. The name `deVoice` is historical; it follows `S.lang`.
- **Never fall back to another language's voice.** A German voice reading `het huis` teaches the wrong pronunciation, which is worse than silence. When `voiceMissing()` is true the app shows `voiceWarning()` and stays quiet. `t-dutch.mjs` asserts this.
- **The `de` field name is the target word, not German.** `VOCAB[id].de` holds `het huis` in Dutch and `你好` in Mandarin. Every renderer reads `v.de`; do not rename it.
- **A language may need two written forms.** Mandarin carries `v.py` (pinyin) alongside the characters, because characters alone cannot be pronounced and pinyin alone never teaches reading. Render it with `pyLine(v)` in display, `withPyText(v)` inside question strings. Languages with one written form have no `py` and nothing changes for them.
- **A mark is not always a number.** German counts 1 to 6, Dutch marks out of 10, Chinese uses bands (优 良 中 及 不及). `note()` returns the band's index and `noteColor()` works off position in the scale, never off the value.
- **Klara's accent belongs in her speech, not in the UI.** She says *ze*, *zat*, *vill*, *zis*. Buttons and labels are plain English — "Read my notes", never "Read ze notes".
- **Sanne has no accent spelling at all.** Phonetically mangled English costs the reader real effort, and most of this audience reads English as a second language. Her Dutch is spelled correctly; her English is plain. Do not "give her a voice" by misspelling it.
- **A course only offers tabs it can fill.** No `exam` means no Test tab; no scenarios means no Scenes tab. Showing the German mock exam inside the Dutch course was a real bug. Run `node tests/audit-nl.mjs` and `node tests/audit-zh.mjs` after touching any screen.
- **No em dashes or en dashes anywhere in user-facing text.** Use a comma for an aside, ` · ` for a label join, `:` for a definition, `-` for a number range. This is a deliberate house rule; a previous pass removed 176 of them.
- **No decorative emoji in sentences.** Functional icons are fine: 🔊 🎤 🎙 ✓ ✕ 🔒 🧭 💡, the skill icons, and the alphabet pictures. Never 😊 👋 🎉 💪 👀 in copy.
- Klara is short and to the point. She explains with examples, not paragraphs.
- **Nudges never guilt.** `nudges.js` has the seven rules at the top and `t-nudges.mjs` fails the build on words like *forgot*, *don't lose* or *disappoint*. The longer someone is away, the gentler the message.

---

## Where things are

| File | Contains |
|---|---|
| `src/styles.css` | All CSS. Theme tokens, six themes, component classes. |
| `src/content.js` | German `VOCAB` (via `W(id, de, en, ex)`), `UNITS`, `STORIES`, `SCENARIOS`, `CULTURE`, `MOCKTEST`, and the `COURSES` table + `loadCourse()` |
| `src/dutch.js` | The whole Dutch pack inside one IIFE: its own `VOCAB`, 9 Stage 0 units, `SANNE`. Registers `COURSES.nl`. |
| `src/mandarin.js` | The Mandarin pack: characters plus pinyin, 3 units, a tones grid where the alphabet would be, `LIN`. Registers `COURSES.zh`. |
| `src/core.js` | State, storage, grading, SRS, unlock rules, speech, `go()`, helpers |
| `src/screens1.js` | Home, unit screen |
| `src/screens2.js` | Session runner (lesson / check / review / drill), result screens |
| `src/screens3.js` | Skills hub, stories, writing, speaking, scenarios, culture |
| `src/avatar.js` | `TEACHERS`, `avatarSVG`, `teacherBox`, `teacherSay`, onboarding, meet-teacher |
| `src/lesson1.js` | The first-lesson machinery: introduction board, speaking test, greetings, alphabet, ABC song. Language-neutral; the data comes from `course().first` |
| `src/verbs.js` | Unit s0f: Klara teaches sein & haben in six steps |
| `src/notes.js` | Quick notes, handwriting task, return-session revision |
| `src/nudges.js` | What the teacher says to bring you back: push copy per language, email templates, and the seven rules that stop it becoming spam |
| `src/games.js` | Generated form-focused practice. Every game builds itself from `VOCAB` and the unit frames, writes to the same SRS a lesson does, and only appears where the course can fill it |
| `src/screens4.js` | Milestone, mock test, profile, progress, vocabulary, exports, **boot code** |

---

## Reference

- `docs/ARCHITECTURE.md` — how state, screens and the session runner fit together
- `docs/CONTENT_GUIDE.md` — how to author a unit; the frame-first template
- `docs/DESIGN_SYSTEM.md` — tokens, themes, accessibility rules
- `docs/MIGRATION.md` — the Capacitor / app-store plan
- `docs/DECISIONS.md` — why things are the way they are
- `docs/KNOWN_ISSUES.md` — open defects, ranked
- `docs/LANGUAGES.md` — how a course pack works and how to add one
- `docs/TESTING.md` — what to test and how
- `docs/ACTIVITIES.md` — which activity goes where, and the teaching reasons why
- `docs/DEV_ON_PHONE.md` — laptop and phone at once, including the mic

---

## Working style here

- Read `docs/KNOWN_ISSUES.md` before touching speech, storage or Lesson 1 — the bug is probably already described.
- Content changes go in the course pack (`content.js` for German, `dutch.js` for Dutch). **Do not hard-code any language into screens.** Greeting, language name and export slugs come from `course()`; the voice comes from `targetLang()`. If you find yourself typing `Deutsch` or `de-DE` in a screen file, stop.
- After any change: `npm test`. After a content change, `npm run test:unit` catches a missing vocab id in a second.
- Prefer fixing the cause over adding a guard. This codebase has enough guards.
