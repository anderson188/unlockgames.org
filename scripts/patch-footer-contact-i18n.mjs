import fs from 'fs';

const map = { es: 'Contacto', fr: 'Contact', de: 'Kontakt' };

for (const [loc, label] of Object.entries(map)) {
  const p = `i18n/${loc}.json`;
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  j.ui.footerContact = label;
  fs.writeFileSync(p, JSON.stringify(j));
  console.log('updated', p);
}

let emb = fs.readFileSync('i18n-embedded.js', 'utf8');
for (const [loc, label] of Object.entries(map)) {
  const needle = `"footerAbout":"`;
  const locKey = `"${loc}":`;
  const idx = emb.indexOf(locKey);
  if (idx === -1) {
    console.warn('loc not found', loc);
    continue;
  }
  const fp = emb.indexOf('"footerPrivacy"', idx);
  if (fp === -1) {
    console.warn('footerPrivacy not found', loc);
    continue;
  }
  const insert = `"footerContact":"${label}",`;
  if (emb.slice(fp - insert.length, fp).includes('footerContact')) {
    console.log('already has footerContact', loc);
    continue;
  }
  emb = emb.slice(0, fp) + insert + emb.slice(fp);
}
fs.writeFileSync('i18n-embedded.js', emb);
console.log('updated i18n-embedded.js');
