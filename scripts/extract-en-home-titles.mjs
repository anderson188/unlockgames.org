/**
 * Builds English title map for zh-home keys from articles-list.json + index.html fallbacks.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const zh = JSON.parse(fs.readFileSync(path.join(root, 'i18n/zh-home.json'), 'utf8'));
const list = JSON.parse(fs.readFileSync(path.join(root, 'blogs/articles-list.json'), 'utf8'));
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const byFile = {};
for (const a of list) {
  byFile['blogs/' + a.file] = { title: a.title, excerpt: a.metaDesc };
}

function firstTitleFromIndex(href) {
  const re = new RegExp('<a href="' + href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '">([^<]+)</a>', 'i');
  const m = indexHtml.match(re);
  return m ? m[1].trim() : null;
}

const en = {};
for (const href of Object.keys(zh.homeCards)) {
  let row = byFile[href];
  if (!row) {
    const t = firstTitleFromIndex(href);
    row = { title: t || href, excerpt: '' };
  }
  en[href] = { title: row.title, excerpt: row.excerpt || undefined };
}

fs.writeFileSync(path.join(root, 'i18n/en-home-source.json'), JSON.stringify({ homeCards: en }, null, 2), 'utf8');
console.log('Wrote i18n/en-home-source.json', Object.keys(en).length);
