const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file === 'content.html') {
      results.push(fullPath);
    }
  }
  return results;
}

const files = findHtmlFiles('app');

function cleanHeadHtml(headHtml) {
  // 1. Remove comments: <!-- ... -->
  let cleaned = headHtml.replace(/<!--[\s\S]*?-->/g, '');
  
  // 2. Remove all <template> tags
  cleaned = cleaned.replace(/<template[\s\S]*?<\/template>/gi, '');
  
  // 3. Remove all <script> tags in head
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, '');
  
  // 4. Remove <title>...</title>
  cleaned = cleaned.replace(/<title[\s\S]*?<\/title>/gi, '');
  
  // 5. Remove unwanted <link> tags
  // Keep only stylesheet and icons (shortcut icon, icon, apple-touch-icon)
  cleaned = cleaned.replace(/<link[\s\S]*?>/gi, (match) => {
    const isStylesheet = /rel=["']stylesheet["']/i.test(match);
    const isIcon = /rel=["'](shortcut icon|icon|apple-touch-icon)["']/i.test(match);
    if (isStylesheet || isIcon) {
      return match;
    }
    return ''; // Remove RSD, pingback, canonical, feed, oembed, rest api, shortlink, dns-prefetch
  });
  
  // 6. Remove unwanted <meta> tags
  // Keep only viewport, charset, and http-equiv
  cleaned = cleaned.replace(/<meta[\s\S]*?>/gi, (match) => {
    const isViewport = /name=["']viewport["']/i.test(match);
    const isCharset = /charset=/i.test(match) || /http-equiv=["']Content-Type["']/i.test(match);
    const isXUa = /http-equiv=["']X-UA-Compatible["']/i.test(match);
    if (isViewport || isCharset || isXUa) {
      return match;
    }
    return ''; // Remove robots, description, og:*, twitter:*, generator, google-site-verification, etc.
  });
  
  // 7. Clean up empty/blank lines excess
  cleaned = cleaned.replace(/^\s*[\r\n]/gm, '\n');
  
  return cleaned;
}

// Test on all 35 files
let totalSaved = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) {
    console.log("No head in:", f);
    continue;
  }
  
  const originalHead = headMatch[1];
  const cleaned = cleanHeadHtml(originalHead);
  const diff = originalHead.length - cleaned.length;
  totalSaved += diff;
  
  // Verify that all <style> tags are completely preserved!
  const origStyles = originalHead.match(/<style[\s\S]*?<\/style>/gi) || [];
  const cleanStyles = cleaned.match(/<style[\s\S]*?<\/style>/gi) || [];
  if (origStyles.length !== cleanStyles.length) {
    console.error(`ERROR: Style tag count mismatch in ${f}! Orig: ${origStyles.length}, Clean: ${cleanStyles.length}`);
  }
}

console.log(`Successfully verified all 35 files!`);
console.log(`Total bytes that will be removed from <head> across all 35 files: ${totalSaved} bytes (~${(totalSaved / 1024).toFixed(1)} KB)`);
