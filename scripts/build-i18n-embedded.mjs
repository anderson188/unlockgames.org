/**
 * Bundles i18n/es.json, fr.json, de.json + *-home.json + articles-{es,fr,de}.json into i18n-embedded.js
 * so file:// works (fetch is blocked).
 *
 * Run after ANY change to i18n/articles-*.json (or locale JSON), otherwise local previews miss new bodies:
 *   npm run build:i18n-embedded
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const i18nDir = path.join(root, 'i18n');
const outFile = path.join(root, 'i18n-embedded.js');

const obj = {};
for (const loc of ['es', 'fr', 'de']) {
  const p = path.join(i18nDir, loc + '.json');
  const pack = JSON.parse(fs.readFileSync(p, 'utf8'));
  const homePath = path.join(i18nDir, loc + '-home.json');
  if (fs.existsSync(homePath)) {
    const home = JSON.parse(fs.readFileSync(homePath, 'utf8'));
    if (home.homeCards) pack.homeCards = home.homeCards;
  }
  const articlesPath = path.join(i18nDir, 'articles-' + loc + '.json');
  if (fs.existsSync(articlesPath)) {
    const extra = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    if (extra && extra.articles) {
      pack.articles = pack.articles || {};
      for (const k of Object.keys(extra.articles)) {
        pack.articles[k] = Object.assign({}, pack.articles[k] || {}, extra.articles[k]);
      }
    }
  }
  obj[loc] = pack;
}

const js = 'window.__UNLOCKGAMES_I18N__=' + JSON.stringify(obj) + ';';
fs.writeFileSync(outFile, js, 'utf8');
console.log('Wrote i18n-embedded.js');