import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogsDir = path.join(root, 'blogs');

const BASE = 'https://unlockgames.org';
const today = '2026-05-26';

// Pages that should NOT be in sitemap
const EXCLUDE = new Set([
  // Noindex pages
  'index-de.html', 'index-fr.html', 'index-ja.html', 'index-ko.html',
  'index-es.html', 'index-ru.html', 'index-zh.html', 'search.html',
  // Redirect target (/ vs /index.html — keep only /)
  'index.html',
  // Junk/test pages
  'AutoAds-Design-Document.html', 'hub-landing.html', 'booking-landing.html',
  'excel-game.html', 'support.html',
  // Game pages (separate section)
  'blog-sprunki.html', 'blog-sprunki-3d-escape.html',
  'blog-squid-challenge.html', 'blog-guess-their-answer.html',
  'blog-airplanes-coloring-book.html', 'blog-make-america-great-again.html',
]);

// Duplicate olive-young without hyphen — canonical should point to hyphen version
const OLIVE_DUPES = new Set([
  'blog-oliveyoung-1.html', 'blog-oliveyoung-2.html', 'blog-oliveyoung-3.html',
  'blog-oliveyoung-4.html', 'blog-oliveyoung-5.html', 'blog-oliveyoung-6.html',
]);

// Hub/landing pages for brands (index pages) — these exist but are just link hubs
// We include them as they have unique content
const BRAND_HUBS = [
  'blog-acer.html', 'blog-adidas.html', 'blog-alamo.html', 'blog-amazon.html',
  'blog-avis.html', 'blog-bestbuy.html', 'blog-bloomingdales.html', 'blog-chewy.html',
  'blog-disney.html', 'blog-ebay.html', 'blog-expedia.html', 'blog-farfetch.html',
  'blog-flightcentre.html', 'blog-govee.html', 'blog-homedepot.html', 'blog-hotels.html',
  'blog-hsn.html', 'blog-ihg.html', 'blog-kohls.html', 'blog-macys.html',
  'blog-marriott.html', 'blog-newegg.html', 'blog-nike.html', 'blog-nordstrom.html',
  'blog-olive-young.html', 'blog-orbitz.html', 'blog-perriconemd.html', 'blog-petsmart.html',
  'blog-priceline.html', 'blog-proactiv.html', 'blog-quip.html', 'blog-royalcanin.html',
  'blog-samsung.html', 'blog-sephora.html', 'blog-shein.html', 'blog-target.html',
  'blog-tripadvisor.html', 'blog-vistaprint.html', 'blog-walmart.html', 'blog-woot.html',
];

function url(loc, lastmod, freq, prio) {
  return `    <url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${freq}</changefreq>
        <priority>${prio}</priority>
    </url>`;
}

const urls = [];

// 1. Homepage (canonical /)
urls.push(url(`${BASE}/`, today, 'daily', '1.0'));

// 2. Main section pages
urls.push(url(`${BASE}/index-coupon.html`, today, 'daily', '0.9'));
urls.push(url(`${BASE}/index1018.html`, today, 'weekly', '0.9'));

// 3. Static pages
for (const p of ['about.html', 'terms.html', 'privacy.html', 'contact.html']) {
  if (fs.existsSync(path.join(root, p))) {
    urls.push(url(`${BASE}/${p}`, today, 'monthly', '0.4'));
  }
}

// 4. Category pages
const catFiles = fs.readdirSync(blogsDir).filter(f => f.startsWith('category-') && f.endsWith('.html'));
for (const f of catFiles.sort()) {
  urls.push(url(`${BASE}/blogs/${f}`, today, 'weekly', '0.8'));
}

// 5. Topic pages
const topicFiles = fs.readdirSync(blogsDir).filter(f => f.startsWith('topic-') && f.endsWith('.html'));
for (const f of topicFiles.sort()) {
  urls.push(url(`${BASE}/blogs/${f}`, today, 'monthly', '0.6'));
}

// 6. All blog article pages
const blogFiles = fs.readdirSync(blogsDir)
  .filter(f => f.startsWith('blog-') && f.endsWith('.html'))
  .filter(f => !OLIVE_DUPES.has(f))
  .sort();

for (const f of blogFiles) {
  urls.push(url(`${BASE}/blogs/${f}`, today, 'monthly', '0.7'));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Sitemap rebuilt with ${urls.length} URLs`);
console.log('Excluded olive-young dupes (no hyphen):', OLIVE_DUPES.size);

// === Fix duplicate olive-young canonical tags ===
for (const f of OLIVE_DUPES) {
  const fp = path.join(blogsDir, f);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  const target = f.replace('oliveyoung', 'olive-young');
  const oldCanonical = `<link rel="canonical" href="${BASE}/blogs/${f}">`;
  const newCanonical = `<link rel="canonical" href="${BASE}/blogs/${target}">`;
  if (html.includes(oldCanonical)) {
    html = html.replace(oldCanonical, newCanonical);
    fs.writeFileSync(fp, html, 'utf8');
    console.log(`Fixed canonical: ${f} → ${target}`);
  }
}

// === Fix 1203/index.html canonical ===
const badFile = path.join(root, '1203', 'index.html');
if (fs.existsSync(badFile)) {
  let html = fs.readFileSync(badFile, 'utf8');
  if (html.includes('yourwebsite.com')) {
    html = html.replace(
      '<link rel="canonical" href="https://yourwebsite.com/">',
      `<meta name="robots" content="noindex, follow">\n    <link rel="canonical" href="${BASE}/">`
    );
    fs.writeFileSync(badFile, html, 'utf8');
    console.log('Fixed 1203/index.html — added noindex and correct canonical');
  }
}

// === Fix language pages: canonical should point to actual file, not query string ===
const langPages = ['de', 'fr', 'ja', 'ko', 'es', 'ru', 'zh'];
for (const lang of langPages) {
  const fp = path.join(root, `index-${lang}.html`);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  const bad = `<link rel="canonical" href="${BASE}/?lang=${lang}">`;
  const good = `<link rel="canonical" href="${BASE}/index-${lang}.html">`;
  if (html.includes(bad)) {
    html = html.replace(bad, good);
    fs.writeFileSync(fp, html, 'utf8');
    console.log(`Fixed canonical: index-${lang}.html`);
  }
}

// === Remove /index.html entry if somehow slipped ===
console.log('\nDone! Key fixes:');
console.log('1. Removed /index.html from sitemap (only / remains)');
console.log('2. Added all missing blog/category pages');
console.log('3. Excluded oliveyoung dupes (no-hyphen versions)');
console.log('4. Fixed canonicals for language pages and 1203/index.html');
