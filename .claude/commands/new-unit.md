---
description: Author a new Sprak unit following the frame-first template
---

Read `docs/CONTENT_GUIDE.md` first, then author a new unit for: $ARGUMENTS

Follow the template exactly:

1. **Can-do** — one sentence naming what the learner can do afterwards.
2. **The frame** — one sentence pattern the whole unit fills.
3. **8-16 vocabulary items**, each usable inside that frame. Nouns carry `der`/`die`/`das`. Every `W()` entry gets a real example sentence.
4. **The trap** — the one predictable error, written into the `culture` or `grammar` note.
5. **`extra` items** — two or three hand-written questions that test the frame, not just recognition.

Rules:
- Title names a capability, not a grammar term.
- No em dashes, no decorative emoji.
- Klara's accent only in things she says.
- Cross-check every German word against the Goethe A1 Wortliste.

Then:
- add the unit to `UNITS` in the correct stage position
- if it is stage 1, add an unlock rule in `unlocked()`
- run `./build.sh && node t-units.mjs` and confirm `ERRORS: none`

Before writing anything, tell me the three sentences a learner will be able to say at the end. If you cannot write them, the unit is wrong.
