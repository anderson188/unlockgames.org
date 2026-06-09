import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogsDir = path.join(root, 'blogs');

const BASE = 'https://unlockgames.org';
const today = '2026-05-27';

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
  // Game / legacy pages (root only — not affiliate articles)
  'blog.html',
  'blog-2player-chess.html', 'blog-airplanes-coloring-book.html',
  'blog-block-puzzle-travel.html', 'blog-chicken-scream.html',
  'blog-driver-highway.html', 'blog-guess-their-answer.html',
  'blog-make-america-great-again.html', 'blog-plant-clicker.html',
  'blog-slime-jumper.html', 'blog-sprunki.html', 'blog-sprunki-3d-escape.html',
  'blog-sprunki-phase-7.html', 'blog-squid-challenge.html', 'blog-tiny-fishing.html',
]);

// Duplicate olive-young without hyphen — canonical should point to hyphen version
const OLIVE_DUPES = new Set([
  'blog-oliveyoung-1.html', 'blog-oliveyoung-2.html', 'blog-oliveyoung-3.html',
  'blog-oliveyoung-4.html', 'blog-oliveyoung-5.html', 'blog-oliveyoung-6.html',
]);

// Thin brand hub stubs (~2 paragraphs) — exclude from sitemap; use noindex so
// Google does not queue crawl budget on pages unlikely to rank.
const BRAND_HUBS = new Set([
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
]);

// Paginated category duplicates — keep only main category pages in sitemap
const CATEGORY_PAGINATION = new Set(
  fs.readdirSync(blogsDir)
    .filter((f) => /^category-.+-\d+\.html$/.test(f))
);

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
const catFiles = fs.readdirSync(blogsDir)
  .filter(f => f.startsWith('category-') && f.endsWith('.html'))
  .filter(f => !CATEGORY_PAGINATION.has(f));
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
  .filter(f => !BRAND_HUBS.has(f))
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
console.log('Excluded thin brand hubs:', BRAND_HUBS.size);
console.log('Excluded paginated category pages:', CATEGORY_PAGINATION.size);

// === noindex thin brand hub pages ===
for (const f of BRAND_HUBS) {
  const fp = path.join(blogsDir, f);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  if (!html.includes('noindex')) {
    html = html.replace(
      '<meta name="viewport"',
      '<meta name="robots" content="noindex, follow">\n    <meta name="viewport"'
    );
    fs.writeFileSync(fp, html, 'utf8');
    console.log('Added noindex:', f);
  }
}

// === Fix duplicate olive-young canonical tags + noindex dupes ===
for (const f of OLIVE_DUPES) {
  const fp = path.join(blogsDir, f);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  const target = f.replace('oliveyoung', 'olive-young');
  const oldCanonical = `<link rel="canonical" href="${BASE}/blogs/${f}">`;
  const newCanonical = `<link rel="canonical" href="${BASE}/blogs/${target}">`;
  if (html.includes(oldCanonical)) {
    html = html.replace(oldCanonical, newCanonical);
    console.log(`Fixed canonical: ${f} → ${target}`);
  }
  if (!html.includes('noindex')) {
    html = html.replace(
      '<meta name="viewport"',
      '<meta name="robots" content="noindex, follow">\n    <meta name="viewport"'
    );
    console.log('Added noindex to olive dupe:', f);
  }
  fs.writeFileSync(fp, html, 'utf8');
}

// === noindex root game / legacy pages ===
const ROOT_NOINDEX = [
  'blog.html', 'blog-2player-chess.html', 'blog-airplanes-coloring-book.html',
  'blog-block-puzzle-travel.html', 'blog-chicken-scream.html', 'blog-driver-highway.html',
  'blog-guess-their-answer.html', 'blog-make-america-great-again.html', 'blog-plant-clicker.html',
  'blog-slime-jumper.html', 'blog-sprunki.html', 'blog-sprunki-3d-escape.html',
  'blog-sprunki-phase-7.html', 'blog-squid-challenge.html', 'blog-tiny-fishing.html',
  'excel-game.html',
];
for (const f of ROOT_NOINDEX) {
  const fp = path.join(root, f);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('noindex')) continue;
  html = html.replace(
    '<meta charset="UTF-8">',
    '<meta charset="UTF-8">\n    <meta name="robots" content="noindex, follow">'
  );
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Added noindex:', f);
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
