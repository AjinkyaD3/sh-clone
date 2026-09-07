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

## Completed (continued, 2)
- [x] Fixed the PRODUCTS mega-menu portal rendering as a normal visible ~480px block after the Footer on every page when closed (user-reported as "something wrong with the footer"). Root cause and fix in MISTAKES-AND-PATCHES.md item 16. Verified across homepage, about-us, and garage-doors/sectional-garage-doors

## Completed (continued, 3)
- [x] Extended the technical audit (data-bg backgrounds, missing image thumbnails, spam links) to all 194 pages on the site, not just the 40 already deep-audited. Fixed 5 more data-bg pages, 93 more missing images, and removed 2 dead links to an injected French-language gambling article found in "next post" navigation widgets. All 194 pages confirmed returning HTTP 200. Full build passes

## Completed (continued, 4) — 2026-09-07
- [x] Rebuilt the homepage hero as a real React component (`components/HeroSlider.tsx`, `components/HeroSlider.module.css`), replacing the raw jQuery/Swiper markup that was swallowing mousewheel scroll on first load (see the "Blocked on Client" mousewheel item below — recommendation #4 from that entry). `app/page.tsx` now renders `<HeroSlider />` directly instead of relying on the legacy slider JS
- [x] Fixed unconverted/mismapped background images across 9 pages found through direct use tonight: `app/content.html` (homepage), `doors/fire-resistant-doors`, `doors/profile-doors`, `garage-doors/sectional-garage-doors`, `garage-doors/side-hinged-garage-doors`, `garage-doors/sliding-garage-doors`, `grilles-shutters/high-security-shutters`, `windows/`, `projects/`
- [x] Phase 2 UX polish pass:
  - `/projects/`: the header (logo/nav) was completely invisible on this page — it's normally an absolutely-positioned overlay meant to float on a dark hero image, and `/projects` has no hero, so the header collapsed to 0 height and its white-on-white text was unreadable even where it did paint. Fixed by putting the header row back in normal document flow and giving it a light-page-scoped dark color override (`components/Header.tsx`, `isLightPage` branch) instead of the non-functional `filter: invert()` a prior pass had tried. Also fixed the post-cards filter tabs (All/Commercial/Residential), which were `display:none` by default in Avada's own CSS and only ever revealed via WordPress's runtime JS (never runs here) — added `.fusion-filters{display:flex!important}` globally in `app/layout.tsx` since this affects any page using a Fusion post-cards grid, not just `/projects`
  - `/projects/` card redesign: centered text, pinned to the bottom of each card over a gradient scrim, replacing the old fixed-pixel top-padding layout that left titles stranded in the upper-third of an oversized card
  - Homepage "Design styles" button: was only visibly readable on `:hover` (transparent background otherwise, white text nearly invisible against the hero photo) — made the hover fill color the permanent default in `app/content.html`
  - Wrapped `/projects/` in a client component (`app/projects/ProjectsClient.tsx`) to support the filter-tab interactivity (click handlers) — first page in the raw-HTML set to get this treatment; `/windows/` also touched structurally in the same pass but not yet given an equivalent client wrapper
- [x] Produced a scoping plan (see PLAN.md) for tomorrow's JSX-conversion work, prioritizing the pages above plus their sibling/hub pages sharing the same card-grid structure — see PLAN.md for the full ~30-page list and reasoning

## Found Tonight — Not Yet Fixed
- [ ] **Homepage (`app/content.html`) still contains the old raw slider markup** (`.awb-background-slider` starting around line 5486, `.tfs-slider.flexslider` around line 5602) even though `HeroSlider.tsx` now renders a real hero above it. This is very likely dead/duplicate weight sitting in the DOM (not confirmed whether it's hidden by CSS or actually double-rendering) — needs a visual check and removal as part of cleaning up `app/content.html` before/during its JSX conversion. Flagged, not fixed, per tonight's "scope and plan only" instruction

## Found During Audit — Not Yet Fixed
- [ ] `/doors/arch-doors/` references `/legacy-assets/uploads/2024/02/Bespoke-arch-doors.jpg` as a section background, but the file doesn't exist locally or on the live site (404 both places). This is one of the 3 custom-authored pages with no original WordPress source to recover the image from — needs the correct image sourced from the client, not guessed
- [ ] Same issue for the Curved Glass page (`app/doors/curved-glass-doors/`): references `/legacy-assets/uploads/2024/02/Bespoke-curved-glass.jpg`, 404s on live site too — same custom-authored-page-with-no-source situation as arch-doors
- [ ] `/legacy-assets/uploads/2015/11/avada_logo-3.png` (a 2015 Avada theme placeholder, used as a fallback background on one /projects/ card) 404s on the live site too — not a migration regression, left as-is

## ⚠️ Machine disk space is critically low
- [ ] The dev machine's C: drive was at 100% capacity (200GB total, ~1.2GB free) during this session, which caused `npm run build` to fail outright with ENOSPC. Freed ~3.5GB by deleting the disposable `.next` build cache (safe, regenerates automatically) to unblock the build, but that is a temporary fix, not a real one. This is a machine-wide issue, not specific to this project — worth checking before the next `npm run build` or `npm run dev`, especially before a presentation. Deleting `.next` again (`rm -rf .next` from the project root) is always safe if the build fails with ENOSPC again
- [x] **RESOLVED 2026-09-07** — Homepage hero slider swallows mouse-wheel/trackpad scroll input on first load — page cannot be scrolled with the wheel until some other interaction (keyboard, programmatic scroll) happens first. Only affects the homepage; other pages scroll normally. Likely cause: the real Avada jQuery + Swiper slider library actually loads and runs in this migration (confirmed both `window.jQuery` and `window.Swiper` are live), and the hero slider instance is capturing wheel events to drive slide navigation instead of letting them reach the page. This project already has a precedent fix for the same class of problem — `app/layout.tsx` force-overrides `.swiper-wrapper`/`.fusion-carousel-wrapper` into a static grid specifically because Swiper caused problems on `/projects/` after migration; the hero slider wasn't covered by that fix. Candidate fixes discussed with the client (2026-09-06), not yet implemented:
  1. (recommended) After the slider initializes, explicitly disable just its `mousewheel` control (e.g. `swiper.params.mousewheel = false`), same spirit as the existing `/projects/` Swiper override, keeping slide rotation/pagination dots working
  2. Find and flip the specific Avada data-attribute/option controlling mousewheel navigation in the scraped `content.html` itself, if one exists — more "correct" but not guaranteed to be a simple toggle
  3. Fallback: a capture-phase wheel listener in Header.tsx that intercepts before Avada's own listener and manually forces `window.scrollBy()` — safe/isolated but treats the symptom, not the cause
  4. Long-term: replace the raw jQuery/Swiper hero slider with a real React component, per this project's broader "proper componentization" plan (see MISTAKES-AND-PATCHES.md item 1) — correct direction, much larger scope than this bug warrants alone

## Blocked on Client
- [ ] GTM container ID
- [ ] Microsoft Clarity project ID
- [ ] Georgian Doors / Georgian Front Doors meta content
- [ ] Blog content confirmation
- [ ] Brochure/CTA clarification
- [ ] Contact form submission/redirect spec
