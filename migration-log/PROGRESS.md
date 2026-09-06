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

## Found During Audit — Not Yet Fixed
- [ ] `/industrial-style-doors-for-modern-uk-homes/` is linked from at least one already-migrated page's content but has no route/content.html — will 404 if clicked
- [ ] `/products/` and `/security-levels/` pages exist and build, but are only reachable via a homepage link (not in main nav) — not yet re-verified against live site content/images in this audit pass
- [ ] `/doors/arch-doors/`, `/doors/bespoke-doors/`, `/doors/stained-glass-doors/`, and 2 more blog posts linked from audited pages (`/bespoke-front-door-designs-for-modern-homes-style/`, `/victorian-front-doors-for-elegant-secure-uk-homes/`) exist but have not yet been through the content/image audit pass applied to the 30 nav-reachable pages

## Blocked on Client
- [ ] GTM container ID
- [ ] Microsoft Clarity project ID
- [ ] Georgian Doors / Georgian Front Doors meta content
- [ ] Blog content confirmation
- [ ] Brochure/CTA clarification
- [ ] Contact form submission/redirect spec
