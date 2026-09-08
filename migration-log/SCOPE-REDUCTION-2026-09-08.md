# Site Scope Reduction — 2026-09-08

Client's audit spreadsheet approved exactly 32 pages as the official site. Everything else (133 top-level page folders + 6 nested `doors/` sub-pages that weren't on the approved list, plus the `inspiration/` family and one stray duplicate route) has been **moved, not deleted**, out of `app/` into a new top-level `_archive/` folder so it is not built/routed by Next.js but remains fully recoverable on disk.

## Approved 32 pages (kept in `app/`)

1. `/`
2. `/doors/`
3. `/doors/panic-room-doors/`
4. `/doors/fire-resistant-doors/`
5. `/doors/high-security-doors/`
6. `/doors/communal-entrance-doors/`
7. `/doors/bullet-proof-doors/`
8. `/doors/profile-doors/`
9. `/doors/profile-doors/unico-slim-line/`
10. `/doors/profile-doors/fuego-fire/`
11. `/doors/profile-doors/presto-bullet-proof/`
12. `/doors/profile-doors/stainless-steel/`
13. `/windows/`
14. `/windows/high-security-steel-windows/`
15. `/windows/security-aluminium-windows/`
16. `/grilles-shutters/`
17. `/grilles-shutters/security-shutters/`
18. `/grilles-shutters/high-security-shutters/`
19. `/grilles-shutters/colllabsible-grilles/`
20. `/garage-doors/`
21. `/garage-doors/sectional-garage-doors/`
22. `/garage-doors/tracless-garage-doors/`
23. `/garage-doors/side-hinged-garage-doors/`
24. `/garage-doors/sliding-garage-doors/`
25. `/projects/`
26. `/about-us/`
27. `/trade/`
28. `/contact-us/`
29. `/blog/` (+ `/blog/[slug]`)
30. `/door-styles/` (+ `french-doors`, `victorian-doors`, `edwardian-doors`, `georgian-doors`)
31. `/security-levels/`
32. `/products/`

Plus, kept as functionally necessary (not on the client list): `/thank-you/` (form submission confirmation), and global files `layout.tsx`, `sitemap.ts`, `robots.ts`, `page.tsx`, `content.html`, `globals.css`, `page.module.css`, `favicon.ico`, `components/`, `migration-log/`.

## Move manifest — 139 folders moved (133 top-level + `inspiration/`'s 21 subfolders counted as one line + 6 nested `doors/` sub-pages)

```
app/3-point-locking -> _archive/3-point-locking
app/addressing-common-fire-door-installation-mistakes-in-the-uk -> _archive/addressing-common-fire-door-installation-mistakes-in-the-uk
app/aluminium-shop-fronts -> _archive/aluminium-shop-fronts
app/anti-bacterial-door-handles -> _archive/anti-bacterial-door-handles
app/anti-reflective -> _archive/anti-reflective
app/arch-doors-a-perfect-blend-of-style-and-functionality -> _archive/arch-doors-a-perfect-blend-of-style-and-functionality
app/arched-doors -> _archive/arched-doors
app/artistic-door -> _archive/artistic-door
app/balancing-aesthetics-and-safety-fire-doors-in-uk-architectural-design -> _archive/balancing-aesthetics-and-safety-fire-doors-in-uk-architectural-design
app/barnwood-reclaimed-doors -> _archive/barnwood-reclaimed-doors
app/bespoke-front-door-designs-for-modern-homes-style -> _archive/bespoke-front-door-designs-for-modern-homes-style
app/bespoke-garage-doors-add-value-to-your-home -> _archive/bespoke-garage-doors-add-value-to-your-home
app/bespoke-internal-doors-custom-style-security -> _archive/bespoke-internal-doors-custom-style-security
app/bulletproof-doors -> _archive/bulletproof-doors
app/bullet-proof-door-solutions-safe-room-panic-doors -> _archive/bullet-proof-door-solutions-safe-room-panic-doors
app/bullet-proof-doors-your-complete-security-solution-for-2025 -> _archive/bullet-proof-doors-your-complete-security-solution-for-2025
app/burglar-proofing -> _archive/burglar-proofing
app/choosing-eco-friendly-door-materials -> _archive/choosing-eco-friendly-door-materials
app/communal-entrance-doors-explained-features-benefits-buying-guide -> _archive/communal-entrance-doors-explained-features-benefits-buying-guide
app/communal-entrance-doors-secure-house-door-builders -> _archive/communal-entrance-doors-secure-house-door-builders
app/communal-entrance-doors-securing-your-property-with-style -> _archive/communal-entrance-doors-securing-your-property-with-style
app/concealed-hinges -> _archive/concealed-hinges
app/concertina-doors -> _archive/concertina-doors
app/curved-glass-doors-modern-elegance-for-stylish-entrances -> _archive/curved-glass-doors-modern-elegance-for-stylish-entrances
app/deflecting-the-elements-how-rain-deflectors-shield-your-home -> _archive/deflecting-the-elements-how-rain-deflectors-shield-your-home
app/do-decorative-elements-compromise-fire-door-functionality -> _archive/do-decorative-elements-compromise-fire-door-functionality
app/do-fire-doors-help-in-lowering-insurance-premiums -> _archive/do-fire-doors-help-in-lowering-insurance-premiums
app/do-fire-doors-need-special-locks-and-handles -> _archive/do-fire-doors-need-special-locks-and-handles
app/do-fire-doors-need-to-be-closed-at-all-times -> _archive/do-fire-doors-need-to-be-closed-at-all-times
app/do-fire-doors-require-special-glass-for-viewing-panels -> _archive/do-fire-doors-require-special-glass-for-viewing-panels
app/door-furniture -> _archive/door-furniture
app/door-in-garage-garage-door-security-complete-safety-guide -> _archive/door-in-garage-garage-door-security-complete-safety-guide
app/door-leaf -> _archive/door-leaf
app/door-security-bars -> _archive/door-security-bars
app/doorway-dynamics-social-impact-of-building-entrances -> _archive/doorway-dynamics-social-impact-of-building-entrances
app/dutch-doors-a-stylish-and-functional-home-addition -> _archive/dutch-doors-a-stylish-and-functional-home-addition
app/electric-garage-door-upgrade-for-smarter-safer-living -> _archive/electric-garage-door-upgrade-for-smarter-safer-living
app/enhancing-home-security-the-importance-of-door-barricades -> _archive/enhancing-home-security-the-importance-of-door-barricades
app/enhancing-sports-centre-security-with-built-in-shutters -> _archive/enhancing-sports-centre-security-with-built-in-shutters
app/exploring-feng-shuis-influence-on-contemporary-interior-design-a-focus-on-doors -> _archive/exploring-feng-shuis-influence-on-contemporary-interior-design-a-focus-on-doors
app/extend-life-of-communal-door -> _archive/extend-life-of-communal-door
app/fire-door-certification-explained-for-uk-property-owners -> _archive/fire-door-certification-explained-for-uk-property-owners
app/fire-doors-and-locks-and-handles-a-complete-safety-guide -> _archive/fire-doors-and-locks-and-handles-a-complete-safety-guide
app/fire-door-seals-and-their-compliance-with-uk-safety-standards -> _archive/fire-door-seals-and-their-compliance-with-uk-safety-standards
app/fire-door-signage-requirements-under-uk-legislation -> _archive/fire-door-signage-requirements-under-uk-legislation
app/fire-door-training-requirements-for-uk-construction-teams -> _archive/fire-door-training-requirements-for-uk-construction-teams
app/focus-on-banham-locks -> _archive/focus-on-banham-locks
app/full-house-package -> _archive/full-house-package
app/garage-door-lock-strengthening-home-security-the-right-way -> _archive/garage-door-lock-strengthening-home-security-the-right-way
app/grilles-shutters-security-shutters -> _archive/grilles-shutters-security-shutters
app/guide-on-garage-door-installation-from-secure-house -> _archive/guide-on-garage-door-installation-from-secure-house
app/hide-panic-room -> _archive/hide-panic-room
app/high-end-steble-doors -> _archive/high-end-steble-doors
app/home-building-2024 -> _archive/home-building-2024
app/home-security-shutters-essential-for-uk-homes-in-2026 -> _archive/home-security-shutters-essential-for-uk-homes-in-2026
app/home-security-shutters-uk-home-style-protection -> _archive/home-security-shutters-uk-home-style-protection
app/how-are-secure-house-doors-made -> _archive/how-are-secure-house-doors-made
app/how-fire-doors-contribute-to-compartmentalization-in-fires -> _archive/how-fire-doors-contribute-to-compartmentalization-in-fires
app/how-long-does-it-take-to-install-a-fire-door -> _archive/how-long-does-it-take-to-install-a-fire-door
app/how-long-should-a-fire-door-resist-fire -> _archive/how-long-should-a-fire-door-resist-fire
app/how-to-address-common-compliance-issues-with-fire-doors -> _archive/how-to-address-common-compliance-issues-with-fire-doors
app/how-to-choose-fire-doors-for-cold-storage-areas -> _archive/how-to-choose-fire-doors-for-cold-storage-areas
app/how-to-choose-fire-doors-for-high-risk-areas -> _archive/how-to-choose-fire-doors-for-high-risk-areas
app/how-to-choose-the-right-fire-door-for-your-building -> _archive/how-to-choose-the-right-fire-door-for-your-building
app/how-to-ensure-fire-door-compliance-in-uk-construction-projects -> _archive/how-to-ensure-fire-door-compliance-in-uk-construction-projects
app/how-to-ensure-your-fire-doors-are-eco-friendly -> _archive/how-to-ensure-your-fire-doors-are-eco-friendly
app/how-to-properly-maintain-fire-doors-for-safety -> _archive/how-to-properly-maintain-fire-doors-for-safety
app/how-to-retrofit-fire-doors-in-historic-buildings -> _archive/how-to-retrofit-fire-doors-in-historic-buildings
app/how-to-select-fire-doors-for-sound-reduction -> _archive/how-to-select-fire-doors-for-sound-reduction
app/how-to-train-staff-on-fire-door-procedures -> _archive/how-to-train-staff-on-fire-door-procedures
app/impact-of-colour -> _archive/impact-of-colour
app/impact-of-door-colours-on-mood-and-ambience -> _archive/impact-of-door-colours-on-mood-and-ambience
app/industrial-style-doors-for-modern-uk-homes -> _archive/industrial-style-doors-for-modern-uk-homes
app/inspiration/* -> _archive/inspiration/* (21 subfolders: arched-doors, bespoke-security-aesthetic-upgrade-full-house-project-in-london, controlled-drug-license-door-requirements, curved-glass, entire-home-protection, folding-doors-doors-in-action, french-doors-in-the-making-at-a-luxurious-full-house-project, high-tech-protection-with-traditional-design, industrial-steel-doors-with-glass, lead-glass, new-build-in-bedfordshire, prestigious-farmhouse-project, replica-doors, residential-projects-building-regulation-compliance-secure-house, retirement-village-fire-security-upgrade, set-the-tone-with-oversize-doors, sports-pavilion-secured-with-high-performance-shutters, test, whole-house-security-shutter-project, your-number-one-choice-for-area-conservation-doors, yvon-house-security-communal-door — the now-empty app/inspiration/ husk was removed after the move)
app/integrating-fire-doors-into-historic-uk-buildings-while-preserving-character -> _archive/integrating-fire-doors-into-historic-uk-buildings-while-preserving-character
app/interior-cottage-style-doors -> _archive/interior-cottage-style-doors
app/into-the-airlock -> _archive/into-the-airlock
app/key-considerations-for-fire-door-installation-in-uk-healthcare-facilities -> _archive/key-considerations-for-fire-door-installation-in-uk-healthcare-facilities
app/legal-responsibilities-for-maintaining-fire-doors-in-uk-buildings -> _archive/legal-responsibilities-for-maintaining-fire-doors-in-uk-buildings
app/made-to-measure-garage-doors-at-secure-house -> _archive/made-to-measure-garage-doors-at-secure-house
app/maximizing-space-and-style-how-trade-doors-transform-interiors -> _archive/maximizing-space-and-style-how-trade-doors-transform-interiors
app/meeting-uk-fire-safety-standards-with-proper-door-closers -> _archive/meeting-uk-fire-safety-standards-with-proper-door-closers
app/preparing-for-a-fire-door-inspection-uk-compliance-checklist -> _archive/preparing-for-a-fire-door-inspection-uk-compliance-checklist
app/replica-doors-trend-style-security-without-compromise -> _archive/replica-doors-trend-style-security-without-compromise
app/roller-shutters-london-secure-your-home-with-confidence -> _archive/roller-shutters-london-secure-your-home-with-confidence
app/sectional-garage-door-seller-providers-uk-2026 -> _archive/sectional-garage-door-seller-providers-uk-2026
app/sectional-garage-security-doors -> _archive/sectional-garage-security-doors
app/secure-house-international -> _archive/secure-house-international
app/security-garage-doors-for-maximum-home-protection -> _archive/security-garage-doors-for-maximum-home-protection
app/security-specialist-vault-doors-panic-room -> _archive/security-specialist-vault-doors-panic-room
app/selecting-fire-rated-glass-for-doors-uk-standards-and-practices -> _archive/selecting-fire-rated-glass-for-doors-uk-standards-and-practices
app/side-hinged-garage-doors-installing-maintaining -> _archive/side-hinged-garage-doors-installing-maintaining
app/side-hinged-garage-doors-types-maintainace-advantages -> _archive/side-hinged-garage-doors-types-maintainace-advantages
app/simply-stunning-and-totally-secure-inside-and-out -> _archive/simply-stunning-and-totally-secure-inside-and-out
app/stable-doors-the-complete-guide-for-uk-homeowners -> _archive/stable-doors-the-complete-guide-for-uk-homeowners
app/steel-door-the-ultimate-guide-to-stylish-secure-fire-safety -> _archive/steel-door-the-ultimate-guide-to-stylish-secure-fire-safety
app/strategies-for-effective-fire-door-management-in-uk-schools -> _archive/strategies-for-effective-fire-door-management-in-uk-schools
app/synthesis-of-classic-and-modern-style-in-home-interior -> _archive/synthesis-of-classic-and-modern-style-in-home-interior
app/the-architects-guide-to-specifying-fire-doors-in-uk-projects -> _archive/the-architects-guide-to-specifying-fire-doors-in-uk-projects
app/the-art-of-entry-design-creating-impressions-with-building-doorways -> _archive/the-art-of-entry-design-creating-impressions-with-building-doorways
app/the-fire-door-guide-installation-maintenance-and-inspections -> _archive/the-fire-door-guide-installation-maintenance-and-inspections
app/the-impact-of-uk-fire-safety-regulations-on-door-hardware-selection -> _archive/the-impact-of-uk-fire-safety-regulations-on-door-hardware-selection
app/the-importance-of-quality-materials-in-trade-doors -> _archive/the-importance-of-quality-materials-in-trade-doors
app/the-importance-of-third-party-certification-for-fire-doors-in-the-uk -> _archive/the-importance-of-third-party-certification-for-fire-doors-in-the-uk
app/the-power-of-powder-coated-steel-for-doors -> _archive/the-power-of-powder-coated-steel-for-doors
app/the-role-of-fire-doors-in-uk-building-safety-assessments -> _archive/the-role-of-fire-doors-in-uk-building-safety-assessments
app/time-to-get-bullet-proof-with-secure-house -> _archive/time-to-get-bullet-proof-with-secure-house
app/tips-for-securing-patio-door-to-ensure-home-safety -> _archive/tips-for-securing-patio-door-to-ensure-home-safety
app/understanding-the-bs-en-1634-standard-for-fire-doors-in-the-uk -> _archive/understanding-the-bs-en-1634-standard-for-fire-doors-in-the-uk
app/understanding-the-dimensions-of-louvered-doors -> _archive/understanding-the-dimensions-of-louvered-doors
app/victorian-door-styles-elegance-and-security -> _archive/victorian-door-styles-elegance-and-security
app/victorian-front-doors-for-elegant-secure-uk-homes -> _archive/victorian-front-doors-for-elegant-secure-uk-homes
app/victorian-front-doors-restore-elegance-timeless-charm -> _archive/victorian-front-doors-restore-elegance-timeless-charm
app/warehouse-door-enhancing-security-efficiency-and-safety -> _archive/warehouse-door-enhancing-security-efficiency-and-safety
app/what-is-required-for-a-fire-door-inspection -> _archive/what-is-required-for-a-fire-door-inspection
app/what-is-the-best-material-for-industrial-fire-doors -> _archive/what-is-the-best-material-for-industrial-fire-doors
app/what-is-the-certification-process-for-fire-doors -> _archive/what-is-the-certification-process-for-fire-doors
app/what-is-the-difference-between-fire-doors-and-regular-doors -> _archive/what-is-the-difference-between-fire-doors-and-regular-doors
app/what-is-the-impact-of-fire-doors-on-air-quality -> _archive/what-is-the-impact-of-fire-doors-on-air-quality
app/what-is-the-lifespan-of-industrial-fire-doors -> _archive/what-is-the-lifespan-of-industrial-fire-doors
app/what-is-the-role-of-fire-doors-in-evacuation-plans -> _archive/what-is-the-role-of-fire-doors-in-evacuation-plans
app/when-fire-doors-fail-common-issues-and-solutions -> _archive/when-fire-doors-fail-common-issues-and-solutions
app/when-to-consult-a-professional-for-fire-door-installation -> _archive/when-to-consult-a-professional-for-fire-door-installation
app/when-to-replace-your-fire-door-signs-of-wear -> _archive/when-to-replace-your-fire-door-signs-of-wear
app/when-to-use-double-fire-doors-for-extra-protection -> _archive/when-to-use-double-fire-doors-for-extra-protection
app/when-to-use-fire-doors-in-residential-properties -> _archive/when-to-use-fire-doors-in-residential-properties
app/when-to-use-fire-doors-with-louvers-for-ventilation -> _archive/when-to-use-fire-doors-with-louvers-for-ventilation
app/why-fire-doors-are-a-key-part-of-fire-safety-plans -> _archive/why-fire-doors-are-a-key-part-of-fire-safety-plans
app/why-fire-doors-are-essential-in-modern-architecture -> _archive/why-fire-doors-are-essential-in-modern-architecture
app/why-fire-door-seals-are-important-for-smoke-containment -> _archive/why-fire-door-seals-are-important-for-smoke-containment
app/why-fire-doors-should-never-be-propped-open -> _archive/why-fire-doors-should-never-be-propped-open
app/why-maintaining-the-integrity-of-fire-doors-is-crucial -> _archive/why-maintaining-the-integrity-of-fire-doors-is-crucial
app/why-regular-inspections-are-critical-for-fire-door-efficiency -> _archive/why-regular-inspections-are-critical-for-fire-door-efficiency
app/doors/arch-doors -> _archive/doors/arch-doors
app/doors/bespoke-doors -> _archive/doors/bespoke-doors
app/doors/curved-glass-doors -> _archive/doors/curved-glass-doors
app/doors/industrial-style-doors -> _archive/doors/industrial-style-doors
app/doors/premium-high-security-doors -> _archive/doors/premium-high-security-doors
app/doors/stained-glass-doors -> _archive/doors/stained-glass-doors
```

Nothing was deleted — every folder above is fully intact under `_archive/` with the same internal structure (page.tsx, content.html, any sub-assets), and can be moved back into `app/` at any time if the client re-approves any of these pages.

## Dead-link fixes required by the archive

A repo-wide scan of the remaining active `app/` and `components/` files against all 139 archived slugs found exactly **one** page with references to an archived route: `app/doors/content.html` (the doors hub) contained 4 stray links to `/doors/bespoke-doors/` — an archived page — inside a scraped WordPress off-canvas/mega-menu block embedded in that page's raw HTML:

- 3× a malformed, orphaned `<a href="/doors/bespoke-doors/" ...>Bespoke doors</a>` tag inside the off-canvas mobile-menu markup (didn't match the surrounding menu's structure — looked like leftover scrape debris, consistent with the "hidden/orphaned markup" pattern already documented in `MISTAKES-AND-PATCHES.md` items 13 and 17)
- 1× a well-formed `<li class="menu-item"><a href="/doors/bespoke-doors/" class="fusion-bar-highlight"><span class="menu-text">Bespoke doors</span></a></li>` inside the top mega-menu markup

All 4 were removed. No other kept page (including `components/Header.tsx`, `components/Footer.tsx`, and every other hub's `content.html`) referenced any archived slug — confirmed by grepping the full 139-slug list against `app/` and `components/` before and after the fix, with zero matches remaining.

Two unrelated hits on the bare word "inspiration" in `app/door-styles/edwardian-doors/content.html` and `app/door-styles/georgian-doors/content.html` were checked and are plain prose ("...take inspiration from...", "...bundles of inspiration...") — not links, no change needed.

## sitemap.ts changes

`app/sitemap.ts` walks the `app/` directory at build time and lists a route for every folder containing a page marker file (`page.tsx`/`page.ts`/`page.jsx`/`page.js`/`content.html`) — so once the archived folders were moved out of `app/`, the sitemap automatically dropped to the 32 approved routes + `/thank-you/` with no manual route list to maintain. Two pre-existing bugs in that same generator were also fixed while touching this file:

1. **Duplicate routes**: directories that carry both a `page.tsx` and a legacy `content.html` (most of the still-mid-migration pages) were each emitting the route twice (73 entries instead of 37 unique). Fixed by checking once per directory instead of once per marker file.
2. **Dynamic-segment leak**: `app/blog/[slug]` was being emitted as a literal `/blog/[slug]` sitemap URL (not a real page). Fixed by skipping bracketed route-segment folders during the directory walk.

Final `sitemap()` output: 37 unique URLs (32 client pages + `/thank-you/` + the `doors/profile-doors` and `door-styles`/`doors`/etc. parent hubs already counted in the 32 — i.e. exactly the approved set, no more, no less).

## Build verification

`npm run build` (Next.js 16.3.0, Turbopack) — **0 errors**. Route output matches the approved 32 pages + `/thank-you/` + system routes (`/_not-found`, `/robots.txt`, `/sitemap.xml`) + the `/blog/[slug]` dynamic template with its 2 sample static params. No archived route appears in the build output.
