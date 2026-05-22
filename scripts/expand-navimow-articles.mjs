import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, '..', 'blogs');
const LINK = 'https://www.awin1.com/cread.php?awinmid=99151&awinaffid=1333985';
const BRAND = `<a href="${LINK}" target="_blank" rel=" sponsored noopener noreferrer">Segway Navimow</a>`.replace(' sponsored', 'sponsored');

function h2(title, paras) {
  return `<h2>${title}</h2>\n            ${paras.map((t) => `<p>${t}</p>`).join('\n            ')}`;
}

const expansions = {
  'blog-navimow-choose-lawn-size.html': [
    h2('Multi-zone lawns and shared gardens', [
      'If front and back are separate but both need mowing, area ratings still apply to combined workable grass—but scheduling may split zones on different days to preserve battery. Navimow app multi-zone support varies by model; confirm before assuming one daily pass covers disconnected rectangles.',
      'Shared garden walls and neighbour overhangs create grey zones: map conservatively and leave buffer strips rather than arguing about blade paths later. A robot that respects digital boundaries saves relationships; one that scalps flower beds does not.',
    ]),
    h2('Commercial vs residential ratings', [
      'Terranox and NavimowFleet target grounds crews with different duty cycles than weekend suburban use. Consumer i and X models list residential coverage—running a small i105e on a five-acre paddock is a recipe for incomplete cuts and shortened motor life.',
      'If you maintain a holiday home visited monthly, factor idle growth: the mower may need aggressive first-run scheduling after absence. Size up or plan manual pre-cut when returning after long gaps.',
    ]),
    h2('Where to compare live specs', [
      `Navimow publishes model comparison tables and lawn-size fitting tools on the official European and US stores—use them after your tape-measure pass, not instead of it. When your shortlist is down to two SKUs, open ${BRAND} and filter by coverage band, then read slope and obstacle limits on each product page before checkout.`,
    ]),
  ],
  'blog-navimow-wire-free-mowers.html': [
    h2('EFLS and VisionFence in plain English', [
      'Navimow blog posts reference EFLS (Exact Fusion Locating System) and VisionFence as layers on top of satellite positioning. Practically: EFLS fuses multiple sensors for where the mower thinks it is; VisionFence uses cameras to detect obstacles and non-grass surfaces. Neither replaces common sense about toy-strewn lawns on Saturday morning.',
      'Marketing slides show pristine suburban turf. Your garden may include trampoline shadows, washing lines, and a compost corner. Wire-free navigation succeeds when you map those once and update the app after changes—not when you expect the robot to read your mind.',
    ]),
    h2('Five-year total cost sketch', [
      'Wire installation for legacy robots often runs €200–€600 in professional labour plus annual repair time. Wire-free Navimow carries higher hardware cost but removes burial and nicks from edgers. Spread over five seasons, many owners break even on hassle alone before counting hourly rate.',
      'Include garage and blade kits in year-one budget—UV and dull blades are predictable costs, not surprises. Summer bundle promotions on the official store sometimes offset garage price entirely.',
    ]),
    h2('First-month expectations', [
      'Week one is mapping and supervised runs, not “set and forget forever.” Week two adjusts keep-out zones after the mower finds the rose bed. Week four feels like ownership; week one feels like onboarding. That is normal for wire-free systems with app-defined edges.',
    ]),
  ],
  'blog-navimow-i-vs-x-vs-h.html': [
    h2('Terranox and fleet lines (when home models stop)', [
      'Navimow commercial pages list Terranox professional mowers and NavimowFleet software for grounds teams. If you maintain sports club pitches or hotel acreage, consumer X450 coverage may still be wrong tool—duty cycle, support contracts, and blade throughput differ. Do not stretch i Series into commercial workloads.',
    ]),
    h2('Refurbished i105E and budget stretch', [
      'Official refurbished listings (~95% condition) appear on the EU store at reduced prices—useful for second properties or cautious first-time buyers. Warranty terms may differ from new; read the refurb page before assuming identical three-year coverage.',
    ]),
    h2('Reward program and long-term ownership', [
      'Navimow Reward Program marketing cites points on purchases—factor modest future discount if you plan accessory buys later. It does not change which series fits your garden, but sweetens garage and blade reorders after year one.',
      `Still comparing i2 LiDAR Pro against H220? Walk your property with phone notes: count narrow passages, overhangs, and slope segments. Then re-open ${BRAND} model compare with those counts visible—spec sheets make sense only against your checklist.`,
    ]),
  ],
  'blog-navimow-network-rtk.html': [
    h2('What happens when RTK is unavailable', [
      'If postcode checker shows no service, Navimow may still operate with other fusion stacks depending on model—LiDAR-heavy lines tolerate weaker RTK differently than base i1 units. Email notification signup on the site is worth it if you are six months from purchase and coverage maps are expanding.',
      'Do not buy assuming RTK will “probably arrive soon” unless you have credible regional rollout info. Plan for the garden you have today.',
    ]),
    h2('Cellular data and privacy basics', [
      'EU marketing states cellular data for RTK included without extra subscription in supported regions—verify for your country at checkout. Understand app permissions: mapping uploads boundary data; treat account security like any IoT device with outdoor access.',
    ]),
    h2('Dock placement science', [
      'Charging station needs stable power, level ground, and sky view for fastest fix. Tucking dock under deep eaves or dense evergreen canopy slows first connection—move dock before blaming Network RTK. Extension cables and mounting kits exist for X Series precisely because real gardens have awkward corners.',
    ]),
  ],
  'blog-navimow-lidar-vs-awd.html': [
    h2('Side-by-side scenario table (mental)', [
      'Scenario A: 500 m² flat terrace house lawn, open sky → base i1 likely enough. Scenario B: same size with 15° rear bank → i2 AWD. Scenario C: 900 m² with ornamental trees and narrow side access → i2 LiDAR. Scenario D: same as C plus steep drive → consider H2 fusion or accept manual bank mowing.',
      'Mixed scenarios are common: AWD without LiDAR leaves you stuck on layout complexity; LiDAR without AWD leaves you spinning on wet slopes. List your worst single failure mode and optimize for that.',
    ]),
    h2('Summer promo interactions', [
      'Buy i2 LiDAR Pro promotions may bundle free Garage M (MSRP €199)—that does not make LiDAR necessary, but improves economics if you already chose LiDAR for mapping reasons. Do not let free garage push you from i1 to Pro without layout justification.',
    ]),
    h2('Test week protocol', [
      'Run three supervised sessions: dry midday, damp morning, dusk with shadows. LiDAR and vision behave differently as light changes. AWD shows value only when grass is wet—do not judge traction on dry demo day alone.',
    ]),
  ],
  'blog-navimow-summer-lawn-care.html': [
    h2('Stripe aesthetics without obsession', [
      'Some Navimow models support directional mowing patterns in app—pleasant for visible front lawns, irrelevant if your garden is mostly backyard utility. Schedule pattern changes only after baseline reliability; stripes are vanity, coverage is function.',
    ]),
    h2('Neighbourhood noise and HOA notes', [
      'Robot mowers are quieter than petrol tractors but not silent. Schedule away from neighbour bedroom windows if walls are close. HOA covenants occasionally restrict visible robots—check before mounting dock street-facing.',
    ]),
    h2('Pairing robot mowing with patio season', [
      'Purple Leaf pergolas and Navimow robots share the same customer: people who live outdoors in summer. Mow before hosting—clippings on patio tiles are slippery. Robot schedule Thursday, party Saturday beats manual scramble morning-of.',
      `If you are outfitting backyard living and lawn together, browse patio shade guides here on unLockGames and mower lineup at ${BRAND} in parallel—layout affects both dock placement and guest sightlines.`,
    ]),
  ],
  'blog-navimow-accessories-guide.html': [
    h2('Replacement trimmer and X3 attachments', [
      'X3 accessory pages list trimmer pioneer editions, replacement spools, and signal antennas—specialist tools for owners who want edge trimming from the same ecosystem. Skip until base mowing proves reliable; trimmer attachments add complexity before core value is established.',
    ]),
    h2('Power supply adapter for antenna', [
      'Listed for X3 when antenna placement needs remote power—niche solve for large properties. Suburban plots with dock near house outlet rarely need this on day one.',
    ]),
    h2('Return policy and accessory mistakes', [
      'EU store cites 30-day returns on many products—ordering every accessory preemptively wastes return window on the mower itself if mapping fails. Sequence: mower success → garage → blades → gates/antennas based on evidence.',
    ]),
  ],
  'blog-navimow-maintenance-calendar.html': [
    h2('Firmware changelog habit', [
      'Navimow OTA updates sometimes add Animal Friendly tweaks or boundary tools—read release notes monthly during season. Skipping updates leaves performance on table; auto-update with post-update test mow on small zone.',
    ]),
    h2('End-of-season checklist', [
      'Late October (Northern Hemisphere): final blade swap if dull, clean deck thoroughly, charge battery to recommended storage level, cover or garage mower, export map screenshot backup if app allows. Spring startup: inspect dock cables, clear winter debris from charging contacts, run boundary verification mow before full schedule.',
    ]),
    h2('When blades hide bigger problems', [
      'If grass tips brown despite sharp blades, investigate wheel alignment or deck level—not just another blade kit. Persistent RTK errors after storms may need support ticket with app logs before buying signal antennas.',
    ]),
  ],
  'blog-navimow-worth-it-2026.html': [
    h2('Environmental framing (without greenwashing)', [
      'Electric robot mowers reduce petrol mower emissions and noise—meaningful if you otherwise run a two-stroke weekly. They still consume electricity and embodied carbon in manufacturing. Buy for time and consistency; environmental benefit is secondary bonus for most households.',
    ]),
    h2('Comparison to human gardener', [
      'Weekly gardener at €40–€80 per visit × 25 weeks = €1,000–€2,000 annually. Navimow i Series hardware often sits in one to three season payback versus service—plus you keep schedule control on holiday weeks. Gardener still wins on hedges, leaves, and edge perfection.',
    ]),
    h2('Try-before-you-regret', [
      'If maths are close, leverage return window: map in week one, stress-test slopes in week two, decide by day 25. Official store policies vary—confirm before buy. Our partner link routes to Navimow storefront for consistent order tracking.',
    ]),
  ],
  'blog-navimow-best-time-to-buy.html': [
    h2('Regional store differences', [
      'Navimow US store lists USD pricing and SKUs; EU store lists EUR with Summer Sale banners and country selector (UK GBP, Sweden SEK, etc.). Buy from store serving your warranty region—gray import through wrong storefront complicates service.',
    ]),
    h2('Deposit and pre-order SKUs', [
      'X4 and other lines occasionally offered deposit pre-orders with future ship dates—fine if you accept delay risk; poor if you need mowing this month. Read estimated delivery before deposit.',
    ]),
    h2('Post-purchase setup calendar', [
      'Order week 0, delivery week 1, mapping week 2, confident automation week 3–4. Buying late June still beats never—but you lose eight weeks of peak season versus May purchase. Align promo timing with weekends you can supervise first runs.',
      `When sale banners align with your measured lawn size, checkout via ${BRAND} with garage bundle SKUs in cart—compare package total, not headline discount percentage alone.`,
    ]),
  ],
};

for (const [file, blocks] of Object.entries(expansions)) {
  const fp = path.join(blogsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const marker = '<h2>FAQ</h2>';
  if (!html.includes(marker)) {
    console.warn('No FAQ marker in', file);
    continue;
  }
  if (html.includes(blocks[0].slice(0, 30))) {
    console.log('Already expanded', file);
    continue;
  }
  html = html.replace(marker, blocks.join('\n\n            ') + '\n\n            ' + marker);
  fs.writeFileSync(fp, html, 'utf8');
  const body = html.match(/<article>([\s\S]*?)<section class="article-comments"/)?.[1] || '';
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(file, '~' + words + ' body words');
}
