# Secure House Migration - Technical Learnings

This document tracks technical gotchas discovered to avoid repeating mistakes. Add new entries as issues are discovered during the conversion phases.

- String-based HTML removal can fail silently due to serialization differences — use DOM-based removal (Cheerio) instead
- CSS selectors matching a shared class across multiple structurally-different elements (e.g. two `<nav>` elements both having `.awb-menu_mobile-toggle`) can cause both to activate simultaneously — always verify selector specificity when multiple elements share a class
- `content.html` files include full `<!DOCTYPE>`/`<head>` boilerplate that gets injected into `<body>` — this is bloat to strip during the pure-Next.js conversion
- SEO metadata currently lives inside raw `content.html` `<head>` tags for ~160 unconverted pages — must extract and migrate to Next.js metadata API before deleting raw HTML, or SEO data will be silently lost
- Black-hat spam injections can hide via CSS (off-screen position, `display:none`, `visibility:hidden`, `opacity:0`, `text-indent:-9999px`) with zero visible symptoms on the rendered page — a "spam removed" pass that only checks visible content/URL slugs (see MISTAKES-AND-PATCHES.md item 7) can miss these entirely. Found one such block (`sfb-block`/`sfb-anchor` class names, steroid/PED affiliate spam) on the homepage months after initial spam cleanup was believed complete — see MISTAKES-AND-PATCHES.md item 13. Always grep for hidden-text CSS patterns + extract actual element text when auditing a migrated hacked site, not just `<script>` tags and external domains.
