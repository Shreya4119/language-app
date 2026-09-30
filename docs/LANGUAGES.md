# Languages

Sprak **has** three courses and **ships** one.

## What is live, and how to change it

```js
const LIVE_LANGS = ['de'];   // content.js
```

That list is the whole switch. `langLive(id)` is the only thing any screen asks,
and `courseLang()` refuses to return a language that is not on it, so a stale
save cannot smuggle a parked course onto the screen either.

- **Tap:** `SCREENS.onboard1` builds every row from `langLive()`. A parked row is
  `locked`, says `soon`, and carries no `onclick`. `pickLang()` returns early as
  well, so calling it from the console does nothing.
- **Stale save:** the boot code in `screens4.js` moves a parked `S.lang` back to
  `de` and records it in `S.parkedLang`. **It deletes nothing.** `S.units` and
  `S.words` are keyed by id, so the day Dutch ships the learner carries on from
  exactly where they stopped.
- **Preview:** `?langs=all` opens every course that has a pack. That is how
  `t-dutch`, `t-mandarin`, `t-nudges`, `audit-nl` and `audit-zh` still run, which
  is the point of parking a pack rather than deleting it.
- **Guard:** `tests/t-focus.mjs` asserts one tappable row, that `pickLang('nl')`
  does not take, that a Dutch save parks without losing progress, and that both
  parked packs are still whole.

Parked is not deleted and it is not rotting: 17 suites run on every build and five
of them exercise the parked packs.

German is the reference implementation. Dutch Stage 0 is authored from source books
and is wired through the same machinery.

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

## The first lesson is data, not code

`lesson1.js` used to be German: the introduction board, the greetings and the
alphabet drill were all hard-coded. They now come from `course().first`, so the
same machinery runs any language.

```js
first: {
  unit,                       // which unit owns this lesson
  hello, say,                 // what the teacher greets with and says
  boardTitle, greetSay, abcSay, abcTitle, songSay,
  lines,                      // the introduction board, see below
  gender, countries, languages,
  alphabet, greetings, song
}
```

A board line is one of three shapes:

```js
{de:'Hallo!', en:'Hello!'}                                  // fixed text
{pre:'Ik heet ', blank:'name', ph:'your name', post:'.',    // a blank to fill
 en:'My name is …', map:'countries'}                        // map is optional
{pre:'Ik ben ', gender:true, en:'I am a woman / a man'}      // the chips
```

`l1Lines()` builds the spoken sentences from the same array, so the board and
the speaking test can never drift apart.

## Practice that is not multiple choice

A unit can end in a real activity instead of MC questions:

```js
{id:'n0b', practice:'intro',    …}   // build your introduction, then say it
{id:'n0a', practice:'alphabet', …}   // the greetings, then the letter drill
```

`tchFinish()` reads the flag and hands off to `startLesson1(unit, practice)`.
Building your own sentence and saying it out loud teaches more than picking
option B, so prefer this wherever the content allows it.

German reaches the same screens by a different door: `s0a` has no teach moves,
so `startLesson('s0a')` goes straight into the full four-step flow.

## Nothing language-shaped in the screens

Anything the learner reads that depends on the course comes from `course()`:

| Field | Used for |
|---|---|
| `native` | "Nederlands · 12 words met" on Home, and the profile header |
| `greet` | `['Goedemorgen','Hallo','Goedenavond']`, picked by hour |
| `gogo` | the first-run toast |
| `slug` | export filenames and Obsidian tags |
| `voice` | the BCP-47 tag `targetLang()` returns |
| `grades` | the school marking scale. German counts backwards 1-6; Dutch marks out of 10 |
| `exam` | the mock-test spec, or `null`. Null hides the Test tab entirely |
| `skillNames` | the four skill labels in the Skills hub |
| `source` | the provenance line shown in the profile |
| `first` | the first-lesson pack described above |

## A course only offers what it has

`navBar()` builds itself from the pack: no scenarios means no Scenes tab, no
`exam` means no Test tab. This is not cosmetic. Before it was added, the Dutch
course showed the **German Goethe A1 mock exam**, which is worse than showing
nothing at all. `hasMock()`, `hasScenes()` and `hasStories()` are the guards,
and `tests/audit-nl.mjs` walks every screen looking for leakage like it.

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

---

## What Mandarin proved, and what it cost

Two Germanic languages never really tested the design. Mandarin did, and three
assumptions turned out to be Germanic rather than universal.

**One written form is not always enough.** Every Mandarin word carries both
characters and pinyin. `mandarin.js` declares its own `W(id, hanzi, en, py, ex)`
and stores `py` alongside `de`. Use `pyLine(v)` where a word is displayed and
`withPyText(v)` inside a question string. German and Dutch have no `py`, so
nothing about them changed.

**Not every language has an alphabet.** The 27-tile letter grid became a
20-tile grid of the four tones and the sounds pinyin spells differently from
English. Same machinery, different data, and `course().first.alphabet` is
simply what the grid renders.

**A mark is not always a number.** German counts backwards 1 to 6, Dutch marks
out of 10, and Chinese school reports use bands: 优 良 中 及 不及. `note()`
now returns the band's index within the scale and `noteColor()` colours by
position, so a character grade works exactly as a numeric one does.

**One thing that needed no work at all.** Tones look like they would need
special handling in the speech check. They do not: recognition returns
characters, so saying `mǎ` for `mā` hands back 马 instead of 妈 and
`speechMatch` fails it without knowing tones exist.

**One thing easy to miss.** Nunito carries no CJK glyphs. `--cjk` is now in the
font stack; without it characters fall back to whatever the device happens to
have, which on some Android builds is nothing.
