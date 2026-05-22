import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const blogsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'blogs');
const LINK = 'https://www.awin1.com/cread.php?awinmid=99151&awinaffid=1333985';
const BRAND = `<a href="${LINK}" target="_blank" rel="sponsored noopener noreferrer">Segway Navimow</a>`;

const boost = {
  'blog-navimow-maintenance-calendar.html': `<h2>Owner habits that extend lifespan</h2>
            <p>Owners who rinse decks after dusty weeks see fewer motor stalls. Owners who ignore firmware see mystery boundary drift blamed on RTK. Owners who store under cover see less brittle plastic on garages and docks. None of this is exotic—just consistent.</p>
            <p>Teach everyone in the household where the stop button is in app and on device before guests visit. One curious child override ruins a mapped zone faster than a month of rain.</p>
            <p>If you only read one section of this calendar, read spring verification mow—everything else hangs on a correct baseline map each season.</p>`,
  'blog-navimow-worth-it-2026.html': `<h2>Emotional ROI matters too</h2>
            <p>Some buyers value Saturday coffee without petrol fumes more than spreadsheet payback. That is valid if the purchase fits budget and garden—just do not pretend Excel forced the decision if feelings did.</p>
            <p>Conversely, if you enjoy manual mowing, a robot may gather dust while you hobby-mow anyway—honesty prevents guilt purchases.</p>
            <p>Navimow shines when both time math and lifestyle fit align; browse ${BRAND} when both boxes tick, not when only promo banner ticks.</p>`,
  'blog-navimow-best-time-to-buy.html': `<h2>After checkout</h2>
            <p>Save order email, register warranty, join reward program if you will buy blades later, and block two half-days for install—not one rushed evening before travel.</p>
            <p>First autonomous mow while tired leads to bad keep-out zones and unnecessary returns. Timing includes your attention, not only store calendar.</p>`,
  'blog-navimow-accessories-guide.html': `<h2>Garage ventilation note</h2>
            <p>Garages protect UV and rain but need airflow—do not seal heat without checking manual clearance. A cool mower electronics bay beats a dry but cooking enclosure.</p>
            <p>Measure dock height against garage lip before buy—millimetres matter on slope driveways.</p>`,
  'blog-navimow-summer-lawn-care.html': `<h2>Evening schedule perk</h2>
            <p>Late afternoon robot runs catch cooler air and still finish before dusk mapping needs. Neighbours hear less than petrol Sunday morning—small courtesy win.</p>
            <p>Pair schedule with weather app notifications if your region spikes heat—manual skip beats browning stress.</p>`,
  'blog-navimow-lidar-vs-awd.html': `<h2>Documentation beats memory</h2>
            <p>After test week, write which model handled rear bank vs front flat. Memory fades; notes survive when comparing return deadlines.</p>`,
  'blog-navimow-network-rtk.html': `<h2>Keep screenshots</h2>
            <p>Screenshot successful RTK postcode result and first full map—support requests go faster with timestamps.</p>`,
};

for (const [f, block] of Object.entries(boost)) {
  const fp = path.join(blogsDir, f);
  let h = fs.readFileSync(fp, 'utf8');
  if (!h.includes(block.slice(5, 40))) {
    h = h.replace('<h2>FAQ</h2>', block + '\n\n            <h2>FAQ</h2>');
    fs.writeFileSync(fp, h);
  }
  const body = h.match(/<article>([\s\S]*?)<section class="article-comments"/)?.[1] || '';
  const w = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(f, w);
}
