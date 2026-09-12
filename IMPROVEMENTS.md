# Secure House Next.js — Improvement, Dead Code & Mobile Roadmap

A comprehensive, live-scanned breakdown of all dead code, launch blockers, UX improvements, performance bottlenecks, technical debt, and the **Sitewide Mobile Responsiveness Master Plan** has been documented in:

👉 **[migration-log/RECOMMENDED-IMPROVEMENTS.md](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/migration-log/RECOMMENDED-IMPROVEMENTS.md)**

---

### Master Summary Checklist

| Category | Item | Issue / Opportunity | Priority | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile UX** | **Sitewide Mobile Responsiveness** | Global cascading responsive foundation (clamp typography, 100% column stacking, table scroll, padding resets) — [Full Technical Spec](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/migration-log/MOBILE-RESPONSIVE-SPEC.md) | High | Ready to implement |
| **Dead Code** | **`app/legacy/`** | 35 duplicate routes & 71 files compiling on every build; doubles build time to 82s | Critical | Ready to remove |
| **Dead Code** | **Dummy Tracking Scripts** | `GTM-XXXXXXX` & `CLARITY-XXXXXXX` executing on every page in `layout.tsx` | High | Ready to remove |
| **Dead Code** | **`scratch/` Directory** | 363 MB of uncompressed videos, old HTML backups, and test scripts tracked in Git | High | Ready to untrack |
| **Dead Code** | **221 Unused Uploads** | 71.26 MB of unreferenced images + 3 `.heic` (6.65 MB) + 2 `.png,` files | Medium | Ready to purge |
| **Dead Code** | **Cheerio Dependency** | Listed in production runtime `dependencies`; only used in offline migration scripts | Low | Move to devDeps |
| **Dead Code** | **EDD Plugin CSS** | Easy-Digital-Downloads CSS `<link>` tags blocking render on all 35 pages | Medium | Ready to remove |
| **Launch Blocker** | **Contact Form** | `app/contact-us/page.tsx` has no backend/handler; inquiries fail silently | Critical | Action Required |
| **Launch Blocker** | **Sticky Header** | `Header.tsx` stays `position: absolute`; scrolls off screen on long pages | High | Action Required |
| **Launch Blocker** | **Door Styles Links** | Style cards on `/door-styles` are unclickable `<div>` tags | High | Action Required |
| **Launch Blocker** | **404 & 301 Redirects** | ~150 archived URLs 404 without redirects in `next.config.ts` | High | Action Required |
| **Launch Blocker** | **Security Headers** | Missing CSP, HSTS, `X-Frame-Options`, and `nosniff` in `next.config.ts` | High | Action Required |
| **UX & Content** | **Missing Metadata** | French & Edwardian Doors lack `<title>` and `<meta description>` | Medium | Action Required |
| **UX & Content** | **Profile-Door Spec PDFs** | Missing downloadable technical PDFs & quote forms on 4 pages | Medium | Action Required |
| **Performance** | **Image WebP Phase 2** | 1.05 GB of PNGs/JPEGs in `public/` can be cut to ~200 MB | High | Action Required |
| **Performance** | **LCP Optimization** | LCP is ~11s–38s; needs font optimization (`next/font`) & hero preloads | High | Action Required |
| **Architecture** | **CSS Refactoring** | 450-line inline `<style>` block in `layout.tsx` needs extracting to CSS file | Medium | Action Required |

For complete technical notes, exact line numbers, and step-by-step remediation plans, see **[RECOMMENDED-IMPROVEMENTS.md](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/migration-log/RECOMMENDED-IMPROVEMENTS.md)**.
