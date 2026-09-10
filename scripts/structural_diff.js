// Structural verification for a converted `-v2` page against its original
// (still dangerouslySetInnerHTML) counterpart, both served by a running dev
// server. Compares the signals that matter for "did the conversion change
// anything real": visible text length, <img src> count, computed
// background-image count (via inline style + class-driven backgrounds are
// approximated by counting elements with a background-image in `style`),
// and <a href> count. Not a pixel diff - a fast, repeatable structural gate
// to run before the slower manual/visual pass.

const cheerio = require('cheerio');

const BASE = 'http://localhost:3000';

async function fetchHtml(route) {
  const res = await fetch(BASE + route, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${route} -> HTTP ${res.status}`);
  return res.text();
}

function analyze(html) {
  const $ = cheerio.load(html);
  const main = $('body').clone();
  main.find('script, style, noscript').remove();
  const text = main.text().replace(/\s+/g, ' ').trim();
  return {
    textLen: text.length,
    imgCount: $('img').length,
    bgImageCount: $('[style*="background-image"]').length,
    linkCount: $('a[href]').length,
  };
}

const pairs = [
  ['/garage-doors', '/garage-doors-v2'],
  ['/garage-doors/tracless-garage-doors', '/garage-doors/tracless-garage-doors-v2'],
  ['/garage-doors/side-hinged-garage-doors', '/garage-doors/side-hinged-garage-doors-v2'],
  ['/garage-doors/sliding-garage-doors', '/garage-doors/sliding-garage-doors-v2'],
  ['/grilles-shutters/colllabsible-grilles', '/grilles-shutters/colllabsible-grilles-v2'],
  ['/about-us', '/about-us-v2'],
  ['/trade', '/trade-v2'],
  ['/products', '/products-v2'],
  ['/security-levels', '/security-levels-v2'],
  ['/door-styles', '/door-styles-v2'],
  ['/door-styles/french-doors', '/door-styles/french-doors-v2'],
  ['/door-styles/victorian-doors', '/door-styles/victorian-doors-v2'],
  ['/door-styles/edwardian-doors', '/door-styles/edwardian-doors-v2'],
  ['/door-styles/georgian-doors', '/door-styles/georgian-doors-v2'],
];

(async () => {
  const rows = [];
  for (const [orig, v2] of pairs) {
    try {
      const [origHtml, v2Html] = await Promise.all([fetchHtml(orig), fetchHtml(v2)]);
      const a = analyze(origHtml);
      const b = analyze(v2Html);
      const textDelta = Math.abs(a.textLen - b.textLen);
      const textPct = a.textLen ? (textDelta / a.textLen) * 100 : 0;
      const match =
        textPct < 1 && // allow tiny whitespace-collapsing noise, not a real content diff
        a.imgCount === b.imgCount &&
        a.bgImageCount === b.bgImageCount &&
        a.linkCount === b.linkCount;
      rows.push({ orig, v2, match, a, b, textPct: textPct.toFixed(2) });
    } catch (e) {
      rows.push({ orig, v2, match: false, error: e.message });
    }
  }

  console.log('\n=== STRUCTURAL DIFF RESULTS ===\n');
  for (const r of rows) {
    if (r.error) {
      console.log(`FAIL  ${r.v2}  ERROR: ${r.error}`);
      continue;
    }
    const status = r.match ? 'PASS ' : 'DIFF ';
    console.log(
      `${status} ${r.v2}\n` +
        `      text: ${r.a.textLen} vs ${r.b.textLen} (${r.textPct}% delta)  ` +
        `img: ${r.a.imgCount} vs ${r.b.imgCount}  ` +
        `bg: ${r.a.bgImageCount} vs ${r.b.bgImageCount}  ` +
        `links: ${r.a.linkCount} vs ${r.b.linkCount}`
    );
  }
  const failCount = rows.filter((r) => !r.match).length;
  console.log(`\n${rows.length - failCount}/${rows.length} passed structural diff.`);
})();
