const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) results = results.concat(findHtmlFiles(fullPath));
    else if (file === 'content.html') results.push(fullPath);
  }
  return results;
}

const backupDir = path.join('scratch', 'backup_before_items_1_to_5');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const files = findHtmlFiles('app');

const patterns = [
  // 1. Page load link
  {
    name: 'page-load-link',
    regex: /<a\b[^>]*class="[^"]*fusion-page-load-link[^"]*"[^>]*>[\s\S]*?<\/a\s*>/gi,
    replacement: ''
  },
  // 2. EDD body style & script
  {
    name: 'edd-style',
    regex: /<style\b[^>]*>\s*\.edd-js-none[\s\S]*?<\/style\s*>/gi,
    replacement: ''
  },
  {
    name: 'edd-script',
    regex: /<script\b[^>]*>[\s\S]*?edd-js-none[\s\S]*?<\/script\s*>/gi,
    replacement: ''
  },
  // 3. Rich snippet hidden spans
  {
    name: 'rich-snippets',
    regex: /<span\s+class="entry-title\s+rich-snippet-hidden"[\s\S]*?<\/span\s*>\s*<span\s+class="vcard\s+rich-snippet-hidden"[\s\S]*?<\/span\s*>\s*<\/span\s*>\s*<span\s+class="updated\s+rich-snippet-hidden"[\s\S]*?<\/span\s*>/gi,
    replacement: ''
  },
  // 4. Skip link, home anchor div, and empty slider container
  {
    name: 'skip-link',
    regex: /<a\s+class="skip-link\s+screen-reader-text"\s+href="#content"\s*>\s*Skip to content\s*<\/a\s*>/gi,
    replacement: ''
  },
  {
    name: 'home-div',
    regex: /<div\s+id="home"\s+style="position:\s*relative;\s*top:\s*-1px;?"\s*>\s*<\/div\s*>/gi,
    replacement: ''
  },
  {
    name: 'slider-container',
    regex: /<div\s+class="fusion-slider-visibility"\s+id="sliders-container"\s*>\s*<\/div\s*>/gi,
    replacement: ''
  },
  // 5. Remote uploads & contact links
  {
    name: 'remote-uploads',
    regex: /https?:\/\/(www\.)?secure-house\.co\.uk\/wp-content\/uploads\//gi,
    replacement: '/legacy-assets/uploads/'
  },
  {
    name: 'remote-contact',
    regex: /https?:\/\/(www\.)?secure-house\.co\.uk\/contact-us\/?/gi,
    replacement: '/contact-us'
  }
];

let totalOriginalSize = 0;
let totalCleanedSize = 0;

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  totalOriginalSize += content.length;
  
  // Backup file
  const safeName = f.replace(/[\/\\]/g, '_');
  fs.writeFileSync(path.join(backupDir, safeName), content, 'utf8');
  
  for (const p of patterns) {
    content = content.replace(p.regex, p.replacement);
  }
  
  totalCleanedSize += content.length;
  fs.writeFileSync(f, content, 'utf8');
}

console.log("=== CLEANUP OF ITEMS 1 TO 5 COMPLETE ===");
console.log(`Original total size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Cleaned total size:  ${(totalCleanedSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Total bytes removed: ${totalOriginalSize - totalCleanedSize} bytes`);
