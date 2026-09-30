# Developing with the app on your phone

Laptop edits, phone reloads, both at once. This is the loop worth having,
because this app is mic-first and a laptop microphone tells you nothing about
what it feels like standing at a bakery counter.

## The loop

On the laptop, in the repo:

```bash
npm run dev
```

Vite prints two addresses. The **Network** one is the one your phone wants:

```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.24:5173/     ← type this into Chrome on the phone
```

Both devices must be on the same wifi. From then on, every time a source file
changes the phone reloads itself. `vite.config.js` watches every file in
`SOURCES` and sends a full reload, so a change reaches the phone in about a
second whether you made it or Claude did.

That means the co-working loop already works: Claude writes into
`C:\Users\shrii\language\sprak`, Vite notices, your phone refreshes. You do not
have to rebuild, re-zip or re-upload anything.

## The catch, and the fix

**The microphone will not work on `http://192.168.x.x`.** The Web Speech API
requires a *secure context*, and a LAN IP over plain http is not one. Everything
else works there; speech does not, and it fails silently, which is worse.

So for anything involving the mic:

```bash
npm run dev:https
```

Same server, same hot reload, served over https with a self-signed certificate.
Android Chrome will show a warning the first time: **Advanced → Proceed**. After
that the mic works, against your live code, on a real phone.

If you would rather not see the certificate warning at all, the alternative is a
tunnel, which gives you a real https URL and works on mobile data as well as
wifi:

```bash
cloudflared tunnel --url http://localhost:5173
```

That prints a public `https://something.trycloudflare.com` address. It is free
and needs no account, but it does mean anyone with that URL can see your work in
progress, so close it when you are done.

## Seeing the phone's console on the laptop

This is the part most people miss, and it turns "it does not work on my phone"
into an ordinary bug:

1. Phone: Settings → About phone → tap Build number seven times → Developer
   options → **USB debugging** on.
2. Plug the phone into the laptop, accept the prompt.
3. Laptop Chrome: open **`chrome://inspect/#devices`**.
4. Your phone's tab appears. Click **inspect**.

You now have full DevTools for the page running on the phone: console, network,
elements, and the ability to run code against it. Every `console.log` from the
phone appears on the laptop.

## Dashboard on the laptop, app on the phone

They are separate things and can run side by side:

- **Laptop:** the Studio dashboard in one browser tab, your editor in another,
  the dev server in a terminal.
- **Phone:** the app itself, reloading as you edit.

The dashboard is a static page, so it does not need the dev server at all.

## Testing a parked language

Dutch and Mandarin are parked behind `LIVE_LANGS`, so they do not appear in the
picker. To reach them on the phone, add the preview flag:

```
http://192.168.1.24:5173/?langs=all
```

That is how you can learn and test Dutch daily while the shipped build offers
only German.

## What the phone still cannot tell you

The browser is not the app store build. Web push on iOS only works once the app
is on the Home Screen, and the Android WebView inside a Capacitor build has
never implemented `SpeechRecognition`, which is why the native speech plugin
exists. Test the wrapped build before you believe anything about speech on a
packaged app. See `docs/MIGRATION.md`.
