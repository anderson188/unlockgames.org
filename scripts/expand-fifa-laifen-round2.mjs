import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const blogsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'blogs');

const more = {
  'blog-fifa-collect-packs-marketplace.html': `
            <h2>Beginner weekly checklist</h2>
            <p>Monday: scan new drops. Wednesday: check marketplace floors for set gaps. Friday: list duplicates. Sunday: no spend—review what you learned. Repeat. Rhythm beats willpower during World Cup hype cycles when every notification screams limited time.</p>
            <p>Keep a "fun fund" line item in your monthly budget next to streaming and coffee. When fun fund hits zero, you are done until next month—no exceptions unless you consciously move money from elsewhere.</p>`,
  'blog-laifen-dryer-worth-it-2026.html': `
            <h2>Electricity and dorm policies</h2>
            <p>1400W max on several models fits typical dorm allowances where 1800W+ legacy dryers fail RA inspections. Confirm your housing handbook—Laifen SE Lite markets this use case explicitly.</p>`,
  'blog-laifen-se2-vs-swift-vs-selite.html': `
            <h2>Warranty and support practicalities</h2>
            <p>Two-year limited warranty on dryers covers manufacturing defects—not drop damage. Register products after gift unboxing. US support phone hours span coasts; email works for async troubleshooting.</p>
            <p>Official store shipping 2–7 business days per policy—order before travel deadlines, not day-before departure.</p>
            <h2>Accessories worth adding later</h2>
            <p>Concentrator if you start with SE 2 and later want sleeker blowouts—check if buying Swift Special upgrade beats buying standalone nozzle. Storage bag protects finish in shared bathrooms.</p>`,
  'blog-laifen-wave-pro-toothbrush-guide.html': `
            <h2>Sensitivity and gum health</h2>
            <p>Start lowest intensity if gums bleed on manual brushes—give two weeks adaptation before judging. Persistent bleeding warrants dentist visit regardless of brush type.</p>
            <p>Wave Pro pressure sensor trains lighter touch—users with recession history report less scrubbing habit within a month.</p>
            <h2>App features without obsession</h2>
            <p>App charts are optional. If Bluetooth pairing feels fiddly, ignore app and use handle buttons—cleaning outcome depends on contact time, not graphs.</p>`,
  'blog-laifen-p3-pro-vs-t1-pro.html': `
            <h2>Head replacement economics</h2>
            <p>Budget $30–60 yearly for foil/comb replacements depending on model and shave frequency. Amortize into cost-per-shave when comparing to disposable cartridge subscriptions.</p>
            <h2>Water and cleaning IP notes</h2>
            <p>Rinse under tap after use; do not submerge base electronics. Travel with dry case to avoid bacteria in gym bags.</p>`,
  'blog-laifen-curly-hair-diffuser-guide.html': `
            <h2>Night-before prep</h2>
            <p>Sleep on satin pillowcase after diffuse set—cotton friction frizzes overnight. Refresh mornings with light mist and 2-minute diffuser pulse on roots only.</p>
            <h2>Color-treated curls</h2>
            <p>Lower heat mandatory for bleached curls. Temperature cycling on SE 2 reduces hot spots that lift toner prematurely.</p>`,
  'blog-laifen-gift-guide-2026.html': `
            <h2>Return policy communication</h2>
            <p>Tell gift recipients about 30-day trial calmly—removes guilt if wrong model. Include link to Laifen compare page in card.</p>
            <h2>Seasonal sale calendar</h2>
            <p>Prime Day, Black Friday, and post-holiday clearance historically discount Lite and Mini deepest. Flagship SE 2 sees moderate codes—set price alerts on official site.</p>`,
};

for (const [file, block] of Object.entries(more)) {
  const fp = path.join(blogsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes(block.trim().slice(0, 40))) continue;
  html = html.replace('\n            <h2>FAQ</h2>', block + '\n            <h2>FAQ</h2>');
  fs.writeFileSync(fp, html, 'utf8');
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(file, '~' + words, words >= 1000 ? 'OK' : 'SHORT');
}
