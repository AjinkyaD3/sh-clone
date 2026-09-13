// Shared default Open Graph image, used by app/layout.tsx's site-wide
// default AND re-declared on every page's own `openGraph`/`twitter` block.
// Next.js metadata merging does not deep-merge nested objects like
// `openGraph` between a layout and a page - if a page declares its own
// `openGraph` at all (even just to set a page-specific title), the whole
// object replaces the layout's, silently dropping `images` unless the page
// includes it too. One shared constant instead of a copy-pasted URL string
// in 37 files.
export const DEFAULT_OG_IMAGE = {
  url: "/legacy-assets/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/10/Group-175-scaled.png",
  width: 2560,
  height: 1435,
  alt: "Secure House - bespoke security doors and windows",
};
