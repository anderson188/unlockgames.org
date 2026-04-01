import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const BASE = 'https://unlockgames.org';
const OUT = path.join(root, 'sitemap-latest.xml');
const WINDOW_DAYS = 30;

const now = Date.now();
const cutoff = now - WINDOW_DAYS * 24 * 60 * 60 * 1000;

function fmtDate(ms) {
  const d = new Date(ms);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function pushIfRecent(entries, rel, absPath, changefreq, priority) {
  const st = fs.statSync(absPath);
  if (st.mtimeMs < cutoff) return;
  const loc = rel === 'index.html' ? `${BASE}/` : `${BASE}/${rel.replace(/\\/g, '/')}`;
  entries.push({
    loc,
    lastmod: fmtDate(st.mtimeMs),
    changefreq,
    priority,
  });
}

const entries = [];

// Homepage
pushIfRecent(entries, 'index.html', path.join(root, 'index.html'), 'daily', '1.0');

// Key root pages likely updated recently
for (const n of ['search.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html']) {
  const p = path.join(root, n);
  if (fs.existsSync(p)) pushIfRecent(entries, n, p, 'weekly', '0.7');
}

// Recent blog pages (posts, categories, topics)
const blogsDir = path.join(root, 'blogs');
for (const n of fs.readdirSync(blogsDir)) {
  if (!n.endsWith('.html')) continue;
  const p = path.join(blogsDir, n);
  const isCategory = n.startsWith('category-') || n.startsWith('topic-');
  pushIfRecent(entries, `blogs/${n}`, p, isCategory ? 'weekly' : 'daily', isCategory ? '0.8' : '0.9');
}

entries.sort((a, b) => (a.lastmod < b.lastmod ? 1 : -1));

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
for (const u of entries) {
  xml += `    <url>\n        <loc>${u.loc}</loc>\n        <lastmod>${u.lastmod}</lastmod>\n        <changefreq>${u.changefreq}</changefreq>\n        <priority>${u.priority}</priority>\n    </url>\n`;
}
xml += `</urlset>\n`;

fs.writeFileSync(OUT, xml, 'utf8');
console.log(`Wrote ${entries.length} URLs to sitemap-latest.xml (${WINDOW_DAYS} days).`);
