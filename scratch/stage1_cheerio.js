const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const appDir = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/app';
const componentsDir = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components';

if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
}

// 1. Extract Header and Footer
const contentHtmlPath = path.join(appDir, 'content.html');
const originalContent = fs.readFileSync(contentHtmlPath, 'utf-8');

const $ = cheerio.load(originalContent, { decodeEntities: false });

let headerHtml = $.html('.fusion-tb-header');
let footerHtml = $.html('.fusion-tb-footer');

if (!headerHtml || !footerHtml) {
    console.error("Failed to find header or footer in content.html");
    process.exit(1);
}

// 2. Create Header.tsx and Footer.tsx
const headerComponent = `import React from 'react';

export default function Header() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${headerHtml.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}
`;

const footerComponent = `import React from 'react';

export default function Footer() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${footerHtml.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}
`;

fs.writeFileSync(path.join(componentsDir, 'Header.tsx'), headerComponent);
fs.writeFileSync(path.join(componentsDir, 'Footer.tsx'), footerComponent);
console.log("Created components/Header.tsx and components/Footer.tsx");

// 4. Strip out header and footer from all content.html files
function stripSections(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            stripSections(fullPath);
        } else if (file === 'content.html') {
            let html = fs.readFileSync(fullPath, 'utf-8');
            const file$ = cheerio.load(html, { decodeEntities: false });
            
            const fileHeader = file$('.fusion-tb-header');
            const fileFooter = file$('.fusion-tb-footer');
            
            // To ensure we don't mess up the rest of the HTML by using cheerio's $.html() on the whole doc,
            // we will just find the exact string of the elements and string replace it.
            const headerStr = file$.html('.fusion-tb-header');
            const footerStr = file$.html('.fusion-tb-footer');
            
            if (headerStr) {
                html = html.replace(headerStr, '');
            }
            if (footerStr) {
                html = html.replace(footerStr, '');
            }
            
            fs.writeFileSync(fullPath, html);
            console.log(`Stripped ${fullPath}`);
        }
    }
}

stripSections(appDir);
console.log("Completed stripping header and footer from all content.html files.");
