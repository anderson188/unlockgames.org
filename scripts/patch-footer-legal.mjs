import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const FOOTER_LEGAL_UI =
  '<strong>Legal entity (business licence):</strong> 武汉经济技术开发区泓蒙电子产品商行<br>\n<strong>Registered address:</strong> 武汉经济技术开发区9C2地块和居大厦B栋16层21-1室';

const FOOTER_LEGAL_BLOCK = `            <p class="footer-bottom footer-legal"><strong>Legal entity (business licence):</strong> 武汉经济技术开发区泓蒙电子产品商行<br>
            <strong>Registered address:</strong> 武汉经济技术开发区9C2地块和居大厦B栋16层21-1室</p>
`;

const FOOTER_BLOG_LEGAL = `                <p class="footer-legal"><strong>Legal entity (business licence):</strong> 武汉经济技术开发区泓蒙电子产品商行<br>
                <strong>Registered address:</strong> 武汉经济技术开发区9C2地块和居大厦B栋16层21-1室</p>
`;

function walkHtml(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walkHtml(p, files);
    } else if (name.endsWith('.html')) {
      files.push(p);
    }
  }
  return files;
}

let patched = 0;
for (const file of walkHtml(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('Legal entity (business licence)')) continue;

  let next = html;

  if (html.includes('class="blog-footer"') && !html.includes('footer-legal')) {
    const footerStart = html.indexOf('<footer class="blog-footer">');
    if (footerStart !== -1) {
      const footerEnd = html.indexOf('</footer>', footerStart);
      const footer = html.slice(footerStart, footerEnd);
      const marker = '<p class="footer-bottom">&copy; 2025 unLockGames. All rights reserved.</p>';
      if (footer.includes(marker) && !footer.includes('footer-legal')) {
        const newFooter = footer.replace(
          marker,
          FOOTER_LEGAL_BLOCK.trimEnd() + '\n            ' + marker
        );
        next = html.slice(0, footerStart) + newFooter + html.slice(footerEnd);
      }
    }
  }

  if (next === html && html.includes('class="footer-blog"') && !html.includes('footer-legal')) {
    const footerStart = html.indexOf('<footer class="footer-blog">');
    if (footerStart !== -1) {
      const footerEnd = html.indexOf('</footer>', footerStart);
      const footer = html.slice(footerStart, footerEnd);
      const marker = '<p>&copy; 2025 unLockGames. All rights reserved.</p>';
      if (footer.includes(marker) && !footer.includes('footer-legal')) {
        const newFooter = footer.replace(
          /(<div class="footer-bottom">\s*)/,
          `$1${FOOTER_BLOG_LEGAL}`
        );
        next = html.slice(0, footerStart) + newFooter + html.slice(footerEnd);
      }
    }
  }

  if (next !== html) {
    fs.writeFileSync(file, next);
    patched++;
    console.log('patched', path.relative(root, file));
  }
}

const locales = ['es', 'fr', 'de', 'ja', 'ko', 'ru'];
for (const loc of locales) {
  const p = path.join(root, 'i18n', `${loc}.json`);
  if (!fs.existsSync(p)) continue;
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  j.ui.footerLegal = FOOTER_LEGAL_UI;
  fs.writeFileSync(p, JSON.stringify(j));
  console.log('updated', `i18n/${loc}.json`);
}

const embPath = path.join(root, 'i18n-embedded.js');
let emb = fs.readFileSync(embPath, 'utf8');
const legalJson = JSON.stringify(FOOTER_LEGAL_UI);
for (const loc of locales) {
  const locKey = `"${loc}":`;
  const idx = emb.indexOf(locKey);
  if (idx === -1) continue;
  const fp = emb.indexOf('"footerDisclosureBottom"', idx);
  if (fp === -1) continue;
  const insert = `"footerLegal":${legalJson},`;
  if (emb.slice(Math.max(0, fp - 800), fp).includes('footerLegal')) {
    console.log('already has footerLegal in embedded', loc);
    continue;
  }
  emb = emb.slice(0, fp) + insert + emb.slice(fp);
}
fs.writeFileSync(embPath, emb);
console.log('updated i18n-embedded.js');
console.log('done, patched html files:', patched);
