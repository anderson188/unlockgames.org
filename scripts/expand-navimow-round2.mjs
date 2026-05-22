import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, '..', 'blogs');
const LINK = 'https://www.awin1.com/cread.php?awinmid=99151&awinaffid=1333985';
const BRAND = `<a href="${LINK}" target="_blank" rel="sponsored noopener noreferrer">Segway Navimow</a>`;
const BAD = 'photo-1558904541-efa843a96f79';
const GOOD = 'photo-1523413651479-597eb2da0ad6';

function h2(title, paras) {
  return `<h2>${title}</h2>\n            ${paras.map((t) => `<p>${t}</p>`).join('\n            ')}`;
}

const round2 = {
  'blog-navimow-choose-lawn-size.html': h2('Worksheet you can copy', [
    'Draw a rough map on paper. Label zones A/B/C for disconnected grass. Measure each rectangle length × width in metres; sum areas. Note max slope in degrees or percent if spec sheet uses it. List obstacles: pond, sandbox, fruit trees with fallen fruit, narrow gate width in centimetres.',
    'Compare totals to Navimow SKU bands: 500, 800, 1500, 2000, 5000 m². Circle two models above and one below your number. If all three are i Series but slopes appear, swap middle choice to i2 AWD. If trees dominate, swap to LiDAR tier. Only then open the official store.',
    `This worksheet takes twenty minutes and prevents the classic error—buying the hero mower from a banner ad instead of the mower that matches measured grass. Final shortlist in hand, visit ${BRAND} and save models to compare side by side.`,
  ]),
  'blog-navimow-wire-free-mowers.html': h2('Migration checklist from wired robots', [
    'Day minus seven: photograph old wire path and remove stakes gradually while grass still shows indentation—helps map digital boundary. Day zero: unbox Navimow, mount dock, connect app. Day one: walk perimeter mapping during dry weather. Day three: first full autonomous cut while someone watches edges.',
    'Keep old wire spool until two successful weeks pass—psychological safety, not technical need. Neighbours may ask why you are not repairing boundary loops anymore; enjoy that conversation.',
  ]),
  'blog-navimow-i-vs-x-vs-h.html': h2('Real owner profiles (composite)', [
    'Profile 1 — Suburban couple, 650 m², one dog, flat: i2 AWD sufficient; H Series overspend. Profile 2 — Corner plot with 12 trees and narrow side path: i2 LiDAR or H210; base i1 frustrates. Profile 3 — 3500 m² open estate: X420/X450; i220 maxes out on cycles. Profile 4 — Holiday home visited monthly: size up one tier for catch-up growth or accept first-day long cut.',
    'Where do you land? Honest area plus layout beats brand prestige. X Series on a 400 m² flat lawn is status purchase; i1 on a 4000 m² field is maintenance nightmare.',
  ]),
  'blog-navimow-network-rtk.html': h2('Troubleshooting RTK after install', [
    'Symptom: mower wanders near north fence. Check dock sky view and move charging base one metre into open lawn before buying antennas. Symptom: slow first fix. Leave dock powered overnight; confirm cellular LED status in app. Symptom: errors after storm. Power-cycle dock and verify RTK postcode still shows available.',
    'Persistent issues warrant Navimow service request with app logs—hardware fault is rare but possible. Document before warranty window closes.',
  ]),
  'blog-navimow-lidar-vs-awd.html': h2('Budget decision matrix', [
    'If budget allows only one upgrade line item, rank your garden: (1) slopes and wet clay, (2) complex layout and shade, (3) neither—save money on base i1. Item (1) wins → AWD. Item (2) wins → LiDAR. Tie → measure which problem appears on more square metres.',
    'Premium H Series merges both philosophies at higher price—justified when failure modes stack, not when you want newest badge.',
  ]),
  'blog-navimow-summer-lawn-care.html': h2('World Cup and event hosting', [
    'June 2026 stacks World Cup watch parties on already-busy patios. Mow Monday and Wednesday on robot schedule; keep Saturday manual edge trim if guests arrive Sunday. Move portable goals and fold chairs before scheduled runs—vision systems treat new objects as obstacles until map update.',
    'Beer spill and BBQ smoke do not affect mower logic; foot traffic compaction does. Rotate seating areas mid-season so one lawn strip is not killed by repeated chair legs.',
  ]),
  'blog-navimow-accessories-guide.html': h2('Compatibility by series', [
    'Garage S fits i1 compact docks; Garage M aligns with LiDAR Pro promos; Garage X pairs with X4 footprint. Blade Assembly Plus is cross-series consumable—buy two if you maintain large area with aggressive schedule. Antenna kits skew X3/X Series—read SKU compatibility table before cross-series assumptions.',
    'MowGate is newest and model-specific—confirm gate width and firmware requirements on product page rather than forum guesses.',
  ]),
  'blog-navimow-maintenance-calendar.html': h2('Spring startup sequence', [
    'Step 1: visual dock and cable inspection. Step 2: charge to full. Step 3: boundary verification mow at slow speed. Step 4: restore full schedule gradually over four days. Step 5: blade inspect after first week. Skipping verification mow after winter is how spring flower beds get shaved once.',
  ]),
  'blog-navimow-worth-it-2026.html': h2('Hidden costs people forget', [
    'Outdoor-rated extension for dock if nearest outlet is far. Occasional edge trimmer for borders robots miss. Garage if dock sits in full sun. Blade kits yearly. None of these invalidate ROI—they just belong in spreadsheet beside sticker price.',
    'Hidden savings: fewer petrol cans, no mower service for small engine, less laundry from grass-stained shoes after push mowing.',
  ]),
  'blog-navimow-best-time-to-buy.html': h2('Price tracking without obsession', [
    'Screenshot bundle total (mower + garage + shipping) when first interested. Compare again during Summer Sale mid-June. If difference is less than cost of one gardener visit, buy when you have setup time—not when spreadsheet says €40 saved but you lose July automation.',
    'Model-year FOMO is real after CES headlines; mowing your actual lawn in 2026 beats waiting for hypothetical 2027 chip.',
  ]),
};

for (const [file, block] of Object.entries(round2)) {
  const fp = path.join(blogsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  html = html.replaceAll(BAD, GOOD);
  const marker = '<h2>FAQ</h2>';
  if (!html.includes(block.slice(4, 40))) {
    html = html.replace(marker, block + '\n\n            ' + marker);
  }
  fs.writeFileSync(fp, html, 'utf8');
  const body = html.match(/<article>([\s\S]*?)<section class="article-comments"/)?.[1] || '';
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(file, words, 'words');
}

// fix generator default image
const genPath = path.join(__dirname, 'generate-navimow-articles.mjs');
let gen = fs.readFileSync(genPath, 'utf8');
gen = gen.replaceAll(BAD, GOOD);
fs.writeFileSync(genPath, gen, 'utf8');
console.log('Fixed generator image ID');
