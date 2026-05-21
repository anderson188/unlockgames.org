export const IMG = {
  tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
  laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=400&fit=crop',
  work: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=400&fit=crop',
  fashion: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
  beauty: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=400&fit=crop',
  running: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=400&fit=crop',
  gym: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
  football: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop',
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
  luggage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
  patio: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=400&fit=crop',
  gazebo: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800&h=400&fit=crop',
  shop: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
  retail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop',
};

export const SD = 'https://yeahpromos.com/index/index/openurl?track=e8b8263b9e3082e0&amp;url=';

export function paras(...lines) {
  return lines.map((t) => `<p>${t}</p>`).join('\n            ');
}

export function section(title, ...blocks) {
  return `<h2>${title}</h2>\n            ${blocks.join('\n            ')}`;
}

export function faq(...pairs) {
  return `<h2>FAQ</h2>\n            ${pairs.map(([q, a]) => `<p><strong>${q}</strong> ${a}</p>`).join('\n            ')}`;
}

export function takeaways(...items) {
  return `<h2>Key takeaways</h2>\n            <ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
}

export function buildBody(intro, sections, faqPairs, takeawayItems) {
  return `${intro}\n\n            ${sections.join('\n\n            ')}\n\n            ${faq(...faqPairs)}\n\n            ${takeaways(...takeawayItems)}`;
}
