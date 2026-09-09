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

const backupDir = path.join('scratch', 'backup_before_root_styles');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// 1. Extract canonical styles from app/doors/content.html
const doorsContent = fs.readFileSync(path.join('app', 'doors', 'content.html'), 'utf8');

function extractStyle(content, id) {
  const m = content.match(new RegExp(`<style[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/style\\s*>`, 'i'));
  return m ? m[1].trim() : '';
}

const imgAutoSizes = extractStyle(doorsContent, 'wp-img-auto-sizes-contain-inline-css');
const globalStyles = extractStyle(doorsContent, 'global-styles-inline-css');
const fbVisibility = extractStyle(doorsContent, 'css-fb-visibility');
const wpCustomCss = extractStyle(doorsContent, 'wp-custom-css');

const combinedRootCss = `/* ==========================================================================
   Global Theme Stylesheets (Extracted from 35 content.html files)
   Contains WordPress theme presets, layout resets, and responsive visibility
   ========================================================================== */

/* 1. Image Auto Sizes */
${imgAutoSizes}

/* 2. Global WordPress / Avada Theme Tokens & Layout Resets */
${globalStyles}

/* 3. Avada Responsive Breakpoint Visibility */
${fbVisibility}

/* 4. WordPress Custom Overrides */
${wpCustomCss}
`;

// Save app/theme-globals.css
fs.writeFileSync(path.join('app', 'theme-globals.css'), combinedRootCss, 'utf8');
console.log("Created app/theme-globals.css (" + (combinedRootCss.length / 1024).toFixed(1) + " KB)");

// 2. Extract homepage wpo_min-header-0-css and save to public/legacy-assets/css/homepage-styles.css
const homeContent = fs.readFileSync(path.join('app', 'content.html'), 'utf8');
const wpoMatch = homeContent.match(/<style[^>]*id="wpo_min-header-0-css"[^>]*>([\s\S]*?)<\/style\s*>/i);
const wpoCss = wpoMatch ? wpoMatch[1].trim() : '';

const homeCssDir = path.join('public', 'legacy-assets', 'css');
if (!fs.existsSync(homeCssDir)) {
  fs.mkdirSync(homeCssDir, { recursive: true });
}
fs.writeFileSync(path.join(homeCssDir, 'homepage-styles.css'), wpoCss, 'utf8');
console.log("Created public/legacy-assets/css/homepage-styles.css (" + (wpoCss.length / 1024).toFixed(1) + " KB)");

// 3. Strip duplicate styles from all 35 content.html files
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

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  totalOriginalSize += content.length;
  
  // Backup file
  const safeName = f.replace(/[\/\\]/g, '_');
  fs.writeFileSync(path.join(backupDir, safeName), content, 'utf8');
  
  for (const pat of stylesToRemove) {
    content = content.replace(pat, '');
  }
  
  // If homepage, inject the external stylesheet link before </head>
  if (f === path.join('app', 'content.html')) {
    content = content.replace(
      '</head>',
      '  <link href="/legacy-assets/css/homepage-styles.css" id="homepage-styles-css" media="all" rel="stylesheet" />\n  </head>'
    );
  }
  
  totalNewSize += content.length;
  fs.writeFileSync(f, content, 'utf8');
}

console.log("=== STRIPPED FROM ALL 35 FILES ===");
console.log(`Original total size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`New total size:      ${(totalNewSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Total saved:         ${((totalOriginalSize - totalNewSize) / 1024).toFixed(1)} KB`);
