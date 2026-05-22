import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, '..', 'blogs');
const LINK = 'https://www.awin1.com/cread.php?awinmid=99151&awinaffid=1333985';
const BRAND = `<a href="${LINK}" target="_blank" rel="sponsored noopener noreferrer">Segway Navimow</a>`;

function h2(title, paras) {
  return `<h2>${title}</h2>\n            ${paras.map((t) => `<p>${t}</p>`).join('\n            ')}`;
}

const round3 = {
  'blog-navimow-choose-lawn-size.html': h2('Final sanity check before checkout', [
    'Sleep on your shortlist. Re-measure one zone tomorrow. If numbers still match, proceed. If not, adjust tier once—buying twice costs more than sizing up once.',
  ]),
  'blog-navimow-wire-free-mowers.html': h2('Common wire-free myths', [
    'Myth: no setup at all. Reality: digital mapping and dock placement still take an afternoon. Myth: never hits obstacles. Reality: toys and tools on grass still need pickup. Myth: works identically everywhere. Reality: RTK coverage and tree cover matter.',
    'Wire-free removes burial and wire repair—it does not remove thinking. Owners who accept that transition from wired brands report higher satisfaction than those expecting magic out of the box.',
    `For specs and setup videos tied to your region, start at ${BRAND} rather than third-party clones that may list outdated SKUs.`,
  ]),
  'blog-navimow-i-vs-x-vs-h.html': h2('Accessory ecosystem by family', [
    'i Series accessories emphasize Garage S/M, Off-Road Wheels, Access+, and blade kits. X Series adds trimmer attachments, signal enhancement, and Garage X scale. H Series shares premium fusion hardware with overlapping garage and blade needs.',
    'Choosing series locks accessory compatibility—another reason to pick by garden fit first. Buying X4 for garage bundle when i2 AWD fits the lawn wastes both money and garage scale mismatch.',
  ]),
  'blog-navimow-network-rtk.html': h2('RTK glossary for shoppers', [
    'GNSS: satellite navigation umbrella term. RTK: real-time corrections for precision. Network RTK: corrections via cellular network instead of home antenna. EFLS: Navimow marketing term for fused positioning. VisionFence: camera-assisted obstacle handling.',
    'You do not need a surveying degree—just know RTK fixes where the mower is on your map, while vision and LiDAR handle what the map cannot see. Support tickets go smoother when you describe symptoms in those categories.',
  ]),
  'blog-navimow-lidar-vs-awd.html': h2('Dealer demo vs your soil', [
    'Showroom demos on flat turf flatter every model. Request—or create—a demo path that includes your worst slope and tightest passage if buying locally. Online buyers should plan supervised tests on those zones in week one while return window is open.',
    'AWD value appears when dew is heavy; LiDAR value appears when GPS jitter spikes near walls. Test both conditions before keeping the box.',
  ]),
  'blog-navimow-summer-lawn-care.html': h2('Water restrictions and drought', [
    'Some municipalities limit irrigation in August. Grass growth slows; robot schedule should slow too—over-mowing stressed turf browns faster. Raise cut height in app if supported; skip days during heat advisories.',
    'Dry summer does not mean ignore blades—dull cutters shred drought-stressed grass worse than sharp ones. Maintenance calendar still applies; only frequency drops.',
  ]),
  'blog-navimow-accessories-guide.html': h2('Year-one vs year-three cart', [
    'Year one: mower, garage if no natural shelter, blade kit. Year two: replacement blades, maybe antenna if property proved weak-sky. Year three: MowGate only if kids moved gate usage to daily automation need.',
    'Avoid buying year-three accessories in year-one cart—capital tied in unused MowGate is capital not earning mower time on lawn.',
    `Official accessory pages on ${BRAND} list compatibility badges per model—use them instead of marketplace listings that guess fit.`,
  ]),
  'blog-navimow-maintenance-calendar.html': h2('Support and warranty paperwork', [
    'Photograph serial plate and save order confirmation PDF. Log firmware versions after each update. If motor error appears, capture app screenshot before factory reset attempts—support asks for both.',
    'Three-year EU warranty marketing is not permission to skip cleaning—wear items like blades remain owner responsibility. Document maintenance dates if disputing premature deck wear.',
  ]),
  'blog-navimow-worth-it-2026.html': h2('Who should not buy yet', [
    'Major landscaping this summer—wait until beds are final. Renting with one-year lease—landlord permission and move hassle may exceed benefit. RTK unavailable with no LiDAR alternative and heavy tree cover—expect frustration.',
    'Conversely, stable suburban layout, recurring manual mowing pain, and confirmed tech fit make 2026 a reasonable buy year—especially with summer bundle economics on official store.',
  ]),
  'blog-navimow-best-time-to-buy.html': h2('Delivery lead time planning', [
    'Promo weeks increase order volume—check estimated delivery before assuming next-week setup. If lead time crosses your holiday, delay order or arrange neighbour dock access.',
    'Unbox indoors if delivery arrives before frost ends; batteries prefer moderate temps for first charge. Planning beats blaming sale traffic for missed June mowing.',
  ]),
};

for (const [file, block] of Object.entries(round3)) {
  const fp = path.join(blogsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const marker = '<h2>FAQ</h2>';
  if (!html.includes(block.slice(4, 35))) {
    html = html.replace(marker, block + '\n\n            ' + marker);
  }
  fs.writeFileSync(fp, html, 'utf8');
  const body = html.match(/<article>([\s\S]*?)<section class="article-comments"/)?.[1] || '';
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(file, words);
}
