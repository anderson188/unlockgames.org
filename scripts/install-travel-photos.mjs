import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const travelDir = path.join(__dirname, '..', 'blogs', 'images', 'travel');
const assetsDir = path.join(
  process.env.USERPROFILE || '',
  '.cursor',
  'projects',
  'c-Users-linda-Desktop-vscode-space-new-unlockgames-unlockgames-org',
  'assets'
);
const agodaDir = path.join(__dirname, '..', 'blogs', 'images', 'agoda');

const W = 1120;
const H = 630;

/** @type {Record<string, string>} outputName -> source path */
const map = {
  'trip-com-cover.jpg': path.join(assetsDir, 'trip-com-booking.jpg'),
  'trip-com-japan-korea.jpg': path.join(assetsDir, 'trip-com-japan-tokyo.jpg'),
  'trip-com-korea.jpg': path.join(assetsDir, 'trip-com-korea-seoul.jpg'),
  'hotels-com-cover.jpg': path.join(assetsDir, 'hotels-com-room.jpg'),
  'hotels-com-rewards.jpg': path.join(assetsDir, 'hotels-com-lobby.jpg'),
  'expedia-sg-cover.jpg': path.join(assetsDir, 'expedia-sg-marina.jpg'),
  'expedia-bundle.jpg': path.join(assetsDir, 'expedia-flight-hotel.jpg'),
  'kkday-cover.jpg': path.join(assetsDir, 'kkday-taiwan-jiufen.jpg'),
  'kkday-japan.jpg': path.join(assetsDir, 'kkday-japan-osaka.jpg'),
  'kkday-korea.jpg': path.join(assetsDir, 'kkday-korea-seoul-food.jpg'),
};

// Fallback: reuse Agoda photos if asset missing
const fallbacks = {
  'trip-com-japan-korea.jpg': path.join(agodaDir, 'japan-hotel-cover.jpg'),
  'trip-com-korea.jpg': path.join(agodaDir, 'korea-discover-hidden-korea.jpg'),
};

fs.mkdirSync(travelDir, { recursive: true });

for (const [outName, src] of Object.entries(map)) {
  let input = fs.existsSync(src) ? src : fallbacks[outName];
  if (!input || !fs.existsSync(input)) {
    console.warn('SKIP', outName, '- source not found');
    continue;
  }
  const out = path.join(travelDir, outName);
  const pos = outName.includes('korea-discover') ? 'right' : 'centre';
  await sharp(input)
    .resize(W, H, { fit: 'cover', position: pos })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log(outName, Math.round(fs.statSync(out).size / 1024) + 'KB', '<-', path.basename(input));
}

// Remove old SVG placeholders
for (const f of fs.readdirSync(travelDir)) {
  if (f.endsWith('.svg')) {
    fs.unlinkSync(path.join(travelDir, f));
    console.log('removed', f);
  }
}

console.log('Travel covers ready.');
