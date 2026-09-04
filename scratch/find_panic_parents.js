const fs = require('fs');
const cheerio = require('cheerio');

const headerCode = fs.readFileSync('c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components/Header.tsx', 'utf-8');
const startIdx = headerCode.indexOf('`');
const endIdx = headerCode.lastIndexOf('`');
let rawHtml = headerCode.substring(startIdx + 1, endIdx);
rawHtml = rawHtml.replace(/\\`/g, '`').replace(/\\\\/g, '\\').replace(/\\\$/g, '$');

const $ = cheerio.load(rawHtml, { decodeEntities: false });

const link = $('a[href="/doors/panic-room-doors/"]');
console.log('Found link count:', link.length);

if (link.length > 0) {
    const parentChain = link.parents().map((i, el) => {
        return el.name + (el.attribs && el.attribs.class ? '.' + el.attribs.class.split(' ').filter(Boolean).join('.') : '');
    }).get().reverse().join(' > ');
    console.log(parentChain);
}
