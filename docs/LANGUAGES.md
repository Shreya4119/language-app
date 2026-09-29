# Languages

Sprak ships two courses. German is the reference implementation. Dutch Stage 0 is
authored from source books and is wired through the same machinery.

## How it works

`VOCAB`, `UNITS` and `STAGES` stay the single globals the whole app reads.
`loadCourse(lang)` swaps their **contents**, it never reassigns them:

```js
function loadCourse(lang){
  const c = COURSES[lang] || COURSES.de;
  Object.keys(VOCAB).forEach(k => delete VOCAB[k]);
  Object.assign(VOCAB, c.vocab);
  UNITS.length  = 0; UNITS.push(...c.units);
  STAGES.length = 0; STAGES.push(...c.stages);
}
```

That is the whole design, and it was chosen deliberately. There are about forty
references to `UNITS` and `VOCAB` scattered across nine files. Rewriting them all
to `course().units` would have been a large, risky diff for no behavioural gain.
Swapping the contents means **nothing else in the app has to know that more than
one language exists**.

`loadCourse()` is called in exactly two places: the boot code at the end of
`screens4.js`, and `pickLang()` in `avatar.js`.

### The `de` field is the target word

`VOCAB[id].de` holds `het huis` when the Dutch pack is loaded. The field name is
historical and every renderer reads it. Do not rename it; renaming it touches
every screen for no benefit.

The same applies to `deVoice`, which holds whatever voice matches `S.lang`.

## Progress is shared, and that is fine

`S.units` and `S.words` are keyed by id and saved across every course, so a
learner can run German and Dutch side by side and keep both sets of progress.

**Unit ids** never collide: German uses `s0`, `u` and `e` prefixes, Dutch uses
`n0` and `n1`.

**Word ids did collide.** Ten ids exist in both packs: `hallo`, `ja`, `vier`,
`acht`, `elf`, `euro`, `morgen`, `hier`, `links`, `rechts`. Without a prefix,
mastering German *morgen* silently marked Dutch *morgen* as known. `dutch.js`
therefore rewrites every Dutch word id to `nl-<id>` after the pack is built, and
`t-dutch.mjs` asserts that German mastery does not bleed across.

Anything scoped to the learner's progress must filter by the loaded course.
`dueWords()` already did (`&& VOCAB[id]`); `skillStats()` did not, and counted
every saved word in every language. Both are now scoped. If you add a function
that walks `S.words` or `S.units`, scope it too.

## The voice rule

**Never fall back to another language's voice.** A German voice reading `het huis`
teaches the wrong pronunciation, which is worse than no audio at all.

`targetLang()` returns the course's BCP-47 tag. `pickVoice()` only ever selects
from voices whose `lang` starts with that language. If there are none:

- `voiceMissing()` returns true
- `voiceWarning()` renders a card on Home and on the meet-teacher screen
- the app stays silent rather than substituting

`t-dutch.mjs` asserts all of this, including that a device with only a German
voice installed does not silently get German audio for Dutch.

## Nothing language-shaped in the screens

Anything the learner reads that depends on the course comes from `course()`:

| Field | Used for |
|---|---|
| `native` | "Nederlands · 12 words met" on Home, and the profile header |
| `greet` | `['Goedemorgen','Hallo','Goedenavond']`, picked by hour |
| `gogo` | the first-run toast |
| `slug` | export filenames and Obsidian tags |
| `voice` | the BCP-47 tag `targetLang()` returns |

If you find yourself typing `Deutsch` or `de-DE` into a screen file, stop and add
a field here instead.

## Adding a language

1. Write `src/<lang>.js`. Copy the shape of `dutch.js`: one IIFE, its own `VOCAB`
   and `W()`, its own units and stages, and a teacher object. End the file with
   `COURSES.<code> = {...}`.
2. Add it to `SOURCES` in `vite.config.js`, **after `content.js`**.
3. In `avatar.js`, flip the language's row in `SCREENS.onboard1` to `true` and
   point `TEACHERS.<code>` at the teacher object.
4. Copy `tests/t-dutch.mjs` and change the ids. The voice assertions are the
   important part; keep them.

The teacher object needs `{name, lang, hello, blurb}`. `hello` is spoken in the
target language and `blurb` is her English introduction. They must be **exactly**
what is written on screen: the meet-teacher screen speaks the same strings it
renders, and `t-blurb.mjs` enforces it.

## Source-backed content

The Dutch pack was authored against five books rather than from memory. If you
edit its grammar, check it against them first. One draft error had already shipped
into the file before the sources were read: it claimed three quarters of Dutch
nouns take `de`, where Shetter & Ham §4.1 says roughly two thirds.

| Source | What it settles |
|---|---|
| Shetter & Ham, *Dutch: An Essential Grammar* (Routledge) | de/het, plurals, diminutives, `niet` vs `geen`, verb second |
| Gathier, *Welkom in Nederland* (Coutinho, the KNM text) | every culture note, and all of `n0i` |
| Quist & Strik, *Teach Yourself Dutch* | unit sequencing; A1 ends at its unit 7 |
| Taalthuis | lesson-order reference |
| 100 Essential Dutch Words | the coverage target: Stage 0 covers 53% |
