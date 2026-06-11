async function imgs(url) {
  const t = await (await fetch(url)).text();
  const p = /https:\/\/(?:navimow\.segway\.com\/cdn\/shop\/files\/[^"'\s>]+\.(jpg|jpeg|png|webp)|images\.unsplash\.com\/photo-[^"'\s>?]+\.(jpg|jpeg))/gi;
  return [...new Set([...t.matchAll(p)].map((m) => m[0]))];
}

const pages = [
  'https://navimow.segway.com/',
  'https://navimow.segway.com/products/navimow-i2-awd',
  'https://navimow.segway.com/products/navimow-x315',
  'https://navimow.segway.com/products/navimow-h210',
  'https://navimow.segway.com/products/navimow-i2-lidar',
];
const all = [];
for (const u of pages) {
  try {
    const list = await imgs(u);
    console.log(u, list.length);
    list.forEach((x) => console.log(' ', x));
    all.push(...list);
  } catch (e) {
    console.log(u, e.message);
  }
}
console.log('UNIQUE', [...new Set(all)].length);
