import fs from 'fs';
import path from 'path';

function seeded(i) {
  return 1000 + ((i * 48271) % 99005);
}

for (let i = 1; i <= 20; i += 1) {
  const p = path.join('blogs', `blog-saas-${i}.html`);
  let s = fs.readFileSync(p, 'utf8');
  const views = seeded(i).toLocaleString('en-US');
  s = s.replace(
    /<p style="color:#64748b;font-size:0\.9rem;margin-bottom:1\.5rem;">(\d{4}-\d{2}-\d{2})(?:[\s\S]*?)<\/p>/,
    `<p style="color:#64748b;font-size:0.9rem;margin-bottom:1.5rem;">$1 &nbsp;&middot;&nbsp; <span aria-label="views">&#128065; ${views}</span></p>`
  );
  fs.writeFileSync(p, s, 'utf8');
}

console.log('Added view counts to blog-saas-1..20');
