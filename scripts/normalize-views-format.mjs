import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function collectHtml(dir, out) {
  for (const n of fs.readdirSync(dir)) {
    if (n === '.git' || n === 'node_modules' || n === '.cursor') continue;
    const p = path.join(dir, n);
    const st = fs.statSync(p);
    if (st.isDirectory()) collectHtml(p, out);
    else if (st.isFile() && n.endsWith('.html')) out.push(p);
  }
}

function norm(tag, cls, body) {
  // YYYY-MM-DD · 👁 12,345  => structured spans
  const m = body.match(/(\d{4}-\d{2}-\d{2})\s*&(?:middot|#183);?\s*(?:<span[^>]*>)?\s*(?:&#128065;|👁)\s*([0-9,]+)\s*(?:<\/span>)?/i);
  if (!m) return null;
  const d = m[1];
  const v = m[2];
  return `<${tag} class="${cls}"><span class="date-text">${d}</span><span class="view-count" aria-label="views">&#128065; ${v}</span></${tag}>`;
}

const files = [];
collectHtml(root, files);
let changed = 0;

for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  let t = s;

  // Span date classes
  t = t.replace(/<span class="(article-item-date|date|sidebar-date)">([\s\S]*?)<\/span>/g, (_, cls, body) => {
    const r = norm('span', cls, body);
    return r || `<span class="${cls}">${body}</span>`;
  });

  // Detail publish date paragraph (specific inline style block)
  t = t.replace(/<p style="color:#64748b;font-size:0\.9rem;margin-bottom:1\.5rem;">([\s\S]*?)<\/p>/g, (full, body) => {
    const m = body.match(/(\d{4}-\d{2}-\d{2})\s*&nbsp;\s*&(?:middot|#183);?\s*&nbsp;\s*<span[^>]*>\s*(?:&#128065;|👁)\s*([0-9,]+)\s*<\/span>/i);
    if (!m) return full;
    const d = m[1];
    const v = m[2];
    return `<p style="color:#64748b;font-size:0.9rem;margin-bottom:1.5rem;"><span class="date-text">${d}</span><span class="view-count" aria-label="views">&#128065; ${v}</span></p>`;
  });

  // Category meta inserted earlier
  t = t.replace(/<span class="category-mag-views" aria-label="views">\s*&nbsp;\s*&(?:middot|#183);?\s*&nbsp;\s*(?:&#128065;|👁)\s*([0-9,]+)\s*<\/span>/g, '<span class="category-mag-views view-count" aria-label="views">&#128065; $1</span>');

  if (t !== s) {
    fs.writeFileSync(f, t, 'utf8');
    changed += 1;
  }
}

console.log(`Normalized view/date markup in ${changed} HTML files.`);
