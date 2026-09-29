---
description: Pre-release gate before any Play Store upload
---

Run every check and report a single go / no-go with the failures listed.

**Build**
- `./build.sh` (or `npm run build`) succeeds
- the bundle parses: `new Function(scriptContents)` does not throw
- exactly one `<body>` and one `id="app"` in the output

**Tests** — every suite must print `ERRORS: none`
- t-flow, t-units, t-notes, t-smoke, t-voice, t-verbs

**Content**
- no vocab id in any unit lacks a `W()` entry
- no em dash or en dash anywhere in user-facing strings
- no decorative emoji in sentences (functional icons are fine)

**Security**
- no user-derived value interpolated into an `onclick` attribute without full escaping
- grep for `innerHTML` sites taking dynamic content

**Blockers** — check each is fixed, from `docs/KNOWN_ISSUES.md`
- 1 XSS, 2 silent save failure, 3 corrupt state bricking, 4 Lesson 1 persistence

**Android**
- `RECORD_AUDIO` in the manifest
- hardware back button handled
- microphone works on a real device, and denial shows a message
- app renders correctly at 320px width and at 200% font scale

State clearly which items you verified by running something and which you verified by reading. Never report a pass you did not observe.
