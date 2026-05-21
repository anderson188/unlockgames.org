import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildBody, section, paras, IMG } from './upgrade-recent-articles-lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, '..', 'blogs');
const rootDir = path.join(__dirname, '..');
const date = '2026-05-21';

function commentsHtml(items) {
  return items.map(([name, cdate, text]) =>
    `                    <div class="comment-item">
                        <strong>${name}</strong><span class="comment-date">${cdate}</span>
                        <p>${text}</p>
                    </div>`
  ).join('\n');
}

function nav(categoryPage) {
  const sport = categoryPage === 'category-sport-fashion.html'
    ? `<li><a href="${categoryPage}">Sport & Fashion</a></li>`
    : `<li><a href="../index.html#sport-fashion">Sport & Fashion</a></li>`;
  const outdoor = categoryPage === 'category-outdoor-furniture.html'
    ? `<li><a href="../index.html#outdoor">Outdoor Furniture</a></li>` : '';
  return `<li><a href="../index.html">Home</a></li>
                <li><a href="../index.html#electronics">Electronics & Tech</a></li>
                <li><a href="../index.html#saas">SaaS & Productivity</a></li>
                <li><a href="../index.html#fashion">Fashion & Beauty</a></li>
                ${sport}
                <li><a href="../index.html#shopping">Shopping & Retail</a></li>
                ${outdoor}
                <li><a href="../index.html#travel">Travel</a></li>`;
}

function render(a) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${a.title} - unLockGames</title>
    <meta name="description" content="${a.meta}">
    <link rel="stylesheet" href="../blog-traditional.css">
    <link rel="canonical" href="https://unlockgames.org/blogs/${a.file}">
</head>
<body>
    <header class="blog-header">
        <div class="container">
            <a href="../index.html" class="blog-logo">unLockGames</a>
            <form action="../search.html" method="get" class="blog-search-form" role="search">
                <input type="text" name="q" class="blog-search" placeholder="Search articles..." autocomplete="off">
                <button type="submit" class="blog-search-btn" aria-label="Search">Search</button>
            </form>
        </div>
    </header>
    <nav class="blog-nav"><div class="container"><ul>${nav(a.categoryPage)}</ul></div></nav>
    <main class="article-content" style="max-width:800px;margin:2rem auto;padding:0 20px;">
        <a href="${a.categoryPage}" class="back-link" style="display:inline-block;margin-bottom:1rem;color:#0d9488;">&larr; ${a.categoryName}</a>
        <article>
            <h1>${a.title}</h1>
            <p style="color:#64748b;font-size:0.9rem;margin-bottom:1.5rem;">${date} · <a href="${a.categoryPage}">${a.categoryName}</a><span class="view-count" aria-label="views" style="margin-left:0.75rem;">&#128065; ${a.views}</span></p>
            <div class="article-hero-img" style="margin-bottom:1.5rem;border-radius:8px;overflow:hidden;"><img src="${a.img}" alt="${a.imgAlt}" style="width:100%;height:auto;display:block;" width="800" height="400" loading="eager"></div>
            ${a.body}
            <section class="article-comments" id="comments">
                <h3>Comments</h3>
                <div class="comment-list">
${commentsHtml(a.comments)}
                </div>
                <form class="comment-form" id="commentForm" onsubmit="event.preventDefault(); document.getElementById('commentNote').style.display='block'; this.reset();">
                    <input type="text" name="name" placeholder="Your name" required>
                    <input type="email" name="email" placeholder="Your email" required>
                    <textarea name="comment" placeholder="Your comment..." rows="4" required></textarea>
                    <button type="submit">Post Comment</button>
                </form>
                <p class="comment-note" id="commentNote" style="display:none;">Thanks for your comment! Comments are moderated and will appear after approval.</p>
            </section>
            <p style="font-size:0.85rem;color:#94a3b8;"><em>Disclosure: We may earn a commission when you shop through our links at no extra cost to you. We only recommend products and retailers we believe offer real value.</em></p>
        </article>
    </main>
    <footer class="blog-footer">
        <div class="container">
            <div class="footer-links">
                <a href="../index.html">Home</a>
                <a href="../index.html#electronics">Electronics</a>
                <a href="../index.html#fashion">Fashion</a>
                <a href="../index.html#travel">Travel</a>
                <a href="../about.html">About Us</a>
                <a href="../privacy.html">Privacy</a>
            </div>
            <p class="footer-bottom"><strong>Disclosure:</strong> We may earn a commission when you shop through our links at no extra cost to you. <a href="../privacy.html">Privacy</a> | <a href="../terms.html">Terms</a></p>
            <p class="footer-bottom">&copy; 2025 unLockGames. All rights reserved.</p>
        </div>
    </footer>
    <script src="../ai-assistant.js"></script>
    <script src="../i18n-embedded.js" defer></script>
    <script src="../site-i18n.js" defer></script>
</body>
</html>`;
}

const articles = [
  {
    file: 'blog-editorial-smart-home-privacy.html',
    title: 'Smart Home Privacy Checklist Before You Add Another Device',
    meta: 'Cameras, speakers, and sensors: a practical privacy checklist before expanding your smart home setup.',
    categoryPage: 'category-electronics.html', categoryName: 'Electronics & Tech',
    img: IMG.tech, imgAlt: 'Smart home and connected devices', views: '18,640',
    comments: [['Taylor', '2026-05-21', 'Moved our cameras to a guest Wi‑Fi network after reading this—wish I’d done it sooner.'], ['Priya', '2026-05-22', 'The quarterly recording delete reminder is simple but actually doable.']],
    body: buildBody(
      `<p><strong>Who this is for:</strong> Renters and homeowners adding cameras, speakers, doorbells, or cheap smart plugs who want convenience without turning the flat into an open data tap. This is general security hygiene—not a scare piece, and not a product roundup.</p>`,
      [
        section('Why privacy planning beats panic uninstalls',
          paras('Each new device is another microphone, lens, or telemetry stream. Most breaches are boring: reused passwords, stale firmware, or a camera left on the primary network beside your work laptop.', 'A ten-minute checklist before setup prevents the Sunday-night rip-out when a headline spooks the household.')),
        section('Account hygiene first',
          paras('Use a unique password and two-factor authentication on the vendor account—not the same login as your email.', 'Consider a dedicated email alias for IoT sign-ups so a compromise does not cascade into banking or work resets.', 'If the app offers login alerts, enable them; ignore notifications you do not recognize and change the password immediately.')),
        section('Camera and microphone defaults',
          paras('Indoor cameras deserve a physical shutter or lens cover when you are not actively monitoring.', 'Voice assistants: confirm what “mute” actually disables and delete stored recordings on a calendar you will follow—quarterly beats never.', 'Disable features you do not use: remote viewing for doorbells you never check, contact upload, or location access on bulbs.')),
        section('Network segmentation in plain language',
          paras('If your router supports a guest network or IoT VLAN, put smart gear there—not on the same slice as tax documents and work VPN.', 'Light bulbs and plugs rarely need to talk to your laptop; they only need internet for updates and cloud control.', 'Segmentation limits blast radius when a cheap device ships with a default credential list.')),
        section('Permissions and firmware',
          paras('Read permission prompts instead of tapping through. Does a scale need your photo library?', 'Enable auto-updates on brands you trust; for no-name discount gear, ask whether it belongs on your network at all.', 'Before disposal, factory-reset devices so the next owner does not inherit your account pairing.')),
        section('Household rules that stick',
          paras('Agree where cameras may point—common areas yes, bedrooms no, unless everyone opts in.', 'Kids’ rooms: many families skip always-on lenses entirely and use motion alerts at doors instead.', 'Guests: tell visitors if indoor mics are active; it is basic courtesy and avoids awkward discoveries.')),
        section('When cloud storage is worth it',
          paras('Local-only recording reduces vendor exposure but increases theft risk if the hub walks out the door.', 'Cloud clips help when you travel—just set retention limits so years of driveway footage do not accumulate by default.', 'Paid tiers should solve a problem you have, not hypothetical security theatre.')),
      ],
      [['Do I need a firewall appliance?', 'Not for most flats. Router guest networks plus sane defaults cover the basics.'], ['Are cheap plugs unsafe?', 'They can be—check update history and reviews mentioning random disconnects or overheating.'], ['Can I use smart gear on office VPN days?', 'Keep work machines on the main network; IoT on guest—never bridge them for convenience.']],
      ['<strong>Unique accounts + 2FA</strong> on every vendor app', '<strong>Guest / IoT network</strong> for cameras and plugs', '<strong>Disable unused permissions</strong> and delete old clips on schedule', '<strong>Factory-reset</strong> before selling or recycling gear']
    ),
  },
  {
    file: 'blog-editorial-tablet-vs-laptop-2026.html',
    title: 'Tablet vs Laptop in 2026: Which Device Fits Your Week?',
    meta: 'Tablet or laptop for work, travel, and study in 2026—honest trade-offs on keyboards, battery, and software.',
    categoryPage: 'category-electronics.html', categoryName: 'Electronics & Tech',
    img: IMG.laptop, imgAlt: 'Laptop and tablet on desk', views: '21,305',
    comments: [['Marcus', '2026-05-21', 'The “worst-case Tuesday” test saved me from buying a tablet I’d have hated for spreadsheets.'], ['Elena', '2026-05-22', 'Finally someone admits keyboard cases still feel fiddly on trains.']],
    body: buildBody(
      `<p><strong>Who this is for:</strong> Students, remote workers, and frequent travellers choosing one primary carry device—or trying to avoid buying two that overlap. Prices vary by region; focus here is on fit, not brand cheerleading.</p>`,
      [
        section('The question is your week, not the spec sheet',
          paras('Tablets got faster; laptops got lighter. Marketing shows both editing 4K on a beach.', 'Real life is email, PDFs, video calls, browser tabs, and occasional heavy files. Match the device to those hours—not the hero slide.')),
        section('When a tablet is enough',
          paras('Reading, annotating, streaming, light email, and travel days where grams matter.', 'If your heaviest task is a browser with a dozen tabs and a notes app, a tablet plus keyboard case can feel liberating.', 'Artists and presenters may prefer touch and pencil input over trackpads for certain workflows.')),
        section('When you still need a laptop',
          paras('Local video editing, development environments, large Excel models, or apps that only exist on desktop OS.', 'Tablets can remote into powerful machines, but latency and window management frustrate daily power users.', 'Employer IT policies may require managed laptops with specific security agents—tablets fail by default.')),
        section('Keyboard cases and ergonomics',
          paras('Typing more than thirty minutes daily on a fold-over keyboard taxes wrists and neck on tray tables.', 'Try the exact keyboard case in-store: key travel, layout, and stability on your lap differ wildly.', 'A laptop hinge usually wins for sofa work; tablets flex and wobble unless you add a stand.')),
        section('Battery and charging reality',
          paras('Tablets often idle efficiently; laptops drain faster under compile jobs or video calls with camera on.', 'One charger ecosystem matters in carry-on life—USB-C convergence helps until a proprietary pen or dock breaks the dream.', 'Plan for the travel day you actually take, not the staycation ad.')),
        section('Three-question decision test',
          '<ol><li>Do you need macOS or Windows-only apps weekly?</li><li>Will you type more than thirty minutes most days?</li><li>Does IT mandate a managed laptop?</li></ol>',
          paras('Two “yes” answers → laptop. Two “no” → tablet may save weight and money. Split answers → rent or borrow before committing.')),
        section('Hybrid setups without duplicate spend',
          paras('Desktop at home + tablet for travel beats two premium laptops.', 'Cloud storage and synced notes reduce “wrong device” friction if you pick one primary form factor.', 'Avoid keeping an aging laptop and new tablet that neither fully replaces the other.')),
      ],
      [['Can a tablet replace my gaming PC?', 'No for local AAA gaming; cloud services are optional extras with latency trade-offs.'], ['Is iPad vs Android vs Windows important?', 'App availability for your major tools matters more than ecosystem religion.'], ['What about 2-in-1 laptops?', 'They blur the line—good if you want one hinge, heavier than tablets.']],
      ['<strong>Match worst-case Tuesday</strong>, not vacation photos', '<strong>Keyboard time</strong> drives the tablet vs laptop call', '<strong>IT policy</strong> may decide for you', '<strong>Try before buy</strong>—keyboard cases lie in photos']
    ),
  },
];

// Append remaining articles via second import
const { restArticles } = await import('./upgrade-recent-articles-rest.mjs');
articles.push(...restArticles);

for (const a of articles) {
  fs.writeFileSync(path.join(blogsDir, a.file), render(a), 'utf8');
  console.log('Upgraded', a.file);
}

const broken = [
  ['photo-1558002038-1051097df827', 'photo-1518770660439-4636190af475'],
  ['photo-1549298916-b41d501d3772', 'photo-1542291026-7eec264c27ff'],
  ['photo-1600585154340-be6161a56a0c', 'photo-1505691938895-1758d7feb511'],
  ['photo-1600607687939-ce8a6c25118c', 'photo-1523413651479-597eb2da0ad6'],
  ['photo-1563013544-824ae1b704d3', 'photo-1441986300917-64674bd600d8'],
  ['photo-1488085061387-422e29b40080', 'photo-1566073771259-6a8506099945'],
  ['photo-1436491865332-7a61a109cc05', 'photo-1507525428034-b723cf961d3e'],
  ['photo-1460353581641-37baddab0fa2', 'photo-1542291026-7eec264c27ff'],
  ['photo-1515886657613-9f3515b0c78f', 'photo-1558618666-fcd25c85cd64'],
  ['photo-1556228578-0d85b1a4d571', 'photo-1594938298603-c8148c4dae35'],
  ['photo-1517836357463-d25dfeac3438', 'photo-1571019613454-1cb2f99b2d8b'],
  ['picsum.photos/seed/saasaudit/120/80', 'images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=80&fit=crop'],
  ['picsum.photos/seed/notetaking/120/80', 'images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=80&fit=crop'],
  ['picsum.photos/seed/saasaudit/640/360', 'images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=360&fit=crop'],
  ['picsum.photos/seed/notetaking/640/360', 'images.unsplash.com/photo-1496181133206-80ce9b88a853?w=640&h=360&fit=crop'],
];

for (const f of [path.join(rootDir, 'index.html'), ...fs.readdirSync(blogsDir).filter(n => n.endsWith('.html')).map(n => path.join(blogsDir, n))]) {
  let html = fs.readFileSync(f, 'utf8');
  let changed = false;
  for (const [from, to] of broken) {
    if (html.includes(from)) { html = html.split(from).join(to); changed = true; }
  }
  if (changed) fs.writeFileSync(f, html, 'utf8');
}

console.log('Total upgraded:', articles.length);
