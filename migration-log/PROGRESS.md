# Secure House Migration - Progress Checklist

Update this file after every session — this is the single source of truth for "what's actually done."

## Pure-JSX conversion — remaining standard pages batch — 2026-09-10

Continuing the JSX-conversion rollout described in the entry directly below. Converted the last 9 "standard-pipeline" pages in one pass: `/about-us-v2/`, `/trade-v2/`, `/products-v2/`, `/security-levels-v2/`, `/door-styles-v2/`, `/door-styles/french-doors-v2/`, `/door-styles/victorian-doors-v2/`, `/door-styles/edwardian-doors-v2/`, `/door-styles/georgian-doors-v2/`. Per user instruction, ran the automated checks (`tsc --noEmit` + `npm run build`) after each page as I went rather than stopping for the full structural/visual verification each time — that manual pass is now batched up and pending for **all 14 not-yet-verified pages together** (the 9 above + the 5 from the previous session that were also left build-clean-but-unverified).

**One converter bug found and fixed** (see `MISTAKES-AND-PATCHES.md` item 22 for full writeup): `scripts/assemble_jsx_page.js` threw on the 4 `door-styles` children because their existing `page.tsx` files have no `metadata` export at all — not a scraping gap, a pre-existing "Blocked on Client" item (Georgian Doors meta copy never supplied). Fixed by making the metadata block optional in the assembler rather than fabricating placeholder copy; the generated `-v2` pages correctly have no metadata either, same as their originals.

- [x] `npx tsc --noEmit` clean after each of the 9 pages, individually
- [x] `npm run build` clean (exit code 0, 0 errors) with all 9 new `-v2` routes plus the existing 22
- [ ] Structural/visual verification not yet run on any of these 9 — bundled into the pending 14-page verification batch below

**Not converted yet, still needs its own individual pass (not the standard pipeline):** `/` (homepage), `/projects/` (has `ProjectsClient.tsx` wrapper), `/contact-us/` (hidden global form dependency per `PLAN.md`).

**Resume here next:**
1. Run the full structural/visual verification pass on all 14 pending pages: the 5 from 2026-09-09 evening (`/garage-doors-v2/`, `/garage-doors/tracless-garage-doors-v2/`, `/garage-doors/side-hinged-garage-doors-v2/`, `/garage-doors/sliding-garage-doors-v2/`, `/grilles-shutters/colllabsible-grilles-v2/`) plus the 9 from today.
2. After that, the only remaining unconverted pages are the 3 special-case ones (`/`, `/projects/`, `/contact-us/`) — each needs its own individual investigation/pass, not a batch pipeline run.
3. None of the 31 `-v2` pages (22 + 9) have been swapped into their live routes yet — still a separate, later decision.

## Media optimization (Phase 0 + 1 of 3) & pure-JSX conversion kickoff — 2026-09-09 (evening)

Two separate workstreams this session, both mid-flight — **resume-here notes at the bottom of each section**.

### Media optimization — video done, images explicitly deferred

Client asked for image (WebP) + video compression across the site. Reviewed a plan from another AI tool first: the asset inventory (video/image file counts and sizes) checked out as accurate, but the projected load-time/CWV numbers in it were fabricated (plausible-looking, not measured), and its plan to bulk-rewrite every image reference across 35+ files in one pass was flagged as high-risk given today's earlier bugs all came from exactly that kind of blanket find-and-replace. Agreed a safer phased plan with the client instead:

- [x] **Phase 0 — real baseline**, measured with Lighthouse against a production build (not dev mode): homepage 51/100 performance, LCP 11.6s, 58.9MB transferred; `/doors/bullet-proof-doors/` 60/100, **LCP 38.6s**, 74.3MB transferred (the 243MB uncompressed shopfront video is the obvious culprit there).
- [x] **Phase 1 — video compression**, done page-by-page with a visual frame-diff check before swapping each one in (not a blind batch script):
  - Archived 4 dead uncompressed master videos (215MB, nothing in `app/`/`components/` referenced them) to `../backup_dump/videos/` — not deleted.
  - Re-encoded the 8 actually-referenced videos (libx264, `+faststart`, audio stripped from muted background loops, kept on the one video with real audio/controls): 344.6MB → 61.2MB combined (82% reduction). Full per-file breakdown in the `perf:` commit from this session. One video (`Secure-House-Factory-compressed.mp4`) needed CRF 27 instead of the default 24 — CRF 24 actually came out *larger* than the pre-existing file, so it was already efficiently encoded; checked before assuming the standard formula would always help.
  - Re-measured after: transferred weight on `/doors/bullet-proof-doors/` dropped 76MB → 20MB, homepage 60MB → 30MB. **LCP itself did not improve on either page** (still ~38.6s / ~11.7s) — so raw video byte-size wasn't the actual LCP bottleneck; that needs separate investigation before it's called "fixed."
  - Originals of the 8 compressed videos kept in `scratch/video_originals/` pending final client sign-off before deletion.
- [ ] **Phase 2 (WebP image conversion) and Phase 3 (delete old files)** — **explicitly on hold, not started.** Client asked to stop after video and revisit images later. Do not start Phase 2 without the client re-confirming — when it does start, pilot on one page first (same discipline as the JSX work below), not a single site-wide script run.
- [ ] **The LCP-didn't-improve finding above is unresolved** — worth a real look (likely a render-blocking resource, not video weight) before telling the client "video is optimized" implies the loading-speed complaint is fully addressed. It isn't, yet.

### Pure-JSX conversion (replacing `dangerouslySetInnerHTML` page-by-page) — 22 pages done, 17 fully verified

Client's goal: convert every page's raw-HTML `content.html` + `dangerouslySetInnerHTML` into real, structurally-identical JSX — same design, same DOM, just proper React instead of an injected HTML blob. Agreed approach after discussion: a **parser-driven** converter (`scripts/html_to_jsx.js`, uses `cheerio` to walk the real DOM tree), not hand-authored JSX — a mechanical parser can't skip or misread a node the way manual rewriting can, which is exactly what caused the earlier homepage-rebuild disaster recorded elsewhere in this log. Plain `<img>` stays `<img>` (no `next/image` swap) — deliberately kept out of scope for this pass; see the reasoning already captured in this session's conversation if revisiting that decision.

Every converted page is parked at a parallel `-v2` route (e.g. `/doors/fire-resistant-doors-v2/`) — **nothing has been swapped into a live route yet.** Verification per page: `npx tsc --noEmit` clean, `npm run build` clean, then a structural diff against the live route (text length, `<img src>` count, computed `background-image` count, `<a href>` count — all must match exactly) plus a manual look for anything the counts wouldn't catch (video/iframe playback, header/footer rendering).

**Real bugs found and fixed in the converter itself during this rollout** (each one fixed globally, so already covered for every future page — not something to rediscover per page):
1. Text nodes between inline elements (e.g. `<span>Home</span> » <span>Doors</span>`) were losing their boundary whitespace because the converter `.trim()`'d every text node — the breadcrumb literally lost its spacing on the first pilot page. Fixed: whitespace is collapsed like HTML does but never trimmed at the edges, and text renders as a `` {`...`} `` expression instead of raw JSX text so JSX's own line-based whitespace rules can't touch it.
2. **The big one — see `MISTAKES-AND-PATCHES.md` item 20 for the full writeup**: every unconverted page's raw `<body class="...">` tag (inside the `dangerouslySetInnerHTML` blob) gets silently merged onto the *real* document `<body>` by the browser's HTML parser (you can't have two `<body>` elements). A real CSS rule Header/Footer depend on for text-align/font-size requires a class from that list (`fusion-body`) on an ancestor — which only worked because of this merge side-effect. A clean JSX page never renders a literal `<body>` tag, so the merge never happens and Header/Footer styling broke silently (confirmed: Footer's copyright line went left-aligned and oversized) despite `Footer.tsx` itself being completely unchanged. **Fixed once, globally, in `app/layout.tsx`'s real `<body>` tag** — every page converted since (12 of the 22) got this correct automatically with zero extra work, confirming it's a real global fix and not a one-off patch.
3. `text-align: var(--custom-property)` and other strict-enum-typed CSS properties rejected a plain `as React.CSSProperties` cast (valid CSS, not a valid `TextAlign` union member as far as TS is concerned) — now routes through `as unknown as React.CSSProperties`.
4. `aria-level` and the other numeric ARIA attributes (`aria-valuemax`, `aria-colspan`, etc.) are typed as `number` by React, not `string` like every other attribute — now emitted as `{5}` instead of `"5"`.
5. `<lite-youtube>` (a real custom-element/web-component video embed, found on `tracless-garage-doors`) needed a TypeScript module augmentation (`types/custom-elements.d.ts`) since TS doesn't know about custom elements unless declared — not a conversion bug, just an unhandled tag type until now. Worth noting: this element has no backing JS library loaded anywhere in this app, so it's inert on **both** the old and new version of that page — pre-existing gap, not something this session's conversion work changed either way.

Also built `scripts/assemble_jsx_page.js`, which pulls each page's `metadata`/body-`className`/trailing `<CTABlock/>` straight out of its existing `page.tsx` via regex rather than having them retyped by hand — removed a real transcription-risk once this became a repeated, many-pages-per-session operation.

**Pages done, in order:**
- Pilots (2): `/doors/fire-resistant-doors-v2/`, `/doors/panic-room-doors-v2/` — fully verified.
- Batch of 5: `/doors/high-security-doors-v2/`, `/doors/communal-entrance-doors-v2/`, `/doors/profile-doors/unico-slim-line-v2/`, `/windows/high-security-steel-windows-v2/`, `/garage-doors/sectional-garage-doors-v2/` — fully verified.
- Batch of 10: `/doors-v2/`, `/doors/bullet-proof-doors-v2/`, `/doors/profile-doors-v2/`, `/doors/profile-doors/fuego-fire-v2/`, `/doors/profile-doors/presto-bullet-proof-v2/`, `/doors/profile-doors/stainless-steel-v2/`, `/windows-v2/`, `/windows/security-aluminium-windows-v2/`, `/grilles-shutters-v2/`, `/grilles-shutters/high-security-shutters-v2/` — fully verified.
- Batch of 5 (**generated + typecheck/build clean, structural verification NOT yet run — do this first tomorrow**): `/garage-doors-v2/`, `/garage-doors/tracless-garage-doors-v2/`, `/garage-doors/side-hinged-garage-doors-v2/`, `/garage-doors/sliding-garage-doors-v2/`, `/grilles-shutters/colllabsible-grilles-v2/`.

**Not started yet** (remaining from the 32 client-approved pages, minus `/blog/` which is already pure JSX): `/` (homepage — deliberately saved for its own careful pass given its size/history, see the JSX-rebuild incident elsewhere in this log), `/projects/` (has a client-component wrapper, `ProjectsClient.tsx` — needs thought about how that interacts with the converter, not a plain server-rendered page like the others), `/contact-us/` (PLAN.md flags a "hidden global form dependency" here — treat carefully, don't just run the standard pipeline), `/about-us/`, `/trade/`, `/products/`, `/security-levels/`, `/door-styles/` (+ its 4 children: french-doors, victorian-doors, edwardian-doors, georgian-doors).

**Resume here tomorrow:**
1. Run the structural verification pass on the 5 generated-but-unverified pages above (this was paused, not skipped, at the user's request to stop for the day).
2. Then continue rolling out to the remaining ~13 pages, saving `/`, `/projects/`, and `/contact-us/` for their own careful individual passes rather than the standard batch pipeline.
3. None of the 22 `-v2` pages have been swapped into their live routes yet — that's a separate, later decision, not part of this rollout.

## Follow-up fixes from client feedback — 2026-09-09 (later)

Client reported a batch of visual issues after the verification pass above. Root-caused and fixed each:

- [x] **Dual/repeating footer with mismatched years (2024/2025 vs 2026) on `/doors`, `/windows`, `/garage-doors`, `/door-styles`, `/grilles-shutters`.** These 5 hub pages still had a complete second footer (nav menus, address, copyright bar) baked directly into their own `content.html`, left over from before Header/Footer were extracted into shared components — it rendered alongside the real global `<Footer/>`. Deleted the embedded footer block from all 5 files (everything outside the page's own `<section id="content">`).
- [x] **Card titles unreadable on `/doors`, `/windows`, `/garage-doors`.** Each card already carried the real white scrim gradient in `--awb-inner-bg-image` (set inline in the original scrape) but nothing ever applied it — only the photo painted. Added `.fusion-column-liftup-border > .fusion-column-wrapper { background-image: var(--awb-inner-bg-image); }` in `app/layout.tsx` to restore the white gradient strip behind the text, matching the live site exactly (rather than just recoloring the text).
- [x] **Glow/heavy shadow around "Our projects" heading on `/projects`.** The Phase 2 `text-shadow` legibility rule (meant for real photo heroes) was also matching this heading because its wrapper technically has `.fusion-column-has-bg-image` (a small decorative 2015 logo, not a hero). Marked that element `.fusion-decorative-bg` and excluded it, along with excluding all `.fusion-column-liftup-border` card titles (which now have their own white backing from the fix above and don't need a black shadow).
- [x] **Self-hosted YouTube videos rendering on top of the section after them** (6 pages: panic-room-doors, profile-doors/stainless-steel, sectional-garage-doors, sliding-garage-doors, tracless-garage-doors, grilles-shutters/security-shutters). The standard responsive-iframe `padding-top: X%` trick needs `position:relative` on the wrapper + `position:absolute` on the iframe — that CSS was never migrated. Added it globally for `.fluid-width-video-wrapper`.
- [x] **Collapsed parallax banner ("just a line") above the gallery on `/doors/high-security-doors`.** An earlier automated "fix the lazy background image" pass had overwritten that section's entire `style` attribute with just `background-image`, discarding the padding-top/bottom (278px/252px) and `background-attachment:fixed` that gave it its height — pre-existing, not from this session's earlier work. Restored the exact values from the live site.
- [x] **Header overlapping the breadcrumb on `/doors/profile-doors/*` sub-pages** (unico-slim-line, stainless-steel, fuego-fire, presto-bullet-proof). `Header.tsx` already has an `isLightPage` mode (solid header instead of transparent-over-hero) built for exactly this situation but hardcoded to only `/projects`. Extended it to also cover `/doors/profile-doors/*`, which have no hero image under the header either.
- [x] `npm run build` passes clean (0 errors) after all fixes; spot-checked every affected page in-browser.

**Investigated, not changed:**
- `/doors/communal-entrance-doors` (and similar) feeling "flat"/missing animation: this is a direct tradeoff of the `.fusion-animated { visibility: visible !important; }` fix from the earlier pass today — content now appears instantly instead of fading/sliding in via Avada's scroll-triggered JS (which never runs here). Not broken, just simpler; real scroll-in animations would be a separate, bigger piece of work if wanted.
- The `<CTABlock>` sections on panic-room-doors/high-security-doors/etc. ("Create Your Ultimate Safe Space", "Protect What Matters Most") are **intentional** — they're part of the "12 CTAs inserted" item already marked complete earlier in this log, not scraping artifacts. Left in place.

## Full verification pass against live site — 2026-09-09

Compared every one of the 32 approved pages (local vs. `secure-house.co.uk`) to confirm the same-day head-cleaning/CSS-extraction work (see `3cc0209`) hadn't broken anything, and to catch any pre-existing gaps while at it. Method: diffed each page's `content.html` against the pre-cleanup backups in `scratch/backup_before_root_styles/` (img/video/text sets) to isolate today's-work regressions, then separately fetched every local route and its live counterpart and diffed image/video filenames (spam-stripped) to catch anything else.

- [x] **Confirmed today's cleanup introduced zero regressions** — 0 images, videos, or text removed across all 35 backed-up `content.html` files.
- [x] **Fixed (pre-existing, not from today's work): 3 blank gallery images on `/doors/fire-resistant-doors/`** — the gallery `<img>` tags never had a real `src` captured during the original scrape (blank SVG placeholder only, no `data-orig-src`/`bv-data-src` fallback). Downloaded the 2 missing source images from the live site and wired all 3 `src` attributes to the local files.
- [x] **Fixed a sitewide bug affecting 23 pages: Fusion image galleries never showed any images.** Avada's own CSS sets `.fusion-gallery-column { display: none }` by default and only reveals columns via isotope/imagesloaded JS that never runs in this static migration. Added a global override in `app/layout.tsx` (`display:block; float:left` + a clearfix) — matches the existing precedent fix for `.fusion-filters`.
- [x] **Fixed a second sitewide bug affecting 7 pages (about-us, grilles-shutters, doors/communal-entrance-doors, garage-doors/sectional-garage-doors, garage-doors/tracless-garage-doors, grilles-shutters/colllabsible-grilles, windows/security-aluminium-windows): Avada's scroll-triggered entrance animations left content permanently invisible.** Elements with class `fusion-animated` start `visibility:hidden` and are only revealed by an IntersectionObserver JS that never runs here. Added `.fusion-animated { visibility: visible !important; }` to `app/layout.tsx`.
- [x] **Restored a genuinely missing section on `/garage-doors/sectional-garage-doors/`**: 4 product-variant cards (R40 Sectional, TL Sectional, SHD Side Hinged Doors, SSD Side Sliding Doors) were never scraped at all (confirmed absent even in the pre-cleanup backup). Extracted the section from the live site (it's a JS "scroll-stack" Avada widget — flattened to plain stacked static content, consistent with how this project already neutralizes Swiper carousels elsewhere), rewrote asset paths to `/legacy-assets/`, downloaded the 4 missing product images, and inserted it. Needed the `fusion-animated` fix above to actually become visible.
- [x] `npm run build` passes clean (0 errors) after all fixes.

**Not fixed — flagged for client/user review:**
- [ ] `/grilles-shutters/security-shutters/` has a "Profile Dimension" spec-sheet block (5 images) on the live site that only exists inside a WordPress popup/modal (Avada popup-builder markup, triggered by a click, not part of normal page flow). Did not attempt to reconstruct this as it's modal-only content and reconstructing the trigger + modal behavior is a larger scope than a content-restoration fix.
- [ ] Several images referenced on the live site under names like `Mask-group-24-1.png` / `5c30b3dcfadeb5db39270168b7befd1f-1-1.png` etc. don't match our local filenames exactly (`Mask-group-24.png` / `...-1-1.png` vs `...-1.png`). Investigated multiple cases — in every case the section already renders correctly locally with different (older or differently-suffixed) revisions of essentially the same image; this is WordPress re-upload filename drift on the live site post-scrape, not missing content. Not changed.

## Site scope reduced to 32 client-approved pages — 2026-09-08

The client's own audit spreadsheet approved exactly 32 pages as the official site (see full list and reasoning in `PLAN.md`'s "Scope" section, and the full move manifest in `SCOPE-REDUCTION-2026-09-08.md`). All other page folders — 133 top-level (the ~120 fire-door/blog-style article pages, `inspiration/` and its 20 sub-pages, and assorted one-off pages) plus 6 `doors/` sub-pages not on the client list (`arch-doors`, `bespoke-doors`, `curved-glass-doors`, `industrial-style-doors`, `premium-high-security-doors`, `stained-glass-doors`) — were **moved (not deleted)** from `app/` into a new top-level `_archive/` folder, fully recoverable if the client re-approves any of them later.

- [x] Categorized all ~150 page folders as KEEP/ARCHIVE against the client spreadsheet, confirmed with the client before moving anything
- [x] Moved 139 folders into `_archive/`, preserving structure
- [x] Found and fixed the only dead-link fallout: `app/doors/content.html`'s off-canvas/mega-menu markup had 4 stray links to the now-archived `/doors/bespoke-doors/` — removed. Confirmed via full 139-slug grep across `app/` and `components/` that no other kept page links to an archived route
- [x] `sitemap.ts` (which dynamically walks `app/`) now emits exactly 37 routes (32 approved pages + `/thank-you/`) with no manual list needed — also fixed two pre-existing bugs found while touching it: duplicate route entries for pages with both `page.tsx` and `content.html`, and a literal `/blog/[slug]` template URL leaking into the sitemap
- [x] `npm run build` passes clean (0 errors) with the reduced route set

**Effect on the phased JSX-conversion plan below**: the pure-JSX conversion work (Phases 1-4, and the "31-page family" reprioritization in `PLAN.md`) now only needs to cover the 32 approved pages, not the full ~194-page site. Any phase/batch item referencing an archived page (e.g. any of the 6 removed `doors/` sub-pages) is no longer in scope. See `PLAN.md` for the updated scope note.

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
