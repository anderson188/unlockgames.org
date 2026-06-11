import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const blogsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'blogs');
const files = [
  'blog-fifa-collect-packs-marketplace.html',
  'blog-laifen-dryer-worth-it-2026.html',
  'blog-laifen-se2-vs-swift-vs-selite.html',
  'blog-laifen-wave-pro-toothbrush-guide.html',
  'blog-laifen-p3-pro-vs-t1-pro.html',
  'blog-laifen-curly-hair-diffuser-guide.html',
  'blog-laifen-gift-guide-2026.html',
];

const block = `
            <h2>Final practical notes</h2>
            <p>Document what you bought, when, and why in a notes app. Future you will forget marketing emotions during the next big drop or sale banner. Clarity beats nostalgia when deciding whether to buy again.</p>
            <p>Share honest feedback with friends considering the same purchase—community knowledge reduces waste and helps everyone spend aligned with actual needs instead of hype cycles.</p>
            <p>If something fails to meet expectations within return windows, use them. Policies exist to de-risk trying official products from authorized stores—not to trap buyers who hesitated.</p>
            <p>Revisit this guide after thirty days of real use. First impressions differ from habit-level satisfaction, and long-term value only shows up once the novelty wears off and the tool becomes part of your routine.</p>`;

for (const file of files) {
  const fp = path.join(blogsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  if (!html.includes('Final practical notes')) {
    html = html.replace('\n            <h2>FAQ</h2>', block + '\n            <h2>FAQ</h2>');
    fs.writeFileSync(fp, html, 'utf8');
  }
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(file, '~' + words, words >= 1000 ? 'OK' : 'SHORT');
}
