/**
 * Extract article body from blogs/*.html, translate EN → es/fr/de, write i18n/articles-{loc}.json.
 * Uses google-translate-api-x (batched) + cheerio (preserve HTML via text-node translation).
 *
 * Usage:
 *   node scripts/build-articles-i18n.mjs
 *   node scripts/build-articles-i18n.mjs --limit 10
 *   node scripts/build-articles-i18n.mjs --locale es
 *   node scripts/build-articles-i18n.mjs --resume   (skip slugs already in output files)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import translate from 'google-translate-api-x';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogsDir = path.join(root, 'blogs');

const LOCALES = ['es', 'fr', 'de'];
const MAX_BATCH_CHARS = 3200;
const SLEEP_MS = 400;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseArgs() {
  const a = process.argv.slice(2);
  const out = { limit: Infinity, locale: null, resume: false };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--limit' && a[i + 1]) {
      const n = parseInt(a[i + 1], 10);
      out.limit = Number.isFinite(n) && n > 0 ? n : Infinity;
      i++;
    } else if (a[i] === '--locale' && a[i + 1]) {
      out.locale = a[i + 1];
      i++;
    } else if (a[i] === '--resume') {
      out.resume = true;
    }
  }
  return out;
}

function getArticleRoot($, relPath) {
  if (relPath && /^topic-/i.test(relPath)) {
    const $m = $('main.article-content').first();
    if ($m.length && !$m.find('article').length) return $m;
  }
  let $a = $('main.article-content article').first();
  if (!$a.length) $a = $('article.article-content').first();
  if (!$a.length) $a = $('main article').first();
  if (!$a.length) $a = $('article').first();
  return $a;
}

/** Raw English inner HTML for article (no comments, no disclosure line inside article) */
function extractBodyInnerHtml($article) {
  const $ = cheerio.load('<div id="__root"></div>', { decodeEntities: false });
  const $root = $('#__root');
  $root.html($article.html() || '');
  $root.find('section.article-comments, #comments').remove();
  $root.find('p').each((_, el) => {
    const $p = $(el);
    if ($p.find('em').length && /Disclosure/i.test($p.text())) $p.remove();
  });
  return $root.html() || '';
}

function extractTitle($) {
  const inArticle = $('main.article-content article h1, article.article-content h1').first();
  if (inArticle.length) return inArticle.text().trim();
  const inMain = $('main.article-content > h1').first();
  if (inMain.length) return inMain.text().trim();
  const sec = $('section.article-header h1, .article-header h1').first();
  if (sec.length) return sec.text().trim();
  return '';
}

function extractDescription($) {
  const m = $('meta[name="description"]').attr('content');
  return (m || '').trim();
}

function walkTextNodes(node, out) {
  if (!node) return;
  if (node.type === 'text') {
    const t = node.data;
    if (t && t.trim()) out.push(node);
  } else if (node.children) {
    for (const c of node.children) walkTextNodes(c, out);
  }
}

async function translateStrings(strings, to) {
  if (!strings.length) return [];
  const batches = [];
  let cur = [];
  let len = 0;
  for (const s of strings) {
    const L = s.length;
    if (len + L > MAX_BATCH_CHARS && cur.length) {
      batches.push(cur);
      cur = [];
      len = 0;
    }
    cur.push(s);
    len += L;
  }
  if (cur.length) batches.push(cur);

  const results = [];
  for (const batch of batches) {
    let ok = false;
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        const res = await translate(batch, {
          from: 'en',
          to,
          client: 'gtx'
        });
        const arr = Array.isArray(res) ? res : [res];
        for (let i = 0; i < batch.length; i++) {
          const item = arr[i];
          results.push(item && item.text != null ? item.text : String(batch[i]));
        }
        ok = true;
        break;
      } catch {
        await sleep(800 * (attempt + 1));
      }
    }
    if (!ok) throw new Error('translate failed after retries');
    await sleep(SLEEP_MS);
  }
  if (results.length !== strings.length) throw new Error('translate length mismatch');
  return results;
}

/** Replace trimmed segments; preserve leading/trailing whitespace on each text node */
function applyTranslations(textNodes, translatedTrimmed) {
  if (textNodes.length !== translatedTrimmed.length) {
    throw new Error('text node count mismatch');
  }
  for (let i = 0; i < textNodes.length; i++) {
    const node = textNodes[i];
    const orig = node.data;
    const tr = translatedTrimmed[i];
    const lead = orig.match(/^\s*/)[0];
    const trail = orig.match(/\s*$/)[0];
    node.data = lead + tr + trail;
  }
}

async function translateHtmlFragment(html, to) {
  if (!html.trim()) return html;
  const $ = cheerio.load('<div id="tr-root"></div>', { decodeEntities: false });
  $('#tr-root').html(html);
  const root = $('#tr-root')[0];
  const textNodes = [];
  walkTextNodes(root, textNodes);
  const trimmed = textNodes.map((n) => n.data.trim());
  const translated = await translateStrings(trimmed, to);
  applyTranslations(textNodes, translated);
  const inner = $('#tr-root').html();
  return inner || '';
}

async function translateMeta(title, description, to) {
  const parts = [];
  if (title) parts.push(title);
  if (description) parts.push(description);
  if (!parts.length) return { title: title || '', description: description || '' };
  const out = await translateStrings(parts, to);
  let i = 0;
  return {
    title: title ? out[i++] : '',
    description: description ? out[i++] : ''
  };
}

async function processFile(relPath, locales, merged) {
  const full = path.join(blogsDir, relPath);
  const html = fs.readFileSync(full, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  const slug = relPath.replace(/^.*[\\/]/, '');
  const $article = getArticleRoot($, slug);
  if (!$article.length) {
    console.warn('skip (no article):', relPath);
    return null;
  }
  const bodyInner = extractBodyInnerHtml($article);
  const titleEn = extractTitle($);
  const descEn = extractDescription($);
  const entry = {};

  for (const loc of locales) {
    if (merged[loc] && merged[loc][slug]) {
      entry[loc] = merged[loc][slug];
      continue;
    }
    const meta = await translateMeta(titleEn, descEn, loc);
    const bodyHtml = await translateHtmlFragment(bodyInner, loc);
    entry[loc] = {
      title: meta.title || titleEn,
      description: meta.description || descEn,
      bodyHtml
    };
    console.log('  ', loc, slug, `(${bodyHtml.length} chars)`);
  }

  return { slug, entry };
}

function main() {
  const args = parseArgs();
  const locales = args.locale ? [args.locale] : LOCALES;
  for (const loc of locales) {
    if (!LOCALES.includes(loc)) {
      console.error('Unsupported locale:', loc);
      process.exit(1);
    }
  }

  const files = fs
    .readdirSync(blogsDir)
    .filter((f) => /^blog-.*\.html$/.test(f) || /^topic-.*\.html$/.test(f))
    .sort();

  const limited = files.slice(0, args.limit);

  const merged = {};
  for (const loc of locales) {
    if (args.resume) {
      const p = path.join(root, 'i18n', `articles-${loc}.json`);
      if (fs.existsSync(p)) {
        try {
          const j = JSON.parse(fs.readFileSync(p, 'utf8'));
          merged[loc] = Object.assign({}, j.articles || {});
        } catch {
          merged[loc] = {};
        }
      } else {
        merged[loc] = {};
      }
    } else {
      merged[loc] = {};
    }
  }

  (async () => {
    let n = 0;
    for (const f of limited) {
      if (args.resume) {
        const allHave = locales.every((loc) => merged[loc][f]);
        if (allHave) {
          console.log('skip resume:', f);
          continue;
        }
      }
      console.log('processing', f);
      const r = await processFile(f, locales, merged);
      if (!r) continue;
      for (const loc of locales) {
        if (r.entry[loc]) merged[loc][r.slug] = r.entry[loc];
      }
      for (const loc of locales) {
        const outPath = path.join(root, 'i18n', `articles-${loc}.json`);
        fs.writeFileSync(
          outPath,
          JSON.stringify({ articles: merged[loc] }, null, 0),
          'utf8'
        );
      }
      n++;
    }
    console.log('Done. articles processed this run:', n);
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

main();
