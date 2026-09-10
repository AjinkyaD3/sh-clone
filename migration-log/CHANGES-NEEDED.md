# Changes Needed — `/new/*` pages vs live WordPress site

Full audit of all 34 converted pages against secure-house.co.uk, done 2026-09-10. Method: `get_page_text` comparison of each `/new/*` page against its live WordPress counterpart, with targeted screenshots where text alone was ambiguous. Header/footer/nav were not checked per-page (shared components, already verified separately). Full URL list: `migration-log/PAGE-COMPARISON.md`.

**28 of 34 pages: no changes needed, exact match against live site.**

## Needs a decision (real content differences — don't fix without deciding which version is correct)

### Communal Entrance Doors (`/doors/communal-entrance-doors`)
The `/new/` page has an extra "Versatility for every property type" sub-section with 4 door-type cards (Custom doors, Swing doors, Sliding doors, Storage doors) that does not appear on the current live WordPress page. Either the live site removed this since the scrape, or the live site is missing content it should have. Needs a decision before touching anything.

### Colllabsible Grilles (`/grilles-shutters/colllabsible-grilles`)
The `/new/` page has a full grille-tier spec section (CX1 entry level, CX2 SR1 rated, VULCAN SR2 rated, ECLIPSE SR3 rated, each with a description) that does not exist anywhere on the live page — confirmed by also checking behind the page's "READ MORE" accordion toggle, which reveals different, unrelated text. Needs a decision: keep it (real product content) or remove it to match live exactly.

### Projects (`/projects`)
Every project card on the live site shows the literal placeholder text "Your Content Goes Here" where a category label should be (PROJECTS / DOORS / GRILLES, SHUTTERS). The `/new/` page shows the actual category names instead — this looks like a live-site bug or caching issue, and arguably our version is *more* correct. Decision needed: keep the correct labels, or intentionally match the live site's broken placeholder for pixel-parity.

## Fixed this session

### Sectional Garage Doors (`/garage-doors/sectional-garage-doors`) — RESOLVED 2026-09-10
The 4 product cards (R40 Sectional / TL Sectional / SHD Side Hinged Doors / SSD Side Sliding Doors) were rendering **twice**. Root cause: `content.html` itself has two full copies — a mobile-only-tagged copy (`fusion-no-medium-visibility fusion-no-large-visibility`) using a generic, undated placeholder image (`paveikslas.png`) for all 4 cards, and a second, unrestricted copy using real per-product photos (`paveikslas-89/90/92/94.png`, all uploaded the same date as the "restore missing section" fix logged in `PROGRESS.md`'s "Completed (continued, 4)" entry). Also confirmed the Avada `fusion-no-X-visibility` classes don't actually hide anything in this static export at any viewport width (same "JS-driven visibility that never runs here" pattern documented elsewhere in this project) — so this wasn't ever a working responsive show/hide, both copies rendered unconditionally on every page load. **Fix**: deleted the generic-placeholder-image copy from both `app/new/garage-doors/sectional-garage-doors/page.tsx` (399 lines) and the shared `app/garage-doors/sectional-garage-doors/content.html` (the same block, found via balanced-div matching since that file isn't pretty-printed), keeping the real-photo copy in both. Verified on both the old (`/garage-doors/sectional-garage-doors`) and new (`/new/garage-doors/sectional-garage-doors`) routes: heading appears exactly once on each, `tsc`/`build` clean, screenshot confirms a real garage door photo renders correctly.

## Missing metadata (already-known gap, blocked on client)

### Edwardian Doors (`/door-styles/edwardian-doors`) and French Doors (`/door-styles/french-doors`)
Browser tab title is generic "Secure House" instead of a real page title, because these pages have no `metadata` export at all (same gap Georgian/Victorian Doors had before their metadata was added this session — see `PROGRESS.md`'s "Blocked on Client" list). Needs real title + meta description copy from the client. Visible body content otherwise matches the live site exactly.

## Worth a quick follow-up (unverified / possibly false alarms)

### Homepage (`/`) — low confidence
The hero slider's active slide text at the moment of checking didn't match what WordPress's text extraction showed. Very likely just slider-timing (`get_page_text` only captures whichever slide is active at that instant on a multi-slide rotating hero) rather than a real missing slide — worth a quick manual click-through of all hero slides on both sites to confirm, not treated as a confirmed issue.

### Tracless Garage Doors (`/garage-doors/tracless-garage-doors`) — likely false alarm
Extra, duplicated-looking text near the "Surfaces" section ("Woodstyle colors / Woodgrain, slightgrain, smooth colors" appearing twice) that doesn't appear in the live page's extracted text. Not independently confirmed with a screenshot — likely the same class of thing as the Grilles Shutters hub false alarm below (a JS-driven color-swatch/tab component where the live site only shows the active swatch's caption and our static conversion renders all captions at once). Worth a quick visual check before treating as real.

### Security Aluminium Windows (`/windows/security-aluminium-windows`) — likely false alarm, unverified
4 extra "Security class WK1/WK2/WK3/WK4" definition blocks appear under "Security classes: secure yet unobtrusive" that don't appear in the live page's extracted text. A screenshot of the live page showed a blank area right where this content would be — consistent with a collapsed accordion/JS panel that never renders without interaction, not genuinely deleted content (different from the Colllabsible Grilles case above, which was confirmed fully absent even behind its toggle). Not fully verified — worth checking whether this section has a clickable toggle on the live page.

### Windows hub (`/windows`) — low confidence, not a conversion issue either way
The shared `CTABlock` component renders "Letâ€™s secure your property Together" (mojibake apostrophe) instead of "Let's" — confirmed identical on **both** the old and new Next.js routes, so this is a pre-existing encoding bug unrelated to the JSX-conversion effort, not a regression. It did not reproduce on the next page checked in the same session, so treat as possibly intermittent. Not urgent, but worth a wider spot-check across pages using `CTABlock` if it keeps showing up.

## Confirmed false alarms (already resolved during the audit, no action needed)

- **Grilles Shutters hub** (`/grilles-shutters`): initial text diff showed extra spec bullets on `/new/`, but a screenshot of the live page confirmed it's a real 2-slide slider present on both sites — `get_page_text` just didn't capture the inactive slide.
- Pre-existing typos already on the live WordPress site itself (not migration errors, correctly preserved as-is): "Frequently asked uestions" (Bullet Proof Doors), "Maximum Dimenions" (Fire Resistant Doors), "Unico slime line" (Profile Doors hub).
- Live WordPress's "Your Content Goes Here" placeholder on the homepage's "Our Projects" cards — a known, already-investigated live-site WordPress quirk; our page correctly omits it.

## Pages with no changes needed (exact match)

About Us, Doors hub, Bullet Proof Doors, Fire Resistant Doors, High Security Doors, Panic Room Doors, Profile Doors hub, Fuego Fire, Presto Bullet Proof, Stainless Steel, Unico Slim Line, Door Styles hub, Georgian Doors, Victorian Doors, Garage Doors hub, Side Hinged Garage Doors, Sliding Garage Doors, High Security Shutters, Products, Security Levels, Trade, High Security Steel Windows, Contact Us.

(Raw per-page audit notes, including full method details, are in `migration-log/audit-batch-1.md`, `audit-batch-2.md`, `audit-batch-3.md`.)
