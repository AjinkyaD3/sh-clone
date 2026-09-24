import type { Metadata } from "next";
import CTABlock from "@/components/CTABlock";
import FireResistantDoors from "@/components/doors/fire-resistant-doors/FireResistantDoors";
import Row4 from "@/components/doors/fire-resistant-doors/Row4";
import Row5 from "@/components/doors/fire-resistant-doors/Row5";
import FireSafetyRegulationsResidentialProperties from "@/components/doors/fire-resistant-doors/FireSafetyRegulationsResidentialProperties";
import Row7 from "@/components/doors/fire-resistant-doors/Row7";
import Row8 from "@/components/doors/fire-resistant-doors/Row8";
import FramelessFireSystems from "@/components/doors/fire-resistant-doors/FramelessFireSystems";
import Row10 from "@/components/doors/fire-resistant-doors/Row10";
import FramelessFireSystemsIi from "@/components/doors/fire-resistant-doors/FramelessFireSystemsIi";
import Row12 from "@/components/doors/fire-resistant-doors/Row12";
import OfficeLine from "@/components/doors/fire-resistant-doors/OfficeLine";
import Row14 from "@/components/doors/fire-resistant-doors/Row14";
import ClassicLine from "@/components/doors/fire-resistant-doors/ClassicLine";
import FireResistantDoorsGallery from "@/components/doors/fire-resistant-doors/FireResistantDoorsGallery";
import Gallery from "@/components/doors/fire-resistant-doors/Gallery";
import FrequentlyAskedQuestionsFaq from "@/components/doors/fire-resistant-doors/FrequentlyAskedQuestionsFaq";
import LetsSecurePropertyTogether from "@/components/doors/fire-resistant-doors/LetsSecurePropertyTogether";
import Row20 from "@/components/doors/fire-resistant-doors/Row20";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Fire Resistant Doors for Homes & Flats | Secure House",
  description:
    "Enhance home safety with premium fire resistant doors for flats and houses. Shop certified fire rated doors for ultimate protection and peace of mind.",
  alternates: {
    canonical:
      "https://secure-house.co.uk/doors/fire-resistant-doors/",
  },
  openGraph: {
    title: "Fire Resistant Doors for Homes & Flats | Secure House",
    description: "Enhance home safety with premium fire resistant doors for flats and houses. Shop certified fire rated doors for ultimate protection and peace of mind.",
    url: "https://secure-house.co.uk/doors/fire-resistant-doors/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fire Resistant Doors for Homes & Flats | Secure House",
    description: "Enhance home safety with premium fire resistant doors for flats and houses. Shop certified fire rated doors for ultimate protection and peace of mind.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-4683 page-child parent-pageid-2163 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
    >
      <link key="pl2" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/14d953cf40ac083fdc4b89930f1dfacc.min.css?ver=3.13.3" />
      <link key="pl3" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Megrim" />
      <div
        id="boxed-wrapper"
      >
        <div
          className="fusion-wrapper"
          id="wrapper"
        >
          <main
            className="clearfix width-100"
            id="main"
          >
            <div
              className="fusion-row"
              style={{ maxWidth: '100%' } as React.CSSProperties}
            >
              <section
                className="full-width"
                id="content"
              >
                <div
                  className="post-4683 page type-page status-publish has-post-thumbnail hentry"
                  id="post-4683"
                >
                  <div
                    className="post-content"
                  >
      <FireResistantDoors />
      <Row4 />
      <Row5 />
      <FireSafetyRegulationsResidentialProperties />
      <Row7 />
      <Row8 />
      <FramelessFireSystems />
      <Row10 />
      <FramelessFireSystemsIi />
      <Row12 />
      <OfficeLine />
      <Row14 />
      <ClassicLine />
      <FireResistantDoorsGallery />
      <Gallery />
      <FrequentlyAskedQuestionsFaq />
      <LetsSecurePropertyTogether />
      <Row20 />
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <CTABlock
        heading="Put Fire Safety at the Heart of Your Project"
        text="Talk to our specialists about a fire-resistant door solution suited to your property's requirements."
        buttonLabel="Speak to a Specialist"
      />
    </div>
  );
}
