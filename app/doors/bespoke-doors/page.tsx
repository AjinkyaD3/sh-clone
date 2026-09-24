import type { Metadata } from "next";
import Hero from "@/components/doors/bespoke-doors/Hero";
import HeroButtons from "@/components/doors/bespoke-doors/HeroButtons";
import Breadcrumb from "@/components/doors/bespoke-doors/Breadcrumb";
import IntroBand from "@/components/doors/bespoke-doors/IntroBand";
import WhyChoose from "@/components/doors/bespoke-doors/WhyChoose";
import FirstImpression from "@/components/doors/bespoke-doors/FirstImpression";
import TrustedManufacturers from "@/components/doors/bespoke-doors/TrustedManufacturers";
import TypesAccordion from "@/components/doors/bespoke-doors/TypesAccordion";
import Faq from "@/components/doors/bespoke-doors/Faq";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

// Content and layout ported section-for-section from the client's real
// "Bespoke Doors" page (secure-house.co.uk/doors__trashed/bespoke-doors/,
// live but unlinked from the current menu). That page has no body photos at
// all (Wooden/Steel/Internal-External/Benefits/Process/etc. are all one
// accordion list, "Why Choose"/"Trusted Manufacturers" are plain colour
// bands) - matched here 1:1 rather than inventing extra image sections or a
// gallery/CTA band the source page doesn't have. Built with the same
// Avada/Fusion markup and --awb-* variables every other /doors/* page uses.

export const metadata: Metadata = {
  title: "Bespoke Doors |Premium Bespoke Door Manufacturers UK",
  description:
    "Explore high-quality bespoke doors by leading UK manufacturers. Custom designs, secure materials & expert craftsmanship – made just for you. Contact us today!",
  alternates: {
    canonical: "https://secure-house.co.uk/doors/bespoke-doors/",
  },
  openGraph: {
    title: "Bespoke Doors |Premium Bespoke Door Manufacturers UK",
    description:
      "Explore high-quality bespoke doors by leading UK manufacturers. Custom designs, secure materials & expert craftsmanship – made just for you. Contact us today!",
    url: "https://secure-house.co.uk/doors/bespoke-doors/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bespoke Doors |Premium Bespoke Door Manufacturers UK",
    description:
      "Explore high-quality bespoke doors by leading UK manufacturers. Custom designs, secure materials & expert craftsmanship – made just for you. Contact us today!",
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
      <HeroButtons />
      <Breadcrumb />
      <IntroBand />
      <WhyChoose />
      <FirstImpression />
      <TrustedManufacturers />
      <TypesAccordion />
      <Faq />
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
