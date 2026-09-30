# Activities, games and assignments

What goes in the app, where it goes, and why. Placement is the hard part: the
same activity is excellent in one slot and worthless in another.

## The six principles that decide placement

**1. Retrieval before review.** Pulling a word out of memory strengthens it far
more than seeing it again. So a session opens with recall, never with reading.
The daily task starts with words due, not with new material.

**2. Interleave, do not block.** Twenty gender questions in a row produces a
good score and poor retention. Four short different things beats one long same
thing, which is why the daily task is four items and not one.

**3. Input slightly above where they are.** Stories exist to be *almost* too
hard. `STORIES[].needs` already gates them on a unit, and that gate is what
makes them comprehensible rather than discouraging.

**4. Production, not recognition.** Choosing option B is recognition. Saying a
sentence out loud, spelling a word, or typing what you heard is production, and
only production transfers to a real conversation. Every activity should end in
something the learner produced.

**5. Real tasks beat exercises.** An activity with a real-world outcome
(*order the coffee and get the coffee*) teaches more than a drill on the same
language. Scenarios are the strongest thing in this app and should keep growing.

**6. A wrong answer is information, never a failure.** No lives, no buzzers,
nothing lost. This audience is corrected all day in a language they are still
learning; the app is the one place it should feel safe to be wrong.

---

## The daily task

One card at the top of Home. Five to eight minutes, four items, and a visible
done state, because finishing is the part that builds the habit.

| Order | Item | Why it is in this position |
|---|---|---|
| 1 | **Five due words**, spoken or typed | Retrieval first, while attention is fresh (principle 1) |
| 2 | **One input piece**: a story paragraph or a culture card | Comprehension while warm, no performance pressure (3) |
| 3 | **One game**, chosen by what they are worst at | Form focus, interleaved against items 1 and 2 (2) |
| 4 | **One spoken line** using today's frame | The session ends in production (4) |

It assembles itself from content that already exists. **Nothing about the daily
task is hand-authored**, which is the only way a daily anything survives past a
fortnight. It is also what the push nudges point at: `nudges.js` has the copy
written and, until this exists, nothing specific to send anyone to.

---

## Games

A game earns its place by targeting a failure this language actually causes. In
`games.js`, and every one generates from `VOCAB` and the unit frames, so a game
written once works in German, Dutch and anything added later.

| Game | The failure it targets | Generated from | Status |
|---|---|---|---|
| **Gender sort** | der/die/das, de/het. A noun learned bare is learned wrong forever, and every adjective downstream inherits it | articled nouns in `VOCAB` | **built** |
| **Word order** | Verb second in German, and the verb at the end of a Dutch subordinate clause. The error that makes A1 speech sound broken | `UNITS[].frame` | to build |
| **Crossword** | Spelling and production, not recognition | due words, clues in English | to build |
| **Number sprint** | Prices, platforms, times, house numbers. The single most common real-world failure at A1 | the number vocabulary | to build |
| **Minimal pairs** | Dutch *ui / eu / ij*, German *ö / o* and *ü / u*. Sounds nobody hears until someone makes them listen | any two words in `VOCAB` that differ by one sound | to build |
| **Odd one out** | Semantic networks, which is how vocabulary is actually stored | unit vocabulary groups | to build |

Two rules for every game in this file, enforced by `t-games.mjs`:

- **It writes to the same memory as a lesson.** Every answer calls
  `wordResult()`, so a miss in a game schedules that word for review exactly as
  a miss in a check does. A game with its own private score teaches nothing that
  lasts.
- **It teaches the rule, not only the answer.** "It is *die*" teaches one noun.
  "-ung is always *die*" teaches a few hundred. A rule is only ever shown beside
  a noun it is true of, so an over-broad pattern cannot mis-teach.

---

## Assignments

Longer, weekly, and set by the teacher rather than tapped through. These are
where an app for someone *living in the country* beats an app for someone
studying at a desk, and most of them cost almost nothing to build.

**Copy it out by hand.** Already in `notes.js` as `handPending()`, and it is the
best assignment in the app. Ten minutes with a pen beats an hour of tapping,
because the hand remembers what the thumb does not. Expand, do not replace.

**Say it in the wild.** *This week, order your coffee in German.* The learner
ticks it off and Klara asks how it went. No technology at all, and it is the
single most valuable thing the app can ask of someone who lives in Berlin.

**Voice diary.** Three sentences about your day, recorded and kept. Listening to
the first one a month later is the only honest evidence of progress there is,
and it beats any streak counter.

**Photograph five signs.** Label what you saw on the way home. The country is
the textbook; most learners never notice they are standing in it.

---

## Scenarios

Branching dialogue is the one thing that cannot be generated, so these are
hand-written, roughly two a week. German has three today: *Beim Bäcker*,
*Im Restaurant*, *Der verpasste Bus*. Dutch has none yet.

Worth writing next, in order of how often this audience actually needs them:

1. **Booking a Termin by phone.** The single most requested piece of language,
   and the `soon` nudge bank and the appointment email were both written for it
   and currently have nothing to point at.
2. **Asking directions at an unfamiliar station.**
3. **At the Apotheke, feeling ill.**
4. **A parcel left with the neighbour.** Universal, and unexpectedly hard.
5. **Haggling at the Flohmarkt.** Note that this is the *only* place haggling is
   normal. Prices at the Wochenmarkt and in shops are fixed, and teaching
   someone to bargain over apples would set them up for an awkward moment.

Every scenario should end in one line the learner says out loud rather than
picks from a list (principle 4).

---

## Where each thing lives

| Screen | Holds | Does not hold |
|---|---|---|
| **Home** | the daily task, the return nudge, today's plan | curriculum |
| **Path** | the units, in order. The spine | games, one-offs |
| **Skills** | the four exam skills, and the games hub grouped by what they fix | stories (they live under Reading) |
| **Scenes** | scenarios, and the in-the-world assignments | anything with a right answer |
| **Test** | mock exams only | practice of any kind |

The rule that keeps this honest is the one `navBar()` already follows: **a course
only offers what it can fill.** Mandarin has no articles, so it is never shown
the gender game. `gameList()` decides, the same way `hasMock()` and
`hasScenes()` do.

---

## Build order

1. ~~Gender sort~~ — done, German and Dutch, 17 suites green.
2. The daily task card. It is the placement question answered in code, and it
   gives the nudges somewhere to point.
3. Word order, then number sprint. Both generate from data that exists.
4. Termin scenario, then one scenario a week.
5. "Say it in the wild", which is an afternoon and worth more than any of the above.
