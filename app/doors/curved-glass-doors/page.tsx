import type { Metadata } from "next";
import Hero from "@/components/doors/curved-glass-doors/Hero";
import Breadcrumb from "@/components/doors/curved-glass-doors/Breadcrumb";
import IntroBand from "@/components/doors/curved-glass-doors/IntroBand";
import WhatIs from "@/components/doors/curved-glass-doors/WhatIs";
import Benefits from "@/components/doors/curved-glass-doors/Benefits";
import KeyFeaturesWhereUsed from "@/components/doors/curved-glass-doors/KeyFeaturesWhereUsed";
import Faq from "@/components/doors/curved-glass-doors/Faq";
import CTABlock from "@/components/CTABlock";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

// New page built from the client's "Secure House Pages Content 2026" Google
// Doc (SEO page content brief for 3 new product pages). Content is the
// brief's copy verbatim; photos are stand-ins from the site's own glazed/
// security-door photo library - swap in real curved-glass project photos
// when the client supplies them. Built with the same Avada/Fusion markup
// and --awb-* variables every other /doors/* page uses.

export const metadata: Metadata = {
  title: "Curved Glass Doors | Made to Measure & Secure Design",
  description:
    "Made-to-measure curved glass doors, manufactured in the UK. Stunning design with multi-point security as standard. Free consultation.",
  alternates: {
    canonical: "https://secure-house.co.uk/doors/curved-glass-doors/",
  },
  openGraph: {
    title: "Curved Glass Doors | Made to Measure & Secure Design",
    description:
      "Made-to-measure curved glass doors, manufactured in the UK. Stunning design with multi-point security as standard. Free consultation.",
    url: "https://secure-house.co.uk/doors/curved-glass-doors/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curved Glass Doors | Made to Measure & Secure Design",
    description:
      "Made-to-measure curved glass doors, manufactured in the UK. Stunning design with multi-point security as standard. Free consultation.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
    >
      <link key="pl2" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/3978f22170001630860f0711fbc80184.min.css?ver=3.13.3" />
      <link key="pl3" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Megrim" />
      <div id="boxed-wrapper">
        <div className="fusion-wrapper" id="wrapper">
          <main className="clearfix width-100" id="main">
            <div
              className="fusion-row"
              style={{ maxWidth: '100%' } as unknown as React.CSSProperties}
            >
              <section className="full-width" id="content">
                <div className="page type-page status-publish hentry">
                  <div className="post-content">
      <Hero />
      <Breadcrumb />
      <IntroBand />
      <WhatIs />
      <Benefits />
      <KeyFeaturesWhereUsed />
      <Faq />
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <CTABlock
        heading="See Your Curved Glass Door Come to Life"
        text="Talk to our team about a made-to-measure curved glass door for your project, engineered to the same security standards as our full door range."
        buttonLabel="Get a Free Consultation"
      />
    </div>
  );
}
