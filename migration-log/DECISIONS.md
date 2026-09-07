# Secure House Migration - Architectural Decisions

This document captures architectural decisions and their underlying reasoning. Append new entries as real decisions are made going forward.

- **Styling**: Keep existing Avada/Fusion CSS classes, no Tailwind/CSS Modules switch. 
  - *Reasoning*: Preserves existing visual design and avoids a full visual redesign.
- **Component approach**: Build reusable page-type templates rather than converting pages individually.
  - *Reasoning*: Ensures consistency, maintainability, and significantly reduces the effort required for a ~194 page migration.
- **Conversion order**: Automation-heavy/high-volume first, complex/one-off last.
  - *Reasoning*: Proves the extraction pipeline early and defers complex UI component construction until the foundation is solid.
- **CSS approach (reconfirmed 2026-09-07)**: Continue with plain CSS matching the existing Avada/Fusion design system — no Tailwind, no CSS Modules for the JSX-conversion work. `package.json` has no Tailwind dependency; the only CSS Modules in the repo (`components/HeroSlider.module.css`, `components/BlogPostTemplate.module.css`, `app/blog/page.module.css`) are scoped to the already-fully-JSX blog system and the new HeroSlider component, not a signal to switch approach site-wide.
  - *Reasoning*: Reconfirms the original styling decision above. As the pure-JSX conversion (see PLAN.md) starts touching the highest-traffic pages, introducing a second styling system (Tailwind utility classes) alongside 190+ pages of hand-tuned Avada/Fusion CSS and `!important` overrides (see `app/layout.tsx`) would create two parallel, inconsistent styling vocabularies in the same codebase — harder to maintain, harder for the next person to reason about which system "wins" on a given element, and no visual upside since the target is pixel-parity with the existing design, not a redesign.
  - *How to apply*: New JSX-converted pages/components should use plain CSS (global stylesheet or component-scoped `.module.css`, following the HeroSlider precedent) with class names and values lifted directly from the page's existing Fusion markup/CSS variables, not reimplemented in a utility-class or Tailwind idiom.
