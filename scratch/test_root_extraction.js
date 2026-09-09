const fs = require('fs');
const path = require('path');

// Extract the 4 canonical styles from app/doors/content.html
const doorsContent = fs.readFileSync('app/doors/content.html', 'utf8');

function extractStyle(content, id) {
  const m = content.match(new RegExp(`<style[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/style>`, 'i'));
  return m ? m[1].trim() : '';
}

const imgAutoSizes = extractStyle(doorsContent, 'wp-img-auto-sizes-contain-inline-css');
const globalStyles = extractStyle(doorsContent, 'global-styles-inline-css');
const fbVisibility = extractStyle(doorsContent, 'css-fb-visibility');
const wpCustomCss = extractStyle(doorsContent, 'wp-custom-css');

console.log("Extracted canonical styles:");
console.log("- wp-img-auto-sizes:", imgAutoSizes.length, "bytes");
console.log("- global-styles:", globalStyles.length, "bytes");
console.log("- css-fb-visibility:", fbVisibility.length, "bytes");
console.log("- wp-custom-css:", wpCustomCss.length, "bytes");

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

console.log("\nTotal Combined Root CSS Size:", (combinedRootCss.length / 1024).toFixed(1), "KB");

// Extract wpo_min-header-0-css from app/content.html
const homeContent = fs.readFileSync('app/content.html', 'utf8');
const wpoMatch = homeContent.match(/<style[^>]*id="wpo_min-header-0-css"[^>]*>([\s\S]*?)<\/style>/i);
const wpoCss = wpoMatch ? wpoMatch[1].trim() : '';
console.log("Extracted homepage wpo CSS Size:", (wpoCss.length / 1024).toFixed(1), "KB");
