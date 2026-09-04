const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/app/about-us/content.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

console.log('footer widget area nodes:', $('.fusion-footer-widget-area').length);
console.log('fusion footer nodes:', $('.fusion-footer').length);
