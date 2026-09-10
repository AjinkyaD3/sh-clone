# Live verification batch 2 — post-swap in-browser check (12 pages)

All 12 pages checked directly in a real browser tab (not just curl/build checks): navigated, checked console for errors, screenshotted. All clean.

## Stainless Steel (`/doors/profile-doors/stainless-steel`)
- [x] OK — no console errors. Breadcrumb, hero, and embedded YouTube video (Forster Profile Systems) all render correctly.

## Unico Slim Line (`/doors/profile-doors/unico-slim-line`)
- [x] OK — no console errors. Correct breadcrumb, title, and spec comparison table render correctly. (Note: a screenshot taken immediately after `navigate` briefly caught the previous page's content mid-transition — a timing artifact of client-side navigation, not a real bug. Re-verified with a fresh screenshot + `document.title`/`location.href` check: both correct.)

## Door Styles (hub) (`/door-styles`)
- [x] OK — no console errors, tab title "Door styles - Secure House", hero image renders correctly.

## Edwardian Doors (`/door-styles/edwardian-doors`)
- [x] OK — no console errors. Hero, breadcrumb, and body content render correctly.

## French Doors (`/door-styles/french-doors`)
- [x] OK — no console errors. Hero, breadcrumb, and body content render correctly.

## Georgian Doors (`/door-styles/georgian-doors`)
- [x] OK — no console errors. **Verified real SEO metadata survived the swap**: tab title is "Georgian Front Doors UK – Bespoke Designs & High Security" (not generic "Secure House").

## Victorian Doors (`/door-styles/victorian-doors`)
- [x] OK — no console errors. Hero, breadcrumb, and body content render correctly.

## Garage Doors (hub) (`/garage-doors`)
- [x] OK — no console errors. Hero ("Premium Garage Doors & Installation in the UK") and product-family card grid render correctly.

## Sectional Garage Doors (`/garage-doors/sectional-garage-doors`)
- [x] OK — no console errors. **Verified the duplicate-content fix survived the route swap**: `document.querySelectorAll('h4')` filtered for "R40 Sectional" text returns exactly **1** match (was previously rendering twice before the fix).

## Side Hinged Garage Doors (`/garage-doors/side-hinged-garage-doors`)
- [x] OK — no console errors. Hero, breadcrumb, and feature cards (Insulated construction, Safe and secure, Custom split) render correctly.

## Sliding Garage Doors (`/garage-doors/sliding-garage-doors`)
- [x] OK — no console errors. Hero, breadcrumb, and feature cards render correctly.

## Tracless Garage Doors (`/garage-doors/tracless-garage-doors`)
- [x] OK — no console errors. Hero, breadcrumb, and feature grid (Rises upwards, Folds in half, Rotates under the ceiling, etc.) render correctly.

---

## Summary
**12/12 pages checked, 0 issues found.** All render correctly with clean consoles post-swap. Both targeted checks passed: Sectional Garage Doors' duplicate-heading fix is intact (1 occurrence, not 2), and Georgian Doors' real SEO title metadata is intact post-swap. One transient screenshot-timing false alarm on Unico Slim Line, resolved by re-checking (not a real bug).
