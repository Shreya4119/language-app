# Deploy

The reason to do this early is not backup. **An https URL is the only way to get a
working microphone onto a phone.** The Web Speech API needs a secure context, and
a LAN IP over plain http is not one, so `npm run dev` on your phone will always
have a dead mic no matter what else you fix.

## 1 · GitHub

Private is fine and free. You can make it public later.

```bash
cd sprak
git remote add origin https://github.com/<you>/sprak.git
git push -u origin main
```

Or, with the GitHub CLI, in one command from inside the folder:

```bash
gh repo create sprak --private --source=. --push
```

`.github/workflows/ci.yml` then runs on every push: unit tests, build, all flow
suites, and the one-file build, with `sprak.html` uploaded as an artifact. A red
tick means `main` is not deployable.

## 2 · Cloudflare Pages

Free, and it watches the repo.

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20 |

You get a `*.pages.dev` URL in about two minutes. Every push to `main` redeploys,
and **every pull request gets its own preview URL**, which is the real reason to
branch: you can try a change on your phone before it reaches the live site.

## 3 · Onto a phone, without an APK

Open the Pages URL in **Chrome** on the phone, then menu → **Add to Home screen**.

`public/manifest.webmanifest` and the four icons are already there, so it installs
with an icon, launches fullscreen with no browser chrome, and — because it is still
Chrome underneath — the microphone works.

This is the fastest honest way to test. No Android Studio, no APK, no Play account.

### What to check the first time

The emulator and the desktop both lie about these.

- microphone with permission **granted**, **denied**, and **revoked mid-session**
- text to speech with the phone on **silent**
- the Android **back button** from every screen
- a phone call arriving mid-lesson
- airplane mode
- the Dutch course with no Dutch voice installed: it must warn, not go quiet

## 4 · Later: a real APK

Two routes, and the choice matters more than it looks. `docs/MIGRATION.md` has the
detail. The short version:

- **TWA** wraps the hosted site with Bubblewrap. It is really Chrome, so the mic
  works unchanged. Needs a domain and a Digital Asset Links file.
- **Capacitor** is a native shell around the same web code. Android System WebView
  has never implemented `SpeechRecognition`, so the mic is dead until you add a
  native plugin. Speech *synthesis* works, which makes the failure easy to miss.

## Secrets

There are none today: no backend, no API keys, nothing collected.

When the Play signing key exists, **it never goes in the repo**, not even a private
one. Lose it and you can never update the app; leak it and someone else can publish
as you. `.gitignore` already blocks `*.keystore` and `*.jks`. Keep it that way.

## Working practice

- `main` is always deployable, because it is literally what is live
- run `npm test` before pushing; CI is a safety net, not a substitute
- branch for anything bigger than a typo, so you get a preview URL
- tag what you ship: `git tag v0.1.0 && git push --tags`
- never commit `dist/`, `sprak.html` or `node_modules/` — all generated, all ignored
