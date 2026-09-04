const fs = require('fs');
const cheerio = require('cheerio');

const footerPath = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components/Footer.tsx';
let footerCode = fs.readFileSync(footerPath, 'utf-8');

const startIdx = footerCode.indexOf('`');
const endIdx = footerCode.lastIndexOf('`');
let rawHtml = footerCode.substring(startIdx + 1, endIdx);
// Un-escape if needed, but usually not needed for footer
rawHtml = rawHtml.replace(/\\`/g, '`').replace(/\\\\/g, '\\').replace(/\\\$/g, '$');

const $ = cheerio.load(rawHtml, { decodeEntities: false });

function styleToObject(styleStr) {
    if (!styleStr) return '{}';
    const obj = {};
    const parts = styleStr.split(';');
    for (let part of parts) {
        if (!part.trim()) continue;
        let colonIdx = part.indexOf(':');
        if (colonIdx > -1) {
            let key = part.substring(0, colonIdx).trim();
            let value = part.substring(colonIdx + 1).trim();
            // In React, CSS custom properties (variables) like --my-var remain as-is in quotes.
            // Regular CSS properties need to be camelCased, but let's see if we have any.
            if (key.startsWith('--')) {
                obj[key] = value;
            } else {
                // Camelcase
                let camelKey = key.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                obj[camelKey] = value;
            }
        }
    }
    return JSON.stringify(obj);
}

function domToJsx(node, indent = '') {
    if (node.type === 'text') {
        const text = node.data.trim();
        if (!text) return '';
        // Escape braces and brackets for JSX
        return indent + text.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
    }
    
    if (node.type === 'comment') {
        return indent + `{/* ${node.data.replace(/\/\*/g, '').replace(/\*\//g, '')} */}`;
    }
    
    if (node.type === 'tag') {
        let attrsStr = '';
        for (const [key, val] of Object.entries(node.attribs)) {
            let reactKey = key;
            if (key === 'class') reactKey = 'className';
            else if (key === 'for') reactKey = 'htmlFor';
            else if (key === 'autocomplete') reactKey = 'autoComplete';
            else if (key === 'readonly') reactKey = 'readOnly';
            else if (key === 'enctype') reactKey = 'encType';
            else if (key === 'tabindex') reactKey = 'tabIndex';
            else if (key === 'stroke-width') reactKey = 'strokeWidth';
            else if (key === 'fill-rule') reactKey = 'fillRule';
            else if (key === 'clip-rule') reactKey = 'clipRule';
            
            if (key === 'style') {
                attrsStr += ` style={${styleToObject(val)}}`;
            } else {
                attrsStr += ` ${reactKey}="${val.replace(/"/g, '&quot;')}"`;
            }
        }
        
        const selfClosing = ['img', 'br', 'hr', 'input', 'meta', 'link', 'path'].includes(node.name);
        if (selfClosing) {
            return indent + `<${node.name}${attrsStr} />`;
        }
        
        let childrenStr = '';
        if (node.children && node.children.length > 0) {
            for (const child of node.children) {
                const childJsx = domToJsx(child, indent + '  ');
                if (childJsx) {
                    childrenStr += '\n' + childJsx;
                }
            }
        }
        
        if (childrenStr) {
            return indent + `<${node.name}${attrsStr}>${childrenStr}\n${indent}</${node.name}>`;
        } else {
            return indent + `<${node.name}${attrsStr}></${node.name}>`;
        }
    }
    
    return '';
}

const rootNodes = $.root().children().toArray();
let jsxContent = '';
for (const node of rootNodes) {
    const res = domToJsx(node, '\t\t');
    if (res) jsxContent += res + '\n';
}

const newFooterCode = `import React from 'react';

export default function Footer() {
\treturn (
${jsxContent}\t);
}
`;

fs.writeFileSync(footerPath, newFooterCode);
console.log("Converted Footer.tsx to JSX.");
