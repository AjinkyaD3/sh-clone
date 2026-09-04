const fs = require('fs');
const cheerio = require('cheerio');

const headerCode = fs.readFileSync('c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components/Header.tsx', 'utf-8');

// The HTML is inside a template literal.
// We can extract it by grabbing everything between the backticks.
const startIdx = headerCode.indexOf('`');
const endIdx = headerCode.lastIndexOf('`');
let rawHtml = headerCode.substring(startIdx + 1, endIdx);

// Un-escape backticks and backslashes
rawHtml = rawHtml.replace(/\\`/g, '`').replace(/\\\\/g, '\\').replace(/\\\$/g, '$');

const $ = cheerio.load(rawHtml, { decodeEntities: false });

console.log("--- 1. TRIGGER ELEMENT ---");
// Look for a button or link with text "PRODUCTS" or hamburger classes (like fusion-mobile-menu-icons, etc.)
$('a, button, div').each((i, el) => {
    const text = $(el).text().trim();
    const className = $(el).attr('class') || '';
    if (text.toUpperCase() === 'PRODUCTS' || className.includes('menu-icon') || className.includes('hamburger') || className.includes('flyout')) {
        // limit output
        if ($(el).children().length < 5) {
           console.log(`Potential trigger: <${el.name} class="${className}"> - Text: ${text.substring(0, 30).replace(/\n/g, ' ')}`);
        }
    }
});

console.log("\n--- 2. OFF-CANVAS MENU PANEL ---");
// Look for overlay/off-canvas panel classes
let foundPanel = false;
$('nav, div, ul').each((i, el) => {
    const className = $(el).attr('class') || '';
    if (className.includes('off-canvas') || className.includes('flyout') || className.includes('mobile-menu') || className.includes('mega-menu')) {
        if (!foundPanel) {
            console.log(`Potential panel: <${el.name} class="${className}"> - Children: ${$(el).children().length}`);
            // Let's just print a few to not flood the console
        }
    }
});

console.log("\n--- 3. NAV LINKS (HREFs) ---");
let missingHrefs = [];
let totalLinks = 0;
$('a').each((i, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim().replace(/\n/g, ' ').substring(0, 30);
    const className = $(el).attr('class') || '';
    
    // We only care about nav links, maybe check if inside a menu or has menu classes
    if (className.includes('menu-item') || $(el).parents('ul, nav').length > 0) {
        totalLinks++;
        if (!href || href === '#' || href === '') {
            missingHrefs.push(`Missing href: "${text}" (class: ${className})`);
        }
    }
});

console.log(`Total nav links analyzed: ${totalLinks}`);
console.log(`Links with missing or '#' hrefs: ${missingHrefs.length}`);
if (missingHrefs.length > 0) {
    missingHrefs.forEach(m => console.log(m));
} else {
    console.log("All nav links have valid hrefs!");
}
