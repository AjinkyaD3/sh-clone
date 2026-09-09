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

const backupDir = path.join('scratch', 'head_clean_backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
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
  
  // Clean up excessive blank lines inside head
  cleaned = cleaned.replace(/(\r?\n\s*){3,}/g, '\n\n');
  
  return cleaned;
}

console.log(`Starting cleaning of <head> in ${files.length} content.html files...`);

let totalOriginalSize = 0;
let totalCleanedSize = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  totalOriginalSize += content.length;
  
  // Save backup
  const safeName = f.replace(/[\/\\]/g, '_');
  fs.writeFileSync(path.join(backupDir, safeName), content, 'utf8');
  
  // Replace head content
  const headMatch = content.match(/(<head[^>]*>)([\s\S]*?)(<\/head>)/i);
  if (!headMatch) {
    console.warn("WARNING: No head found in", f);
    continue;
  }
  
  const openTag = headMatch[1];
  const headContent = headMatch[2];
  const closeTag = headMatch[3];
  
  const cleanedHead = cleanHeadHtml(headContent);
  const newContent = content.replace(headMatch[0], `${openTag}${cleanedHead}${closeTag}`);
  
  totalCleanedSize += newContent.length;
  fs.writeFileSync(f, newContent, 'utf8');
}

console.log("=== HEAD CLEANING COMPLETE ===");
console.log(`Original total size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Cleaned total size:  ${(totalCleanedSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Total saved:         ${((totalOriginalSize - totalCleanedSize) / 1024).toFixed(1)} KB`);
