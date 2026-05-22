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

const final = {
  'blog-navimow-wire-free-mowers.html': h2('Summary for wire-weary owners', [
    'If you are switching from buried boundary loops, wire-free Navimow is less about futuristic branding and more about deleting a maintenance category from your life. Map once, update when landscaping changes, and spend summers looking at the lawn instead of tracing wire breaks.',
  ]),
  'blog-navimow-i-vs-x-vs-h.html': h2('One-page decision recap', [
    'Small flat lawn → i1 or i2 AWD if wet slopes. Complex beds and shade → i2 LiDAR or H2. Very large open turf → X3/X4. Commercial grounds → Terranox, not consumer lines. When two series fit, pick the cheaper if specs cover measured area with headroom.',
    'Accessory and warranty paths follow series choice—decide series on garden evidence, then browse bundles on the official store rather than reversing the order because a free garage photo looked nice.',
  ]),
  'blog-navimow-network-rtk.html': h2('Before you blame the robot', [
    'Dock placement, postcode coverage, and post-storm app restarts solve more “RTK feels bad” tickets than hardware swaps. Document those steps before opening return labels—support will ask anyway.',
    'If coverage is permanently unavailable, choose LiDAR-forward models or wait for map updates rather than forcing RTK-dependent expectations on the wrong SKU.',
  ]),
  'blog-navimow-lidar-vs-awd.html': h2('Still undecided?', [
    'Film your garden walk on phone: slopes, shade, narrow paths. Watch playback once. If slopes dominate footage, bias AWD; if shade and beds dominate, bias LiDAR. Ten-minute video beats hour-long spec comparison.',
  ]),
  'blog-navimow-summer-lawn-care.html': h2('Summer summary', [
    'Increase cut frequency in peak growth, avoid midday heat, plan holidays with app monitoring, and trim edges manually when guests arrive. Robot mowing is a schedule tool—not a excuse to ignore seasonal lawn biology.',
  ]),
  'blog-navimow-accessories-guide.html': h2('Accessory mistakes we see repeated', [
    'Buying MowGate before confirming daily two-zone need. Stacking three antenna SKUs preemptively. Skipping blade kit then complaining about torn grass tips. Buying third-party garage that blocks RTK sky view at dock.',
    'Correct sequence: prove mowing success, add shelter and consumables, then automate gates or boost signal with evidence. Official compatibility tables on the store beat marketplace “fits most models” claims.',
    `When promo bundles include Garage X or Garage M, treat the gift as part of total value at ${BRAND} checkout—not a reason alone to jump product families.`,
  ]),
  'blog-navimow-maintenance-calendar.html': h2('Annual maintenance at a glance', [
    'Spring: verify map, blades, firmware. Summer: weekly deck brush, monthly blade inspect. Autumn: leaf protocol, deep clean. Winter: storage charge level, covered dock. Year-round: update map after landscaping the same day beds move.',
    'Miss one season of blade care and grass tips tell the story before error codes do. Maintenance is boring until the first perfect stripe week in June—then it feels like compound interest.',
  ]),
  'blog-navimow-worth-it-2026.html': h2('Bottom line for 2026', [
    'Navimow-class wire-free robots pay back time first, money second, for households with stable layouts and realistic area ratings. They fail emotionally when undersized, overspec’d, or bought without mapping week commitment.',
    'Run the calculator on the official site, compare gardener quotes honestly, and use return window if close—2026 summer bundles improve math but do not fix wrong model choice.',
  ]),
  'blog-navimow-best-time-to-buy.html': h2('When the calendar says go', [
    'Buy when: promo bundle matches need, RTK or LiDAR fit confirmed, you have two weekends for mapping, and delivery arrives before your growth peak. Wait when: major landscaping pending, coverage missing without backup tech, or you cannot supervise first runs.',
    'Timing is not only discount percentage—it is alignment between weather, your calendar, and mower availability. May–June 2026 Summer Sale is a strong window for EU buyers if those stars align.',
  ]),
};

for (const [file, block] of Object.entries(final)) {
  const fp = path.join(blogsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const marker = '<h2>FAQ</h2>';
  if (!html.includes(block.slice(4, 28))) {
    html = html.replace(marker, block + '\n\n            ' + marker);
  }
  fs.writeFileSync(fp, html, 'utf8');
  const body = html.match(/<article>([\s\S]*?)<section class="article-comments"/)?.[1] || '';
  const w = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(file, w, w >= 1000 ? 'OK' : 'SHORT');
}
