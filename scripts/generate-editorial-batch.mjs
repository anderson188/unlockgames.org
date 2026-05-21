import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogsDir = path.join(root, 'blogs');
const date = '2026-05-21';

const articles = [
  {
    file: 'blog-editorial-tablet-vs-laptop-2026.html',
    category: 'electronics',
    categoryName: 'Electronics & Tech',
    categoryPage: 'category-electronics.html',
    title: 'Tablet vs Laptop in 2026: Which Device Fits Your Week?',
    meta: 'Tablet or laptop for work, travel, and study in 2026—honest trade-offs on keyboards, battery, and software.',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=400&fit=crop',
    imgAlt: 'Laptop on desk',
    body: `<p>Tablets got faster. Laptops got lighter. The middle ground is messier than ever because both sides now claim to be your only device. The useful question is not which spec sheet wins—it is what your week actually looks like.</p>
<h2>When a tablet is enough</h2>
<p>Reading, annotating PDFs, video calls, light email, and travel days where weight matters more than horsepower. If your heaviest task is a browser with twelve tabs and a note app, a tablet with a decent keyboard case can feel liberating.</p>
<h2>When you still need a laptop</h2>
<p>Local video editing, development environments, large spreadsheets with macros, or any workflow that depends on desktop-class apps. Tablets can run many tools through the cloud, but latency and window management still frustrate power users.</p>
<h2>The hybrid trap</h2>
<p>Buying a tablet <em>and</em> pretending it is a laptop because marketing showed someone editing 4K video on a beach. If you need a laptop twice a week, you need a laptop—not a compromise you resent on day forty.</p>
<h2>Three-question decision test</h2>
<ol><li>Do you need apps that only run on macOS or Windows?</li><li>Will you type more than thirty minutes daily?</li><li>Does your employer IT policy allow your chosen device?</li></ol>
<p>Two yes answers usually point to a laptop. Two no answers, a tablet may save weight and money.</p>
<h2>Takeaway</h2>
<p>Match the device to your worst-case Tuesday, not your ideal vacation photo. That is how you avoid a drawer of almost-right gadgets.</p>`
  },
  {
    file: 'blog-editorial-smart-home-privacy.html',
    category: 'electronics',
    categoryName: 'Electronics & Tech',
    categoryPage: 'category-electronics.html',
    title: 'Smart Home Privacy Checklist Before You Add Another Device',
    meta: 'Cameras, speakers, and sensors: a practical privacy checklist before expanding your smart home setup.',
    img: 'https://images.unsplash.com/photo-1558002038-1051097df827?w=800&h=400&fit=crop',
    imgAlt: 'Smart home devices',
    body: `<p>Smart home gear promises convenience, but each new device is also a microphone, camera, or data stream you did not have yesterday. You do not need paranoia—just a repeatable checklist before checkout.</p>
<h2>Account hygiene first</h2>
<p>Unique passwords, two-factor authentication on the vendor account, and a dedicated email alias for IoT sign-ups. Compromised smart-home credentials are boring until they are not.</p>
<h2>Camera and microphone defaults</h2>
<p>Indoor cameras: physical shutter or lens cover when not in use. Voice assistants: review mute behavior and delete old recordings on a schedule you will actually follow—quarterly beats never.</p>
<h2>Network segmentation</h2>
<p>If your router supports a guest or IoT VLAN, use it. Light bulbs should not sit on the same network slice as your work laptop when avoidable.</p>
<h2>Permissions and firmware</h2>
<p>Disable features you do not use (remote viewing, contact sharing, location if irrelevant). Enable auto-updates where trusted; for cheap no-name gear, consider whether it belongs on your network at all.</p>
<h2>Bottom line</h2>
<p>Convenience scales; so does exposure. A ten-minute privacy pass per device beats a weekend ripping everything offline after a headline breach.</p>`
  },
  {
    file: 'blog-editorial-saas-renewal-audit.html',
    category: 'saas',
    categoryName: 'SaaS & Productivity',
    categoryPage: 'category-saas.html',
    title: 'The 30-Minute SaaS Renewal Audit for Small Teams',
    meta: 'Before auto-renewal hits: a quick audit for duplicate tools, unused seats, and cheaper tiers that still fit.',
    img: 'https://picsum.photos/seed/saasaudit/800/400',
    imgAlt: 'SaaS dashboard',
    body: `<p>Small teams rarely cancel software—they just stop using it while invoices quietly renew. A focused half-hour before renewal season prevents paying for five tools that solve one problem.</p>
<h2>Step 1: Export active users</h2>
<p>Pull seat counts and last-login dates from billing admin panels. Seats with no login in ninety days are candidates to downgrade or cut—not moral failures, just drift.</p>
<h2>Step 2: Map overlap</h2>
<p>Two chat apps, three file stores, four note tools—common after fast growth. Circle overlapping categories and pick one keeper per job: docs, design, comms, hosting, VPN.</p>
<h2>Step 3: Test downgrade paths</h2>
<p>Many teams on Pro tiers only use Free features. Trial downgrade for thirty days with an escape hatch before committing to annual plans.</p>
<h2>Step 4: Calendar the decision</h2>
<p>Set renewal reminders sixty days out. Negotiation and migration need time; panic at day three guarantees overpaying.</p>
<h2>Outcome</h2>
<p>You keep tools that earn their tab space. Everything else gets a documented owner, a kill date, or a cheaper tier—clarity beats stack sprawl.</p>`
  },
  {
    file: 'blog-editorial-note-taking-workflow.html',
    category: 'saas',
    categoryName: 'SaaS & Productivity',
    categoryPage: 'category-saas.html',
    title: 'Note-Taking Apps in 2026: One Inbox Beats Five Tabs',
    meta: 'Reduce note app sprawl: capture, organize, and retrieve without rebuilding your system every quarter.',
    img: 'https://picsum.photos/seed/notetaking/800/400',
    imgAlt: 'Notes and productivity',
    body: `<p>Note apps multiply because each one feels perfect for a single use case—meetings, research, personal journaling, shared wikis. Six months later you cannot find anything. The fix is usually process, not another subscription.</p>
<h2>One capture inbox</h2>
<p>Every fleeting idea lands in one place first. Phone widget, browser clipper, email-forward—pick one path you will use when tired. Sorting happens later; capture must be frictionless.</p>
<h2>Three buckets maximum</h2>
<p>Action, reference, archive. Tags and folders beyond that become procrastination. If a note has no next step and no retrieval value, delete it.</p>
<h2>Weekly review, not daily perfection</h2>
<p>Fifteen minutes Friday: move action items to task manager, link reference to projects, archive the rest. Consistency beats elaborate PARA setups you abandon in March.</p>
<h2>When to add a second tool</h2>
<p>Only when a team needs shared permissions a personal app cannot offer—or when compliance requires it. Otherwise, resist.</p>
<h2>Takeaway</h2>
<p>The best note system is the one you search successfully on Monday. One inbox, three buckets, weekly cleanup—boring and effective.</p>`
  },
  {
    file: 'blog-editorial-summer-capsule-2026.html',
    category: 'fashion',
    categoryName: 'Fashion & Beauty',
    categoryPage: 'category-fashion.html',
    title: 'A Summer Capsule Wardrobe That Survives Heat and Office AC',
    meta: 'Build a small summer wardrobe for heat outdoors and cold offices—fabrics, layers, and shoes that mix cleanly.',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=400&fit=crop',
    imgAlt: 'Summer fashion',
    body: `<p>Summer dressing fails in the gap between sidewalk heat and conference-room Arctic blast. A capsule that only works outdoors leaves you shivering at work; one built for AC alone melts on the commute.</p>
<h2>Fabrics that bridge both worlds</h2>
<p>Lightweight linen blends, breathable cotton, and open-weave knits layer without bulk. Avoid heavy polyester that traps heat—it also smells faster after transit.</p>
<h2>Core pieces (aim for twelve to fifteen items)</h2>
<ul><li>Two neutral bottoms (tailored short or wide leg, one midi skirt or light trouser)</li><li>Three tops that cover shoulders for office policy</li><li>One light blazer or structured shirt-jacket</li><li>One dress that works with sneakers or flats</li><li>Two shoe pairs: breathable daily + slightly dressier</li></ul>
<h2>Colour strategy</h2>
<p>Two neutrals plus one accent you enjoy. Summer capsules fall apart when every piece fights for attention in photos and real life.</p>
<h2>Office AC layer</h2>
<p>Keep a compact layer at your desk—not in the car boot you forget. Scarf, fine knit, or light blazer beats borrowing a random hoodie that ruins the silhouette.</p>
<h2>Final note</h2>
<p>Capsules are permission to repeat outfits. If a combination worked Tuesday, wear it again Thursday. Nobody is tracking except you.</p>`
  },
  {
    file: 'blog-editorial-daily-sunscreen-routine.html',
    category: 'fashion',
    categoryName: 'Fashion & Beauty',
    categoryPage: 'category-fashion.html',
    title: 'Daily Sunscreen Layering: What Goes Under Makeup and Over Serums',
    meta: 'Morning skincare order for SPF: serums, moisturizer, sunscreen, makeup—without pilling or midday shine.',
    img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=400&fit=crop',
    imgAlt: 'Skincare products',
    body: `<p>Sunscreen fails when it fights your serums. Pilling, white cast, and midday shine make people skip reapplication—the worst outcome. Order and texture matter as much as SPF number.</p>
<h2>Morning stack (thinnest to thickest)</h2>
<ol><li>Cleanse or rinse if needed</li><li>Watery serums (vitamin C, niacinamide)</li><li>Moisturizer if skin is dry</li><li>SPF as dedicated step—not hidden only in foundation</li><li>Makeup after SPF sets (two to three minutes)</li></ol>
<h2>Choosing texture by skin type</h2>
<p>Oily skin: gel or fluid SPF. Dry skin: cream with humectants. Melanin-rich skin: test cast in natural light; mineral vs chemical is personal, not universal law.</p>
<h2>Reapplication reality</h2>
<p>Powder SPF, SPF mists, or carrying a small tube for lunch break—pick one method you will use. Perfection once a morning is not enough for all-day outdoor plans.</p>
<h2>Takeaway</h2>
<p>SPF is a daily habit product. Simplify the stack until you actually do it every morning—then optimize from there.</p>`
  },
  {
    file: 'blog-editorial-home-gym-minimal.html',
    category: 'sport-fashion',
    categoryName: 'Sport & Fashion',
    categoryPage: 'category-sport-fashion.html',
    title: 'A Minimal Home Gym Setup That Actually Gets Used',
    meta: 'Resistance bands, a mat, and one weight: a home gym that fits a small space and real schedules.',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    imgAlt: 'Home workout space',
    body: `<p>Home gyms fail when they replicate a commercial floor in a spare bedroom. You do not need a rack, platform, and seven mirrors—you need a corner that stays set up and a routine shorter than your excuse window.</p>
<h2>The four-piece starter</h2>
<ul><li>Exercise mat (knee and floor protection)</li><li>Adjustable dumbbells or one moderate pair plus bands</li><li>Pull-up bar or sturdy anchor for rows if space allows</li><li>Timer app—free beats fancy consoles</li></ul>
<h2>Programme simplicity</h2>
<p>Three sessions weekly: push, pull, legs—or full-body circuits if time is tight. Twenty-five minutes done beats sixty minutes postponed.</p>
<h2>Space and noise</h2>
<p>Apartment dwellers: prioritize low-drop movements and bands over jumping. Neighbour peace keeps the gym open year-round.</p>
<h2>When to upgrade</h2>
<p>Add equipment only after eight weeks of consistent use. A bench earns its place when you outgrow floor presses—not when a sale banner blinks.</p>
<h2>Bottom line</h2>
<p>The best home gym is the one still visible on Wednesday. Start minimal; let habit dictate spend.</p>`
  },
  {
    file: 'blog-editorial-walking-shoes-everyday.html',
    category: 'sport-fashion',
    categoryName: 'Sport & Fashion',
    categoryPage: 'category-sport-fashion.html',
    title: 'Everyday Walking Shoes: Comfort Without Looking Like You Are Hiking',
    meta: 'City walking shoes for commuters and travellers—cushion, style, and when running shoes are the wrong tool.',
    img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=400&fit=crop',
    imgAlt: 'Casual walking shoes',
    body: `<p>Ten thousand steps in the wrong shoe feels like thirty. Running shoes can work for walking, but aggressive rocker geometry and race-day foam sometimes feel unstable on pavement stops and café queues.</p>
<h2>What walkers need differently</h2>
<p>Heel bevel for smooth landings, stable base, breathable upper, and outsole rubber that grips wet crosswalks—not trail lugs that click on tile.</p>
<h2>Categories that work for city life</h2>
<p>Walking-specific models, lifestyle sneakers with real midsole foam, and some cross-trainers with moderate cushion. Avoid mountaineering soles for daily commute—they wear oddly and look out of place.</p>
<h2>Fit for all-day wear</h2>
<p>Thumb width at toes, secure midfoot, no heel slip when climbing stairs. Try shoes after a walk, not fresh out of bed when feet are smallest.</p>
<h2>Rotation tip</h2>
<p>Two pairs alternating days extend life and reduce odour. Your feet and colleagues both benefit.</p>
<h2>Takeaway</h2>
<p>Buy for walking pace and urban surfaces, not marathon marketing. Comfort that looks normal off the trail is the goal.</p>`
  },
  {
    file: 'blog-editorial-carry-on-week.html',
    category: 'travel',
    categoryName: 'Travel',
    categoryPage: 'category-travel.html',
    title: 'One Carry-On for a Full Week: Packing Logic That Holds Up',
    meta: 'Pack a week in a carry-on without misery: capsule clothes, toiletry rules, and the one-shoe trap.',
    img: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&h=400&fit=crop',
    imgAlt: 'Carry-on luggage',
    body: `<p>Carry-on only travel saves time and lost-bag anxiety, but it fails when you pack for every fantasy dinner instead of your actual itinerary. One bag for a week is arithmetic, not magic.</p>
<h2>Itinerary-first packing</h2>
<p>List fixed events: meetings, hikes, formal dinner count. Pack to those, not “just in case” outfits that never leave the bag.</p>
<h2>Colour capsule</h2>
<p>Three tops, two bottoms, one layer, one dress or alternative—same palette so everything mixes. One pair shoes worn, one packed (wear the bulkier pair).</p>
<h2>Toiletries: decant or buy</h2>
<p>Travel-size rules vary; solid bars and minis beat full bottles. Arrival-day drugstore run for shampoo often beats leaking liquids.</p>
<h2>Laundry assumption</h2>
<p>Plan one sink wash or hotel laundry mid-trip for seven days. That unlocks half the volume people think they need.</p>
<h2>Gate-check escape hatch</h2>
<p>Soft bag that collapses into personal item if overhead fills—flexibility beats rigid “carry-on or fail” pride.</p>
<h2>Takeaway</h2>
<p>A week in one bag works when clothes multiply by mixing, not by quantity. Pack the trip you booked.</p>`
  },
  {
    file: 'blog-editorial-jet-lag-recovery.html',
    category: 'travel',
    categoryName: 'Travel',
    categoryPage: 'category-travel.html',
    title: 'Jet Lag Recovery Without Supplements or Guesswork',
    meta: 'Light, meals, and sleep timing: practical jet lag habits for east-west trips without miracle pills.',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop',
    imgAlt: 'Airplane window view',
    body: `<p>Jet lag is a schedule problem more than a mystery illness. Supplements promise shortcuts; light and meal timing do the boring work reliably.</p>
<h2>Before you fly</h2>
<p>Shift bedtime one hour toward destination for two nights if the trip is long. Not always possible—then focus on arrival plan instead.</p>
<h2>On the plane</h2>
<p>Eastbound: chase destination night—eye mask, skip alcohol, eat lightly. Westbound: stay awake with the destination day; walk aisles, hydrate.</p>
<h2>First forty-eight hours on ground</h2>
<p>Morning outdoor light anchors circadian rhythm. Caffeine before local noon; avoid late espresso even if you feel zombie. Eat on local meal times even if appetite lags.</p>
<h2>Naps with rules</h2>
<p>Twenty minutes max before 3 p.m. local—or skip naps and accept one hard evening for faster sync.</p>
<h2>When to stop fighting</h2>
<p>Short trips under four days: sometimes partial adaptation wastes energy. Run on home time for business lightning visits; full adaptation for holidays.</p>
<h2>Bottom line</h2>
<p>Light, food clocks, and disciplined caffeine beat untested stacks of pills. Boring recovery is effective recovery.</p>`
  },
  {
    file: 'blog-editorial-patio-materials-guide.html',
    category: 'outdoor',
    categoryName: 'Outdoor Furniture',
    categoryPage: 'category-outdoor-furniture.html',
    title: 'Patio Furniture Materials: What Lasts in Rain, Sun, and Real Life',
    meta: 'Aluminium, teak, resin wicker, and steel: compare outdoor furniture materials for weather and maintenance.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop',
    imgAlt: 'Patio furniture',
    body: `<p>Outdoor furniture marketing loves words like “all-weather” without saying which weather wins. Material choice drives whether your set looks good in year three or becomes a rust sculpture.</p>
<h2>Aluminium</h2>
<p>Light, rust-resistant, easy to move. Powder-coated finishes matter—scratches need touch-up in coastal salt air.</p>
<h2>Teak and hardwoods</h2>
<p>Beautiful aging to silver grey if unmaintained; oil if you want original tone. Heavy, long-lived, higher upfront cost.</p>
<h2>Resin wicker</h2>
<p>Modern HDPE weave handles rain better than old cheap PVC. Still needs cushions stored dry and frame inspection yearly.</p>
<h2>Steel</h2>
<p>Strong and often cheaper; galvanization and coating quality separate five-year from fifteen-year life. Avoid bare steel in humid climates.</p>
<h2>Cushions and fabrics</h2>
<p>Sunbrella-class outdoor fabric on quick-dry foam beats indoor textiles with outdoor hope. Store or cover in winter regardless of frame material.</p>
<h2>Takeaway</h2>
<p>Match material to your climate and maintenance appetite. No material is zero-care—only different care schedules.</p>`
  },
  {
    file: 'blog-editorial-backyard-shade-zones.html',
    category: 'outdoor',
    categoryName: 'Outdoor Furniture',
    categoryPage: 'category-outdoor-furniture.html',
    title: 'Backyard Shade Zones: Plan Comfort Before You Buy Furniture',
    meta: 'Map sun paths before buying umbrellas or pergolas—shade zones that make patios usable all afternoon.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=400&fit=crop',
    imgAlt: 'Backyard patio shade',
    body: `<p>Furniture arrives before shade gets planned. By July the table sits in direct sun and everyone eats indoors. Shade is infrastructure—plan it like plumbing, not decoration.</p>
<h2>Track sun for three days</h2>
<p>Morning, noon, late afternoon photos from the same spot. Note where harsh light hits seating versus where kids play or herbs grow.</p>
<h2>Zone types</h2>
<ul><li><strong>Dining zone</strong> — consistent midday cover; umbrella, pergola, or sail.</li><li><strong>Lounge zone</strong> — afternoon shade matters for heat and glare on screens.</li><li><strong>Pass-through</strong> — keep clear; do not block doors with cantilever arms.</li></ul>
<h2>Structure choice</h2>
<p>Umbrellas for flexibility; pergolas for permanent architecture; sails for large angles on a budget. Wind exposure dictates base weight—never underspend there.</p>
<h2>Furniture follows shade</h2>
<p>Place seating inside comfort zones, then buy tables that fit—not the reverse. A perfect sofa in full sun stays empty.</p>
<h2>Final word</h2>
<p>Usable patios are shaded patios. Map light first; spend on cover before cushions.</p>`
  },
  {
    file: 'blog-editorial-subscription-audit.html',
    category: 'shopping',
    categoryName: 'Shopping & Retail',
    categoryPage: 'category-shopping.html',
    title: 'The Subscription Cart Audit: Stop Paying for Apps You Forgot',
    meta: 'Monthly subscriptions add up quietly—audit streaming, software, boxes, and memberships in one sitting.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    imgAlt: 'Online subscriptions',
    body: `<p>Subscriptions feel small until you sum them on a credit card statement. The average household accumulates streaming, cloud storage, meal kits, and “free trials” that matured into annual plans nobody remembers approving.</p>
<h2>Pull one month of statements</h2>
<p>Highlight every recurring charge. Include PayPal and app-store subscriptions—they hide in subcategories.</p>
<h2>Sort into keep, pause, kill</h2>
<p><strong>Keep:</strong> used weekly and cheaper than alternative. <strong>Pause:</strong> seasonal (gym in summer, ski pass off-season). <strong>Kill:</strong> no login in sixty days and no upcoming need.</p>
<h2>Annual vs monthly math</h2>
<p>Annual plans save money only if you still want the service in month nine. Trial annual only after ninety days on monthly.</p>
<h2>Shared accounts and family plans</h2>
<p>Consolidate where rules allow. Duplicate individual music or cloud plans across a household is low-hanging fruit.</p>
<h2>Calendar next audit</h2>
<p>Quarterly reminder beats yearly shock. Subscriptions are permission-based spending—revoke permission deliberately.</p>
<h2>Takeaway</h2>
<p>One hour with statements often returns hundreds annually. No coupon required—just cancellation clicks.</p>`
  },
  {
    file: 'blog-editorial-loyalty-points-strategy.html',
    category: 'shopping',
    categoryName: 'Shopping & Retail',
    categoryPage: 'category-shopping.html',
    title: 'Loyalty Points Strategy When You Shop Multiple Stores',
    meta: 'Department stores, groceries, and travel cards: a simple points strategy without spreadsheet obsession.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    imgAlt: 'Shopping rewards',
    body: `<p>Loyalty programmes multiply until you carry six apps and still miss the best earn rate. Strategy does not require spreadsheets—it requires picking primary earners and ignoring the rest.</p>
<h2>One primary grocery programme</h2>
<p>Where you already shop weekly wins. Driving across town for bonus points destroys fuel and time savings.</p>
<h2>One general retail card or programme</h2>
<p>Department store cards only if you pay in full monthly and the discount exceeds typical interest risk. Otherwise use a flat cashback card and ignore tiered mall math.</p>
<h2>Travel points separately</h2>
<p>Airline and hotel points reward concentration. Splitting across four programmes guarantees orphan balances below redemption thresholds.</p>
<h2>Redemption discipline</h2>
<p>Points are a discount, not a hobby. Redeem on planned purchases—holiday gifts, known travel—not impulse because “points expire soon.”</p>
<h2>Ignore minor programmes</h2>
<p>Gas station apps, coffee stamps, and one-visit-per-year shops: skip mental load unless integration is effortless.</p>
<h2>Bottom line</h2>
<p>Earn big where you spend big; redeem on purpose; let the long tail of minor programmes go. Simplicity keeps rewards positive.</p>`
  }
];

function navLinks(categoryPage, categoryName) {
  const sport = categoryPage === 'category-sport-fashion.html'
    ? `<li><a href="${categoryPage}">${categoryName}</a></li>`
    : `<li><a href="../index.html#sport-fashion">Sport & Fashion</a></li>`;
  const outdoor = categoryPage === 'category-outdoor-furniture.html'
    ? `<li><a href="../index.html#outdoor">Outdoor Furniture</a></li>`
    : '';
  return `<li><a href="../index.html">Home</a></li>
                <li><a href="../index.html#electronics">Electronics & Tech</a></li>
                <li><a href="../index.html#saas">SaaS & Productivity</a></li>
                <li><a href="../index.html#fashion">Fashion & Beauty</a></li>
                ${sport}
                <li><a href="../index.html#shopping">Shopping & Retail</a></li>
                ${outdoor}
                <li><a href="../index.html#travel">Travel</a></li>`;
}

function backLink(categoryPage, categoryName) {
  if (categoryPage === 'category-outdoor-furniture.html') {
    return `<a href="${categoryPage}" class="back-link" style="display:inline-block;margin-bottom:1rem;color:#0d9488;">&larr; Outdoor Furniture</a>`;
  }
  return `<a href="${categoryPage}" class="back-link" style="display:inline-block;margin-bottom:1rem;color:#0d9488;">&larr; ${categoryName}</a>`;
}

function html(a) {
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
    <nav class="blog-nav">
        <div class="container">
            <ul>
                ${navLinks(a.categoryPage, a.categoryName)}
            </ul>
        </div>
    </nav>

    <main class="article-content" style="max-width:800px;margin:2rem auto;padding:0 20px;">
        ${backLink(a.categoryPage, a.categoryName)}
        <article>
            <h1>${a.title}</h1>
            <p style="color:#64748b;font-size:0.9rem;margin-bottom:1.5rem;">${date} · <a href="${a.categoryPage}">${a.categoryName}</a></p>
            <div class="article-hero-img" style="margin-bottom:1.5rem;border-radius:8px;overflow:hidden;"><img src="${a.img}" alt="${a.imgAlt}" style="width:100%;height:auto;display:block;" width="800" height="400" loading="eager"></div>
            ${a.body}
            <section class="article-comments" id="comments">
                <h3>Comments</h3>
                <div class="comment-list"></div>
                <form class="comment-form" id="commentForm" onsubmit="event.preventDefault(); document.getElementById('commentNote').style.display='block'; this.reset();">
                    <input type="text" name="name" placeholder="Your name" required>
                    <input type="email" name="email" placeholder="Your email" required>
                    <textarea name="comment" placeholder="Your comment..." rows="4" required></textarea>
                    <button type="submit">Post Comment</button>
                </form>
                <p class="comment-note" id="commentNote" style="display:none;">Thanks for your comment! Comments are moderated and will appear after approval.</p>
            </section>
            <p style="font-size:0.85rem;color:#94a3b8;"><em>Disclosure: We may earn a commission when you shop through our links at no extra cost to you.</em></p>
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

for (const a of articles) {
  fs.writeFileSync(path.join(blogsDir, a.file), html(a), 'utf8');
  console.log('Wrote', a.file);
}

const listPath = path.join(blogsDir, 'articles-list.json');
const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
for (const a of articles) {
  list.push({
    brand: {
      titles: [a.title],
      cb: '',
      url: '',
      name: a.categoryName,
      slug: a.category === 'outdoor' ? 'outdoor-furniture' : a.category === 'sport-fashion' ? 'sport-fashion' : a.category
    },
    body: `<p>${a.meta}</p>`,
    date,
    metaDesc: a.meta,
    title: a.title,
    file: a.file
  });
}
fs.writeFileSync(listPath, JSON.stringify(list, null, 4), 'utf8');
console.log('Updated articles-list.json with', articles.length, 'entries');
