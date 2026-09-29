# Known issues

From the code review of v3.7, plus what has been fixed since. Ranked by what it costs a real user.

**Read this before touching speech, storage or Lesson 1.** The bug is probably already here.

---

## Blockers — do not ship without these

### 1 · Stored XSS through user input in `onclick` attributes
`lesson1.js` board lines, and roughly fifteen other JS-in-attribute sites.

`esc()` escapes only `& < > "`. Call sites hand-append `.replace(/'/g,"\\'")` and one forgets. The learner's name and the Lesson 1 blanks are persisted, so a payload re-executes on every reopen.

Typing `x"><img src=1 onerror=alert(1)>` as your name used to fire on the introduction board. That specific path is fixed; the pattern is not.

**Fix:** one `escAttr()` that escapes `& < > " ' \`, used everywhere. Better: render, then attach listeners in JS.

### 2 · Silent save failure
`core.js` `store.set` swallows every exception in a bare `catch(e){}`, and `get` never falls back to memory.

The writing screen re-serialises the whole of `S` on every keystroke with no length cap. Paste a long draft, trip the quota, and the next hour saves nothing while the UI keeps showing progress.

**Fix:** debounce and cap the draft, surface failures, read from `mem` as fallback.

### 3 · Corrupt state can brick the app permanently
A JSON parse error maps to `null`, so a corrupted `sprak` key silently loads the old `fluently` snapshot, and the first `save()` overwrites the good key. There is no shape validation, so a wrong-typed `words` throws inside `SCREENS.home` at boot — and the only reset UI is behind that render.

**Fix:** validate on hydrate, version the schema, put a reset escape hatch outside the normal render path.

### 4 · Lesson 1 progress lives in RAM until the final tap
`L1` and `G` are module globals. `unitState('s0a').lesson` is written only in `l1Finish()`; `L1.abcOk` is never persisted.

Roughly 25 minutes of work — 8 spoken lines, 9 greetings, 30 letters — lost to a refresh or a mobile tab eviction.

**Fix:** persist per step. Do this during the Capacitor storage phase.

---

## Speech — fix these during the native port

### 5 · The app hears itself and awards the tick
`lesson1.js` — `speak()` is called from inside `REC.onresult` while the recognizer is `continuous` and never paused. Klara speaks the correction, the open mic transcribes her, the match succeeds, the line is marked correct.

### 6 · Recognition error loop with no exit
`onerror` clears `recOn` only for `not-allowed`; `onend` then restarts. Offline, a user enters a tight loop with no message. Only a reload escapes.

### 7 · Most recognition errors are silent
`no-speech`, `audio-capture`, `network`, `aborted` fall through to a bare reset. `onnomatch` has no handler anywhere. Hesitating five seconds just flips the button back. Partly fixed in `l1MicOne`; `micLine` in `core.js` still needs it.

### 8 · Speech and timers outlive the screen
`go()` never calls `speechSynthesis.cancel()` or stops recognition. Tap 🔊 then close, and Klara talks over the next screen. Worst case a stray timer fires German **into an open mic** and auto-ticks an item.

### 9 · Two mic buttons can run at once
`core.js` `micLine` checks only its own button's class. A second tap creates a second recognizer and reassigns the global `MIC`, orphaning the first, which is still recording and will tick the wrong line.

### 10 · `micOk` is cached forever
Once true it is never re-validated. Revoke the permission later and every 🎤 dies silently with no re-prompt.

---

## Correctness

### 11 · Scores are overwritten, not kept as best
`screens3.js` assigns scenario and story scores unconditionally while unit checks and the mock use `Math.max`. Replaying a scenario casually after a good run permanently lowers the score, dragging down skill stats, the milestone report and the readiness ring.

### 12 · Reset and logout leave half the state behind
Reset clears units, words, scenarios, stories and mock but leaves `milestoneSeen`, `writingDone`, `writingDraft`, `speakTest`, `greetTest`, `intro`, `days`, `streak`. `logout()` leaves the module globals `SES`, `L1`, `VB`, `G`, `SC`, `MT`, `MICCB` populated from the previous user.

### 13 · Streak keyed on UTC, displayed in local time
`today()` uses `toISOString()`; `weekStrip` labels with local `getDay()`. A Los Angeles user practising two consecutive evenings can lose the streak, and an evening session lights tomorrow's dot.

### 14 · Word-bank desync on duplicate tokens
`wbTake` finds the bank slot by text, not by the slot actually used. Distractors are drawn as first words, so two `Ich` tiles can appear; removing one un-ghosts the wrong tile and the sentence becomes unbuildable.

### 15 · Not reviewed at all
The correctness reviewer never ran. **Grading (`note`, `gradeBadge`), readiness (`a1Readiness`), unlock rules, SRS transitions (`wordResult`), `l1Finish` scoring and the mock test have never been audited.** Given issue 11 shows scoring already disagrees between subsystems, do this before trusting any number shown to a learner.

---

## Accessibility

Measured, not estimated.

| Issue | Measurement |
|---|---|
| Lesson path keyboard-unreachable — every unit row is a `div onclick`, zero `aria-*` in the codebase | 6 focusable vs 8 clickable on Home |
| Sunny theme primary button fails AA | **2.57:1** (needs 4.5) |
| `--muted` fails in 4 of 6 themes | sunny 3.96, air 3.53, plum 4.29, forest 4.33 |
| Mastery badges, the labels telling a learner what they are failing | `.m-shaky` **1.91:1** at 10.5px |
| Two nav tabs unreachable at 200% zoom, clipped with no scroll | 226px of tabs in 180px |
| Touch targets under the 44px minimum | `.ico` 34px, inline mic 27px |
| No `prefers-reduced-motion` anywhere; mic pulse flashes indefinitely | — |
| Focus invisible in inputs; invisible entirely in night theme | ring ≈ **1.05:1** |
| Icon-only buttons have no accessible name | zero `aria-label` |
| Answer results never announced | no `aria-live` |
| Correct/incorrect by colour alone | `#5FA97C` vs `#D96A55` |
| Body copy below 14px, all absolute `px` | 12, 11.5, 11, 10.5, 9.5 |

The theme contrast failures are the cheapest item on this page: they are all token values in one file.

---

## Structural

### 16 · Two speech matchers that have drifted
`core.js speechMatch` applies the fuzzy prefix rule only when `loose`; `lesson1.js l1LineMatch` applies it always. The same utterance is accepted by one control and rejected by another on the same screen.

### 17 · Unbounded global leak
`avatar.js` writes `window['_say_'+id]` with a 5-digit random id and never deletes. Hundreds of permanent closures per session; by the birthday bound ~370 renders gives ~50% odds of a collision, after which an older card speaks a newer card's line. `MICCB` in `core.js` grows the same way and is executed via `new Function()` inside a bare catch.

### 18 · Dead code
`SCREENS.lesson1` handles steps 1, 3, 4, 5, 6 — there is no step 2, and reaching it paints a blank screen. Step 6 (the archived ABC song, ~70 lines) is unreachable, yet its `singing` flag is still read on every `speak()` and `teacherSay()`. Also dead: `boardScene`, `FACTS`.

---

## Fixed

- `${TN()}` printed literally on the mic button (single quotes on a template literal)
- App rendering at half width — `build.sh` emitted a second `<body><div id="app">`
- English audio removed; German only
- Klara's English lines used a different voice; now one German voice everywhere
- 176 em/en dashes and the decorative emoji removed from copy
- XSS path on the Lesson 1 board specifically
- Recognition error messages in `l1MicOne`
- Twenty-four tiny controls on the introduction board reduced to two 46px buttons
