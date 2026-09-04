# Secure House Migration - Project History

This log captures the full narrative history of the Secure House Next.js migration project.

- Original task: migrate a hacked/compromised WordPress (Avada theme) site to Next.js, starting as a fast "repackage" job (raw HTML wrapped in dangerouslySetInnerHTML) due to tight deadlines
- Discovered and removed injected casino/gambling spam content across homepage, About Us, and blog
- Migrated 190+ pages in stages, cross-referencing the live site's sitemap and manually verifying each batch for spam before building
- Set up Git LFS for large video assets after hitting GitHub's file size limits, recovered from a git history/branch confusion incident without data loss
- Completed full technical SEO: dynamic sitemap.xml, robots.txt, canonical tags, per-page meta titles/descriptions, JSON-LD schema markup (BlogPosting + FAQPage) across 28+ pages
- Built and inserted 12 CTA blocks with client-provided copy across core product pages
- Authored and built new pages from scratch based on client content briefs (Curved Glass Doors, Arch Doors, Stained Glass Doors) with full SEO content and internal cross-linking
- Integrated GA4, Google Search Console verification; scaffolded GTM and Microsoft Clarity tracking pending real IDs from the client
- Fixed numerous bugs found via old-vs-new site comparison: broken nav links, invisible text (CSS opacity issues from missing original theme JS), missing footer social icons/email, misaligned footer links, missing project card images, duplicate menu overlay
- Recently began "Tier 1" architectural improvement: extracted duplicated Header/Footer HTML (found in 190+ files) into shared components/Header.tsx and components/Footer.tsx, rendered once via layout.tsx
- Built a real interactive mobile menu (useState/useEffect) to replace the original site's non-functional (missing) JavaScript-driven off-canvas menu
- Converted Header.tsx and Footer.tsx from dangerouslySetInnerHTML to genuine JSX (preserving all classNames, inline styles as style objects, and hrefs)
- Fixed a regression from that conversion (duplicate menu panel bug — root cause: CSS selector too broad, matched two different <nav> elements)
- Currently blocked on client for: GTM container ID, Microsoft Clarity project ID, Georgian Doors/Georgian Front Doors meta content, blog content confirmation, brochure/CTA clarification, contact form submission/redirect specification
- Decided to proceed with a full "pure Next.js" conversion (moving all remaining pages from raw HTML injection to genuine JSX/component-based templates), based on an architectural audit identifying 5 page template types across ~194 pages
