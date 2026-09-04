const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/app/content.html', 'utf-8');
const $ = cheerio.load(html);

console.log("Children of body:");
$('body').children().each((i, el) => {
    console.log(`- <${el.tagName}> id="${el.attribs.id || ''}" class="${el.attribs.class || ''}"`);
});

const headerNodes = $('.fusion-tb-header');
console.log(`Found ${headerNodes.length} .fusion-tb-header`);

const footerNodes = $('.fusion-tb-footer');
console.log(`Found ${footerNodes.length} .fusion-tb-footer`);
