# Live verification batch 1 — post-swap, 12 pages

Method: navigated each live route in a real browser, checked console for errors, took a screenshot to confirm real rendering (not blank/broken), plus page-specific interaction checks noted below.

## Homepage (`/`)
- OK — no issues, console clean, hero/cards render correctly.

## About Us (`/about-us`)
- OK — no issues, console clean, page renders correctly.

## Contact Us (`/contact-us`)
- OK — no issues, console clean. Form field check: set the `name` input's value via the native setter + dispatched an `input` event — value persisted ("Verify Test"), confirming the field is NOT read-only (the earlier `defaultValue` fix is still working correctly on the live route).

## Doors (hub) (`/doors`)
- OK — no issues, console clean, card grid renders correctly.

## Bullet Proof Doors (`/doors/bullet-proof-doors`)
- [ ] **Real finding**: Next.js dev-mode overlay shows a Console Error: `"A component is 'contentEditable' and contains 'children' managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated."` — at `app/doors/bullet-proof-doors/page.tsx:517:31`, on the `<h2>` heading "Key features of our bullet proof steel doors". Root cause: the original scraped HTML has `contentEditable="true"` and `aria-multiline="true"` on this heading — a leftover Avada visual-editor artifact. On the old `dangerouslySetInnerHTML` page this was harmless (raw HTML, no React reconciliation), but on the live JSX page it's now a real `contentEditable` element: any visitor can click into that heading and the browser will let them edit the text in-place (client-side only, no persistence, resets on reload — but still an unintended, editable-looking heading on a live page). The warning re-fires on every React re-render (confirmed by triggering it via accordion clicks — same single root cause, not new issues). **Not fixed** — flagging for a decision (strip `contentEditable`/`aria-multiline` from this one heading in `content.html`, or leave as-is since it's cosmetic/non-persistent).
- [x] FAQ accordion confirmed working: clicked "Bespoke designs that suit every taste", expanded correctly showing its answer text.

## Communal Entrance Doors (`/doors/communal-entrance-doors`)
- OK — no issues, console clean, hero/breadcrumb/CTA render correctly.

## Fire Resistant Doors (`/doors/fire-resistant-doors`)
- OK — no issues, console clean.

## High Security Doors (`/doors/high-security-doors`)
- OK — no issues, console clean.

## Panic Room Doors (`/doors/panic-room-doors`)
- OK — no issues, console clean.

## Profile Doors (hub) (`/doors/profile-doors`)
- OK — no issues, console clean. ("Unico slime line" typo visible — already documented elsewhere as a pre-existing live-site typo, not a new issue.)

## Fuego Fire (`/doors/profile-doors/fuego-fire`)
- OK — no issues, console clean, spec table renders correctly.

## Presto Bullet Proof (`/doors/profile-doors/presto-bullet-proof`)
- OK — no issues, console clean, spec table renders correctly.

---

**Summary**: 12 pages checked. 11 clean. 1 real finding (Bullet Proof Doors' `contentEditable` heading — pre-existing scrape artifact, harmless-but-unintended, needs a decision not urgent). Contact form and FAQ accordion both confirmed functionally working on the live routes.

Note: this batch's browser tab briefly shared a tab group with sibling verification forks (batches 2/3) running concurrently — created a dedicated tab partway through once cross-talk was noticed (a shared tab was being navigated by another fork); all results above are from the dedicated tab only.
