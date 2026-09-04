const fs = require('fs');
const path = require('path');

const basePath = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/app';
const files = [
    'content.html',
    'doors/content.html',
    'about-us/content.html',
    'contact-us/content.html',
    'windows/content.html'
];

function extractSection(html, tag) {
    const startTag = `<${tag}`;
    const endTag = `</${tag}>`;
    const startIndex = html.indexOf(startTag);
    if (startIndex === -1) return null;
    const endIndex = html.indexOf(endTag, startIndex);
    if (endIndex === -1) return null;
    return html.substring(startIndex, endIndex + endTag.length);
}

function compareSections() {
    const headers = {};
    const footers = {};
    
    for (const file of files) {
        const filePath = path.join(basePath, file);
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filePath}`);
            continue;
        }
        
        const content = fs.readFileSync(filePath, 'utf-8');
        const header = extractSection(content, 'header');
        const footer = extractSection(content, 'footer');
        
        headers[file] = header;
        footers[file] = footer;
    }
    
    // Compare headers
    console.log("--- HEADER COMPARISON ---");
    const headerRef = headers[files[0]];
    let headersIdentical = true;
    for (let i = 1; i < files.length; i++) {
        if (headers[files[i]] !== headerRef) {
            headersIdentical = false;
            console.log(`Header in ${files[i]} differs from ${files[0]}`);
            
            // simple diffing check for length and snippets
            const h1 = headerRef || "";
            const h2 = headers[files[i]] || "";
            if (h1.length !== h2.length) {
                console.log(`  Length difference: ${files[0]} has ${h1.length} chars, ${files[i]} has ${h2.length} chars.`);
            }
            
            // Check for 'current-menu-item' or 'active' classes
            const currentMatch1 = h1.match(/current[-_a-zA-Z0-9]*/g) || [];
            const currentMatch2 = h2.match(/current[-_a-zA-Z0-9]*/g) || [];
            console.log(`  Classes like 'current-*':`);
            console.log(`    ${files[0]}: ${Array.from(new Set(currentMatch1)).join(', ') || 'none'}`);
            console.log(`    ${files[i]}: ${Array.from(new Set(currentMatch2)).join(', ') || 'none'}`);
        }
    }
    if (headersIdentical) {
        console.log("All headers are BYTE-FOR-BYTE IDENTICAL.");
    }
    
    console.log("\n--- FOOTER COMPARISON ---");
    const footerRef = footers[files[0]];
    let footersIdentical = true;
    for (let i = 1; i < files.length; i++) {
        if (footers[files[i]] !== footerRef) {
            footersIdentical = false;
            console.log(`Footer in ${files[i]} differs from ${files[0]}`);
            const f1 = footerRef || "";
            const f2 = footers[files[i]] || "";
            if (f1.length !== f2.length) {
                console.log(`  Length difference: ${files[0]} has ${f1.length} chars, ${files[i]} has ${f2.length} chars.`);
            }
        }
    }
    if (footersIdentical) {
        console.log("All footers are BYTE-FOR-BYTE IDENTICAL.");
    }
}

compareSections();
