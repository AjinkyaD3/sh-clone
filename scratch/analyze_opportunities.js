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

let remoteLinks = 0;
let remoteImages = 0;
let bodyScripts = 0;
let pageLoadLinks = 0;
let richSnippets = 0;
let skipLinks = 0;
let emptySliders = 0;
const sampleRemoteLinks = new Set();
const sampleRemoteImages = new Set();

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  
  // remote links
  const links = content.match(/href="https?:\/\/(www\.)?secure-house\.co\.uk\/[^"]*"/gi) || [];
  remoteLinks += links.length;
  for (const l of links.slice(0, 3)) sampleRemoteLinks.add(l);
  
  // remote images
  const imgs = content.match(/(src|data-orig-src|data-srcset|srcset)="https?:\/\/(www\.)?secure-house\.co\.uk\/[^"]*"/gi) || [];
  remoteImages += imgs.length;
  for (const img of imgs.slice(0, 3)) sampleRemoteImages.add(img);
  
  // body scripts
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    const scripts = bodyMatch[1].match(/<script[\s\S]*?<\/script>/gi) || [];
    bodyScripts += scripts.length;
  }
  
  // page load links
  const pll = content.match(/class="[^"]*fusion-page-load-link[^"]*"/gi) || [];
  pageLoadLinks += pll.length;
  
  // rich snippets
  const rs = content.match(/class="[^"]*rich-snippet-hidden[^"]*"/gi) || [];
  richSnippets += rs.length;
  
  // skip links
  const sl = content.match(/class="[^"]*skip-link[^"]*"/gi) || [];
  skipLinks += sl.length;
  
  // empty sliders
  const es = content.match(/<div class="fusion-slider-visibility" id="sliders-container">\s*<\/div>/gi) || [];
  emptySliders += es.length;
}

console.log("=== REMAINING CLEANUP OPPORTUNITIES ===");
console.log({
  totalHtmlFiles: files.length,
  remoteLinksPointingToOldDomain: remoteLinks,
  remoteImagesPointingToOldDomain: remoteImages,
  scriptsRemainingInBody: bodyScripts,
  deadPageLoadLinks: pageLoadLinks,
  hiddenWpAuthorSnippets: richSnippets,
  redundantSkipLinks: skipLinks,
  emptySliderContainers: emptySliders
});

console.log("\nSample Remote Links:");
console.log(Array.from(sampleRemoteLinks).slice(0, 5));

console.log("\nSample Remote Images:");
console.log(Array.from(sampleRemoteImages).slice(0, 5));
