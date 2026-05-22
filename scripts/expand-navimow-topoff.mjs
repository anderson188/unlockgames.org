import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, '..', 'blogs');
const LINK = 'https://www.awin1.com/cread.php?awinmid=99151&awinaffid=1333985';
const BRAND = `<a href="${LINK}" target="_blank" rel="sponsored noopener noreferrer">Segway Navimow</a>`;

function inject(file, title, paras) {
  const fp = path.join(blogsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const block = `<h2>${title}</h2>\n            ${paras.map((t) => `<p>${t}</p>`).join('\n            ')}`;
  const marker = '<h2>FAQ</h2>';
  if (html.includes(title)) return;
  html = html.replace(marker, block + '\n\n            ' + marker);
  fs.writeFileSync(fp, html, 'utf8');
  const body = html.match(/<article>([\s\S]*?)<section class="article-comments"/)?.[1] || '';
  console.log(file, body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);
}

inject('blog-navimow-i-vs-x-vs-h.html', 'Quick reference table in prose', [
  'Under 800 m² flat: start i1. Under 800 m² with wet slope: i2 AWD. 800–1500 m² complex: i2 LiDAR. 1500–2000 m² complex premium: H2. 2000–5000 m² open: X4. Above consumer rating or commercial duty: Terranox.',
]);

inject('blog-navimow-network-rtk.html', 'Network RTK week-by-week', [
  'Week 0: postcode check and model confirm. Week 1: dock install with open sky test. Week 2: map boundaries twice—second pass catches missed corners. Week 3: expand schedule to full lawn. Week 4: note any RTK warnings by location and adjust dock or zones before buying antennas.',
  'Owners who treat RTK as install-and-ignore sometimes miss that landscaping changes sky view—new shed equals remapping, not necessarily new hardware.',
]);

inject('blog-navimow-lidar-vs-awd.html', 'Combined gardens', [
  'Real gardens rarely offer pure “LiDAR problem” or pure “AWD problem.” Typical suburban plots mix flat front, sloped side, and tree-lined rear. In those cases H Series fusion or accepting manual side-bank mowing while robot handles flat zones is more honest than forcing one i2 variant to do everything.',
  'Split work is valid: robot on main lawn, you on steep bank twice monthly—still beats full manual weekly schedule.',
]);

inject('blog-navimow-summer-lawn-care.html', 'Fertilizer and robot timing', [
  'Granular fertilizer benefits from watering in; schedule robot away for 24–48 hours if product label suggests keeping foot and blade traffic minimal on fresh granules. Liquid feeds dry faster—still avoid mowing wet chemical-coated blades for operator safety.',
  'Summer feeding increases growth rate—if you fertilize, bump robot frequency for two weeks rather than raising cut height alone.',
]);

inject('blog-navimow-accessories-guide.html', 'Shipping and returns on accessories', [
  'Order accessories with mower when promo bundles require combined checkout—split orders may miss free garage SKUs. If mower returns within trial window, accessories often return too—keep boxes until mapping succeeds.',
  'Wrong garage size is a hassle return; measure dock footprint against garage internal dimensions on spec sheet before add-to-cart.',
]);

inject('blog-navimow-maintenance-calendar.html', 'Monthly deep-dive tasks', [
  'January–February (off season): charge check, firmware read release notes, plan blade inventory. March–April: spring verification mow, dock cable inspect. May–August: weekly deck, biweekly blade glance, post-storm log review. September–October: leaf protocol, blade swap if worn. November–December: clean, store, screenshot map backup.',
  'Print this loop on fridge if needed—consistency beats heroic one-time deep cleans.',
  'Log maintenance dates in phone notes; warranty disputes without dates get harder even when failure is legitimate.',
]);

inject('blog-navimow-worth-it-2026.html', 'Spreadsheet rows to include', [
  'Row 1: mower + garage + blades purchase. Row 2: electricity estimate. Row 3: gardener quote × 25 weeks. Row 4: your hourly rate × hours saved. Row 5: wire install/repair if comparing wired competitor. Row 6: resale guess year five. Sum five-year view, not sticker shock day one.',
  'If row 4 is zero because you enjoy mowing, robot purchase is lifestyle choice—still valid, but ROI math will not convince you.',
]);

inject('blog-navimow-best-time-to-buy.html', 'Promo vs base price history mindset', [
  'Track bundle contents more than percentage off—free Garage X at €249 MSRP shifts value differently than 10% cart code on mower alone. Screenshot three configs: base mower, mower + paid garage, promo mower + free garage; compare totals.',
  'Black Friday may repeat summer bundle logic or offer different SKUs—there is no universal “cheapest month” without checking current banner at ' + BRAND + '.',
]);
