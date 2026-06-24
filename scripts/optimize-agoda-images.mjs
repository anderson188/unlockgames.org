import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'blogs', 'images', 'agoda');

const files = [
  'hk-hotel-cover.png',
  'tw-hotel-cover.png',
  'japan-hotel-cover.png',
  'korea-discover-hidden-korea.png',
];

const CARD_W = 1120;
const CARD_H = 630;

for (const name of files) {
  const src = path.join(dir, name);
  if (!fs.existsSync(src)) {
    console.warn('skip missing', name);
    continue;
  }
  const base = name.replace(/\.(png|jpg|webp)$/i, '');
  const jpgOut = path.join(dir, `${base}.jpg`);
  const webpOut = path.join(dir, `${base}.webp`);

  await sharp(src)
    .resize(CARD_W, CARD_H, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(jpgOut);

  await sharp(src)
    .resize(CARD_W, CARD_H, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(webpOut);

  const jpgKb = Math.round(fs.statSync(jpgOut).size / 1024);
  const webpKb = Math.round(fs.statSync(webpOut).size / 1024);
  const srcKb = Math.round(fs.statSync(src).size / 1024);
  console.log(`${base}: ${srcKb}KB -> jpg ${jpgKb}KB, webp ${webpKb}KB`);
}

console.log('Done. Use .webp in HTML with .jpg fallback or .jpg only for max compatibility.');
