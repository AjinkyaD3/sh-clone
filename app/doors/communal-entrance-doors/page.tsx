import type { Metadata } from "next";
import CTABlock from "@/components/CTABlock";
import PremiumCommunalEntranceSolutionsApartments from "@/components/doors/communal-entrance-doors/PremiumCommunalEntranceSolutionsApartments";
import Row4 from "@/components/doors/communal-entrance-doors/Row4";
import Row5 from "@/components/doors/communal-entrance-doors/Row5";
import ExploreRangeCommunalFlatEntranceDoors from "@/components/doors/communal-entrance-doors/ExploreRangeCommunalFlatEntranceDoors";
import Row7 from "@/components/doors/communal-entrance-doors/Row7";
import Row8 from "@/components/doors/communal-entrance-doors/Row8";
import VersatilityEveryPropertyType from "@/components/doors/communal-entrance-doors/VersatilityEveryPropertyType";
import CustomDoors from "@/components/doors/communal-entrance-doors/CustomDoors";
import Row14 from "@/components/doors/communal-entrance-doors/Row14";
import Row15 from "@/components/doors/communal-entrance-doors/Row15";
import FullyAccreditedSecurity from "@/components/doors/communal-entrance-doors/FullyAccreditedSecurity";
import Row17 from "@/components/doors/communal-entrance-doors/Row17";
import OverLastFewYearsSecureHouse from "@/components/doors/communal-entrance-doors/OverLastFewYearsSecureHouse";
import SafetyFirst from "@/components/doors/communal-entrance-doors/SafetyFirst";
import CommunalEntranceDoorsGallery from "@/components/doors/communal-entrance-doors/CommunalEntranceDoorsGallery";
import FrequentlyAskedQuestionsFaq from "@/components/doors/communal-entrance-doors/FrequentlyAskedQuestionsFaq";
import LetsSecurePropertyTogether from "@/components/doors/communal-entrance-doors/LetsSecurePropertyTogether";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Communal Entrance Doors | Communal Entrance Doors for Flats",
  description:
    "Upgrade security with premium communal entrance doors for flats. Explore durable, stylish, and secure solutions tailored for apartment and flat entrances.",
  alternates: {
    canonical:
      "https://secure-house.co.uk/doors/communal-entrance-doors/",
  },
  openGraph: {
    title: "Communal Entrance Doors | Communal Entrance Doors for Flats",
    description: "Upgrade security with premium communal entrance doors for flats. Explore durable, stylish, and secure solutions tailored for apartment and flat entrances.",
    url: "https://secure-house.co.uk/doors/communal-entrance-doors/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Communal Entrance Doors | Communal Entrance Doors for Flats",
    description: "Upgrade security with premium communal entrance doors for flats. Explore durable, stylish, and secure solutions tailored for apartment and flat entrances.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2186 page-child parent-pageid-2163 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
    >
      <link key="pl2" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/3978f22170001630860f0711fbc80184.min.css" />
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
              style={{ maxWidth: '100%' } as unknown as React.CSSProperties}
            >
              <section
                className="full-width"
                id="content"
              >
                <div
                  className="post-2186 page type-page status-publish has-post-thumbnail hentry"
                  id="post-2186"
                >
                  <div
                    className="post-content"
                  >
      <PremiumCommunalEntranceSolutionsApartments />
      <Row4 />
      <Row5 />
      <ExploreRangeCommunalFlatEntranceDoors />
      <Row7 />
      <Row8 />
      <VersatilityEveryPropertyType />
      <CustomDoors />
      <Row14 />
      <Row15 />
      <FullyAccreditedSecurity />
      <Row17 />
      <OverLastFewYearsSecureHouse />
      <SafetyFirst />
      <CommunalEntranceDoorsGallery />
      <FrequentlyAskedQuestionsFaq />
      <LetsSecurePropertyTogether />
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <CTABlock
        heading="Secure Every Entrance"
        text="Get a durable, made-to-measure communal entrance door designed for your building and access requirements."
        buttonLabel="Request a Quote"
      />
    </div>
  );
}
