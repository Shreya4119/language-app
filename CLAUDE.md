# Sprak

A1 learning app for people who have just moved country. Mic-first: the learner speaks from the first minute. A teacher character explains everything: **Klara** for German, **Sanne** for Dutch.

Two courses ship today. German is the reference implementation; Dutch Stage 0 is authored from source books. See `docs/LANGUAGES.md` before touching anything language-shaped.

Single-page app, no framework, no runtime dependencies. Source files are concatenated into one HTML file at build time.

---

## Commands

```bash
npm run dev            # dev server, reachable from your phone on the LAN
npm run build          # production build to dist/
npm run single         # the one-file version to sprak.html
npm test               # unit tests, then every flow suite
npm run test:unit      # vitest only, fast, run this after content changes
npm run test:e2e       # build, preview, run all Playwright suites
npm run android:open   # build, cap sync, open Android Studio
```

Every flow suite must print `ERRORS: none`. `tests/run-all.mjs` fails the build if any of them does not.

**Testing on your phone:** `npm run dev`, then open `http://<laptop-ip>:5173`. The microphone will **not** work there: the Web Speech API needs a secure context, and a LAN IP over http is not one. Use the deployed https site or an installed build for mic testing.

## Rules that break the app if ignored

**1. The build order is load-bearing.** `SOURCES` in `vite.config.js` pins it:

```
content.js dutch.js core.js screens1.js screens2.js screens3.js avatar.js lesson1.js verbs.js teach.js notes.js screens4.js
```

`dutch.js` must follow `content.js`: it registers itself into the `COURSES` table that `content.js` declares.

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
- **The `de` field name is the target word, not German.** `VOCAB[id].de` holds `het huis` when the Dutch pack is loaded. Every renderer reads `v.de`; do not rename it.
- **Klara's accent belongs in her speech, not in the UI.** She says *ze*, *zat*, *vill*, *zis*. Buttons and labels are plain English — "Read my notes", never "Read ze notes".
- **Sanne has no accent spelling at all.** Phonetically mangled English costs the reader real effort, and most of this audience reads English as a second language. Her Dutch is spelled correctly; her English is plain. Do not "give her a voice" by misspelling it.
- **No em dashes or en dashes anywhere in user-facing text.** Use a comma for an aside, ` · ` for a label join, `:` for a definition, `-` for a number range. This is a deliberate house rule; a previous pass removed 176 of them.
- **No decorative emoji in sentences.** Functional icons are fine: 🔊 🎤 🎙 ✓ ✕ 🔒 🧭 💡, the skill icons, and the alphabet pictures. Never 😊 👋 🎉 💪 👀 in copy.
- Klara is short and to the point. She explains with examples, not paragraphs.

---

## Where things are

| File | Contains |
|---|---|
| `src/styles.css` | All CSS. Theme tokens, six themes, component classes. |
| `src/content.js` | German `VOCAB` (via `W(id, de, en, ex)`), `UNITS`, `STORIES`, `SCENARIOS`, `CULTURE`, `MOCKTEST`, and the `COURSES` table + `loadCourse()` |
| `src/dutch.js` | The whole Dutch pack inside one IIFE: its own `VOCAB`, 9 Stage 0 units, `SANNE`. Registers `COURSES.nl`. |
| `src/core.js` | State, storage, grading, SRS, unlock rules, speech, `go()`, helpers |
| `src/screens1.js` | Home, unit screen |
| `src/screens2.js` | Session runner (lesson / check / review / drill), result screens |
| `src/screens3.js` | Skills hub, stories, writing, speaking, scenarios, culture |
| `src/avatar.js` | `TEACHERS`, `avatarSVG`, `teacherBox`, `teacherSay`, onboarding, meet-teacher |
| `src/lesson1.js` | Unit s0a: alphabet, greetings, the introduction board |
| `src/verbs.js` | Unit s0f: Klara teaches sein & haben in six steps |
| `src/notes.js` | Quick notes, handwriting task, return-session revision |
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

---

## Working style here

- Read `docs/KNOWN_ISSUES.md` before touching speech, storage or Lesson 1 — the bug is probably already described.
- Content changes go in the course pack (`content.js` for German, `dutch.js` for Dutch). **Do not hard-code any language into screens.** Greeting, language name and export slugs come from `course()`; the voice comes from `targetLang()`. If you find yourself typing `Deutsch` or `de-DE` in a screen file, stop.
- After any change: `npm test`. After a content change, `npm run test:unit` catches a missing vocab id in a second.
- Prefer fixing the cause over adding a guard. This codebase has enough guards.
