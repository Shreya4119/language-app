/* Runs every Playwright suite in sequence and fails the process if any of them
   prints an error line. Every suite must end with "ERRORS: none". */
import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const suites = readdirSync(here).filter(f => f.startsWith('t-') && f.endsWith('.mjs')).sort();

let failed = [];
for (const s of suites) {
  process.stdout.write(`\n──── ${s} ${'─'.repeat(Math.max(0, 46 - s.length))}\n`);
  try {
    const out = execFileSync('node', [resolve(here, s)], { encoding: 'utf8', stdio: 'pipe' });
    process.stdout.write(out);
    if (!/ERRORS:\s*none/.test(out)) failed.push(`${s} (no clean ERRORS line)`);
  } catch (e) {
    process.stdout.write((e.stdout || '') + (e.stderr || ''));
    failed.push(`${s} (crashed)`);
  }
}
console.log('\n' + '='.repeat(52));
if (failed.length) { console.log('FAILED:', failed.join(', ')); process.exit(1); }
console.log(`All ${suites.length} suites passed.`);
