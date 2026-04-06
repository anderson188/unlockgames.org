import fs from 'fs';
import path from 'path';

const files = [
  'blogs/blog-oliveyoung-4.html',
  'blogs/blog-oliveyoung-5.html',
  'blogs/blog-oliveyoung-6.html',
  'blogs/blog-plaud-4.html',
  'blogs/blog-plaud-5.html',
  'blogs/blog-plaud-6.html',
];

const topup = `
            <h2>Final optimization notes for buyers and operators</h2>
            <p>If you want consistently strong outcomes, add one final rule: no purchase without an explicit rollback path. For retail items, that means return clarity and product-condition verification. For tech workflows, that means clear migration, export, and support paths. Rollback planning protects execution quality because it removes fear-based urgency and enables objective comparison.</p>
            <p>Also define decision latency standards. For routine purchases, decide within 24 hours using your template. For strategic purchases, allow 48 to 72 hours and include a second review pass. This timing discipline prevents both overthinking and impulsive checkout behavior. As your process matures, decisions become faster while quality improves.</p>
            <p>At the end of each month, run a short retrospective: what worked, what failed, and what rule needs adjustment. Keep the system simple, measurable, and repeatable. The long-term edge is not finding one perfect deal; it is building a decision engine that keeps producing better outcomes with less effort.</p>
`;

for (const f of files) {
  const full = path.resolve(f);
  let html = fs.readFileSync(full, 'utf8');
  if (html.includes('Final optimization notes for buyers and operators')) continue;
  html = html.replace(/<section class="article-comments" id="comments">/, `${topup}\n            <section class="article-comments" id="comments">`);
  fs.writeFileSync(full, html, 'utf8');
}

console.log('Topped up batch-2 content.');
