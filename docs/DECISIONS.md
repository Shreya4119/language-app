# Decisions

Why things are the way they are. Append, do not rewrite.

---

**Single-file app, no framework.** The whole product is one HTML file with no runtime dependencies. It opens from a file, from a URL, or wrapped natively, and there is nothing to break in a build chain. Cost: one global scope and manual DOM updates. Accepted deliberately; revisit only if the app outgrows roughly 10k lines.

**Capacitor, not React Native or Flutter.** The app already works. A rewrite would mean rebuilding Klara's SVG, the chalkboard, six themes, Lesson 1 and the notes system for no user-visible gain, and would cost months. Capacitor keeps all of it and adds a native shell.

**Android first.** No Mac available, and iOS cannot be built or submitted without one. Android is also cheaper ($25 once vs $99/year) and the 14-day closed-testing clock starts sooner. The platform seam is built now so iOS is a week later, not a rewrite.

**Speech behind a seven-function seam.** All TTS and recognition already funnels through `speak`, `sayEnDe`, `teacherSay`, `hasMic`, `micLine`, `l1MicOne`, `speechMatch`. This is what makes the native port cheap, and it is why the Web Speech API being broken in iOS WKWebView is survivable.

**German-only audio.** Earlier the app said the English translation first, then the German. Removed: the English is on screen to be read, saying it aloud doubles every wait and teaches nothing. Reversible per screen if a specific case needs it.

**One voice for the whole app.** Klara's German voice reads her English explanations too. That accent is the character. A separate English voice made her two different people.

**Klara's accent in speech, not in the UI.** She says *ze* and *zat*; buttons say "Read my notes". Accent on a control reads as a gimmick.

**No em dashes, no decorative emoji.** House style. Comma for an aside, ` · ` for a label join, `:` for a definition. Functional icons only.

**Frame first, then words.** Every unit opens with a sentence pattern and the vocabulary exists to fill it. Measured against the reference syllabus: 96% of its entries are isolated words and 15 of 40 lessons are more than 70% nouns, which is why its learners finish a lesson unable to speak from it.

**Nouns always carry their article.** Gender learned wrong is learned forever. The notes screen colour-codes `der` / `die` / `das` directly from the vocabulary field.

**German school Noten 1-6, not streaks.** Culturally apt for a German app, familiar to anyone living there, and honest in a way a streak is not. A streak measures attendance; a Note measures whether you know it.

**No account, no backend in v1.** The premise is that someone who just moved country can start learning in fifteen seconds. Everything lives on the device. Cross-device sync is a later, optional feature, not a launch requirement.

**Language chosen before the name.** The app opens on the language picker; Klara then asks for the student's name inside the first lesson, as a teacher would. The name is captured from the `Ich heiße ___` blank. It reads as a class rather than a signup form.

**Colours moved out of the foundation stage.** Nobody's first week in a new country fails for lack of "brown". They now sit in Stage 1 attached to nouns inside a frame.

**Third-party syllabi are studied, never copied.** Structure, sequencing and teaching method are ideas and fair to learn from. Lesson text, exercises and word lists are someone's product. Anything commercial stays on the reference shelf tagged `licence: commercial — link only`; Goethe's A1 Wortliste is canonical for what we actually teach.

**One language ships, two are parked.** Dutch Stage 0 (9 units, 174 words) and the Mandarin proof (3 units) are finished work, tested and compiled in, but `LIVE_LANGS = ['de']` and no learner can reach them. A store listing that offers three languages and delivers two half-courses reads as abandoned; one finished A1 course reads as a product. The packs stay in the build rather than being stripped out precisely so they cannot rot: five suites exercise them through `?langs=all` on every single build. Cost of keeping them: about 37KB gzipped of a 118KB bundle. Reversing it is one array.
