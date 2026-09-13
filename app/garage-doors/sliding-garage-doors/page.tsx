import type { Metadata } from "next";
import SlidingGarageDoors from "@/components/garage-doors/sliding-garage-doors/SlidingGarageDoors";
import Row4 from "@/components/garage-doors/sliding-garage-doors/Row4";
import SpaceSavingDesignSuperiorPerformanceCustomization from "@/components/garage-doors/sliding-garage-doors/SpaceSavingDesignSuperiorPerformanceCustomization";
import Row6 from "@/components/garage-doors/sliding-garage-doors/Row6";
import TwoHundredPlusDesigns from "@/components/garage-doors/sliding-garage-doors/TwoHundredPlusDesigns";
import VideoEmbed from "@/components/garage-doors/sliding-garage-doors/VideoEmbed";
import FeaturesSlidingSectionalGarageDoorRange from "@/components/garage-doors/sliding-garage-doors/FeaturesSlidingSectionalGarageDoorRange";
import WhyChooseSlidingTypeGarageDoors from "@/components/garage-doors/sliding-garage-doors/WhyChooseSlidingTypeGarageDoors";
import MaximumPracticality from "@/components/garage-doors/sliding-garage-doors/MaximumPracticality";
import SlidingGarageDoorsGallery from "@/components/garage-doors/sliding-garage-doors/SlidingGarageDoorsGallery";
import LetsSecurePropertyTogether from "@/components/garage-doors/sliding-garage-doors/LetsSecurePropertyTogether";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Sliding garage doors - Secure House",
  description:
    "Sliding garage doors: space-saving design with superior performance and customization. Sliding garage doors by Secure House are the most advanced garage door solution.",
  alternates: {
    canonical:
      "https://secure-house.co.uk/garage-doors/sliding-garage-doors",
  },
  openGraph: {
    title: "Sliding garage doors - Secure House",
    description: "Sliding garage doors: space-saving design with superior performance and customization. Sliding garage doors by Secure House are the most advanced garage door solution.",
    url: "https://secure-house.co.uk/garage-doors/sliding-garage-doors",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sliding garage doors - Secure House",
    description: "Sliding garage doors: space-saving design with superior performance and customization. Sliding garage doors by Secure House are the most advanced garage door solution.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2202 page-child parent-pageid-2124 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
    >
      <link key="pl2" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/3978f22170001630860f0711fbc80184.min.css?ver=3.13.3" />
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
                  className="post-2202 page type-page status-publish has-post-thumbnail hentry"
                  id="post-2202"
                >
                  <div
                    className="post-content"
                  >
      <SlidingGarageDoors />
      <Row4 />
      <SpaceSavingDesignSuperiorPerformanceCustomization />
      <Row6 />
      <TwoHundredPlusDesigns />
      <VideoEmbed />
      <FeaturesSlidingSectionalGarageDoorRange />
      <WhyChooseSlidingTypeGarageDoors />
      <MaximumPracticality />
      <SlidingGarageDoorsGallery />
      <LetsSecurePropertyTogether />
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
