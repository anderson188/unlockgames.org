/**
 * Reports how many blog/topic HTML files have bodyHtml in articles-{es,fr,de}.json.
 * Run after changing translations. For local file://, also run: npm run build:i18n-embedded
 *
 * Usage: node scripts/check-articles-i18n.mjs [--strict]  (strict: exit 1 if any missing)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogsDir = path.join(root, 'blogs');

const strict = process.argv.includes('--strict');

const blogs = fs
  .readdirSync(blogsDir)
  .filter((f) => f.endsWith('.html') && (f.startsWith('blog-') || f.startsWith('topic-')));

function loadArticles(loc) {
  const p = path.join(root, 'i18n', `articles-${loc}.json`);
  if (!fs.existsSync(p)) return {};
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8')).articles || {};
  } catch {
    return {};
  }
}

const locales = ['es', 'fr', 'de'];
let anyMissing = false;

for (const loc of locales) {
  const art = loadArticles(loc);
  const missing = blogs.filter((f) => !art[f] || !String(art[f].bodyHtml || '').trim());
  const done = blogs.length - missing.length;
  console.log(
    `[articles-${loc}.json] ${done}/${blogs.length} articles with bodyHtml; missing: ${missing.length}`
  );
  if (missing.length) {
    anyMissing = true;
    if (missing.length <= 25) console.log('  missing:', missing.join(', '));
    else console.log('  first 25 missing:', missing.slice(0, 25).join(', '), '...');
  }
}

if (anyMissing) {
  console.log('\nNext: run  npm run build:articles-i18n  (or :translate-only) with --resume, then  npm run build:i18n-embedded  for file://');
  if (strict) process.exit(1);
} else {
  console.log('\nAll blog/topic articles have translations in es, fr, de. Run npm run build:i18n-embedded after JSON changes.');
}
