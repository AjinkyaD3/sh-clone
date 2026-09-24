import type { NextConfig } from "next";

// Every external domain this site actually loads a resource from or embeds,
// confirmed by grepping app/ and components/ rather than guessed - listed
// once here so the CSP directives below stay readable and are easy to keep
// in sync if a new third-party script/embed is ever added.
const TAWK = "https://*.tawk.to";
const TAWK_WS = "wss://*.tawk.to";
const GTM = "https://www.googletagmanager.com";
const CLARITY = "https://*.clarity.ms";
const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com";
const GOOGLE_FONTS_FILES = "https://fonts.gstatic.com";
const YOUTUBE = "https://www.youtube.com";

// CSP is production-only: Next.js dev mode's Fast Refresh relies on eval'd
// chunks and a dev-server websocket that a strict CSP would block, causing
// a blank page in local dev for no real security benefit (dev never faces
// real visitors). The other headers below are cheap and safe in both.
const isProd = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  `default-src 'self'`,
  // 'unsafe-inline' is required, not optional here: this migration ports
  // Avada's markup verbatim, which means thousands of inline style={{}}
  // objects (CSP's style-src governs the style="" attribute they render as,
  // not just <style> tags) plus several legitimate inline bootstrap
  // <script> snippets (GTM, Clarity, Tawk.to) - see app/layout.tsx. A
  // nonce-based CSP would be more strict but needs per-request middleware,
  // a bigger change than this pass.
  `script-src 'self' 'unsafe-inline' ${GTM} ${CLARITY} ${TAWK}`,
  // Tawk.to injects its own <link rel="stylesheet"> for the widget CSS
  // (embed.tawk.to/.../min-widget.css) via JS after load - needs to be
  // allowed here the same as script-src/connect-src/frame-src already are,
  // or the widget renders unstyled the moment Tawk's own service is up.
  `style-src 'self' 'unsafe-inline' ${GOOGLE_FONTS_CSS} ${TAWK}`,
  `font-src 'self' data: ${GOOGLE_FONTS_FILES} ${TAWK}`,
  // Broad but real: this site's own uploaded images live under /legacy-
  // assets, plus the Tawk.to widget loads its own avatar/icon images from
  // its own CDN at runtime - `https:` covers that without hardcoding every
  // possible Tawk asset host.
  `img-src 'self' data: https:`,
  `connect-src 'self' ${TAWK} ${TAWK_WS} ${GTM} ${CLARITY}`,
  // The only <iframe> embeds anywhere on the site are YouTube product
  // videos (confirmed via grep) plus Tawk's own chat widget iframe.
  `frame-src ${YOUTUBE} ${TAWK}`,
  `object-src 'none'`,
  `base-uri 'self'`,
  // Modern equivalent of X-Frame-Options - kept as a second, separate
  // header below too for older browsers that don't read this directive.
  `frame-ancestors 'self'`,
].join("; ");

const nextConfig: NextConfig = {
  // Canonicals/og:url across the site are written with a trailing slash
  // (see recent SEO pass) - this makes that the actual served URL instead
  // of 308-redirecting the slash version to a no-slash one.
  trailingSlash: true,

  // Old-site URLs with no live equivalent on this site. Redirect rather than
  // let them 404 once this domain actually points here - preserves whatever
  // SEO value/inbound links still point at them by sending visitors
  // somewhere useful instead of a dead end.
  async redirects() {
    return [
      {
        // Old scraped URL for this page - the real, good content actually
        // lives at /door-styles/victorian-doors (different slug/family,
        // same page). The live WordPress site itself 301s this exact old
        // URL to an empty blog-style page instead - this redirect sends
        // visitors/search engines to the real content instead, which is
        // strictly better than what the live site currently does.
        source: "/doors/victorian-front-doors",
        destination: "/door-styles/victorian-doors",
        permanent: true,
      },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      ...(isProd
        ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }]
        : []),
    ];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
