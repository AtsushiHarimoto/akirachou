// Prints every character the site can render, per font region, as JSON.
// Usage: node scripts/dump-text.mjs <compiled-content.js>
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { COPY, LANG_LABEL } = require(process.argv[2]);

const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const extra = 'AKIRA CHŌ—–↗·・／（）「」、。' + ascii;
const text = (l) => JSON.stringify(COPY[l]).replace(/\\u[0-9a-fA-F]{4}/g, (m) => String.fromCharCode(parseInt(m.slice(2), 16)));
const uniq = (s) => Array.from(new Set(Array.from(s))).join('');

console.log(JSON.stringify({
  JP: uniq(text('ja') + text('en') + extra),
  TC: uniq(text('zh-Hant') + extra),
  SC: uniq(text('zh-Hans') + extra),
  labels: { JP: LANG_LABEL.ja + 'EN', TC: LANG_LABEL['zh-Hant'], SC: LANG_LABEL['zh-Hans'] },
}));
