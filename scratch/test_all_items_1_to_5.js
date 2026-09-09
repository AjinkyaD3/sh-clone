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

const patterns = {
  // 1. Page load link
  pll: /<a\b[^>]*class="[^"]*fusion-page-load-link[^"]*"[^>]*>[\s\S]*?<\/a\s*>/gi,
  
  // 2. EDD body script & style
  eddStyle: /<style\b[^>]*>\s*\.edd-js-none[\s\S]*?<\/style\s*>/gi,
  eddScript: /<script\b[^>]*>[\s\S]*?edd-js-none[\s\S]*?<\/script\s*>/gi,
  
  // 3. Rich snippet spans
  richSnippet: /<span\s+class="entry-title\s+rich-snippet-hidden"[\s\S]*?<\/span\s*>\s*<span\s+class="vcard\s+rich-snippet-hidden"[\s\S]*?<\/span\s*>\s*<\/span\s*>\s*<span\s+class="updated\s+rich-snippet-hidden"[\s\S]*?<\/span\s*>/gi,
  
  // 4. Skip link & empty sliders
  skipLink: /<a\s+class="skip-link\s+screen-reader-text"\s+href="#content"\s*>\s*Skip to content\s*<\/a\s*>/gi,
  homeDiv: /<div\s+id="home"\s+style="position:\s*relative;\s*top:\s*-1px;?"\s*>\s*<\/div\s*>/gi,
  sliderContainer: /<div\s+class="fusion-slider-visibility"\s+id="sliders-container"\s*>\s*<\/div\s*>/gi,
  
  // 5. Remote images & links
  remoteUploads: /https?:\/\/(www\.)?secure-house\.co\.uk\/wp-content\/uploads\//gi,
  remoteContact: /https?:\/\/(www\.)?secure-house\.co\.uk\/contact-us\/?/gi
};

const counts = {
  pll: 0,
  eddStyle: 0,
  eddScript: 0,
  richSnippet: 0,
  skipLink: 0,
  homeDiv: 0,
  sliderContainer: 0,
  remoteUploads: 0,
  remoteContact: 0
};

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  
  for (const [key, pat] of Object.entries(patterns)) {
    const matches = content.match(pat) || [];
    counts[key] += matches.length;
  }
}

console.log("=== MATCH COUNTS ACROSS ALL 35 FILES ===");
console.log(counts);
