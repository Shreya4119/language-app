# Design system

## Tokens

All colour lives in CSS custom properties on `#app[data-theme]` in `styles.css` (was `head.html`). **Components reference tokens only.** A literal colour in a component rule is a bug: it breaks one of the six themes.

| Token | Role |
|---|---|
| `--bg`, `--bg2` | page and outer ground |
| `--card`, `--tint` | surfaces |
| `--ink`, `--muted` | text |
| `--accent`, `--hero`, `--hi` | brand, hero block, highlight |
| `--good`, `--warn`, `--bad` | semantic state |
| `--line` | borders |
| `--r-card`, `--r-btn`, `--r-chip` | radii |
| `--font-head`, `--font-body`, `--w-head`, `--w-sub` | type |

Themes: **plum** (default), sunny, forest, editorial, night, air.

Adding a theme = one token block plus one entry in the theme grid in `screens4.js`. Nothing else.

## What is missing, and worth an afternoon

Spacing, type sizes and shadows are still hard-coded per component. Add:

```css
--s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px; --s-6: 24px; --s-8: 32px;
--t-xs: 12px; --t-sm: 13.5px; --t-md: 15px; --t-lg: 17px; --t-xl: 23px;
```

Then replace the ad-hoc values. This is the single highest-leverage design task: it makes every later change consistent by default instead of by attention.

## Non-negotiables

**Touch targets ≥ 48dp on Android.** Current `.ico` is 34px and the inline mic is 27px. Both fail.

**Contrast ≥ 4.5:1 for body text, 3:1 for large text and UI borders.** Four of six themes currently fail on `--muted`, and the sunny primary button is 2.57:1. These are token values, so one edit fixes many screens.

**Never encode meaning in colour alone.** Correct/incorrect currently differ only by hue. Add a mark or a word.

**Every interactive element is reachable and named.** Today the whole lesson path is `div onclick` with no `tabindex`, `role` or `aria-label`. On Android that means TalkBack cannot drive the app at all.

**Respect the system.** `prefers-reduced-motion` for the mic pulse and confetti. Relative units so the OS font-size setting works — test at 200%.

**Announce results.** An `aria-live` region for answer feedback and toasts, or screen-reader users get silence after answering.

## Layout

- One column, `max-width: 430px`, centred. `#app` is the flex parent — do not add siblings to it.
- Bottom nav is fixed; content needs padding for it plus `env(safe-area-inset-bottom)`.
- Wide content scrolls inside its own container. The page body never scrolls sideways.
- Test at 320px width. Several screens were built at 390px and only checked there.

## Klara

`avatarSVG(mode, expr, size)` — `mode` is `de` | `neutral`, `expr` is `calm` | `happy` | `warm`. Forest-green cardigan `#2E5D43`, cream blouse, tortoiseshell readers, German flag pin. She is drawn, not photographed, and her colours are deliberately outside the theme tokens so she looks like herself in all six.

## Doing design work here

You do not need to become a designer. In order:

1. Finish the token system above.
2. Fix the measured failures in `KNOWN_ISSUES.md` — arithmetic, not taste.
3. Follow **Material 3** for Android *behaviour*: back gesture, bottom sheets, where the primary action sits, ripple feedback. Borrow structure, keep the Sprak look.
4. Only then design anything new.

Figma's free tier plus the Figma MCP is enough tooling. Generate the token library and screen frames from this file rather than drawing them by hand.
