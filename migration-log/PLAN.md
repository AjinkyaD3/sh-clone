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
