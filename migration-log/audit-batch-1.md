# Audit Batch 1 — /new/ pages vs live WordPress (12 pages)

Compared each `/new/*` page's visible text content against its live WordPress counterpart at secure-house.co.uk. Method: `get_page_text` on both, diffed for substantive content differences (missing/extra sections, wrong copy, stale info). Ignored header/footer/nav (shared components, verified separately) and the spam/gambling content currently injected into the live WordPress site (pre-existing, known issue — our pages correctly do NOT have this, which is expected and correct, not a bug).

## Homepage (`/`)
- [ ] Low-confidence note, not confirmed as a real issue: the `/new/` homepage's hero slider showed the slide text "Bespoke Security Doors with Premium Craftsmanship & Advanced Security. Discover entrance solutions" at the moment of checking, which didn't appear in the WordPress text extraction. This is very likely just slider-timing (both sites have a rotating multi-slide hero, `get_page_text` only captures whichever slide is active at that instant) rather than a real missing-slide bug — worth a quick manual click-through of all hero slides on both sites to confirm, but not treated as a confirmed issue here.
- [ ] Not a bug, just noting: live WordPress's "Our Projects" cards show a "Your Content Goes Here" placeholder text before each project title (a live-site WordPress widget quirk, already investigated in a prior session and confirmed as expected/known behavior, not something to replicate). Our `/new/` page correctly omits this placeholder — this is the *better* state, not a discrepancy to fix.

## About Us (`/about-us`)
- [ ] No changes needed — matches live site exactly.

## Contact Us (`/contact-us`)
- [ ] No changes needed — matches live site exactly, including both office addresses (Luton head office/showroom + London Mayfair meeting room) and VAT/company registration numbers.

## Doors hub (`/doors`)
- [ ] No changes needed — matches live site exactly.

## Bullet Proof Doors (`/doors/bullet-proof-doors`)
- [ ] No changes needed — matches live site exactly, including the FAQ heading typo ("Frequently asked uestions") which is present on the live site too, not a migration error.

## Communal Entrance Doors (`/doors/communal-entrance-doors`)
- [ ] **Real discrepancy found**: the `/new/` page has an extra "Versatility for every property type" sub-section with 4 door-type cards (Custom doors, Swing doors, Sliding doors, Storage doors, each with a one-line description) that does NOT appear on the current live WordPress page. The live site jumps straight from the intro paragraph to "Residential properties / Commercial spaces / Fire-rated solutions" without this 4-card block. Since our page was converted from an earlier scrape, this content either (a) was removed from the live site since the scrape was taken, or (b) is content the client still wants but the live site is missing it for some other reason. Needs a decision from the client/team on which version is correct — don't unilaterally remove or add anything.

## Fire Resistant Doors (`/doors/fire-resistant-doors`)
- [ ] No changes needed — matches live site exactly, including the "Maximum Dimenions" typo (missing 's') under the Classic Line section, present on live site too.

## High Security Doors (`/doors/high-security-doors`)
- [ ] No changes needed — matches live site exactly.

## Panic Room Doors (`/doors/panic-room-doors`)
- [ ] No changes needed — matches live site exactly.

## Profile Doors hub (`/doors/profile-doors`)
- [ ] No changes needed — matches live site exactly, including the "Unico slime line" typo (should be "slim line"), which is a pre-existing typo on the live WordPress site itself, not introduced by migration. Worth flagging to the client separately since it's a real live-site typo, but out of scope to silently "fix" during migration (would create a mismatch with the live source of truth).

## Fuego Fire (`/doors/profile-doors/fuego-fire`)
- [ ] No changes needed — matches live site exactly (this page has no closing CTA block on either version, consistent).

## Presto Bullet Proof (`/doors/profile-doors/presto-bullet-proof`)
- [ ] No changes needed — matches live site exactly.

---

**Summary**: 12 pages checked. 1 confirmed real content discrepancy (Communal Entrance Doors — missing 4-card sub-section, needs a decision, not a straightforward fix). 1 low-confidence note worth a quick manual double-check (Homepage hero slide text). Everything else — including two pages with pre-existing typos on the live site itself — matches exactly.
