import type { Metadata } from "next";
import CTABlock from "@/components/CTABlock";
import SideHingedGarageDoors from "@/components/garage-doors/side-hinged-garage-doors/SideHingedGarageDoors";
import Row4 from "@/components/garage-doors/side-hinged-garage-doors/Row4";
import SideHingedGarageDoorsOptionWhich from "@/components/garage-doors/side-hinged-garage-doors/SideHingedGarageDoorsOptionWhich";
import Row6 from "@/components/garage-doors/side-hinged-garage-doors/Row6";
import Row7 from "@/components/garage-doors/side-hinged-garage-doors/Row7";
import CustomMadeAnySize from "@/components/garage-doors/side-hinged-garage-doors/CustomMadeAnySize";
import IfYoureNotSureAboutWhat from "@/components/garage-doors/side-hinged-garage-doors/IfYoureNotSureAboutWhat";
import Row10 from "@/components/garage-doors/side-hinged-garage-doors/Row10";
import MainBenefitsSideHingedGarageDoors from "@/components/garage-doors/side-hinged-garage-doors/MainBenefitsSideHingedGarageDoors";
import WeConstructHingedGarageDoorsUsing from "@/components/garage-doors/side-hinged-garage-doors/WeConstructHingedGarageDoorsUsing";
import HowDoesSetSideHingedGarage from "@/components/garage-doors/side-hinged-garage-doors/HowDoesSetSideHingedGarage";
import SideHingedGarageDoorsGallery from "@/components/garage-doors/side-hinged-garage-doors/SideHingedGarageDoorsGallery";
import FrequentlyAskedQuestionsFaq from "@/components/garage-doors/side-hinged-garage-doors/FrequentlyAskedQuestionsFaq";
import LetsSecurePropertyTogether from "@/components/garage-doors/side-hinged-garage-doors/LetsSecurePropertyTogether";
import Row17 from "@/components/garage-doors/side-hinged-garage-doors/Row17";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Side Hinged Garage Doors – Style with Modern Security",
  description:
    "Side hinged garage doors offer classic style with easy access and strong security. Explore high-quality options for your home at Secure House UK today.",
  alternates: {
    canonical:
      "https://secure-house.co.uk/garage-doors/side-hinged-garage-doors",
  },
  openGraph: {
    title: "Side Hinged Garage Doors – Style with Modern Security",
    description: "Side hinged garage doors offer classic style with easy access and strong security. Explore high-quality options for your home at Secure House UK today.",
    url: "https://secure-house.co.uk/garage-doors/side-hinged-garage-doors",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Side Hinged Garage Doors – Style with Modern Security",
    description: "Side hinged garage doors offer classic style with easy access and strong security. Explore high-quality options for your home at Secure House UK today.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2200 page-child parent-pageid-2124 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
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
              style={{ maxWidth: '100%' } as unknown as React.CSSProperties}
            >
              <section
                className="full-width"
                id="content"
              >
                <div
                  className="post-2200 page type-page status-publish has-post-thumbnail hentry"
                  id="post-2200"
                >
                  <div
                    className="post-content"
                  >
      <SideHingedGarageDoors />
      <Row4 />
      <SideHingedGarageDoorsOptionWhich />
      <Row6 />
      <Row7 />
      <CustomMadeAnySize />
      <IfYoureNotSureAboutWhat />
      <Row10 />
      <MainBenefitsSideHingedGarageDoors />
      <WeConstructHingedGarageDoorsUsing />
      <HowDoesSetSideHingedGarage />
      <SideHingedGarageDoorsGallery />
      <FrequentlyAskedQuestionsFaq />
      <LetsSecurePropertyTogether />
      <Row17 />
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <CTABlock
        heading="Classic Access, Modern Performance"
        text="Discover a side-hinged garage door designed around your space, style, and everyday access needs."
        buttonLabel="Design Your Garage Door"
      />
    </div>
  );
}
