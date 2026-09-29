# Testing

## The bar

Every suite ends with `ERRORS: none`. Work is not finished until all of them do. The suites capture `console.error` and `pageerror`, so a silent exception fails the run.

## Suites

| File | Covers |
|---|---|
| `t-flow.mjs` | language pick → Klara → level → home → Lesson 1 board, line selection, ticks |
| `t-units.mjs` | every unit builds valid lesson and check items; no undefined vocab ids |
| `t-notes.mjs` | quick notes, handwriting tick, notebook, return-session revision |
| `t-smoke.mjs` | all nav tabs, all six themes, reload persistence |
| `t-voice.mjs` | speech routing, voice selection, German-only audio |
| `t-verbs.mjs` | the six-step sein/haben lesson, hand-off to drills |

## Mocking speech — read this

`window.speechSynthesis` is a **read-only property**. Assigning it in `addInitScript` silently does nothing, and the test then exercises the real, inert headless engine. Assertions about voices pass vacuously.

Use:

```js
Object.defineProperty(window, 'speechSynthesis', { value: mock, configurable: true, writable: true });
```

An earlier round of tests had this bug. Error checks were still valid; voice assertions were not.

## Chromium

Playwright's bundled download is absent in some environments. Launch explicitly:

```js
chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
```

## After a content change

`node t-units.mjs`, always. A vocab id with no matching `W()` call blanks the entire app, and nothing else catches it.

## What is not covered

- Grading, readiness, unlock rules, SRS transitions and the mock test have **never** been audited. See issue 15.
- Real microphone input. Recognition is mocked; the ticking logic is tested, the recognizer is not.
- Android WebView specifically. Add a device smoke test once Capacitor is in.

## Adding a suite

Copy the shape of `t-flow.mjs`: launch, install the mock, walk the flow with `page.evaluate` for state assertions, print a short report, print `ERRORS:` last. Keep them fast and readable; they are documentation as much as tests.
