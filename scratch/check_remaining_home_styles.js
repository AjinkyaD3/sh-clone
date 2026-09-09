const fs = require('fs');

const home = fs.readFileSync('app/content.html', 'utf8');
const headMatch = home.match(/<head[^>]*>([\s\S]*?)<\/head>/i);

if (headMatch) {
  const styles = headMatch[1].match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  for (const s of styles) {
    if (!s.includes('global-styles') && !s.includes('wpo_min') && !s.includes('css-fb-visibility') && !s.includes('wp-custom-css') && !s.includes('wp-img-auto-sizes')) {
      console.log("OTHER STYLE IN HOME HEAD:\n", s);
    }
  }
}
