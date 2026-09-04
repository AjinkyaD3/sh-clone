# Secure House Migration - Architectural Decisions

This document captures architectural decisions and their underlying reasoning. Append new entries as real decisions are made going forward.

- **Styling**: Keep existing Avada/Fusion CSS classes, no Tailwind/CSS Modules switch. 
  - *Reasoning*: Preserves existing visual design and avoids a full visual redesign.
- **Component approach**: Build reusable page-type templates rather than converting pages individually.
  - *Reasoning*: Ensures consistency, maintainability, and significantly reduces the effort required for a ~194 page migration.
- **Conversion order**: Automation-heavy/high-volume first, complex/one-off last.
  - *Reasoning*: Proves the extraction pipeline early and defers complex UI component construction until the foundation is solid.
