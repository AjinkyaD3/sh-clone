# Secure House Next.js — Comprehensive Improvement, Dead Code & Mobile Responsiveness Roadmap

This master document provides an end-to-end prioritized breakdown of:
1. **Dead code and bloat that can be immediately purged** (backed by codebase scans).
2. **Launch-blocking functional gaps & lead generation fixes**.
3. **UX, content, and accessibility enhancements**.
4. **Performance, Core Web Vitals (LCP), and media optimizations**.
5. **Code refactoring and modern architectural improvements**.
6. **Sitewide Mobile Responsiveness Strategy & Global Cascading Implementation Plan**.

---

## Part 1: Dead Code & Removable Bloat (Verified via Live Scan)

### 1. The `app/legacy/` Directory (35 Dead Routes, 71 Files) — DONE 2026-09-13
- **The Reality**: All 35 client-approved pages are now 100% real JSX at their live routes. The entire `app/legacy/` folder is obsolete.
- **The Problem**: Next.js compiles every route inside `app/legacy/` on every build. `npm run build` generates **79 routes instead of 44**. TypeScript spends **82 seconds** type-checking these duplicate pages, and the `.next` build cache exceeds **1.0 GB**.
- **Action Required**:
  - [x] Move `app/legacy/` out of `app/` into an external backup outside the repo, or delete it entirely. — Moved (not deleted) to `../archive/app-legacy`, outside the project folder entirely, per the client's own preference to keep a reference rather than lose it.
  - [x] Remove `/legacy` exclusions from [`app/robots.ts`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/robots.ts) and [`app/sitemap.ts`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/sitemap.ts). — Done, both files no longer reference `/legacy` at all.
  - [ ] **Expected Impact**: Cuts build and TypeScript check time by ~50% (from 82s to ~35s) — not independently re-measured.

### 2. Dead Tracking Scripts with Dummy IDs in [`app/layout.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/layout.tsx#L501-L524)
- **The Reality**: The root layout runs two analytics scripts with placeholder dummy IDs on **every single page load**:
  ```tsx
  // Google Tag Manager with dummy ID
  gtm.js?id=GTM-XXXXXXX
  // Microsoft Clarity with dummy ID
  clarity.ms/tag/CLARITY-XXXXXXX
  ```
- **The Problem**: Every visitor's browser makes actual HTTP requests to Google Tag Manager and Microsoft Clarity for non-existent containers, resulting in failed 404 network requests and console errors.
- **Action Required**:
  - [ ] Remove both dummy script blocks or gate them behind environment variables (`process.env.NEXT_PUBLIC_GTM_ID`).

### 3. `scratch/` Directory (363.66 MB Tracked in Git) — DONE 2026-09-13
- **The Reality**: The `scratch/` folder contains:
  - **280+ MB** of uncompressed raw `.mp4` videos in `scratch/video_originals/` (compressed versions are already live in `public/`).
  - **80+ MB** of old HTML backups (`backup_before_items_1_to_5`, `head_clean_backup`, etc.).
  - 34 one-off migration and test scripts.
- **The Problem**: `scratch/` is **not in `.gitignore`** and is actively tracked by Git. Every clone, push, and deploy drags 363 MB across the network.
- **Action Required**:
  - [x] Add `scratch/` to [`.gitignore`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/.gitignore).
  - [x] Untrack from git: `git rm -r --cached scratch/`. — Handled as part of moving the folder out entirely (git recorded it as ~364MB of deletions).
  - [x] Move original video archives out of the project repository. — Whole `scratch/` folder moved to `../archive/scratch`, outside the project.

### 4. Unused Assets in `public/legacy-assets/uploads/` — DONE 2026-09-13 (166 files, not 221 — see note)
- **The Reality**: A script checking all live JSX and CSS files proved that **221 files in uploads are never referenced anywhere in code** (leftovers from the 150 archived pages).
- **Corrected figure**: re-derived independently with a purpose-built script (`scripts/find_unreferenced_uploads.js`) that scans every `.tsx`/`.ts`/`.css`/`.html` file under `app/`, `components/`, and every compiled CSS bundle under `public/` (images are referenced from inside those bundles too, not just JSX) — found **166** genuinely unreferenced files (62MB), not 221. Not chasing the discrepancy further since this figure is independently verified rather than trusted from the original claim.
- **Corrupted / Invalid Scraper Artifacts Found** (not yet separately verified against the new 166 list):
  - **3 `.heic` files (6.65 MB)**: `IMG_2238.heic`, `IMG_6231.heic`, `IMG_6232.heic` (Apple format unreadable by standard browsers).
  - **2 `.png,` files (2.74 MB)**: Saved with a literal trailing comma in the file extension.
- **Action Required**:
  - [x] Purge or archive the unreferenced assets. — Moved (not deleted) to `../archive/unreferenced-uploads/`, preserving folder structure; full list at `../archive/unreferenced-uploads-list.txt`.
  - [x] Checked the `.heic` / `.png,` files specifically: **the 2 `.png,` files were genuinely unreferenced and got moved with the rest.** The 3 `.heic` files were NOT moved and are NOT dead code - they're actually referenced by `components/garage-doors/side-hinged-garage-doors/Row14.tsx`, meaning `/garage-doors/side-hinged-garage-doors` is currently rendering `<img>` tags pointing at `.heic` files, which no standard browser can display. This is a real, separate bug (broken images on a live page), not a cleanup item - left untouched since it wasn't part of what was asked this round, but worth fixing: either convert those 3 source photos to `.jpg`/`.png` or swap in different images.

### 5. Misplaced Production Dependency in [`package.json`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/package.json#L12) — DONE 2026-09-13
- **The Reality**: `"cheerio": "^1.2.0"` is listed under runtime `"dependencies"`.
- **The Problem**: Cheerio is only used in offline build/migration scripts (`scripts/html_to_jsx.js`). It is never imported in `app/` or `components/`. It needlessly bloats the production bundle and Vercel serverless containers.
- **Action Required**:
  - [x] Move `cheerio` to `"devDependencies"`. — Done, `package-lock.json` regenerated to match.

### 6. Dead Easy-Digital-Downloads (EDD) CSS Across Every Page
- **The Reality**: Every page template contains:
  ```tsx
  <link key="pl0" rel="stylesheet" href="/legacy-assets/plugins/easy-digital-downloads/includes/blocks/assets/css/edd-blocks.css" />
  <link key="pl1" rel="stylesheet" href="/legacy-assets/plugins/easy-digital-downloads/assets/build/css/frontend/edd.min.css" />
  ```
- **The Problem**: Secure House is a high-security physical door and window fabricator, not an e-commerce digital downloads store. EDD was a WordPress plugin leftover. These two CSS files block page rendering on all 35 pages for zero benefit.
- **Action Required**:
  - [ ] Remove both EDD `<link>` tags across all page files.

### 7. Scraper Dumps in Project Root — DECLINED 2026-09-13
- [x] ~~Delete `all url.txt` (1.5 KB scrape dump).~~ **Explicitly kept, per user instruction ("don't delete all your .txt and chat.txt").** Left untouched at the project root.
- [x] ~~Clean or delete `chat.txt` (temporary CLI log).~~ Same - explicitly kept, not touched.

---

## Part 2: Launch Blockers & Critical Lead-Gen Gaps (Must-Fix)

### 1. Contact Form Backend & Email Delivery — MOSTLY DONE 2026-09-13 (needs a real API key)
- **Target File**: [`app/contact-us/page.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/contact-us/page.tsx#L148-L220)
- **Current State**: The only `<form>` on the entire site posts to `/contact-us` with no API route or server action. Submitting the form silently reloads the page with zero data captured.
- **Business Impact**: **Critical revenue blocker**. For a bespoke security door business, every lost inquiry is thousands of pounds in lost sales.
- **Action Required**:
  - [x] Build an API route (`app/api/enquiry/route.ts`) — shared by this form and the new "Get a Quote" panel.
  - [x] Integrate transactional email (Resend) — code is live; blocked only on a real `RESEND_API_KEY` (see `.env.example`), returns a clean "not configured" error until then instead of failing silently.
  - [x] Add client feedback states (submitting spinner, success confirmation alert, error toast) — done on both forms.
  - [ ] Add spam prevention (honeypot field or Cloudflare Turnstile) — not done yet.

### 2. Implement Real Sticky Header — DONE 2026-09-13
- **Target File**: [`components/Header.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/components/Header.tsx#L188-L192)
- **Current State**: Markup uses `.fusion-sticky-container`, but remains `position: absolute` at all scroll depths. It scrolls completely off-screen on longer pages.
- **Business Impact**: Visitors scrolling through long product showcases (often 5,000–8,000px tall) lose access to the site navigation, phone numbers (+44 20 7859 4207), and the Products menu.
- **Action Required**:
  - [x] Add CSS `position: sticky` or a lightweight scroll listener in `Header.tsx`. — Real scroll-direction-aware dock/hide/reveal behavior implemented, across every page including the light-header routes (`/projects`, `/doors/profile-doors/*`).
  - [x] Apply a compact layout and frosted/solid background when `scrollY > 150`. — Docks with the site's own translucent sticky background color.
  - [x] Ensure correct z-index layering above page elements without obstructing modals. — Verified no conflicts with the mobile menu, Get-a-Quote panel, or Tawk.to widget.

### 3. Restore Broken Links on Door Styles Hub
- **Target File**: [`app/door-styles/page.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/door-styles/page.tsx#L116-L150)
- **Current State**: The 4 main style cards (French Doors, Victorian Doors, Edwardian Doors, Georgian Doors) render as unclickable `<div>` elements without any `<a>` or `<Link>` tags.
- **Business Impact**: Complete dead-end on `/door-styles`. Visitors cannot reach child style pages.
- **Action Required**:
  - [ ] Wrap each style card in `<Link href="/door-styles/...">`.

### 4. Custom 404 / 500 Pages & 301 Wildcard Redirects
- **Target Files**: `app/not-found.tsx` (to create), [`next.config.ts`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/next.config.ts)
- **Current State**: Generic unstyled Next.js 404 page is rendered. When site scope was reduced from 194 to 32 pages, ~150 URLs were archived with no redirects.
- **Business Impact**: Severe SEO hazard. Backlinks and indexed Google URLs to old blog posts, archived inspiration galleries, and legacy product variants return raw 404s, shedding domain authority and traffic.
- **Action Required**:
  - [ ] Create an on-brand `app/not-found.tsx` with links to primary categories.
  - [ ] Add wildcard redirects in `next.config.ts`:
    - `/doors/arch-doors` → `/doors`
    - `/doors/stained-glass-doors` → `/doors`
    - Archived blog URLs → `/blog`
    - Archived inspiration URLs → `/projects`

### 5. Security Response Headers
- **Target File**: [`next.config.ts`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/next.config.ts)
- **Current State**: Empty configuration object. Missing standard browser hardening headers.
- **Action Required**:
  - [ ] Configure `headers()` in `next.config.ts`:
    - `X-Frame-Options: SAMEORIGIN`
    - `X-Content-Type-Options: nosniff`
    - `Referrer-Policy: strict-origin-when-cross-origin`
    - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
    - Content Security Policy (CSP).

---

## Part 3: UX, Content & Accessibility Enhancements

### 1. Missing Page Metadata on French & Edwardian Doors — DONE 2026-09-13
- **Target Files**: 
  - [`app/door-styles/french-doors/page.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/door-styles/french-doors/page.tsx)
  - [`app/door-styles/edwardian-doors/page.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/door-styles/edwardian-doors/page.tsx)
- **Action Required**: Add complete `Metadata` exports with optimized title, description, and canonical tags. — Done, matching the pattern every sibling door-style page already used. Also fixed sitewide: every page's canonical was pointing at the Vercel preview domain instead of `secure-house.co.uk` - see `CHANGES-NEEDED.md`.

### 2. Missing Spec Sheets (PDFs) & Quote Forms on 4 Profile-Door Pages
- **Target Files**:
  - [`app/doors/profile-doors/fuego-fire/page.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/doors/profile-doors/fuego-fire/page.tsx)
  - [`app/doors/profile-doors/presto-bullet-proof/page.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/doors/profile-doors/presto-bullet-proof/page.tsx)
  - [`app/doors/profile-doors/stainless-steel/page.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/doors/profile-doors/stainless-steel/page.tsx)
  - [`app/doors/profile-doors/unico-slim-line/page.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/doors/profile-doors/unico-slim-line/page.tsx)
- **Current State**: Original WordPress pages had downloadable technical spec sheets by fire rating (EI30, EI60, EI90, EI120) and quote forms.
- **Action Required**:
  - [ ] Place original spec PDFs in `public/downloads/` and render clean download buttons.
  - [ ] Connect quote buttons to the contact inquiry flow.

### 3. Non-Functional "See More" Gallery Buttons on 16 Pages
- **Target Files**: 16 pages including [`app/doors/bullet-proof-doors/page.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/doors/bullet-proof-doors/page.tsx).
- **Action Required**: Verify that `GalleryLoadMore.tsx` covers all 16 pages, or hide buttons where all images are already visible.

### 4. Homepage Hero Slider Mousewheel Trap
- **Target Files**: [`components/HeroSlider.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/components/HeroSlider.tsx), [`app/page.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/page.tsx)
- **Action Required**: Ensure passive wheel event listeners without `preventDefault()`, allowing natural downward page scrolling.

---

## Part 4: Performance & Core Web Vitals (LCP Optimization)

### 1. Image Optimization & WebP Conversion (Phase 2 Media Plan)
- **Target Scope**: Images in `public/legacy-assets/uploads/` (currently taking 1.05 GB).
- **Action Required**:
  - [ ] Convert legacy PNG and JPEG assets to WebP using a batch script.
  - [ ] Pilot on 3 pages first, verify pixel accuracy, then deploy sitewide.
  - [ ] **Expected Impact**: Cuts image payload by 60%–80% (from 1.05 GB down to ~200 MB).

### 2. Fix Largest Contentful Paint (LCP) Bottlenecks
- **Current Benchmark**: Homepage LCP ~11.6s; Bullet Proof Doors LCP ~38.6s.
- **Action Required**:
  - [ ] Add `<link rel="preload" as="image">` for above-the-fold hero images.
  - [ ] Self-host fonts via `next/font/google` to eliminate render-blocking Google Font lookups.
  - [ ] Clean up blocking stylesheets in page headers.

### 3. Sitewide Automated Lighthouse Audit
- **Action Required**:
  - [ ] Create `scripts/run_lighthouse_audit.js` to run headless audits across all 36 live routes.
  - [ ] Output a persistent report to `migration-log/LIGHTHOUSE-AUDIT.md`.

---

## Part 5: Code Cleanliness & Architecture Refactoring

### 1. Extract 450-line Inline `<style>` Block from [`app/layout.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/layout.tsx#L38-L495)
- **Action Required**: Move raw CSS overrides from `layout.tsx` into a structured stylesheet (`app/theme-overrides.css` or `styles/patches.css`). Enables browser caching and keeps `RootLayout` clean.

### 2. Replace External Google Font Links with `next/font/google`
- **Target Files**: [`app/layout.tsx`](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/app/layout.tsx#L23-L32) and individual page templates.
- **Action Required**: Configure Montserrat, Playfair Display, and Megrim using `next/font/google`. Eliminates external roundtrips and Cumulative Layout Shift (CLS).

### 3. Remove 0-Opacity SVG Spacer Bloat
- **Target Files**: All converted JSX pages.
- **Action Required**: Clean up redundant `<img className="fusion-empty-dims-img-placeholder" src="data:image/svg+xml,...">` tags left over from WordPress lazy-loading.

---

## Part 6: Sitewide Mobile Responsiveness Master Plan

> **Full Low-Level Technical Specification**:  
> For the complete rule-by-rule CSS specification, exact selector chains, fluid `clamp()` formulas, touch target sizes, and per-archetype breakdowns, see **[MOBILE-RESPONSIVE-SPEC.md](file:///c:/Users/AJINKYA/OneDrive/Desktop/SH%20NEXT%20JS/secure-house-nextjs/migration-log/MOBILE-RESPONSIVE-SPEC.md)**.

### Why the 34 Sub-Pages Break on Mobile Right Now

WordPress/Avada relied heavily on dynamic JavaScript runtime calculations to adjust styling per screen width. Without that JS running in this static Next.js export:
1. **Responsive Typography Failure**: Headings specify `--fontSize: 50` in inline styles. The missing Avada JS was supposed to downscale this on resize. In Next.js, a 50px heading remains 50px on a 390px iPhone, wrapping awkwardly or blowing out the viewport.
2. **Desktop Padding Traps**: Many sections have hardcoded inline styles like `padding: 0 200px` or `padding-top: 320px`. On desktop (1920px), this centers the text. On a 390px mobile screen, `padding: 0 200px` leaves **negative 10px** for content.
3. **104% Row Widths with Negative Margins**: Almost every row has `width: 104% !important; margin-left: -2%`. On mobile, this causes an unwanted horizontal scrollbar / horizontal wobble.
4. **Multi-Column Grids Not Stacking**: 2-column, 3-column, and 4-column specifications stay squished side-by-side rather than stacking into a clean 1-column layout.

---

### Implementation Architecture: The "Global Cascading Foundation"

Instead of manually editing 35 separate JSX files (which takes weeks and risks desktop regressions), **90% of all mobile responsiveness issues can be resolved with a single, structured responsive stylesheet**, followed by spot-verifying unique page widgets.

#### Step 1: Normalize Containers & Kill Horizontal Scroll
Apply strict container resets for screens `< 768px`:
```css
@media only screen and (max-width: 768px) {
  html, body {
    overflow-x: hidden !important;
    width: 100% !important;
    position: relative;
  }

  /* Reset 104% row compensation to safe 100% */
  .fusion-builder-row,
  .fusion-builder-row-inner {
    width: 100% !important;
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  /* Tame oversized section horizontal padding (down to 16px-20px) */
  .fusion-fullwidth {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}
```

#### Step 2: Implement Fluid Typography via `clamp()`
Replace Avada's missing dynamic font JS with modern CSS `clamp()`:
```css
@media only screen and (max-width: 768px) {
  h1,
  .fusion-title-heading.fusion-responsive-typography-calculated,
  .fusion-title-size-one h1 {
    font-size: clamp(26px, 7vw, 34px) !important;
    line-height: 1.25 !important;
    word-break: break-word;
  }

  h2,
  .fusion-title-size-two h2 {
    font-size: clamp(22px, 6vw, 28px) !important;
    line-height: 1.3 !important;
  }

  h3,
  .fusion-title-size-three h3 {
    font-size: clamp(18px, 5vw, 22px) !important;
    line-height: 1.35 !important;
  }

  p, .fusion-text {
    font-size: 16px !important;
    line-height: 1.6 !important;
  }
}
```

#### Step 3: Automatic Column Stacking (100% Width)
Force all multi-column rows to stack vertically into 1 column on mobile devices:
```css
@media only screen and (max-width: 768px) {
  .fusion-layout-column:not(.fusion-no-small-visibility),
  .fusion_builder_column:not(.fusion-no-small-visibility),
  .fusion_builder_column_inner:not(.fusion-no-small-visibility) {
    width: 100% !important;
    max-width: 100% !important;
    flex: 0 0 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-bottom: 24px !important;
  }

  /* Scale down excessive hero top padding (e.g. 320px down to 110px) */
  .fusion-builder-row-3 .fusion-layout-column,
  .fusion-layout-column[style*="--awb-padding-top: 3"],
  .fusion-layout-column[style*="--awb-padding-top: 2"] {
    --awb-padding-top: 110px !important;
    padding-top: 110px !important;
  }
}
```

#### Step 4: Tables, Specifications & Cards
1. **Specification Tables**: Enable horizontal scrolling for wide technical data:
   ```css
   @media only screen and (max-width: 768px) {
     .fusion-table-builder, table {
       display: block !important;
       width: 100% !important;
       overflow-x: auto !important;
       -webkit-overflow-scrolling: touch;
     }
   }
   ```
2. **Product Grid Cards**: Ensure product cards stack cleanly with 280px min-height.
3. **Galleries**: Display 2 columns on mobile instead of 4–6 micro-columns.

#### Step 5: Tablet Breakpoint Handling (641px – 1024px)
- 2 columns for card grids instead of 1.
- Mobile menu overlay padding adjusted to `60px 40px` instead of desktop `130px`.

#### Step 6: 5-Archetype Verification Strategy
Audit and verify the responsive foundation against the 5 primary template patterns:
1. **Homepage** (`/`): Hero slider, trust marquee, video banner, project cards.
2. **Category Hub** (`/doors`, `/windows`, `/garage-doors`, `/door-styles`): Product card grids.
3. **Product Detail Page** (`/doors/bullet-proof-doors`, `/doors/fire-resistant-doors`): Specs tables, accordions, galleries.
4. **Listing Page** (`/projects`, `/blog`): Filter tabs, card grids.
5. **Form Page** (`/contact-us`): Field widths, labels, submit button.

---

*Last Updated: 2026-09-13 - see checked-off items above for what's since been done; everything else in this document is still accurate and pending.*
