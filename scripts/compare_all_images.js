// Compares every image on every live page (our Next.js site vs the real
// secure-house.co.uk) - both the shared header images and each page's own
// body content images - and reports any page where the set of image
// filenames differs. Not a pixel diff: filename-set comparison, same
// reasoning as structural_diff.js (fast, repeatable, catches swapped/
// missing/extra images without needing a real browser).
//
// The live WordPress site lazy-loads real images via JS (lazysizes): the
// initial <img src> is a blank placeholder SVG, but the real URL is always
// present in data-orig-src/data-src even before any JS runs, so a plain
// HTML fetch (no browser needed) is enough - confirmed earlier this session
// against several pages.

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

// Header images repeat on every page (logo x2, phone icon) - split them out
// from page-body images so a real page-content mismatch isn't buried among
// 35 identical header rows, and so a genuine header-wide problem is obvious
// as one finding instead of 35 duplicate ones.
const HEADER_SELECTOR_HINTS = ['wp-image-1304', 'wp-image-1903', 'wp-image-1903', 'fusion-tb-header'];

function basename(url) {
  try {
    const clean = url.split('?')[0].split('#')[0];
    return decodeURIComponent(clean.split('/').pop() || '');
  } catch (e) {
    return url;
  }
}

function extractImages($, isWordPress) {
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
    const name = basename(src);
    if (!name) return;
    const cls = $el.attr('class') || '';
    const inHeader =
      $el.closest('header, .fusion-tb-header, [class*="fusion-header"]').length > 0 ||
      HEADER_SELECTOR_HINTS.some((h) => cls.includes(h));
    (inHeader ? header : body).push(name);
  });
  // Background images set via data-bg-url (parallax/column backgrounds) -
  // same pattern already found and fixed once this session (door-styles
  // parallax images), worth including here too.
  $('[data-bg-url]').each((_, el) => {
    const src = $(el).attr('data-bg-url');
    if (src) body.push(basename(src));
  });
  return { header: [...new Set(header)], body: [...new Set(body)] };
}

async function fetchPage(base, route) {
  const res = await fetch(base + route, { redirect: 'follow' });
  if (!res.ok) return { ok: false, status: res.status };
  const html = await res.text();
  const $ = cheerio.load(html);
  return { ok: true, ...extractImages($, base === WP_BASE) };
}

function diff(a, b) {
  const setB = new Set(b);
  const setA = new Set(a);
  return {
    missingFromOurs: a === undefined ? [] : b.filter((x) => !setA.has(x)),
    extraOnOurs: a === undefined ? [] : a.filter((x) => !setB.has(x)),
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
    if (!ours.ok) {
      results.push({ route, error: `our page HTTP ${ours.status}` });
      continue;
    }
    if (!wp.ok) {
      results.push({ route, error: `wp page HTTP ${wp.status} (may not exist on live site)` });
      continue;
    }
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

  console.log('\n=== IMAGE COMPARISON: all pages, ours vs secure-house.co.uk ===\n');
  let mismatchCount = 0;
  let errorCount = 0;
  for (const r of results) {
    if (r.error) {
      console.log(`SKIP  ${r.route.padEnd(45)} ${r.error}`);
      errorCount++;
      continue;
    }
    if (r.ok) {
      console.log(`PASS  ${r.route.padEnd(45)} header ${r.headerCounts.ours}/${r.headerCounts.wp}  body ${r.bodyCounts.ours}/${r.bodyCounts.wp}`);
    } else {
      mismatchCount++;
      console.log(`DIFF  ${r.route.padEnd(45)} header ${r.headerCounts.ours}/${r.headerCounts.wp}  body ${r.bodyCounts.ours}/${r.bodyCounts.wp}`);
      if (r.headerDiff) {
        if (r.headerDiff.missingFromOurs.length) console.log(`        header - missing on ours: ${r.headerDiff.missingFromOurs.join(', ')}`);
        if (r.headerDiff.extraOnOurs.length) console.log(`        header - extra/different on ours: ${r.headerDiff.extraOnOurs.join(', ')}`);
      }
      if (r.bodyDiff) {
        if (r.bodyDiff.missingFromOurs.length) console.log(`        body - missing on ours: ${r.bodyDiff.missingFromOurs.join(', ')}`);
        if (r.bodyDiff.extraOnOurs.length) console.log(`        body - extra/different on ours: ${r.bodyDiff.extraOnOurs.join(', ')}`);
      }
    }
  }
  console.log(`\n${results.length - mismatchCount - errorCount}/${results.length} pages match. ${mismatchCount} with real differences. ${errorCount} skipped (fetch/HTTP errors).`);
})();
