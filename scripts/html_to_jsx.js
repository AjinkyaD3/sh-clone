// Mechanical HTML -> JSX converter. Walks the real parsed DOM (cheerio/parse5)
// so it cannot skip or misread a node the way manual rewriting can.
// This is a 1:1 structural translation: same tags, same classes, same
// inline styles (as objects), same attributes. No redesign, no CSS rewrite,
// no next/image swap (see today's conversation for why).

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

const BOOLEAN_ATTRS = new Set([
  'autoplay', 'muted', 'loop', 'playsinline', 'controls', 'disabled',
  'checked', 'required', 'allowfullscreen', 'novalidate', 'readonly',
  'multiple', 'selected', 'defer', 'async', 'hidden', 'autofocus', 'default',
  'itemscope',
]);

// React types these ARIA attributes as `number`, not `string`, unlike every
// other ARIA/HTML attribute - scraped HTML always has them as plain strings
// (e.g. aria-level="5"), so they need to render as a numeric expression
// ({5}) rather than a quoted string ("5") or TS rejects the assignment.
// Same reasoning, but for plain (non-ARIA) HTML attributes React types as
// `number` even though the DOM/HTML spec itself treats them as plain text
// (an invalid/non-numeric value is simply ignored per HTML5, not a parse
// error) - found on contact-us's real <form> (tabindex="", minlength="0",
// cols/rows on a <textarea>).
const NUMERIC_ATTRS = new Set([
  'aria-level', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow',
  'aria-colcount', 'aria-colindex', 'aria-colspan', 'aria-rowcount',
  'aria-rowindex', 'aria-rowspan', 'aria-setsize', 'aria-posinset',
  'tabindex', 'minlength', 'maxlength', 'cols', 'rows', 'size',
  'colspan', 'rowspan',
]);

const ATTR_RENAME = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  readonly: 'readOnly',
  maxlength: 'maxLength',
  minlength: 'minLength',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  crossorigin: 'crossOrigin',
  novalidate: 'noValidate',
  contenteditable: 'contentEditable',
  spellcheck: 'spellCheck',
  autoplay: 'autoPlay',
  playsinline: 'playsInline',
  fetchpriority: 'fetchPriority',
  srcset: 'srcSet',
  allowfullscreen: 'allowFullScreen',
  frameborder: 'frameBorder',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  itemprop: 'itemProp',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  usemap: 'useMap',
  accesskey: 'accessKey',
  enctype: 'encType',
  hreflang: 'hrefLang',
};

// attrs React warns about / that don't exist as DOM props - drop silently
// (scrape artifacts with no visual effect: lazyload plugin bookkeeping etc.)
const ATTR_DROP = new Set([]);

function styleStringToObject(styleStr) {
  // Prettier-formatted attribute values can contain real newlines/indentation
  // inside a single CSS value (e.g. a multi-line linear-gradient()). Collapse
  // all whitespace runs to a single space first - CSS values collapse
  // whitespace anyway, so this is purely undoing formatting, not changing
  // meaning - and it's required because a JS single-quoted string literal
  // cannot contain a raw newline.
  const normalized = styleStr.replace(/\s+/g, ' ');
  const decls = normalized.split(';').map((s) => s.trim()).filter(Boolean);
  const props = [];
  for (const decl of decls) {
    const idx = decl.indexOf(':');
    if (idx === -1) continue;
    const rawProp = decl.slice(0, idx).trim();
    const rawVal = decl.slice(idx + 1).trim();
    if (!rawProp || !rawVal) continue;
    const escapedVal = rawVal.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    if (rawProp.startsWith('--')) {
      props.push(`'${rawProp}': '${escapedVal}'`);
    } else {
      const camel = rawProp.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      props.push(`${camel}: '${escapedVal}'`);
    }
  }
  return `{{ ${props.join(', ')} }}`;
}

function jsxAttrString(key, value, tag) {
  const lower = key.toLowerCase();
  if (ATTR_DROP.has(lower)) return null;
  if (lower === 'style') {
    const obj = styleStringToObject(value).slice(1, -1); // strip outer {{ }} -> { }
    // Strict-enum style properties (textAlign, whiteSpace, position, etc.)
    // reject a plain `as React.CSSProperties` cast when their value is a
    // var() reference instead of a literal keyword (e.g.
    // `text-align: var(--awb-content-alignment)` - valid CSS, but not a
    // valid TextAlign union member as far as TS is concerned). Route
    // through `unknown` first, same as the TS compiler's own suggested fix,
    // rather than special-casing which properties can trigger this.
    return `style={${obj} as unknown as React.CSSProperties}`;
  }
  // React warns ("You provided a `value`/`checked` prop to a form field
  // without an `onChange` handler... this will render a read-only field")
  // whenever a form field gets a plain initial value with no change
  // handler - which every converted page hits, since this converter never
  // generates event handlers. The scraped value was only ever meant to
  // seed the field's starting content (exactly what `defaultValue`/
  // `defaultChecked` do for an uncontrolled input), not to lock it
  // read-only, so route through the uncontrolled equivalents instead.
  // `checked` only appears on `<input>` in valid HTML, so it's always safe
  // to rename regardless of tag.
  let reactKey = ATTR_RENAME[lower] || key;
  if (lower === 'value' && (tag === 'input' || tag === 'textarea')) {
    reactKey = 'defaultValue';
  } else if (lower === 'checked') {
    reactKey = 'defaultChecked';
  }
  if (BOOLEAN_ATTRS.has(lower)) {
    const truthy = value === '' || value === 'true' || value === '1' || value === lower;
    return truthy ? `${reactKey}={true}` : `${reactKey}={false}`;
  }
  if (NUMERIC_ATTRS.has(lower)) {
    const n = parseFloat(String(value).trim());
    if (!Number.isNaN(n)) return `${reactKey}={${n}}`;
    // An empty/non-numeric value (e.g. tabindex="") is invalid per the HTML5
    // spec and browsers simply ignore it - matching that by dropping the
    // attribute entirely, since React's type for this prop won't accept a
    // string fallback the way plain HTML/the DOM would.
    return null;
  }
  // Same reasoning as styleStringToObject: a long attribute value can be
  // Prettier-wrapped across lines in the source; collapse to keep the
  // generated attribute on one syntactically-valid line. HTML attribute
  // values already collapse whitespace on parse, so this changes nothing
  // about what the browser sees.
  const normalized = String(value).replace(/\s+/g, ' ').trim();
  const escaped = normalized.replace(/\\/g, '\\\\').replace(/"/g, '&quot;');
  return `${reactKey}="${escaped}"`;
}

let linkKeyCounter = 0;
let usedLink = false;

function renderNode($, node, indent) {
  const pad = '  '.repeat(indent);

  if (node.type === 'text') {
    const text = node.data;
    if (!text.trim()) return ''; // pure whitespace/indentation between elements - drop, matches HTML block-level collapse
    // Collapse whitespace runs to a single space (same as HTML/CSS white-space:
    // normal), but do NOT trim leading/trailing space - it's often meaningful
    // (e.g. "<span>Home</span> » <span>Doors</span>" needs that boundary
    // space to render a gap). Emit as a {"..."} expression rather than raw
    // JSX text so React renders the exact string with none of JSX's own
    // line-based whitespace-trimming rules involved - that ambiguity is
    // exactly what caused this bug, so it needs to not exist at all here.
    const collapsed = text.replace(/\s+/g, ' ');
    const escaped = collapsed.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return `${pad}{\`${escaped}\`}\n`;
  }

  if (node.type === 'comment') {
    const safe = node.data.replace(/\*\//g, '* /');
    return `${pad}{/* ${safe.trim()} */}\n`;
  }

  if (node.type !== 'tag' && node.type !== 'script' && node.type !== 'style') {
    return '';
  }

  let tag = node.tagName || node.name;
  const attribs = { ...(node.attribs || {}) };

  // Internal-route <a> tags become next/link <Link>. Everything else
  // (accordion/menu toggles using href="#<id>", external URLs, tel:,
  // mailto:) stays a plain <a> - Link is for app routing, not arbitrary
  // hrefs, and rewriting toggle anchors would change their click behavior.
  let isLink = false;
  if (tag === 'a' && typeof attribs.href === 'string') {
    const href = attribs.href;
    const isInternalRoute = /^\//.test(href) && !/^\/legacy-assets/.test(href);
    if (isInternalRoute) {
      isLink = true;
      tag = 'Link';
      usedLink = true;
    }
  }

  // Special case: JSON-LD script - keep content verbatim via dangerouslySetInnerHTML
  if (tag === 'script' && attribs.type === 'application/ld+json') {
    const raw = $(node).html() || '';
    const jsonKey = `ldJson${++linkKeyCounter}`;
    return (
      `${pad}<script\n` +
      `${pad}  type="application/ld+json"\n` +
      `${pad}  dangerouslySetInnerHTML={{ __html: ${JSON.stringify(raw)} }}\n` +
      `${pad}/>\n`
    );
  }
  // Any other script tag: skip (none expected in body content besides ld+json here)
  if (tag === 'script') return '';

  const attrParts = [];
  for (const [k, v] of Object.entries(attribs)) {
    const rendered = jsxAttrString(k, v, tag);
    if (rendered) attrParts.push(rendered);
  }
  const attrStr = attrParts.length
    ? '\n' + attrParts.map((a) => pad + '  ' + a).join('\n') + '\n' + pad
    : '';

  if (VOID_ELEMENTS.has(tag)) {
    return `${pad}<${tag}${attrStr ? attrStr : ' '}/>\n`;
  }

  const children = node.children || [];
  const childStr = children.map((c) => renderNode($, c, indent + 1)).join('');

  if (!childStr.trim()) {
    return `${pad}<${tag}${attrStr}></${tag}>\n`;
  }

  return `${pad}<${tag}${attrStr}>\n${childStr}${pad}</${tag}>\n`;
}

function convert(contentHtmlPath) {
  const html = fs.readFileSync(contentHtmlPath, 'utf8');
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: true });

  const bodyEl = $('body')[0];
  if (!bodyEl) throw new Error('No <body> found in ' + contentHtmlPath);

  const bodyChildren = bodyEl.children || [];
  const jsx = bodyChildren.map((c) => renderNode($, c, 3)).join('');

  // stylesheet <link> tags worth keeping (page-specific compiled CSS, fonts).
  // Favicons are dropped - app/favicon.ico already covers that globally.
  const headLinks = [];
  $('head link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) headLinks.push(href);
  });

  return { jsx, headLinks };
}

const target = process.argv[2];
if (!target) {
  console.error('Usage: node html_to_jsx.js <path-to-content.html>');
  process.exit(1);
}
const { jsx, headLinks } = convert(target);
console.log('=== next/link import needed:', usedLink, '===');
console.log('=== HEAD STYLESHEET LINKS TO PRESERVE ===');
console.log(JSON.stringify(headLinks, null, 1));
console.log('=== JSX (first 3000 chars) ===');
console.log(jsx.slice(0, 3000));
const outPath = path.join(process.cwd(), 'scratch', 'converted_body.jsx.txt');
fs.writeFileSync(outPath, jsx);
const headLinksPath = path.join(process.cwd(), 'scratch', 'converted_head_links.json');
fs.writeFileSync(headLinksPath, JSON.stringify(headLinks));
console.log('\nFull output written to', outPath);
console.log('Head links written to', headLinksPath);
