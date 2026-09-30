# Running Sprak

Three ways, from easiest to most useful. Start at the top if you just want to
look at it; use the second one for real testing.

---

## 1. The quickest look: one file, no setup

`sprak.html` in the repo root is the entire app in a single file. No server, no
install, no internet.

**On the laptop:** double-click it. It opens in your browser and works.

**On the phone:** email or WhatsApp the file to yourself, open the attachment,
choose "open with Chrome".

Good for: showing someone, checking a screen, a quick read-through.
Not good for: the microphone, which needs the second method.

---

## 2. The real loop: laptop serves, phone runs, both live

This is the one to use while you learn Dutch, because edits reach your phone in
about a second and you never re-copy a file.

**Once, on the laptop:**

```bash
cd C:\Users\shrii\language\sprak
npm install
```

**Every time:**

```bash
npm run dev:https
```

It prints two addresses. The **Network** one is your phone's:

```
➜  Local:   https://localhost:5173/
➜  Network: https://192.168.1.24:5173/      ← type this into Chrome on the phone
```

On the phone, Chrome shows a certificate warning the first time. Tap
**Advanced → Proceed to 192.168.1.24 (unsafe)**. It says unsafe because the
certificate is one your own laptop made, which is exactly what you want here.
After that the microphone works.

Both devices must be on the same wifi.

> `npm run dev` (without `:https`) also works and is slightly simpler, but the
> **microphone will not work** on it. The Web Speech API needs a secure context
> and a plain `http://192.168.x.x` address is not one. It fails silently, which
> is the worst way to fail, so use `dev:https` for anything involving speaking.

### Starting Dutch

Dutch is parked: it does not appear in the language picker, because the app
ships German only. To open it, add the flag **once**:

```
https://192.168.1.24:5173/?langs=all
```

The flag then sticks on that phone, so tomorrow the plain address still shows
Dutch, French, Spanish and Mandarin in the picker. Pick **Dutch** and Sanne
takes it from there.

To go back to seeing what a real user sees:

```
https://192.168.1.24:5173/?langs=de
```

---

## 3. The dashboard

`dashboard.html`, also in the repo root. It is a static page: **double-click
it**, no server, no dev command. Two screens, scroll down for the second:

- **Syllabus** · the Dutch A1 track, its source books and coverage
- **Notifications & email** · the nudge banks, the send rules, the templates

It does not read live data from the app. It is the planning view.

**Both at once:** dashboard in one laptop browser tab, editor in another, the
dev server in a terminal, the app on your phone. They do not interfere.

---

## Reading the phone's console from the laptop

Worth ten minutes to set up. It turns "it does not work on my phone" into an
ordinary bug you can see.

1. Phone: Settings → About phone → tap **Build number** seven times → back →
   Developer options → turn on **USB debugging**.
2. Plug the phone into the laptop. Accept the prompt on the phone.
3. Laptop Chrome: open **`chrome://inspect/#devices`**.
4. Your phone's tab is listed. Click **inspect**.

Full DevTools for the page running on the phone: console, network, elements.

---

## If something goes wrong

**Phone cannot reach the address.** Same wifi? Some home routers have "client
isolation" or a separate guest network that blocks device-to-device traffic. If
so, use a tunnel instead, which works on mobile data too:
`cloudflared tunnel --url http://localhost:5173`

**The microphone does nothing.** Check the address starts with `https`. Then
check Chrome has microphone permission for the site (tap the padlock in the
address bar). Speech recognition needs an internet connection even though the
rest of the app does not.

**No sound at all.** Android needs a voice installed for the language: Settings
→ System → Languages → Text-to-speech → install the Dutch voice. The app will
tell you rather than reading Dutch in a German accent, which is the one thing it
must never do.

**A screen looks wrong or crashes.** Note the screen, take a screenshot, and
carry on. `tests/shots/screens/` has a reference shot of every screen in both
languages, so a before-and-after is easy.

---

## Running the tests

```bash
npm test
```

18 suites, roughly two minutes. Every one must print `ERRORS: none`. Run it
after any change; `npm run test:unit` alone takes a second and catches a missing
vocabulary id.

To rebuild the single file after changes: `npm run single`.
