# Secure House Migration - Progress Checklist

Update this file after every session — this is the single source of truth for "what's actually done."

## Completed
- [x] Content/structure/image/video audit of homepage, /projects/, /about-us/, and every nav/mega-menu link (30 pages) against live site — fixed unconverted lazy-load background images (14 pages) and ~780 missing responsive image thumbnail variants (widespread WordPress srcset gap); see MISTAKES-AND-PATCHES.md #2 and #5. /blog/ index confirmed still correctly blocked pending client content confirmation (individual blog post pages are unaffected)
- [x] 190+ pages migrated, spam removed, verified
- [x] Security audit: scanned all 193 content.html files for external script domains, inline obfuscation (eval/atob/document.write), and public/legacy-assets JS — clean, no external/malicious script sources found
- [x] Found & removed a hidden (off-screen CSS) black-hat SEO spam injection on the homepage (app/content.html) that survived the earlier "spam removed" pass because it had zero visible symptoms — see MISTAKES-AND-PATCHES.md item 13. Confirmed via repo-wide grep that no other pages carry the same injection, and via build + compiled-output check that removal is clean
- [x] Full technical SEO (sitemap, robots, canonical, meta, schema)
- [x] 12 CTAs inserted
- [x] 3 new authored pages built (Curved Glass, Arch Doors, Stained Glass)
- [x] GA4 + GSC live, GTM/Clarity scaffolded
- [x] Header/Footer extracted to shared components
- [x] Interactive mobile menu built
- [x] Header/Footer converted to real JSX

## Phase 1: Blog Pages
- [ ] Pilot batch (5 pages)
- [ ] Full batch (117 remaining)

## Phase 2: Category Hubs + Inspiration
- [ ] Not started

## Phase 3: Static/Misc
- [ ] Not started

## Phase 4: Product Sub-Pages
- [ ] Not started

## Completed (continued)
- [x] Extended the content/image audit to the "second layer" (8 pages linked directly from the 30 nav-reachable pages: /products/, /security-levels/, /doors/arch-doors/, /doors/bespoke-doors/, /doors/stained-glass-doors/, /bespoke-front-door-designs-for-modern-homes-style/, /victorian-front-doors-for-elegant-secure-uk-homes/, and /industrial-style-doors-for-modern-uk-homes/) and "third layer" (2 more pages linked from those: /bullet-proof-door-solutions-safe-room-panic-doors/, /security-garage-doors-for-maximum-home-protection/) — 10 pages total. Built the missing `/industrial-style-doors-for-modern-uk-homes/` route from a fresh live-site scrape (no backup copy existed) following the same pipeline as `scripts/process_pages.py`; fixed unconverted data-bg lazy-load images on doors/bespoke-doors and doors/stained-glass-doors; filled in missing thumbnail variants. One background image on `/doors/arch-doors/` (a custom-authored page with no live-site source) remains genuinely missing — see below.
- [x] Confirmed the site's link graph converges fast past two hops: 30 nav-reachable pages → 8 second-layer → only 2 new third-layer pages, everything else loops back into the already-known set (excluding WordPress infra links like /feed/, /wp-json/, /author/*)

## Found During Audit — Not Yet Fixed
- [ ] `/doors/arch-doors/` references `/legacy-assets/uploads/2024/02/Bespoke-arch-doors.jpg` as a section background, but the file doesn't exist locally or on the live site (404 both places). This is one of the 3 custom-authored pages with no original WordPress source to recover the image from — needs the correct image sourced from the client, not guessed

## Blocked on Client
- [ ] GTM container ID
- [ ] Microsoft Clarity project ID
- [ ] Georgian Doors / Georgian Front Doors meta content
- [ ] Blog content confirmation
- [ ] Brochure/CTA clarification
- [ ] Contact form submission/redirect spec
