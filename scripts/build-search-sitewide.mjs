import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outFile = path.join(root, 'search-sitewide.json');

function collectHtml(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules' || name === '.cursor') continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      collectHtml(p, out);
    } else if (st.isFile() && name.endsWith('.html')) {
      out.push(p);
    }
  }
}

function shouldInclude(relPath) {
  const p = relPath.replace(/\\/g, '/');
  if (p.startsWith('blogs/blog-')) return true;
  if (/^blog-[^/]+\.html$/i.test(p)) return true;
  if (p.startsWith('blogs/topic-')) return true;
  return false;
}

const files = [];
collectHtml(root, files);

const items = [];
for (const abs of files) {
  const rel = path.relative(root, abs);
  if (!shouldInclude(rel)) continue;
  const s = fs.readFileSync(abs, 'utf8');
  const h1 = s.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1) continue;
  const title = h1[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!title) continue;
  const d = s.match(/(\d{4}-\d{2}-\d{2})/);
  const date = d ? d[1] : '';
  items.push({
    title,
    href: rel.replace(/\\/g, '/'),
    date,
  });
}

items.sort((a, b) => (a.date < b.date ? 1 : -1));
fs.writeFileSync(outFile, JSON.stringify(items), 'utf8');
console.log(`Wrote ${items.length} sitewide title items.`);
