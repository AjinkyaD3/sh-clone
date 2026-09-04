const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const appDir = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/app';

let headerNodes = 0;
let footerNodes = 0;

function verify(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            verify(fullPath);
        } else if (file === 'content.html') {
            const html = fs.readFileSync(fullPath, 'utf-8');
            const $ = cheerio.load(html, { decodeEntities: false });
            headerNodes += $('.fusion-tb-header').length;
            footerNodes += $('.fusion-tb-footer').length;
        }
    }
}
verify(appDir);
console.log(`Final count of header DOM nodes across all files: ${headerNodes}`);
console.log(`Final count of footer DOM nodes across all files: ${footerNodes}`);
