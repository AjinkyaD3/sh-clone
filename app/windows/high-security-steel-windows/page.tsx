import type { Metadata } from "next";
import HighSecuritySteelWindows from "@/components/windows/high-security-steel-windows/HighSecuritySteelWindows";
import Row4 from "@/components/windows/high-security-steel-windows/Row4";
import HighestQualitySecurityWindowsLondon from "@/components/windows/high-security-steel-windows/HighestQualitySecurityWindowsLondon";
import Row6 from "@/components/windows/high-security-steel-windows/Row6";
import KeyFeaturesSecurityWindows from "@/components/windows/high-security-steel-windows/KeyFeaturesSecurityWindows";
import WeTeamYearsExperienceHomeSecurity from "@/components/windows/high-security-steel-windows/WeTeamYearsExperienceHomeSecurity";
import HighSecuritySteelWindowsGallery from "@/components/windows/high-security-steel-windows/HighSecuritySteelWindowsGallery";
import LetsSecurePropertyTogether from "@/components/windows/high-security-steel-windows/LetsSecurePropertyTogether";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "High security steel windows - Secure House",
  description:
    "Highest quality security windows in London. Every single security windows solution is designed to protect, help you feel safe and secure.",
  alternates: {
    canonical:
      "https://secure-house.co.uk/windows/high-security-steel-windows",
  },
  openGraph: {
    title: "High security steel windows - Secure House",
    description: "Highest quality security windows in London. Every single security windows solution is designed to protect, help you feel safe and secure.",
    url: "https://secure-house.co.uk/windows/high-security-steel-windows",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "High security steel windows - Secure House",
    description: "Highest quality security windows in London. Every single security windows solution is designed to protect, help you feel safe and secure.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2192 page-child parent-pageid-2122 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
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
                  className="post-2192 page type-page status-publish has-post-thumbnail hentry"
                  id="post-2192"
                >
                  <div
                    className="post-content"
                  >
      <HighSecuritySteelWindows />
      <Row4 />
      <HighestQualitySecurityWindowsLondon />
      <Row6 />
      <KeyFeaturesSecurityWindows />
      <WeTeamYearsExperienceHomeSecurity />
      <HighSecuritySteelWindowsGallery />
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
