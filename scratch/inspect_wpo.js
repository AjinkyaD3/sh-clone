const fs = require('fs');

const home = fs.readFileSync('app/content.html', 'utf8');
const wpoMatch = home.match(/<style[^>]*id="wpo_min-header-0-css"[^>]*>([\s\S]*?)<\/style>/i);

if (wpoMatch) {
  console.log("wpo_min-header-0-css length:", wpoMatch[1].length);
  console.log("First 500 chars:\n", wpoMatch[1].slice(0, 500));
  console.log("\nLast 500 chars:\n", wpoMatch[1].slice(-500));
} else {
  console.log("Not found");
}
