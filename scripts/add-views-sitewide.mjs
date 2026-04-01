import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function hashNum(input) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0);
}

function viewsFor(key) {
  return 1000 + (hashNum(key) % 99005);
}

function formatViews(n) {
  return n.toLocaleString('en-US');
}

function collectHtmlFiles(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === '.cursor') continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      collectHtmlFiles(p, out);
    } else if (st.isFile() && name.endsWith('.html')) {
      out.push(p);
    }
  }
}

function updateDateText(text, key) {
  const m = text.match(/(\d{4}-\d{2}-\d{2})/);
  if (!m) return text;
  const d = m[1];
  const v = formatViews(viewsFor(`${key}|${d}`));
  return `${d} &middot; &#128065; ${v}`;
}

function processFile(filePath) {
  let s = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  let changed = false;

  // Article detail publish date line (avoid comment-date spans by targeting this exact style block).
  s = s.replace(
    /<p style="color:#64748b;font-size:0\.9rem;margin-bottom:1\.5rem;">[\s\S]*?<\/p>/g,
    (full, idx) => {
      const dateMatch = full.match(/(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) return full;
      const d = dateMatch[1];
      const v = formatViews(viewsFor(`${rel}|detail|${d}|${idx}`));
      changed = true;
      return `<p style="color:#64748b;font-size:0.9rem;margin-bottom:1.5rem;">${d} &nbsp;&middot;&nbsp; <span aria-label="views">&#128065; ${v}</span></p>`;
    }
  );

  // Homepage and list dates.
  const dateSpanClasses = ['article-item-date', 'date', 'sidebar-date'];
  for (const cls of dateSpanClasses) {
    const re = new RegExp(`<span class="${cls}">[\\s\\S]*?<\\/span>`, 'g');
    s = s.replace(re, (full, idx) => {
      const dateMatch = full.match(/(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) return full;
      const d = dateMatch[1];
      const v = formatViews(viewsFor(`${rel}|${cls}|${d}|${idx}`));
      changed = true;
      return `<span class="${cls}">${d} &middot; &#128065; ${v}</span>`;
    });
  }

  // Category cards: time + tag line.
  s = s.replace(
    /<div class="category-mag-meta"><time datetime="(\d{4}-\d{2}-\d{2})">[\s\S]*?<\/time>([\s\S]*?)<span class="category-mag-tag">/g,
    (full, d, between, idx) => {
      const v = formatViews(viewsFor(`${rel}|category-mag-meta|${d}|${idx}`));
      changed = true;
      return `<div class="category-mag-meta"><time datetime="${d}">${d}</time><span class="category-mag-views" aria-label="views">&nbsp;&middot;&nbsp;&#128065; ${v}</span><span class="category-mag-tag">`;
    }
  );

  if (changed) fs.writeFileSync(filePath, s, 'utf8');
  return changed;
}

const files = [];
collectHtmlFiles(root, files);

let updated = 0;
for (const f of files) {
  if (processFile(f)) updated += 1;
}

console.log(`Updated views in ${updated} HTML files.`);
