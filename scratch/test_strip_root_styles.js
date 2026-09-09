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

const files = findHtmlFiles('app');

const stylesToRemove = [
  /<style\b[^>]*id="wp-img-auto-sizes-contain-inline-css"[^>]*>[\s\S]*?<\/style\s*>/gi,
  /<style\b[^>]*id="global-styles-inline-css"[^>]*>[\s\S]*?<\/style\s*>/gi,
  /<style\b[^>]*id="css-fb-visibility"[^>]*>[\s\S]*?<\/style\s*>/gi,
  /<style\b[^>]*id="wp-custom-css"[^>]*>[\s\S]*?<\/style\s*>/gi,
  /<style\b[^>]*id="wpo_min-header-0-css"[^>]*>[\s\S]*?<\/style\s*>/gi
];

let totalOriginalSize = 0;
let totalNewSize = 0;
let matchCounts = {};

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  totalOriginalSize += content.length;
  
  for (const pat of stylesToRemove) {
    const m = content.match(pat);
    if (m) {
      matchCounts[pat.source] = (matchCounts[pat.source] || 0) + m.length;
      content = content.replace(pat, '');
    }
  }
  
  // If it's homepage, add the link to homepage-styles.css
  if (f === path.join('app', 'content.html')) {
    content = content.replace(
      '</head>',
      '  <link href="/legacy-assets/css/homepage-styles.css" id="homepage-styles-css" media="all" rel="stylesheet" />\n  </head>'
    );
  }
  
  totalNewSize += content.length;
}

console.log("=== REMOVAL TEST RESULTS ===");
console.log("Match counts:", matchCounts);
console.log(`Original total size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`New total size:      ${(totalNewSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Total saved:         ${((totalOriginalSize - totalNewSize) / 1024).toFixed(1)} KB`);
