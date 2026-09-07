import type { Metadata } from "next";
import Script from "next/script";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Secure House",
  description: "Bespoke Security Doors",
  verification: {
    google: 'edxXEeyWtd6YDmc7jkuwID3cQnresUn5GIcq6hDwr_8',
  },
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PC354BRBBF"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PC354BRBBF');
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
          body { font-family: 'Montserrat', sans-serif !important; }
          
          /* Fix for Issue #2: Project card layout */
          .post-card-item {
              background-color: #333333 !important; /* Keep the grey background for the whole card */
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

          /* Phase 2: Add text-shadow/scrim to improve legibility on busy hero images */
          .fusion-column-has-bg-image .fusion-title-heading,
          .fusion-column-has-bg-image-small .fusion-title-heading,
          .fusion-builder-row-3 .fusion-title-heading,
          .fusion-builder-row-1 .fusion-title-heading {
            text-shadow: 0 4px 25px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6) !important;
          }
        ` }} />
      </head>
      <body suppressHydrationWarning>
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
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
        {/* TODO: replace GTM-XXXXXXX above with real GTM container ID from Priyanka */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
