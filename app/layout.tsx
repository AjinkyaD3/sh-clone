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
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
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
          .post-card-item .fusion-column-wrapper {
              background-color: transparent !important; /* Remove the solid black bars */
              padding: 20px !important;
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
