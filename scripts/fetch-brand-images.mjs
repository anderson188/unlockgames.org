async function fromHtml(url) {
  const r = await fetch(url);
  const t = await r.text();
  const pat = /https:\/\/www\.laifentech\.com\/cdn\/shop\/files\/[^"'\s>]+\.(jpg|jpeg|png|webp)/gi;
  return [...new Set([...t.matchAll(pat)].map((m) => m[0]))];
}

const pages = {
  se2: 'https://www.laifentech.com/products/laifen-se-2-high-speed-hair-dryer',
  swift: 'https://www.laifentech.com/products/laifen-swift-special-high-speed-hair-dryer',
  selite: 'https://www.laifentech.com/products/laifen-se-lite-high-speed-hair-dryer',
  wave: 'https://www.laifentech.com/products/laifen-wave-pro-electric-toothbrush',
  p3: 'https://www.laifentech.com/products/laifen-p3-pro-electric-shaver',
  t1: 'https://www.laifentech.com/products/laifen-t1-pro-electric-shaver',
  mini: 'https://www.laifentech.com/products/laifen-mini-high-speed-hair-dryer',
};
for (const [k, p] of Object.entries(pages)) {
  const imgs = await fromHtml(p);
  console.log(k, imgs[0] || 'none', imgs[1] || '');
}
