const fs = require('fs');
const cheerio = require('cheerio');

const headerCode = fs.readFileSync('c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components/Header.tsx', 'utf-8');
const startIdx = headerCode.indexOf('`');
const endIdx = headerCode.lastIndexOf('`');
let rawHtml = headerCode.substring(startIdx + 1, endIdx);
rawHtml = rawHtml.replace(/\\`/g, '`').replace(/\\\\/g, '\\').replace(/\\\$/g, '$');

const $ = cheerio.load(rawHtml, { decodeEntities: false });

console.log('--- LOCATION OF PRODUCTS LINK ---');
const productsLink = $('a').filter((i, el) => $(el).text().trim() === 'Products');
console.log('Href:', productsLink.attr('href'));

console.log('--- LOCATION OF PANIC ROOM DOOR ---');
const panicLink = $('a:contains("Panic room door")');
if (panicLink.length > 0) {
    const classes = panicLink.parents().map((i, el) => el.name + '.' + ($(el).attr('class') || '').replace(/ /g, '.')).get().reverse().join(' > ');
    console.log(classes);
} else {
    console.log('Not found in Header.tsx');
}
