---
description: Measure contrast, touch targets and keyboard reachability across all themes
---

Write and run a Playwright script that walks every screen in all six themes and reports, as a table:

- computed contrast ratio for every text/background pair, flagging anything under 4.5:1 (3:1 for large text)
- every interactive element smaller than 48x48 CSS px
- count of clickable elements that are not keyboard focusable
- any font-size below 14px
- elements missing an accessible name (icon-only buttons)
- whether `prefers-reduced-motion` is respected

Launch Chromium with `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`.

Report worst-first with the measured number, the selector, and which themes are affected. Do not fix anything yet: land the measurements first, then we decide.

Baseline numbers to compare against are in `docs/KNOWN_ISSUES.md`.
