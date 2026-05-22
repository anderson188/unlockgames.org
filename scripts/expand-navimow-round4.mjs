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

const extra = {
  'blog-navimow-choose-lawn-size.html': h2('Closing note', ['Measure twice, order once—your future self mowing in flip-flops will thank you.']),
  'blog-navimow-wire-free-mowers.html': h2('Long-term ownership lens', [
    'Wire-free Navimow ownership feels different at month six than week one. The app becomes background; boundaries become trusted until you move a bed. That is the payoff—not day-one unboxing glamour.',
    'If wire trauma from a previous robot is your motivator, wire-free is emotional ROI as much as financial. Validate RTK and layout fit anyway—freedom from wire is not freedom from garden physics.',
  ]),
  'blog-navimow-i-vs-x-vs-h.html': h2('Reading between marketing taglines', [
    '“Drop and Mow” signals LiDAR onboarding speed. “Master the Rough” signals AWD traction. “Conquer Where Others Stop” signals X Series scale and turn performance. “Always on Track” signals H fusion for complexity.',
    'Taglines hint at engineering emphasis—they do not replace area math. An H Series on a tiny flat lawn is like buying a expedition jacket for a commute: works, but odd.',
  ]),
  'blog-navimow-network-rtk.html': h2('Regional rollout mindset', [
    'Network RTK maps expand over time—early adopters in newly covered postcodes benefit from email alerts. If you are borderline uncovered, LiDAR-heavy models may bridge the gap until RTK arrives.',
    'Cross-border buyers: UK, EU, and US stores serve different warranty regions—buy local storefront even when browsing English-language EU pages from abroad.',
  ]),
  'blog-navimow-lidar-vs-awd.html': h2('Resale and upgrade path', [
    'Robot mowers depreciate like appliances, not cars—maintain records and garage storage to preserve resale if you upsize after landscaping changes. LiDAR and AWD variants sometimes hold interest in secondary markets when documented.',
    'There is no clean upgrade path inside the chassis—plan series choice for five years, not five months.',
  ]),
  'blog-navimow-summer-lawn-care.html': h2('Autumn handoff', [
    'Late summer robot schedule should taper before leaves dominate sensors. Blow or rake heavy leaf cover before resuming—otherwise obstacle stops multiply and you blame navigation instead of seasonal debris.',
    'Store summer learnings in app notes: which zones bog in wet July, which beds needed keep-out tweaks. Next May startup becomes copy-paste instead of rediscovery.',
  ]),
  'blog-navimow-accessories-guide.html': h2('Sample first-year budgets', [
    'Budget A (suburban i1, sheltered dock): mower + blade kit ≈ base cart. Budget B (LiDAR Pro promo): mower + free Garage M + blade kit ≈ premium cart with shelter solved. Budget C (X4 estate): mower + Garage X + blade kit + optional antenna ≈ top cart—add MowGate only after gate automation need proven.',
    'Sample budgets exclude shipping and regional tax—compare totals at checkout on official store rather than forum guesses from last year’s promo.',
    `Configure Budget B/C bundles at ${BRAND} with promo banner active—gift garage values shift headline economics more than small coupon codes.`,
  ]),
  'blog-navimow-maintenance-calendar.html': h2('Tool kit that is enough', [
    'Soft brush, manufacturer-approved cleaning cloth, spare blade kit, screwdriver set per manual, zip bag for removed screws, phone for app logs. You do not need a lift table or pressure washer.',
    'Keep children and pets away during blade service—small blades still cut fingers. Disconnect power per manual before underside work even if app shows idle.',
  ]),
  'blog-navimow-worth-it-2026.html': h2('Satisfaction signals after 90 days', [
    'You stopped manually mowing except edges. Schedule runs without you remembering. Grass looks even, not alternating jungle and scalp. App alerts are rare and actionable. Those four signals mean ROI landed; if zero are true, revisit model fit before blaming robots categorically.',
    'Dissatisfaction often traces to undersized area rating or skipped mapping week—not inherent robot failure.',
  ]),
  'blog-navimow-best-time-to-buy.html': h2('Gift purchases and timing', [
    'Buying Navimow as a gift for a homeowner? Coordinate delivery with recipient for dock install—they need Wi-Fi, outlet, and mapping time. Spring delivery beats Christmas unboxing if grass is dormant.',
    'Gift givers should include printed quick-start checklist—thoughtful, and reduces return risk from overwhelmed recipients.',
  ]),
};

for (const [file, block] of Object.entries(extra)) {
  const fp = path.join(blogsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const marker = '<h2>FAQ</h2>';
  if (!html.includes(block.slice(4, 30))) {
    html = html.replace(marker, block + '\n\n            ' + marker);
  }
  fs.writeFileSync(fp, html, 'utf8');
  const body = html.match(/<article>([\s\S]*?)<section class="article-comments"/)?.[1] || '';
  console.log(file, body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);
}
