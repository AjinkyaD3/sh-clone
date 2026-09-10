# Audit Batch 3 — /new/* pages vs live WordPress site

Method: `get_page_text` comparison of each `/new/*` page against its live WordPress equivalent, with targeted screenshots where text alone was ambiguous. Header/footer/nav ignored (shared, already verified). See `migration-log/PAGE-COMPARISON.md` for the full URL list.

## Tracless Garage Doors (`/garage-doors/tracless-garage-doors`)
- [ ] The `/new/` page shows extra, duplicated text near the "Surfaces" section: "Woodstyle colors / Woodgrain, slightgrain, smooth colors / Woodgrain, slightgrain, smooth colors" that doesn't appear in the live page's text. Not independently verified with a screenshot (ran out of time to confirm) — likely the same kind of JS-driven tab/color-swatch component seen elsewhere on this page family, where the live site shows only the active swatch's caption and ours renders all captions statically. Worth a quick visual check before treating as a real bug.

## Grilles Shutters hub (`/grilles-shutters`)
- [x] No changes needed — matches live site. (Initial text diff showed extra "Security SHUTTERS" spec bullets on `/new/`, but a screenshot of the live page confirmed this is a real 2-slide slider component present on both; `get_page_text` just didn't capture the inactive slide. False alarm.)

## Colllabsible Grilles (`/grilles-shutters/colllabsible-grilles`)
- [ ] **Confirmed real discrepancy**: the `/new/` page has a full grille-tier spec section (CX1 entry level, CX2 SR1 rated, VULCAN SR2 rated, ECLIPSE SR3 rated — each with a description) that does **not exist anywhere on the live page**, including behind the page's "READ MORE" accordion toggle (clicked it and confirmed it reveals different, unrelated text). This content is either something the live WordPress site removed since the original scrape, or a section that needs a different trigger to reveal that wasn't found. Needs a decision: keep it (it's good, real product content) or remove it to match the live site exactly.

## High Security Shutters (`/grilles-shutters/high-security-shutters`)
- [x] No changes needed — text matches exactly.

## Products (`/products`)
- [x] No changes needed — text matches exactly (full product nav list).

## Projects (`/projects`)
- [ ] **Confirmed discrepancy**: every project card on the live site shows the literal placeholder text "Your Content Goes Here" where a category label should be. The `/new/` page instead shows the actual category name (PROJECTS / DOORS / GRILLES, SHUTTERS) per card. This looks like a live-site bug (broken taxonomy display) that predates the scrape being fixed, or a caching issue — our version arguably looks *more* correct. Decision needed: keep the correct-looking category labels, or intentionally match the live site's broken placeholder for pixel-parity. Everything else on this page (project titles, count, order) matches.

## Security Levels (`/security-levels`)
- [x] No changes needed — this is a long page (5 security classes, full spec tables) and it matches the live site word-for-word.

## Trade (`/trade`)
- [x] No changes needed — text matches exactly.

## Windows hub (`/windows`)
- [x] Text matches (one trivial casing difference, "our windows" vs "Our windows" — not worth fixing).
- [ ] Observed the shared CTABlock render as "Letâ€™s secure your property Together" (mojibake apostrophe) instead of "Let's" on this page, on **both** the old and new Next.js routes (confirmed identical on both, live WordPress page shows it correctly). This is **not a JSX-conversion regression** — it's a pre-existing encoding bug in the shared CTABlock component, unrelated to this migration effort. However, it did **not reproduce** on other pages checked in this same session (e.g. High Security Steel Windows immediately after showed it correctly) — so treat this as a low-confidence, possibly intermittent finding rather than a confirmed sitewide bug. Worth a quick spot-check across a few pages, not urgent.

## High Security Steel Windows (`/windows/high-security-steel-windows`)
- [x] No changes needed — text matches exactly.

## Security Aluminium Windows (`/windows/security-aluminium-windows`)
- [ ] The `/new/` page shows 4 extra "Security class WK1/WK2/WK3/WK4" definition blocks under "Security classes: secure yet unobtrusive" that don't appear in the live page's extracted text. A screenshot of the live page at that section showed a large blank/empty area right after the intro paragraph — consistent with a collapsed accordion or JS-driven panel that never renders its content without interaction, rather than the content being genuinely deleted (unlike the Colllabsible Grilles case above, which was confirmed fully absent). **Not fully verified** — the browser tab became unresponsive while trying to confirm via a second screenshot/scroll. Worth a follow-up check specifically on whether this section has a clickable toggle on the live page.

---

## Summary
- 11 pages checked.
- 6 pages: no changes needed (exact match).
- 5 pages with findings: 2 confirmed real discrepancies worth a decision (Colllabsible Grilles' extra spec section absent on live; Projects' category-badge vs "Your Content Goes Here" placeholder), 2 likely-false-alarms from JS-driven accordion/tab components rendering differently in a static conversion (Tracless Garage Doors, Security Aluminium Windows — both unverified with full confidence, worth a quick follow-up), and 1 low-confidence/intermittent encoding glitch unrelated to the conversion (Windows hub's CTABlock).
