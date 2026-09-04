const fs = require('fs');
const cheerio = require('cheerio');

const headerPath = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components/Header.tsx';
let headerCode = fs.readFileSync(headerPath, 'utf-8');

const htmlStartStr = '<div class="fusion-tb-header">';
const startIdx = headerCode.indexOf(htmlStartStr);
if (startIdx === -1) {
    console.error("Could not find start of html string.");
    process.exit(1);
}

const backtickStartIdx = headerCode.lastIndexOf('`', startIdx);
// Find the closing backtick for THIS specific HTML block (which is the last backtick in the file, most likely)
// But to be safe, find ` }}` after startIdx
const closingBracesIdx = headerCode.indexOf('}}', startIdx);
const backtickEndIdx = headerCode.lastIndexOf('`', closingBracesIdx);

let rawHtml = headerCode.substring(backtickStartIdx + 1, backtickEndIdx);
rawHtml = rawHtml.replace(/\\`/g, '`').replace(/\\\\/g, '\\').replace(/\\\$/g, '$');

const $ = cheerio.load(rawHtml, { decodeEntities: false }, false);

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
            if (key.startsWith('--')) {
                obj[key] = value;
            } else {
                let camelKey = key.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                obj[camelKey] = value;
            }
        }
    }
    return JSON.stringify(obj) + " as any";
}

function domToJsx(node, indent = '') {
    if (node.type === 'text') {
        const text = node.data.trim();
        if (!text) return '';
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
            else if (key === 'srcset') reactKey = 'srcSet';
            else if (key === 'd') reactKey = 'd';
            else if (key === 'viewbox') reactKey = 'viewBox';
            else if (key === 'xmlns') reactKey = 'xmlns';
            
            if (reactKey !== 'data-' && reactKey !== 'aria-' && reactKey.includes('-') && !reactKey.startsWith('data-') && !reactKey.startsWith('aria-')) {
                 reactKey = reactKey.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
            }

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
    const res = domToJsx(node, '\t\t\t\t');
    if (res) jsxContent += res + '\n';
}

const regex = /dangerouslySetInnerHTML=\{\{\s*__html:\s*`<div class="fusion-tb-header">[\s\S]*?`\s*\}\}\s*\/>/;
const match = headerCode.match(regex);

if (match) {
    const newHeaderCode = headerCode.replace(regex, `>\n${jsxContent}\t\t\t</div>`);
    fs.writeFileSync(headerPath, newHeaderCode);
    console.log("Converted Header.tsx to JSX safely.");
} else {
    console.log("Regex failed to match. Trying fallback...");
    // Fallback manual replacement
    const beforeHtml = headerCode.substring(0, backtickStartIdx);
    const afterHtml = headerCode.substring(backtickEndIdx + 1);
    
    // Clean up the `dangerouslySetInnerHTML={{ __html: ` part
    const cleanBefore = beforeHtml.replace(/dangerouslySetInnerHTML=\{\{\s*__html:\s*$/m, '>');
    // Clean up the `}} />` part
    const cleanAfter = afterHtml.replace(/^\s*\}\}\s*\/>/m, '\n\t\t\t</div>');
    
    fs.writeFileSync(headerPath, cleanBefore + '\n' + jsxContent + cleanAfter);
    console.log("Converted Header.tsx to JSX safely using fallback.");
}
