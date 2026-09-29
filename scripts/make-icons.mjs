/* Render the Sprak mark to the PNG sizes Play and the web manifest need. */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const mark = (size, maskable) => `
<html><body style="margin:0">
<div style="width:${size}px;height:${size}px;background:#8C3F5B;display:flex;align-items:center;justify-content:center">
  <svg width="${Math.round(size * (maskable ? 0.52 : 0.68))}" viewBox="0 0 100 100" fill="none">
    <path d="M22 26h30a16 16 0 0 1 0 32H34l-12 14V26Z" fill="#FBF6F4"/>
    <path d="M56 30h22v40H62a6 6 0 0 1-6-6V30Z" fill="#E8C36B"/>
    <circle cx="40" cy="42" r="3.4" fill="#8C3F5B"/><circle cx="52" cy="42" r="3.4" fill="#8C3F5B"/>
  </svg>
</div></body></html>`;

const b = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
for (const [file, size, maskable] of [
  ['public/icon-192.png', 192, false],
  ['public/icon-512.png', 512, false],
  ['public/icon-maskable-512.png', 512, true],
  ['public/favicon.png', 64, false],
]) {
  const p = await b.newPage({ viewport: { width: size, height: size } });
  await p.setContent(mark(size, maskable));
  writeFileSync(file, await p.screenshot({ omitBackground: false }));
  await p.close();
  console.log(file, size + 'px');
}
await b.close();
