import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogsDir = path.join(root, 'blogs');
const outFile = path.join(blogsDir, 'search-titles.json');

const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith('.html') && f.startsWith('blog-'));
const out = [];

for (const f of files) {
  const p = path.join(blogsDir, f);
  const s = fs.readFileSync(p, 'utf8');
  const h1 = s.match(/<h1>([\s\S]*?)<\/h1>/i);
  const title = h1 ? h1[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : f;
  const d = s.match(/(\d{4}-\d{2}-\d{2})/);
  const date = d ? d[1] : '';
  out.push({ title, file: f, date });
}

out.sort((a, b) => (a.date < b.date ? 1 : -1));
fs.writeFileSync(outFile, JSON.stringify(out), 'utf8');
console.log(`Wrote ${out.length} search title items.`);
