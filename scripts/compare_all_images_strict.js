// Stricter version of compare_all_images.js: compares by FULL upload path
// (e.g. "2025/01/Mask-group-26.png") instead of just the basename. This
// catches the case where the same filename exists in two different month
// folders on WordPress with genuinely different content (a same-name
// re-upload) - a class of bug the basename-only script silently missed,
// found 2025-09-11 on /doors/communal-entrance-doors (Mask-group-26.png:
// ours pointed at /2025/03/ while the live site uses /2025/01/, a totally
// different photo despite the identical filename).

const cheerio = require('cheerio');

const OUR_BASE = 'http://localhost:3000';
const WP_BASE = 'https://secure-house.co.uk';

const ROUTES = [
  '/', '/about-us', '/blog', '/contact-us',
  '/door-styles', '/door-styles/edwardian-doors', '/door-styles/french-doors',
  '/door-styles/georgian-doors', '/door-styles/victorian-doors',
  '/doors', '/doors/bullet-proof-doors', '/doors/communal-entrance-doors',
  '/doors/fire-resistant-doors', '/doors/high-security-doors', '/doors/panic-room-doors',
  '/doors/profile-doors', '/doors/profile-doors/fuego-fire',
  '/doors/profile-doors/presto-bullet-proof', '/doors/profile-doors/stainless-steel',
  '/doors/profile-doors/unico-slim-line',
  '/garage-doors', '/garage-doors/sectional-garage-doors',
  '/garage-doors/side-hinged-garage-doors', '/garage-doors/sliding-garage-doors',
  '/garage-doors/tracless-garage-doors',
  '/grilles-shutters', '/grilles-shutters/colllabsible-grilles',
  '/grilles-shutters/high-security-shutters', '/grilles-shutters/security-shutters',
  '/products', '/projects', '/security-levels', '/trade',
  '/windows', '/windows/high-security-steel-windows', '/windows/security-aluminium-windows',
];

const HEADER_SELECTOR_HINTS = ['wp-image-1304', 'wp-image-1903', 'fusion-tb-header'];

// Full path relative to /uploads/ (or /legacy-assets/uploads/ on ours),
// keeping the month folder so same-named re-uploads are distinguished.
function uploadPath(url) {
  try {
    const clean = url.split('?')[0].split('#')[0];
    const m = clean.match(/uploads\/(.+)$/);
    return m ? decodeURIComponent(m[1]) : decodeURIComponent(clean.split('/').pop() || '');
  } catch (e) {
    return url;
  }
}

function extractImages($) {
  const header = [];
  const body = [];
  $('img').each((_, el) => {
    const $el = $(el);
    let src =
      $el.attr('data-orig-src') ||
      $el.attr('data-src') ||
      $el.attr('src') ||
      '';
    if (!src || src.startsWith('data:')) return;
    const path = uploadPath(src);
    if (!path) return;
    const cls = $el.attr('class') || '';
    const inHeader =
      $el.closest('header, .fusion-tb-header, [class*="fusion-header"]').length > 0 ||
      HEADER_SELECTOR_HINTS.some((h) => cls.includes(h));
    (inHeader ? header : body).push(path);
  });
  $('[data-bg-url]').each((_, el) => {
    const src = $(el).attr('data-bg-url');
    if (src) body.push(uploadPath(src));
  });
  return { header: [...new Set(header)], body: [...new Set(body)] };
}

async function fetchPage(base, route) {
  const res = await fetch(base + route, { redirect: 'follow' });
  if (!res.ok) return { ok: false, status: res.status };
  const html = await res.text();
  const $ = cheerio.load(html);
  return { ok: true, ...extractImages($) };
}

function diff(a, b) {
  const setB = new Set(b);
  const setA = new Set(a);
  return {
    missingFromOurs: b.filter((x) => !setA.has(x)),
    extraOnOurs: a.filter((x) => !setB.has(x)),
  };
}

(async () => {
  const results = [];
  for (const route of ROUTES) {
    const wpRoute = route === '/' ? '/' : route + '/';
    let ours, wp;
    try {
      ours = await fetchPage(OUR_BASE, route);
    } catch (e) {
      results.push({ route, error: 'our fetch failed: ' + e.message });
      continue;
    }
    try {
      wp = await fetchPage(WP_BASE, wpRoute);
    } catch (e) {
      results.push({ route, error: 'wp fetch failed: ' + e.message });
      continue;
    }
    if (!ours.ok) { results.push({ route, error: `our page HTTP ${ours.status}` }); continue; }
    if (!wp.ok) { results.push({ route, error: `wp page HTTP ${wp.status} (may not exist on live site)` }); continue; }

    const headerDiff = diff(ours.header, wp.header);
    const bodyDiff = diff(ours.body, wp.body);
    const hasHeaderDiff = headerDiff.missingFromOurs.length || headerDiff.extraOnOurs.length;
    const hasBodyDiff = bodyDiff.missingFromOurs.length || bodyDiff.extraOnOurs.length;
    results.push({
      route,
      ok: !hasHeaderDiff && !hasBodyDiff,
      headerCounts: { ours: ours.header.length, wp: wp.header.length },
      bodyCounts: { ours: ours.body.length, wp: wp.body.length },
      headerDiff: hasHeaderDiff ? headerDiff : null,
      bodyDiff: hasBodyDiff ? bodyDiff : null,
    });
  }

  console.log('\n=== STRICT (full-path) IMAGE COMPARISON: ours vs secure-house.co.uk ===\n');
  let mismatchCount = 0, errorCount = 0;
  for (const r of results) {
    if (r.error) { console.log(`SKIP  ${r.route.padEnd(45)} ${r.error}`); errorCount++; continue; }
    if (r.ok) {
      console.log(`PASS  ${r.route.padEnd(45)} header ${r.headerCounts.ours}/${r.headerCounts.wp}  body ${r.bodyCounts.ours}/${r.bodyCounts.wp}`);
    } else {
      mismatchCount++;
      console.log(`DIFF  ${r.route.padEnd(45)} header ${r.headerCounts.ours}/${r.headerCounts.wp}  body ${r.bodyCounts.ours}/${r.bodyCounts.wp}`);
      if (r.headerDiff) {
        if (r.headerDiff.missingFromOurs.length) console.log(`        header - wp has, ours missing: ${r.headerDiff.missingFromOurs.join(', ')}`);
        if (r.headerDiff.extraOnOurs.length) console.log(`        header - ours has, differs: ${r.headerDiff.extraOnOurs.join(', ')}`);
      }
      if (r.bodyDiff) {
        if (r.bodyDiff.missingFromOurs.length) console.log(`        body - wp has, ours missing: ${r.bodyDiff.missingFromOurs.join(', ')}`);
        if (r.bodyDiff.extraOnOurs.length) console.log(`        body - ours has, differs: ${r.bodyDiff.extraOnOurs.join(', ')}`);
      }
    }
  }
  console.log(`\n${results.length - mismatchCount - errorCount}/${results.length} pages match. ${mismatchCount} with real path differences. ${errorCount} skipped.`);
})();
