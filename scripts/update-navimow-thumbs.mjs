import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const blogsDir = path.join(root, 'blogs');

const W = (u) => `${u}${u.includes('?') ? '&' : '?'}w=640&h=360&fit=crop`;

const thumbs = {
  'blog-navimow-worth-it-2026.html': {
    src: 'https://navimow.segway.com/cdn/shop/files/Full_Brand_Product_Family_Photo.jpg?width=640',
    alt: 'Segway Navimow robot mower product family',
  },
  'blog-navimow-choose-lawn-size.html': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Firefly_autonomous_lawn_mowers_at_a_golf_course.jpg/960px-Firefly_autonomous_lawn_mowers_at_a_golf_course.jpg',
    alt: 'Large lawn with autonomous mowers on golf course',
  },
  'blog-navimow-i-vs-x-vs-h.html': {
    src: 'https://navimow.segway.com/cdn/shop/files/4_e690241f-68af-4e7c-af1e-bcec393e4dd0.jpg?width=640',
    alt: 'Navimow i X H series robot mowers',
  },
  'blog-navimow-wire-free-mowers.html': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Robot_mower_in_garden.jpg/960px-Robot_mower_in_garden.jpg',
    alt: 'Wire-free robot mower working in home garden',
  },
  'blog-navimow-network-rtk.html': {
    src: W('https://images.pexels.com/photos/23769/pexels-photo.jpg'),
    alt: 'Satellite positioning and GPS technology',
  },
  'blog-navimow-lidar-vs-awd.html': {
    src: W('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'),
    alt: 'Sloped garden terrain for robot mower traction',
  },
  'blog-navimow-summer-lawn-care.html': {
    src: W('https://images.unsplash.com/photo-1625246333195-78d9c38ad449'),
    alt: 'Green summer lawn in sunlight',
  },
  'blog-navimow-best-time-to-buy.html': {
    src: W('https://images.unsplash.com/photo-1560185127-6ed189bf02f4'),
    alt: 'Spring garden ready for mower setup season',
  },
  'blog-navimow-accessories-guide.html': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Stihl_robot_mower.jpg/960px-Stihl_robot_mower.jpg',
    alt: 'Robot mower with garage and accessories',
  },
  'blog-navimow-maintenance-calendar.html': {
    src: W('https://images.unsplash.com/photo-1617806118233-18e1de247200'),
    alt: 'Garden tools and lawn mower maintenance',
  },
  'blog-editorial-backyard-shade-zones.html': {
    src: W('https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg'),
    alt: 'Backyard shade and patio planning',
  },
};

// verify pexels satellite
const test = await fetch(thumbs['blog-navimow-network-rtk.html'].src, { method: 'HEAD' });
if (test.status !== 200) {
  thumbs['blog-navimow-network-rtk.html'].src = W('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae');
}

const old = 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=640&h=360&fit=crop';
const oldHero = 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800&h=400&fit=crop';

// category page
let cat = fs.readFileSync(path.join(blogsDir, 'category-outdoor-furniture.html'), 'utf8');
for (const [file, { src, alt }] of Object.entries(thumbs)) {
  const re = new RegExp(
    `(href="${file}" class="category-mag-thumb-link"><img class="category-mag-thumb" src=")[^"]+(" alt=")[^"]*(" width="640")`,
    'g'
  );
  cat = cat.replace(re, `$1${src}$2${alt}$3`);
}
fs.writeFileSync(path.join(blogsDir, 'category-outdoor-furniture.html'), cat);

// blog hero images
for (const [file, { src, alt }] of Object.entries(thumbs)) {
  if (!file.startsWith('blog-navimow')) continue;
  const fp = path.join(blogsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const heroSrc = src.includes('width=640')
    ? src.replace('width=640', 'width=800').replace('w=640&h=360', 'w=800&h=400')
    : src.replace('960px-', '1280px-').replace('/640px-', '/1280px-');
  html = html.replace(oldHero, heroSrc);
  if (html.includes(oldHero)) {
    html = html.replace(
      /<div class="article-hero-img"[^>]*><img src="[^"]+" alt="[^"]*"/,
      `<div class="article-hero-img" style="margin-bottom:1.5rem;border-radius:8px;overflow:hidden;"><img src="${heroSrc}" alt="${alt}"`
    );
  } else {
    html = html.replace(/(article-hero-img[^>]*><img src=")[^"]+(" alt=")[^"]*(")/, `$1${heroSrc}$2${alt}$3`);
  }
  fs.writeFileSync(fp, html);
}

// index.html outdoor section thumbs
let index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const indexMap = [
  ['blog-navimow-worth-it-2026.html', thumbs['blog-navimow-worth-it-2026.html']],
  ['blog-navimow-choose-lawn-size.html', thumbs['blog-navimow-choose-lawn-size.html']],
  ['blog-navimow-i-vs-x-vs-h.html', thumbs['blog-navimow-i-vs-x-vs-h.html']],
];
for (const [href, { src, alt }] of indexMap) {
  const blockRe = new RegExp(
    `(<a href="blogs/${href.replace('.html', '\\.html')}"[\\s\\S]*?<img src=")[^"]+(" alt=")[^"]*(" width="120")`,
  );
  index = index.replace(blockRe, `$1${src.replace('960px', '320px').replace('width=640', 'width=120').replace('w=640&h=360&fit=crop', 'w=120&h=80&fit=crop')}$2${alt}$3`);
}
index = index.replaceAll(old.replace('640', '120').replace('360', '80'), thumbs['blog-navimow-worth-it-2026.html'].src.replace('width=640', 'width=120').replace('w=640&h=360&fit=crop', 'w=120&h=80&fit=crop'));
fs.writeFileSync(path.join(root, 'index.html'), index);

console.log('Updated category-outdoor-furniture.html,', Object.keys(thumbs).filter((f) => f.startsWith('blog-navimow')).length, 'blog heroes, index thumbs');
