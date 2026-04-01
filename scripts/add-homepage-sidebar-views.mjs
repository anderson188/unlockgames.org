import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');
let i = 0;

function views(n) {
  return (1000 + ((n * 7919) % 99005)).toLocaleString('en-US');
}

html = html.replace(
  /<span class="sidebar-date">(.*?)<\/span>/g,
  (full, body) => {
    const m = body.match(/(\d{4}-\d{2}-\d{2})/);
    if (!m) return full;
    i += 1;
    return `<span class="sidebar-date"><span class="date-text">${m[1]}</span><span class="view-count" aria-label="views">&#128065; ${views(i)}</span></span>`;
  }
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log(`Updated ${i} homepage sidebar dates.`);
