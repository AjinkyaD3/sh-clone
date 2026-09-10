# Live Verification — Batch 3 (11 pages) — post-swap smoke test

Method: navigated each live route (no `/new/` prefix — these are the real routes now, post-swap), checked console for errors, took one screenshot to confirm real rendered content (not blank/broken), plus targeted functional checks per page as directed.

## Grilles Shutters (hub) (`/grilles-shutters`)
- OK — no issues, console clean, hero/cards render correctly.

## Colllabsible Grilles (`/grilles-shutters/colllabsible-grilles`)
- OK overall — console clean, page renders correctly (breadcrumb, hero, "Collapsible security grilles" intro, feature-card grid all visible).
- [ ] Could not confirm the scroll-reveal animation actually fires: after scrolling the `.fusion-scroll-section` into view and waiting 2s, 0/4 `.swiper-slide` elements had the `scroll-revealed` class (still at opacity 0 per the CSS). Checked why: `document.visibilityState === "hidden"` and `document.hasFocus() === false` on this tab — it was backgrounded by other concurrent browser tabs/tasks during this verification run, which is a known artifact that throttles `IntersectionObserver` browser-wide (already documented in this project's own migration log from earlier testing). Not treating this as a confirmed regression — the underlying markup (4 slide elements, correct classes) is intact and unchanged by the file move; just could not get a real "it fires" confirmation in this run. Worth a quick re-check in a focused/foreground tab if certainty is needed.

## High Security Shutters (`/grilles-shutters/high-security-shutters`)
- OK — no issues, console clean, hero/feature grid render correctly. (Note, not a bug: hero image has a leftover "SPONSOR THIS SIGN - YOUR LOGO HERE" placeholder watermark baked into the source photo itself — pre-existing content, unrelated to the swap, not flagging as an issue.)

## Security Shutters (`/grilles-shutters/security-shutters`) — not converted, unaffected by swap
- OK — loads fine, console clean, renders correctly. Confirmed unaffected by the route swap, as expected.

## Products (`/products`)
- OK — no issues, console clean. Category tabs (Security doors/Windows/Security shutters/Garage doors) and card grid render correctly.

## Projects (`/projects`)
- OK — no issues, console clean. Filter-tab interactivity confirmed working: clicked "Commercial" and the grid correctly filtered down from 4 mixed cards to 2 commercial-only cards ("Retirement Village Fire & Security Upgrade", "Sports pavilion secured with high-performance shutters"). Client-side component survived the file move from `/new/projects/` to `/projects/` intact.

## Security Levels (`/security-levels`)
- OK — no issues, console clean. Tab bar (LS1/RC3/RC4/RC4+FB4/RC4+FB6 Class) and content render correctly.

## Trade (`/trade`)
- OK — no issues, console clean, renders correctly. Did not test the "See more" gallery load-more button — per directive, this is a known, documented, unfixable limitation (no backend to paginate from), not a regression to check for.

## Windows (hub) (`/windows`)
- OK — no issues, console clean, hero/cards render correctly.

## High Security Steel Windows (`/windows/high-security-steel-windows`)
- OK — no issues, console clean, breadcrumb/hero/content render correctly.

## Security Aluminium Windows (`/windows/security-aluminium-windows`)
- OK — no issues, console clean, breadcrumb/hero/feature grid render correctly.

---

## Summary
11 pages checked. 10/11 fully clean with no issues. 1 (Colllabsible Grilles) has an unconfirmed-but-likely-fine scroll-reveal check — blocked by a tab-backgrounding artifact in this test run, not a confirmed bug; underlying markup is intact. Zero console errors across all 11 pages. Zero broken/blank renders. Projects filter-tab interactivity and the general route swap both confirmed working correctly post-move.
