import type { Metadata } from "next";
import CTABlock from "@/components/CTABlock";
import PremiumHighSecurityDoors from "@/components/doors/high-security-doors/PremiumHighSecurityDoors";
import Row4 from "@/components/doors/high-security-doors/Row4";
import Row5 from "@/components/doors/high-security-doors/Row5";
import ProtectHomeHighSecurityFrontDoors from "@/components/doors/high-security-doors/ProtectHomeHighSecurityFrontDoors";
import OurSecurityDoorFeatures from "@/components/doors/high-security-doors/OurSecurityDoorFeatures";
import BespokeManufacture from "@/components/doors/high-security-doors/BespokeManufacture";
import LearnMore from "@/components/doors/high-security-doors/LearnMore";
import ChooseSecurityDoorType from "@/components/doors/high-security-doors/ChooseSecurityDoorType";
import PremiumSteelSecurityDoors from "@/components/doors/high-security-doors/PremiumSteelSecurityDoors";
import Row12 from "@/components/doors/high-security-doors/Row12";
import StillConsideringIfYouNeedSecurity from "@/components/doors/high-security-doors/StillConsideringIfYouNeedSecurity";
import WhatMakesSecurityDoorsEssential from "@/components/doors/high-security-doors/WhatMakesSecurityDoorsEssential";
import HowChooseSecurityDoors from "@/components/doors/high-security-doors/HowChooseSecurityDoors";
import Row16 from "@/components/doors/high-security-doors/Row16";
import Row17 from "@/components/doors/high-security-doors/Row17";
import PremiumHighSecurityDoorsGallery from "@/components/doors/high-security-doors/PremiumHighSecurityDoorsGallery";
import FrequentlyAskedQuestionsFaq from "@/components/doors/high-security-doors/FrequentlyAskedQuestionsFaq";
import LetsSecurePropertyTogether from "@/components/doors/high-security-doors/LetsSecurePropertyTogether";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "High Security Doors | Security Front Doors UK",
  description:
    "Explore the best high security doors in the UK. Secure House offers expert insights into choosing the right security front doors for maximum protection.",
  alternates: {
    canonical:
      "https://secure-house.co.uk/doors/high-security-doors/",
  },
  openGraph: {
    title: "High Security Doors | Security Front Doors UK",
    description: "Explore the best high security doors in the UK. Secure House offers expert insights into choosing the right security front doors for maximum protection.",
    url: "https://secure-house.co.uk/doors/high-security-doors/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "High Security Doors | Security Front Doors UK",
    description: "Explore the best high security doors in the UK. Secure House offers expert insights into choosing the right security front doors for maximum protection.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2183 page-child parent-pageid-2163 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
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
                  className="post-2183 page type-page status-publish has-post-thumbnail hentry"
                  id="post-2183"
                >
                  <div
                    className="post-content"
                  >
      <PremiumHighSecurityDoors />
      <Row4 />
      <Row5 />
      <ProtectHomeHighSecurityFrontDoors />
      <OurSecurityDoorFeatures />
      <BespokeManufacture />
      <LearnMore />
      <ChooseSecurityDoorType />
      <PremiumSteelSecurityDoors />
      <Row12 />
      <StillConsideringIfYouNeedSecurity />
      <WhatMakesSecurityDoorsEssential />
      <HowChooseSecurityDoors />
      <Row16 />
      <Row17 />
      <PremiumHighSecurityDoorsGallery />
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
        heading="Protect What Matters Most"
        text="Get a bespoke high-security door designed for your property and security requirements."
        buttonLabel="Get a Free Consultation"
      />
    </div>
  );
}
