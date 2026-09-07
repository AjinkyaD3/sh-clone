# Secure House Migration - Plan

The following outlines the phased plan for the full "pure Next.js" conversion (moving all remaining pages from raw HTML injection to genuine JSX/component-based templates).

- **Phase 1: Blog Pages (122)**
  - Automation-first approach
  - Pilot on 5 pages before scaling to all
- **Phase 2: Category Hubs (6) + Inspiration (20)**
  - Template-based approach
- **Phase 3: Static/Misc (20)**
  - Handled as one-offs
  - Contact Us treated as its own careful sub-task due to a hidden global form dependency found across 191 files
- **Phase 4: Product Sub-Pages (26)**
  - Most complex (requires accordions, galleries, specs tables)
  - Done last

**Reasoning:**
We tackle the highest-volume/most-automatable pages first (Blogs) to prove the extraction pipeline. We tackle the hardest/most-complex pages last (Product Sub-Pages) once our component-building skills and reusable pieces (accordion, gallery, breadcrumbs) are firmly established.

---

## Reprioritization (2026-09-07) — Tomorrow's concrete scope

Blog pages (Phase 1) are effectively done — `app/blog/page.tsx` and `app/blog/[slug]/page.tsx` are already pure JSX with no `dangerouslySetInnerHTML`, along with `app/thank-you/page.tsx`. `/projects/` is partway there (wrapped in a client component tonight for filter-tab interactivity, but still injects raw `content.html` inside it).

**Site-wide raw-HTML audit (2026-09-07):** 193 of 197 routes still render via `dangerouslySetInnerHTML` against a `content.html` file (confirmed by grepping every `app/**/page.tsx`). Only `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, and `app/thank-you/page.tsx` are fully clear of raw HTML.

Rather than jumping straight to Phase 4's original "product sub-pages last" ordering, tonight's hands-on debugging (see PROGRESS.md "Completed (continued, 4)") showed the **doors / windows / garage-doors / grilles-shutters / products family is where the actual bugs have been living** — every image-mapping fix and UX bug tonight landed in this family. That family also happens to share one very consistent Fusion "post-cards" grid structure across its 5 hub pages, making it the best near-term candidate for a **single shared React template component** rather than one-off conversions. Tomorrow's scope below supersedes Phase 4's "done last" ordering for just this family — the rest of Phase 4 (any product sub-pages outside this list, if they exist) and Phases 2–3 are unaffected and still queued behind it.

### Tomorrow's task: rebuild this ~31-page family as clean, pure JSX

**Update (2026-09-07, later) — this is now a clean rebuild, not a structural extraction.** Per DECISIONS.md's "Scope decisions for the 31-page clean rebuild" entry: same visual design/layout as today (small obvious UX polish OK, no structural/layout changes), zero leftover Avada/Fusion classNames or `dangerouslySetInnerHTML` in the rebuilt code, and CSS Modules (plain CSS, no Tailwind) instead of the site's existing Fusion classes — this supersedes the "plain CSS matching the existing Avada/Fusion design system" note earlier in this file for these 31 pages specifically.

**Tier A — touched/fixed multiple times tonight (highest priority, proven bug-prone in raw-HTML form):**

| Page | content.html size | Shares structure with | Status |
|---|---|---|---|
| `app/content.html` (homepage) | 384 KB | unique (hero + multiple content blocks, not a card-grid page) | ⚠️ Open issue found tonight: still contains orphaned raw slider markup (`.awb-background-slider`, `.tfs-slider`) left over from before `HeroSlider.tsx` existed — must be removed as part of this conversion, not just ported as-is |
| `app/projects/content.html` | 188 KB | Tier B hub pages (post-cards grid) | Partially converted tonight (`ProjectsClient.tsx` wrapper + filter-tab JS); header/filter-tab/card-design bugs fixed and verified in-browser this session — best-understood page in the whole list, good pilot candidate |
| `app/windows/content.html` | 192 KB | Tier B hub pages (post-cards grid) | Touched tonight (structural fix, 10-line diff) but not yet wrapped in a client component like `/projects/` — do that as part of this conversion |
| `app/doors/fire-resistant-doors/content.html` | 267 KB | Tier C doors sub-pages | Image-mapping bug fixed tonight (small targeted diff) — not yet a full visual audit, just the one bug |
| `app/doors/profile-doors/content.html` | 189 KB | Tier B (this is itself a mini-hub with 4 child pages) | Image-mapping bug fixed tonight — same caveat as above |
| `app/garage-doors/sectional-garage-doors/content.html` | 361 KB | Tier C garage-doors sub-pages | Image-mapping bug fixed tonight |
| `app/garage-doors/side-hinged-garage-doors/content.html` | 290 KB | Tier C garage-doors sub-pages | Image-mapping bug fixed tonight |
| `app/garage-doors/sliding-garage-doors/content.html` | 238 KB | Tier C garage-doors sub-pages | Image-mapping bug fixed tonight |
| `app/grilles-shutters/high-security-shutters/content.html` | 199 KB | Tier C grilles-shutters sub-pages | Image-mapping bug fixed tonight |

**Tier B — hub/category index pages (share one Fusion post-cards grid structure — top candidate for a single shared `<CategoryHub>` component serving all 5):**

| Page | content.html size | Status |
|---|---|---|
| `app/doors/content.html` | 205 KB | Not yet touched tonight — unaudited beyond the general site-wide passes in earlier PROGRESS.md entries |
| `app/garage-doors/content.html` | 264 KB | Not yet touched tonight |
| `app/grilles-shutters/content.html` | 203 KB | Not yet touched tonight |
| `app/products/content.html` | 223 KB | Not yet touched tonight; no sub-pages under `/products/` (the mega-menu links straight to the other 4 category hubs instead) |
| *(`app/windows/content.html`, `app/doors/profile-doors/content.html` — already listed in Tier A)* | | |

**Tier C — remaining sibling sub-pages in the same 5 families (same underlying card/detail-page structure as the Tier A pages already fixed — natural batch once the shared template exists):**

| Page | content.html size | Sibling of |
|---|---|---|
| `app/doors/premium-high-security-doors/content.html` | 509 KB (largest in scope) | fire-resistant-doors |
| `app/doors/high-security-doors/content.html` | 472 KB | fire-resistant-doors |
| `app/doors/panic-room-doors/content.html` | 349 KB | fire-resistant-doors |
| `app/doors/bullet-proof-doors/content.html` | 299 KB | fire-resistant-doors |
| `app/doors/communal-entrance-doors/content.html` | 288 KB | fire-resistant-doors |
| `app/doors/stained-glass-doors/content.html` | 240 KB | fire-resistant-doors |
| `app/doors/bespoke-doors/content.html` | 223 KB | fire-resistant-doors |
| `app/doors/industrial-style-doors/content.html` | 180 KB | fire-resistant-doors |
| `app/doors/arch-doors/content.html` | 16 KB (smallest — custom-authored, thin page) | fire-resistant-doors |
| `app/doors/curved-glass-doors/content.html` | 15 KB (custom-authored, thin page) | fire-resistant-doors |
| `app/doors/profile-doors/fuego-fire/content.html` | 189 KB | profile-doors (parent already in Tier A) |
| `app/doors/profile-doors/presto-bullet-proof/content.html` | 188 KB | profile-doors |
| `app/doors/profile-doors/unico-slim-line/content.html` | 189 KB | profile-doors |
| `app/doors/profile-doors/stainless-steel/content.html` | 204 KB | profile-doors |
| `app/garage-doors/tracless-garage-doors/content.html` | 318 KB | sectional/side-hinged/sliding-garage-doors (all fixed tonight) |
| `app/grilles-shutters/security-shutters/content.html` | 344 KB | high-security-shutters (fixed tonight) |
| `app/grilles-shutters/colllabsible-grilles/content.html` | 257 KB | high-security-shutters |
| `app/windows/high-security-steel-windows/content.html` | 215 KB | windows hub (Tier A) |
| `app/windows/security-aluminium-windows/content.html` | 300 KB (also flagged in MISTAKES-AND-PATCHES as one of the largest files site-wide) | windows hub |

**Total scoped for tomorrow: 31 pages** (9 Tier A + 4 new Tier B + 18 Tier C). Every Tier C page is unaudited beyond the blanket site-wide "data-bg + missing thumbnails + spam" passes logged earlier in PROGRESS.md — treat as **risky until visually verified**, per MISTAKES-AND-PATCHES.md item 14's lesson that a fix proven on one page's HTML shape does not guarantee coverage of sibling pages' shapes.

**CSS approach for this work:** CSS Modules, plain CSS syntax, one `ComponentName.module.css` per component — no Tailwind, and no reuse of the site's existing Avada/Fusion classNames. See DECISIONS.md, "Scope decisions for the 31-page clean rebuild" (2026-09-07, later), which explicitly supersedes the earlier "keep existing Avada/Fusion CSS classes" and "plain CSS matching the existing design system" entries for this 31-page family only.

**Explicitly out of scope for tomorrow:** the ~150+ remaining pages (fire-door blog/article content, inspiration pages, other one-off static pages) — those stay queued behind this family per the phase ordering above, and are unaffected by the CSS Modules / clean-rebuild decision until they're scoped for their own conversion pass.

### Batching — 3 batches of ~10, in Tier order, with a hard checkpoint between each

Each batch is fully verified and committed before the next one starts. **Do not begin Batch 2 until Batch 1's checkpoint is signed off, and likewise Batch 2 → Batch 3.**

**Checkpoint (required after every batch, before moving on):**
1. Visual review of every page in the batch (side-by-side against today's live rendering — same bar as the "clean rebuild, not a redesign" decision in DECISIONS.md)
2. `npm run build` passes clean (0 errors) — remember per MISTAKES-AND-PATCHES.md item 11, a passing build proves compilation, not correctness; the visual review above is still required and is not satisfied by a green build alone
3. Commit the batch's work with a clear message before starting the next batch

---

**Batch 1 — Tier A (9 pages).** Already proven/touched tonight, lowest risk, best-understood bugs. Rebuild these first.

- `app/content.html` (homepage) — including removing the orphaned raw slider markup flagged above
- `app/projects/content.html`
- `app/windows/content.html`
- `app/doors/fire-resistant-doors/content.html`
- `app/doors/profile-doors/content.html`
- `app/garage-doors/sectional-garage-doors/content.html`
- `app/garage-doors/side-hinged-garage-doors/content.html`
- `app/garage-doors/sliding-garage-doors/content.html`
- `app/grilles-shutters/high-security-shutters/content.html`

**Pilot first, within Batch 1 — 2-3 pages before the rest of the batch.** Do not start all 9 pages of Batch 1 at once. Pilot the new clean-JSX + CSS-Modules approach on a small subset first, confirm it looks right and the approach holds up in practice, *then* proceed with the remaining Batch 1 pages. Suggested pilot set (not mandatory, but a reasonable starting point given tonight's context): `app/projects/content.html` (best-understood page in the whole list — already has verified header/filter-tab/card fixes from tonight to build on) plus one doors sub-page and one garage-doors sub-page (e.g. `doors/fire-resistant-doors` and `garage-doors/sectional-garage-doors`) to prove the approach on both a hub-adjacent page and a plain detail page before scaling.

**Batch 2 — Tier B (4 hub pages).** Once Batch 1 is checkpointed. These 4 share one Fusion post-cards grid structure and are the top candidate for a single shared `<CategoryHub>` component (see Tier B table above) — build that shared component here, informed by whatever patterns Batch 1's pilot on `/projects/` and the doors/garage-doors pages surfaced.

- `app/doors/content.html`
- `app/garage-doors/content.html`
- `app/grilles-shutters/content.html`
- `app/products/content.html`

**Batch 3 — Tier C (18 pages).** Once Batch 2 is checkpointed. Highest page count, done last — by this point the shared card-grid component (from Batch 2) and the detail-page patterns (from Batch 1) should both exist, making this batch mostly a matter of applying already-proven templates rather than inventing new ones. Full list is the Tier C table above (doors sub-pages, profile-doors children, remaining garage-doors/grilles-shutters/windows sub-pages).
