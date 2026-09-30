import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

/* THE ORDER IS LOAD-BEARING. Do not sort it.
   - avatar.js deliberately overrides SCREENS.onboard1/3 defined in screens1.js
   - screens4.js ends with the boot code and must stay last */
export const SOURCES = [
  'content.js',
  'dutch.js',      /* must follow content.js: it registers into COURSES */
  'mandarin.js',   /* same */
  'core.js',
  'screens1.js',
  'screens2.js',
  'screens3.js',
  'avatar.js',
  'lesson1.js',
  'verbs.js',
  'teach.js',
  'notes.js',
  'nudges.js',     /* needs VOCAB, UNITS, dueWords() and handPending() */
  'games.js',      /* needs VOCAB, course(), wordResult(), note(), navBar() */
  'daily.js',      /* the Home hero: assembles today from what already exists */
  'screens4.js',
];

export const readSources = () =>
  SOURCES.map(f => `/* ===== ${f} ===== */\n` + readFileSync(resolve(here, 'src', f), 'utf8')).join('\n');

/**
 * The app is a CLASSIC script, deliberately.
 *
 * Every control in the UI is an inline `onclick="go('home')"`. Inline handlers
 * resolve against the GLOBAL scope, so the app's functions have to live there.
 * A bundled ES module would put them in module scope and every button in the
 * app would throw "go is not defined". So we concatenate the sources and inject
 * them as one plain <script>, which is exactly the scope they were written for.
 *
 * If you ever want real modules, that is a genuine refactor: add explicit
 * exports/imports AND replace every inline handler with addEventListener.
 */
function sprakClassicScript() {
  const paths = SOURCES.map(f => resolve(here, 'src', f));
  return {
    name: 'sprak-classic-script',
    transformIndexHtml: {
      order: 'post',
      handler: html => ({
        html,
        tags: [{ tag: 'script', children: readSources(), injectTo: 'body' }],
      }),
    },
    configureServer(server) {
      paths.forEach(p => server.watcher.add(p));
      server.watcher.on('change', p => {
        if (paths.includes(p)) server.ws.send({ type: 'full-reload' });
      });
    },
  };
}

/* ---- testing on a real phone ------------------------------------------
   `npm run dev` serves over plain http on the LAN. Everything works there
   except the one thing this app is built around: the Web Speech API needs a
   SECURE CONTEXT, and a LAN IP over http is not one, so the microphone is
   dead and speech synthesis is unreliable.

   `npm run dev:https` serves the same thing over https with a self-signed
   certificate. Android Chrome shows a warning once: Advanced → Proceed. From
   then on the mic works on the phone, against your live code, with hot reload.
   ---------------------------------------------------------------------- */
const HTTPS = process.env.SPRAK_HTTPS === '1';

export default defineConfig(async () => ({
  plugins: [
    sprakClassicScript(),
    ...(HTTPS ? [(await import('@vitejs/plugin-basic-ssl')).default()] : []),
  ],
  build: { target: 'es2020', outDir: 'dist', assetsInlineLimit: 100_000 },
  server: { host: true, port: 5173 },     // host:true so your phone can reach it on the LAN
  preview: { host: true, port: 4173 },
}));
