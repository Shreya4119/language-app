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
  'core.js',
  'screens1.js',
  'screens2.js',
  'screens3.js',
  'avatar.js',
  'lesson1.js',
  'verbs.js',
  'teach.js',
  'notes.js',
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

export default defineConfig({
  plugins: [sprakClassicScript()],
  build: { target: 'es2020', outDir: 'dist', assetsInlineLimit: 100_000 },
  server: { host: true, port: 5173 },     // host:true so your phone can reach it on the LAN
  preview: { host: true, port: 4173 },
});
