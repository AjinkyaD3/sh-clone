const fs = require('fs');

const pages = [
  'app/content.html',
  'app/about-us/content.html',
  'app/doors/content.html',
  'app/projects/content.html',
  'app/contact-us/content.html'
];

function extractStyle(content, id) {
  const m = content.match(new RegExp(`<style[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/style>`, 'i'));
  return m ? m[1].trim() : null;
}

for (const id of ['wp-img-auto-sizes-contain-inline-css', 'global-styles-inline-css', 'css-fb-visibility', 'wp-custom-css']) {
  console.log(`=== CHECKING ${id} ===`);
  const samples = [];
  for (const p of pages) {
    const s = extractStyle(fs.readFileSync(p, 'utf8'), id);
    samples.push({ page: p, length: s ? s.length : 0 });
  }
  console.log(samples);
}
