# Content guide

How to author a unit. This is the file to read before writing any German.

---

## The rule that decides everything

**No unit ships unless a learner can say three true things about their own life at the end of it.**

Not recognise. Say. If you cannot write those three sentences, the unit is a word list and needs redesigning.

This is what separates Sprak from the source syllabi we studied. Measured across the 1103-entry reference vocabulary: 96% of its entries are isolated words, 48% are nouns with an article, and 15 of its 40 lessons are more than 70% pure naming. A learner finishes its "Body parts" lesson knowing 28 nouns and unable to say *my back hurts*, because the lesson contains no verb, no possessive and no frame.

We do the opposite: **the frame first, then the words that fill it.**

---

## The unit template

| # | Part | What it is |
|---|---|---|
| 1 | **Can-do** | One sentence: *"After this I can ask where something is."* |
| 2 | **The frame** | One sentence pattern, taught whole, spoken aloud |
| 3 | **Words into the frame** | 8–16 items, each met *inside* the frame, never bare |
| 4 | **The trap** | The one predictable error, named before it happens |
| 5 | **Hear it real** | Short audio at natural speed |
| 6 | **Use it** | A real situation: order, ask, explain, complain |
| 7 | **Check** | Mixed retrieval, half production, 2 items from earlier units |

Target: **about 12 minutes.** That is a commute, a lunch break, or the gap before the kids wake up. It is the most important constraint in the product, because the audience has fragments of time.

A frame is worth more than forty nouns. `Ich hätte gern ___` turns every food word into a sentence. `Wo ist ___?` does it for every place.

---

## Writing the data

```js
W('bahnhof', 'der Bahnhof', 'the station', ['Zum Bahnhof, bitte.', 'To the station, please.']);
```

- **Nouns always carry their article.** Never `Bahnhof`, always `der Bahnhof`. Gender learned wrong is learned forever, and the notes screen colour-codes `der` / `die` / `das` straight off this field.
- The example is `[german, english]` and should be a sentence someone would actually say.
- Ids are lowercase, hyphenless where possible, ASCII: `fuenfzig`, not `fünfzig`.

```js
{ id:'s0g', stage:0, icon:'Wo', title:'Wo ist …?', sub:'ask · point · find your way',
  vocab:[ … ],
  grammar:{ title, body, gloss:[[de,en], …] },
  culture:{ title, body, gloss },
  extra:[ { t:'mc', q, opts, a, why } ] }
```

- `title` names what you can **do**, not the grammar. *Wo ist …?* not *Interrogatives*. *Something hurts* not *Body parts*.
- `gloss` pairs are what the learner taps to hear and what the notes screen tabulates.
- `extra` items are hand-written and always survive into the lesson; the rest is generated.

**After any content change run `node t-units.mjs`.** A vocab id with no matching `W()` call blanks the entire app.

---

## Klara's voice

She is a real teacher: warm, direct, a little dry. She explains with **examples**, not paragraphs. If an explanation runs longer than three sentences on screen, turn it into a taught sequence like `verbs.js` instead.

Her accent, in her speech only:

| English | Klara |
|---|---|
| th | z — *ze, zat, zis, zey, somezing* |
| w | v — *vill, ve, vhen, vhat* |

**Buttons and labels stay plain English.** "Read my notes", never "Read ze notes" — on a control it reads as a gimmick.

House rules for all copy:

- **No em dashes or en dashes.** Comma for an aside, ` · ` for a label join, `:` for a definition, `-` for a number range.
- **No decorative emoji in sentences.** Functional icons only: 🔊 🎤 🎙 ✓ ✕ 🔒 🧭 💡, skill icons, alphabet pictures.
- Short. She is teaching, not lecturing.

---

## The trap

Every unit names one predictable error **before** the learner makes it. A warning costs one screen; a fossilised error costs years. Existing ones, as a model:

- `halb sieben` is 6:30, not 7:30
- `einundzwanzig` is one-and-twenty
- `Ich bin kalt` means *I am a cold person*; you want `Mir ist kalt`
- `Wo` is where something is; `Wohin` is where it goes
- `elf` and `zwölf` follow no pattern, unlike every number after them

---

## Culture notes

Sprak is for someone who has just **moved**, not a tourist. Culture content is about surviving the place: Sunday closing, cash-only bakeries, quiet hours, waiting to be offered *du*, splitting the bill. Not landmarks.

The Culture Corner uses 🧭.

---

## Teaching moves

A concept is authored as a **sequence of moves**, never as a paragraph Klara reads out. This is the mechanism by which teaching technique lives in the engine rather than being re-improvised per unit.

```js
concept:'German nouns come with der, die or das.',
teach:[
  {m:'hook',     say, board},
  {m:'elicit',   say, prompt, hint, options, a, after},
  {m:'reveal',   say, title, lines:[[de,en,hint],…]},
  {m:'contrast', say, wrong, right, note},
  {m:'model',    say, title, lines},
  {m:'trap',     say, wrong, right, note},
  {m:'recap',    say, concept, note}
]
```

| Move | What it does | From |
|---|---|---|
| `hook` | a problem the learner cannot yet solve | — |
| `elicit` | **ask before telling**; the guess is the lesson and is never scored | Language Transfer |
| `reveal` | confirm and name the pattern in plain words, no jargon | Paul Noble |
| `contrast` | the wrong version beside the right one | Michel Thomas |
| `model` | spoken examples | — |
| `trap` | the predictable error, named before it happens | — |
| `recap` | the concept in one sentence | — |

**The rule the engine exists to enforce: `say` and the written text must never be the same string.** If they match, Klara is reading the board aloud, which is narration, not teaching. `t-teach.mjs` checks this.

A unit with a `teach` array skips the old grammar/culture card intro automatically. Both are still shown in Quick Notes afterwards.

## Taught units

Most units use the generic session runner. A unit gets its own taught sequence when the concept genuinely needs explaining — currently `s0a` (`lesson1.js`) and `s0f` (`verbs.js`).

The pattern, from `verbs.js`:

```js
const VB_STEPS = [{ say:'…Klara explains…', title:'…board title…',
                    lines:[[de, en, hint], …], note:'…the takeaway…' }, …];
```

Each step is Klara's explanation, a chalkboard of examples with a 🔊 per line, and one takeaway. The sequence ends by building `SES` directly and handing to the normal runner **without teach cards**, since the teaching already happened.

Use this whenever a paragraph on screen would be the alternative.

---

## Vocabulary sources

- **Goethe A1 Wortliste is canonical** for German. Where anything disagrees with it, Goethe wins.
- The four-language Core Vocabulary matrix is a **reference shelf**, not a syllabus. Use it to check what a word looks like across languages and to see what "the first 1000 words" means when opening a new language. Never lift its sequence.
- Third-party course content stays on the reference shelf under `licence: commercial — link only`. We study structure and method; we author our own words.

**No "rest words."** The source syllabus ends with 60 leftovers that exist only to reach a round number. If a word cannot find a frame, it does not belong at A1.
