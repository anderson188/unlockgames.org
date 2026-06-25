import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'blogs', 'images', 'travel');

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svg'));

for (const svg of files) {
  const base = svg.replace('.svg', '');
  const src = path.join(dir, svg);
  const jpgOut = path.join(dir, `${base}.jpg`);
  await sharp(src).jpeg({ quality: 85, mozjpeg: true }).toFile(jpgOut);
  const kb = Math.round(fs.statSync(jpgOut).size / 1024);
  console.log(`${base}.jpg ${kb}KB`);
}

console.log('Done');
