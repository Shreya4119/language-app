/* Produce the one-file version (sprak.html) for sharing and for the Artifact. */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SOURCES, readSources } from '../vite.config.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(resolve(root, p), 'utf8');

const html = read('index.html')
  .replace('<script type="module" src="/src/main.js"></script>', '')
  .replace('<link rel="manifest" href="/manifest.webmanifest">', '');
const css = read('src/styles.css');
const js  = readSources();

const out = html
  .replace('</head>', `<style>\n${css}\n</style>\n</head>`)
  .replace('</body>', `<script>\n${js}\n</script>\n</body>`);

writeFileSync(resolve(root, 'sprak.html'), out);
console.log(`sprak.html · ${(out.length / 1024).toFixed(0)} KB`);
