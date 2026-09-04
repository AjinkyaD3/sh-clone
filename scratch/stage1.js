const fs = require('fs');
const path = require('path');

const appDir = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/app';
const componentsDir = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components';

if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
}

// 1. Extract Header and Footer
const contentHtmlPath = path.join(appDir, 'content.html');
const originalContent = fs.readFileSync(contentHtmlPath, 'utf-8');

function extractSection(html, tag) {
    const startTag = `<${tag}`;
    const endTag = `</${tag}>`;
    const startIndex = html.indexOf(startTag);
    if (startIndex === -1) return null;
    const endIndex = html.indexOf(endTag, startIndex);
    if (endIndex === -1) return null;
    return html.substring(startIndex, endIndex + endTag.length);
}

const headerHtml = extractSection(originalContent, 'header');
const footerHtml = extractSection(originalContent, 'footer');

if (!headerHtml || !footerHtml) {
    console.error("Failed to find header or footer in content.html");
    process.exit(1);
}

// 2. Create Header.tsx and Footer.tsx
const headerComponent = `import React from 'react';

export default function Header() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${headerHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}
`;

const footerComponent = `import React from 'react';

export default function Footer() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${footerHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
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
            const h = extractSection(html, 'header');
            const f = extractSection(html, 'footer');
            if (h) {
                html = html.replace(h, '');
            }
            if (f) {
                html = html.replace(f, '');
            }
            fs.writeFileSync(fullPath, html);
            console.log(`Stripped ${fullPath}`);
        }
    }
}

stripSections(appDir);
console.log("Completed stripping header and footer from all content.html files.");
