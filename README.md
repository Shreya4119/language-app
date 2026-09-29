# Sprak

A1 language learning for people who have just moved country.

Mic-first: the learner speaks from the first minute. A teacher character explains
everything, and never reads the board aloud. No account, no forms, nothing leaves
the device.

Two courses ship today:

| | Teacher | Built | Words |
|---|---|---|---|
| **German** | Klara | 10 units of 31 | 168 |
| **Dutch** | Sanne | 9 units, Stage 0 complete | 174 |

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run single    # one-file version to sprak.html
npm test          # unit tests, then all 13 flow suites
```

**The microphone needs a secure context.** `localhost` counts; a LAN IP over plain
http does not. Testing on your phone via `http://<your-ip>:5173` gives you layout
only, and the mic will be silently dead. Use the deployed https URL instead. See
`docs/DEPLOY.md`.

## Deploying

Push to `main` and Cloudflare Pages rebuilds. `docs/DEPLOY.md` has the setup, and
the phone install steps that give you a working microphone without an APK.

There is **no Android project yet**. Capacitor is not installed and the `android/`
folder does not exist, so there is nothing to open in Android Studio. `docs/MIGRATION.md`
covers the two routes and the reason the choice matters: Android System WebView has
never implemented `SpeechRecognition`, so a Capacitor build needs a native speech
plugin on day one, while a TWA does not.

## Where to start reading

| | |
|---|---|
| `CLAUDE.md` | project rules, commands, the things that break the app |
| `docs/ARCHITECTURE.md` | how state, screens and the session runner fit together |
| `docs/LANGUAGES.md` | how a course pack works and how to add one |
| `docs/CONTENT_GUIDE.md` | how to author a unit |
| `docs/DESIGN_SYSTEM.md` | tokens, themes, accessibility |
| `docs/DEPLOY.md` | GitHub, Cloudflare Pages, installing on a phone |
| `docs/MIGRATION.md` | the Android plan |
| `docs/KNOWN_ISSUES.md` | open defects, ranked |
| `docs/DECISIONS.md` | why things are the way they are |
| `docs/TESTING.md` | what to test and how |

## Status, honestly

**Done.** Repo, Vite, 13 flow suites, unit tests, CI. German Stage 0 and three
Stage 1 units. Dutch Stage 0, authored against five source books.

**Not done, and it matters.** Nobody has run this on a real phone with a working
microphone, and no learner has been watched finishing Lesson 1. Four blockers in
`docs/KNOWN_ISSUES.md` must be fixed before any public release. The Studio
dashboard is still a design mockup, not a working tool.
