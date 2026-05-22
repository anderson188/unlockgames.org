import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const blogsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'blogs');
const tops = {
  'blog-navimow-network-rtk.html': '<p>RTK success is cumulative: postcode, dock, mapping, and seasonal sky changes all interact. Treat the first month as calibration—not proof the category fails.</p>',
  'blog-navimow-lidar-vs-awd.html': '<p>When in doubt, prioritize the failure mode that ruins more square metres of your week—then test returns within policy if the first pick feels wrong.</p>',
  'blog-navimow-summer-lawn-care.html': '<p>Summer lawn care with robots is mostly scheduling discipline: mow often, mow cool, update maps when layout changes, and keep blades sharp.</p>',
  'blog-navimow-accessories-guide.html': '<p>Accessories should solve problems you have measured—not problems you imagine. That single rule keeps Navimow carts lean and useful.</p>',
  'blog-navimow-maintenance-calendar.html': '<p>A mower maintained on calendar time outlasts one maintained on panic after brown tips appear. Boring maintenance is the point.</p>',
  'blog-navimow-worth-it-2026.html': '<p>2026 is a reasonable buy year when garden fit is confirmed and summer bundles improve shelter economics—otherwise waiting beats impulse.</p>',
  'blog-navimow-best-time-to-buy.html': '<p>Buy when promo, delivery, and mapping time align; discount alone is never sufficient reason to rush the wrong SKU.</p>',
};

for (const [f, p] of Object.entries(tops)) {
  const fp = path.join(blogsDir, f);
  let h = fs.readFileSync(fp, 'utf8');
  if (!h.includes(p.slice(3, 25))) {
    h = h.replace('<h2>FAQ</h2>', p + '\n\n            <h2>FAQ</h2>');
    fs.writeFileSync(fp, h);
  }
  const body = h.match(/<article>([\s\S]*?)<section class="article-comments"/)?.[1] || '';
  console.log(f, body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);
}
