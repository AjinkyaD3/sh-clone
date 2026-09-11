import type { Metadata } from "next";
import Script from "next/script";
import "./theme-globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import AccordionToggle from "../components/AccordionToggle";

export const metadata: Metadata = {
  title: "Secure House",
  description: "Bespoke Security Doors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
          body { font-family: 'Montserrat', sans-serif !important; }
          
          /* Fix for Issue #2: Project card layout */
          .post-card-item {
              background-color: #333333 !important; /* Keep the grey backgound for the whole card */
          }

          /* /projects card redesign: text centered and pinned to the bottom of
             the card over a gradient scrim (was top-anchored, left-aligned,
             using per-card inline --awb-padding-top values of 200px+ inherited
             from the WordPress builder - those are zeroed out here so the text
             block's own flex/gradient layout controls position instead). */
          .post-card-item {
              padding: 0 !important;
              position: relative;
          }
          .post-card-item .fusion-column-wrapper {
              position: absolute !important;
              inset: 0 !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: flex-end !important;
              align-items: center !important;
              text-align: center !important;
              padding: 30px !important;
              background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0) 75%) !important;
          }
          .post-card-item .fusion-title-heading,
          .post-card-item .project-category-subtitle {
              text-align: center !important;
          }

          /* Homepage "Our Projects" preview cards: scoped back OUT of the
             /projects redesign above. That redesign (centered text, dark
             gradient scrim) was built for /projects, where every card has a
             real photo behind the scrim - on the homepage these preview
             cards have no photo at all (a live-site data gap: WordPress's
             own post-cards widget never got real images on this specific
             homepage section either, confirmed against secure-house.co.uk),
             so the same treatment just produced a plain dark box with text
             stranded in the middle. Restored the live site's actual look
             instead: a lighter charcoal tone, bottom-left-aligned text, no
             heavy scrim (nothing to scrim against). Scoped to .home's own
             row so /projects and everything else is untouched. */
          .home .fusion-builder-row-10 .post-card-item {
              background-color: #55565a !important;
          }
          .home .fusion-builder-row-10 .post-card-item .fusion-column-wrapper {
              justify-content: flex-end !important;
              align-items: flex-start !important;
              text-align: left !important;
              padding: 32px 40px !important;
              background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 55%) !important;
          }
          .home .fusion-builder-row-10 .post-card-item .fusion-title-heading,
          .home .fusion-builder-row-10 .post-card-item .project-category-subtitle {
              text-align: left !important;
          }

          /* Fix for Issue #5: Navbar flexbox layout (Desktop) */
          .fusion-tb-header .fusion-builder-row-1 .fusion-builder-row-inner {
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
              flex-wrap: nowrap !important;
              width: 100% !important;
          }
          .fusion-tb-header .fusion-builder-row-1 .fusion-builder-row-inner > .fusion-layout-column {
              flex: 1 1 33.33% !important;
          }
          
          /* Fix for Issue #5: Navbar flexbox layout (Mobile) */
          .fusion-tb-header .fusion-builder-row-2 > .fusion-builder-row {
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
              flex-wrap: nowrap !important;
          }
          
          /* Force Swiper projects to display as static grid */
          .swiper-wrapper, .fusion-carousel-wrapper .fusion-carousel-inner {
              display: grid !important;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
              gap: 20px !important;
              transform: none !important;
              flex-wrap: wrap !important;
              opacity: 1 !important;
              visibility: visible !important;
          }
          .swiper-slide, .fusion-carousel-item {
              width: 100% !important;
              max-width: 100% !important;
              position: relative !important;
              display: block !important;
              opacity: 1 !important;
              visibility: visible !important;
          }

          /* Product-page "scroll section" cards (Communal Entrance Doors'
             "Versatility for every property type", grilles-shutters CX/SR
             rating cards, security-aluminium-windows benefit cards, etc.):
             this is a different Avada widget (awb-swiper-full-sections)
             from the generic .swiper-wrapper carousel handled above, and
             the generic grid fallback was squeezing its full-width slides
             into ~250px grid columns. Each slide needs to be its own
             full-width block, stacked vertically, since the JS that would
             normally drive the scroll-jack/stack animation never runs here
             (same root cause as the homepage marquee above - see
             DECISIONS.md). Higher specificity than the generic rule. */
          .fusion-scroll-section.awb-swiper-full-sections .swiper-wrapper {
              display: block !important;
              gap: 0 !important;
          }
          .fusion-scroll-section.awb-swiper-full-sections .swiper-slide {
              width: 100% !important;
              margin-bottom: 40px;
          }

          /* Homepage trust-logo carousel: CSS-only infinite marquee, scoped
             to just this one carousel (higher specificity than the generic
             .swiper-wrapper grid rule above, which every other carousel/
             slider on the site still needs). The real Swiper JS that would
             normally drive this never runs here (same root cause as the
             scroll-stack sections - see DECISIONS.md); page.tsx duplicates
             the 4 logos once so this loop is seamless. */
          .awb-image-carousel-wrapper {
              display: flex !important;
              flex-wrap: nowrap !important;
              width: max-content !important;
              animation: awb-logo-marquee 22s linear infinite;
          }
          .awb-image-carousel-wrapper:hover {
              animation-play-state: paused;
          }
          .awb-image-carousel-wrapper .swiper-slide {
              width: auto !important;
              flex: 0 0 auto !important;
              padding: 0 34px;
              display: flex !important;
              align-items: center !important;
          }
          @keyframes awb-logo-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
          }

          /* CSS-only scroll-in reveal for Avada's "scroll-stack" Swiper
             sections (data-animation="stack") - the real Swiper-driven
             stack/rotate animation stays out of scope (see DECISIONS.md,
             "the Swiper carousel decision"), but this adds real motion on
             top of the static grid above instead of content just
             appearing. ScrollReveal.tsx (mounted in this layout) adds the
             .scroll-revealed class via IntersectionObserver as each card
             scrolls into view. */
          .fusion-scroll-section .swiper-slide {
              opacity: 0 !important;
              transform: translateY(48px) !important;
              transition: opacity 0.7s ease, transform 0.7s ease !important;
          }
          .fusion-scroll-section .swiper-slide.scroll-revealed {
              opacity: 1 !important;
              transform: translateY(0) !important;
          }

          /* Safety net for FAQ/"Read more" accordion toggles (AccordionToggle.tsx
             adds the click behavior). Each page's own compiled Avada CSS
             already defines these two rules, but this guarantees correct
             collapsed/expanded behavior even if a given page's bundle
             doesn't happen to include them. */
          .panel-collapse.collapse:not(.in) {
              display: none !important;
          }
          .panel-collapse.collapse.in {
              display: block !important;
          }

          /* Map missing Avada social icons to FontAwesome */
          .awb-icon-facebook:before, .fusion-icon-facebook:before { content: "\\f09a" !important; font-family: "Font Awesome 6 Brands" !important; }
          .awb-icon-instagram:before, .fusion-icon-instagram:before { content: "\\f16d" !important; font-family: "Font Awesome 6 Brands" !important; }
          .awb-icon-youtube:before, .fusion-icon-youtube:before { content: "\\f167" !important; font-family: "Font Awesome 6 Brands" !important; }
          .awb-icon-twitter:before, .fusion-icon-twitter:before { content: "\\f099" !important; font-family: "Font Awesome 6 Brands" !important; }
          .awb-icon-linkedin:before, .fusion-icon-linkedin:before { content: "\\f08c" !important; font-family: "Font Awesome 6 Brands" !important; }
          .awb-icon-pinterest:before, .fusion-icon-pinterest:before { content: "\\f0d2" !important; font-family: "Font Awesome 6 Brands" !important; }

          /* Fix for Issue #6: Avada "liftup" hover-image background never gets sized.
             The theme's own compiled CSS (never migrated) normally gives
             .fusion-column-inner-bg-image its box; without it the element is
             0x0 and its background-image never paints (seen on /products/ and
             other pages using this component). */
          .fusion-column-inner-bg-image {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
          }

          /* Fix: door/window/garage-door card titles were unreadable (black text
             directly on the photo). Each card already carries the real white
             scrim gradient in --awb-inner-bg-image (set inline by the scrape)
             for exactly this purpose, but nothing applied it as an actual
             background - only the photo itself got painted. Layer it onto the
             text wrapper that already sits on top of the photo. */
          .fusion-column-liftup-border > .fusion-column-wrapper {
            background-image: var(--awb-inner-bg-image) !important;
            background-size: var(--awb-inner-bg-size, cover) !important;
            background-repeat: no-repeat !important;
            background-position: bottom center !important;
          }

          /* Phase 2: Add missing hover states for product/door cards */
          .fusion-column-liftup-border {
            transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          }
          .fusion-column-liftup-border:hover {
            transform: translateY(-10px) !important;
            box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
            z-index: 10 !important;
          }
          .hover-type-liftup {
            transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          }
          .hover-type-zoomin .fusion-column-inner-bg-image {
            transition: transform 0.5s ease !important;
          }
          .fusion-column-liftup-border:hover .hover-type-zoomin .fusion-column-inner-bg-image,
          .post-card-item:hover .fusion-column-inner-bg-image {
            transform: scale(1.05) !important;
          }

          /* Fix for Issue #7: Post-card filter tabs (All/Commercial/Residential)
             never appear. Avada's own CSS hides them by default (display:none)
             and only reveals them via a JS-added state on desktop - that JS
             never runs in this static migration, so the tabs stayed invisible
             on every page using a Fusion post-cards grid (e.g. /projects). */
          .fusion-filters {
            display: flex !important;
          }

          /* Fix: Fusion image galleries (Avada "fusion-gallery" widget, used on
             23 pages) never show any images. Avada's own CSS hides every
             .fusion-gallery-column by default and only reveals them via
             isotope/imagesloaded JS that never runs in this static migration -
             same root cause as the .fusion-filters issue above. */
          .fusion-gallery .fusion-gallery-column {
            display: block !important;
            float: left !important;
          }
          .fusion-gallery:after {
            content: "";
            display: table;
            clear: both;
          }

          /* Fix: Avada's scroll-triggered entrance animations (elements with
             data-animationtype, marked with class "fusion-animated") start
             visibility:hidden and are only revealed by an IntersectionObserver
             JS that never runs in this static migration, so any content using
             this feature stayed permanently invisible (found on 7 pages,
             including about-us and the sectional-garage-doors product-card
             section restored today). Same root cause as the two fixes above. */
          .fusion-animated {
            visibility: visible !important;
          }

          /* Phase 2: Add text-shadow/scrim to improve legibility on busy hero images */
          .fusion-column-has-bg-image .fusion-title-heading,
          .fusion-column-has-bg-image-small .fusion-title-heading,
          .fusion-builder-row-3 .fusion-title-heading,
          .fusion-builder-row-1 .fusion-title-heading {
            text-shadow: 0 4px 25px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6) !important;
          }
          /* The rule above is meant for real photo heroes; it was also
             matching two cases where it just adds an ugly dark glow:
             - door/window/garage-door card titles (now have their own white
               scrim background from the fix above, so a black shadow just
               looks wrong on top of it)
             - a small decorative logo image used as a card background on
               /projects (marked with .fusion-decorative-bg), not a photo */
          .fusion-column-liftup-border .fusion-title-heading,
          .fusion-decorative-bg .fusion-title-heading {
            text-shadow: none !important;
          }

          /* Fix: self-hosted YouTube embeds (6 pages) render on top of the
             section right after them. This is the standard responsive-iframe
             "padding-top: X%" trick (used by .fluid-width-video-wrapper) -
             it only works when the wrapper is positioned and the iframe is
             pulled out of flow with position:absolute; that CSS was never
             migrated, so the wrapper collapsed instead of reserving space. */
          .fluid-width-video-wrapper {
            position: relative !important;
          }
          .fluid-width-video-wrapper iframe {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }

          /* Fix: the footer's "Our Services" column (added alongside Quick
             Links/About Us) inherited the page's base 18px/bold-heading
             styling instead of matching the rest of the footer's nav menus
             (16px, weight 400, 24px line-height) - the compiled per-page
             Avada CSS sets font-size on <li>/<a> with !important, which
             beats a plain inline style, so this needs !important too. */
          nav[aria-label="Footer services menu"] li,
          nav[aria-label="Footer services menu"] a {
            font-size: 16px !important;
            font-weight: 400 !important;
            line-height: 24px !important;
            font-family: "Montserrat", Arial, Helvetica, sans-serif !important;
          }
        `,
          }}
        />
      </head>
      <body
        className="wp-singular page-template page-template-100-width page-template-100-width-php page wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
        suppressHydrationWarning
      >
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX'); // TODO: replace with real GTM container ID from Priyanka
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "CLARITY-XXXXXXX"); // TODO: replace with real Microsoft Clarity project ID from Priyanka
          `}
        </Script>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* TODO: replace GTM-XXXXXXX above with real GTM container ID from Priyanka */}
        <Header />
        {children}
        <Footer />
        <ScrollReveal />
        <AccordionToggle />
      </body>
    </html>
  );
}
