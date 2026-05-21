import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Broken Unsplash IDs -> verified working replacements */
const REPLACEMENTS = [
  ['photo-1486312338170-ecf20de8824a', 'photo-1496181133206-80ce9b88a853'],
  ['photo-1574629810360-7dff2c06c2f0', 'photo-1431324155629-1a6deb1dec8d'],
];

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walk(p, acc);
    } else if (/\.(html|mjs|json|css|js)$/i.test(name)) {
      acc.push(p);
    }
  }
  return acc;
}

let filesChanged = 0;
let totalReplacements = 0;

for (const file of walk(root)) {
  if (file.includes(`${path.sep}scripts${path.sep}fix-broken-images.mjs`)) continue;
  let text = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [from, to] of REPLACEMENTS) {
    if (text.includes(from)) {
      const count = text.split(from).length - 1;
      text = text.split(from).join(to);
      totalReplacements += count;
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, text, 'utf8');
    filesChanged++;
    console.log('Fixed', path.relative(root, file));
  }
}

console.log(`Done: ${totalReplacements} replacements in ${filesChanged} files`);
