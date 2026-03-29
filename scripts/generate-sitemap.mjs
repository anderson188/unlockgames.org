/**
 * Regenerates sitemap.xml from disk: homepage, eligible root *.html, all blogs/*.html.
 * Run: node scripts/generate-sitemap.mjs
 * Excludes locale mirror pages (index-xx.html), verification/hash stubs, service worker.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const BASE = 'https://unlockgames.org';
const OUT = path.join(root, 'sitemap.xml');

function fmtDate(mtimeMs) {
  const d = new Date(mtimeMs);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const ROOT_SKIP = new Set([
  'fo-verify.html',
  'sw.html',
  'autoads-dashboard.html',
  'AutoAds-Design-Document.html',
]);

function includeRootHtml(name) {
  if (!name.endsWith('.html')) return false;
  if (name === 'index.html') return false;
  if (/^index-[a-z]{2}\.html$/i.test(name)) return false;
  if (ROOT_SKIP.has(name)) return false;
  const stem = name.replace(/\.html$/i, '');
  if (/^[a-f0-9]+$/i.test(stem) && stem.length >= 12) return false;
  return true;
}

function metaForRelPath(rel, mtimeMs) {
  const lastmod = fmtDate(mtimeMs);
  if (rel === '/') {
    return { changefreq: 'daily', priority: '1.0', lastmod };
  }
  const base = path.basename(rel);
  if (base === 'index-coupon.html' || base === 'index1018.html') {
    return { changefreq: 'weekly', priority: '0.9', lastmod };
  }
  if (rel.startsWith('blogs/')) {
    if (base.startsWith('category-') || base.startsWith('topic-')) {
      return { changefreq: 'weekly', priority: '0.8', lastmod };
    }
    return { changefreq: 'monthly', priority: '0.7', lastmod };
  }
  if (/^(terms|privacy)\.html$/i.test(base)) {
    return { changefreq: 'yearly', priority: '0.5', lastmod };
  }
  if (/^(about|contact|search)\.html$/i.test(base)) {
    return { changefreq: 'monthly', priority: '0.65', lastmod };
  }
  return { changefreq: 'monthly', priority: '0.6', lastmod };
}

const entries = [];

const indexPath = path.join(root, 'index.html');
entries.push({
  loc: `${BASE}/`,
  ...metaForRelPath('/', fs.statSync(indexPath).mtimeMs),
});

for (const name of fs.readdirSync(root)) {
  if (!includeRootHtml(name)) continue;
  const fp = path.join(root, name);
  if (!fs.statSync(fp).isFile()) continue;
  const st = fs.statSync(fp);
  const rel = name;
  const { changefreq, priority, lastmod } = metaForRelPath(rel, st.mtimeMs);
  entries.push({
    loc: `${BASE}/${encodeURI(name)}`,
    changefreq,
    priority,
    lastmod,
  });
}

const blogDir = path.join(root, 'blogs');
for (const name of fs.readdirSync(blogDir)) {
  if (!name.endsWith('.html')) continue;
  const fp = path.join(blogDir, name);
  if (!fs.statSync(fp).isFile()) continue;
  const st = fs.statSync(fp);
  const rel = `blogs/${name}`;
  const { changefreq, priority, lastmod } = metaForRelPath(rel, st.mtimeMs);
  entries.push({
    loc: `${BASE}/blogs/${encodeURI(name)}`,
    changefreq,
    priority,
    lastmod,
  });
}

function sortKey(loc) {
  if (loc === `${BASE}/`) return '\0';
  const p = loc.slice(BASE.length);
  if (p.startsWith('/blogs/')) return '\x02' + p;
  return '\x01' + p;
}

entries.sort((a, b) => sortKey(a.loc).localeCompare(sortKey(b.loc)));

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
for (const u of entries) {
  xml += `    <url>
        <loc>${u.loc}</loc>
        <lastmod>${u.lastmod}</lastmod>
        <changefreq>${u.changefreq}</changefreq>
        <priority>${u.priority}</priority>
    </url>
`;
}
xml += `</urlset>
`;

fs.writeFileSync(OUT, xml, 'utf8');
console.log('Wrote', entries.length, 'URLs to sitemap.xml');
