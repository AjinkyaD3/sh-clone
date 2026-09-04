const fs = require('fs');
const cheerio = require('cheerio');

const headerCode = fs.readFileSync('c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components/Header.tsx', 'utf-8');
const startIdx = headerCode.indexOf('`');
const endIdx = headerCode.lastIndexOf('`');
let rawHtml = headerCode.substring(startIdx + 1, endIdx);
rawHtml = rawHtml.replace(/\\`/g, '`').replace(/\\\\/g, '\\').replace(/\\\$/g, '$');

const $ = cheerio.load(rawHtml, { decodeEntities: false });

const link = $('a[href="#awb-oc__1349"]').first();
if (link.length > 0) {
    const parentChain = link.parents().map((i, el) => {
        return el.name + (el.attribs && el.attribs.class ? '.' + el.attribs.class.split(' ').filter(Boolean).join('.') : '');
    }).get().reverse().join(' > ');
    console.log("Products button parent chain:");
    console.log(parentChain);
}

// Compare with the menu parent chain
const menuLink = $('a[href="/doors/panic-room-doors/"]').first();
if (menuLink.length > 0) {
    const parentChain = menuLink.parents().map((i, el) => {
        return el.name + (el.attribs && el.attribs.class ? '.' + el.attribs.class.split(' ').filter(Boolean).join('.') : '');
    }).get().reverse().join(' > ');
    console.log("\nMenu link parent chain:");
    console.log(parentChain);
}
