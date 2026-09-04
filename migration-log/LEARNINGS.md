# Secure House Migration - Technical Learnings

This document tracks technical gotchas discovered to avoid repeating mistakes. Add new entries as issues are discovered during the conversion phases.

- String-based HTML removal can fail silently due to serialization differences — use DOM-based removal (Cheerio) instead
- CSS selectors matching a shared class across multiple structurally-different elements (e.g. two `<nav>` elements both having `.awb-menu_mobile-toggle`) can cause both to activate simultaneously — always verify selector specificity when multiple elements share a class
- `content.html` files include full `<!DOCTYPE>`/`<head>` boilerplate that gets injected into `<body>` — this is bloat to strip during the pure-Next.js conversion
- SEO metadata currently lives inside raw `content.html` `<head>` tags for ~160 unconverted pages — must extract and migrate to Next.js metadata API before deleting raw HTML, or SEO data will be silently lost
