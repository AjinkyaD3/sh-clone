const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const appDir = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/app';

let footerNodesCount = 0;
let footerClassCount = 0;
let headerNodesCount = 0;

function check(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            check(fullPath);
        } else if (file === 'content.html') {
            const html = fs.readFileSync(fullPath, 'utf-8');
            const $ = cheerio.load(html, { decodeEntities: false });
            
            // Look for any div that might be a footer or header
            const footers = $('div[class*="footer"]');
            if (footers.length > 0) {
                footerNodesCount++;
                // Let's print the classes of the first one found just to see what it is
                if (footerClassCount < 1) {
                    console.log(`Found a footer in ${fullPath}:`);
                    footers.each((i, el) => {
                        console.log(`  - <${el.name} class="${$(el).attr('class')}">`);
                    });
                    footerClassCount++;
                }
            }
            
            const headers = $('div[class*="header"]');
            if (headers.length > 0) {
                headerNodesCount++;
            }
        }
    }
}
check(appDir);
console.log(`Files with a 'footer' class div: ${footerNodesCount}`);
console.log(`Files with a 'header' class div: ${headerNodesCount}`);
