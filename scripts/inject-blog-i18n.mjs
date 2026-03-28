/**
 * Injects i18n-embedded.js + site-i18n.js before </body> on all blogs/*.html that lack them.
 * Run: node scripts/inject-blog-i18n.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, '..', 'blogs');

const INJECT =
  '    <script src="../i18n-embedded.js" defer></script>\n    <script src="../site-i18n.js" defer></script>\n';

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

let n = 0;
for (const file of walk(blogsDir)) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('site-i18n.js')) continue;
  if (!html.includes('</body>')) continue;
  html = html.replace('</body>', INJECT + '</body>');
  fs.writeFileSync(file, html, 'utf8');
  n++;
}
console.log('Injected i18n into', n, 'blog HTML files');
