const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const appDir = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/app';

let headerCountBefore = 0;
let footerCountBefore = 0;
let headerCountAfter = 0;
let footerCountAfter = 0;

function processFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processFiles(fullPath);
        } else if (file === 'content.html') {
            let html = fs.readFileSync(fullPath, 'utf-8');

            // Count Before
            if (html.includes('fusion-tb-header')) headerCountBefore++;
            if (html.includes('fusion-tb-footer')) footerCountBefore++;

            // If either exists, remove using Cheerio
            if (html.includes('fusion-tb-header') || html.includes('fusion-tb-footer')) {
                // Cheerio parsing
                const $ = cheerio.load(html, { decodeEntities: false });

                // Remove elements
                $('.fusion-tb-header').remove();
                $('.fusion-tb-footer').remove();

                // Write back
                const newHtml = $.html();
                fs.writeFileSync(fullPath, newHtml, 'utf-8');

                // Verify after
                const verifyHtml = fs.readFileSync(fullPath, 'utf-8');
                if (verifyHtml.includes('fusion-tb-header')) headerCountAfter++;
                if (verifyHtml.includes('fusion-tb-footer')) footerCountAfter++;
            }
        }
    }
}

console.log("Starting removal...");
processFiles(appDir);
console.log(`BEFORE: Headers=${headerCountBefore}, Footers=${footerCountBefore}`);
console.log(`AFTER:  Headers=${headerCountAfter}, Footers=${footerCountAfter}`);

if (headerCountAfter === 0 && footerCountAfter === 0) {
    console.log("SUCCESS: All duplicates removed.");
} else {
    console.log("ERROR: Some duplicates remained.");
}
