const fs = require('fs');
const cheerio = require('cheerio');

const headerCode = fs.readFileSync('c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components/Header.tsx', 'utf-8');
const startIdx = headerCode.indexOf('`');
const endIdx = headerCode.lastIndexOf('`');
let rawHtml = headerCode.substring(startIdx + 1, endIdx);
rawHtml = rawHtml.replace(/\\`/g, '`').replace(/\\\\/g, '\\').replace(/\\\$/g, '$');

const $ = cheerio.load(rawHtml, { decodeEntities: false });

console.log("--- 3. NAV LINKS (HREFs) ---");
let i = 1;
$('a').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim().replace(/\n/g, ' ');
    if (href) {
        console.log(`${i++}. [${text.substring(0, 30)}] -> ${href}`);
    }
});

console.log("\n--- MOBILE MENU TRIGGER ---");
$('.awb-menu_mobile-toggle').each((_, el) => {
    console.log(`Mobile toggle classes: ${$(el).attr('class')}`);
});
