import type { Metadata } from "next";
import HeroSlider from "@/components/HeroSlider";
import IntroHeading from "@/components/home/IntroHeading";
import CategoryCards from "@/components/home/CategoryCards";
import LuxuryDoorsDetails from "@/components/home/LuxuryDoorsDetails";
import DoorsDesignVideo from "@/components/home/DoorsDesignVideo";
import BespokeManufacturer from "@/components/home/BespokeManufacturer";
import TrustedManufacturer from "@/components/home/TrustedManufacturer";
import OurProjects from "@/components/home/OurProjects";
import SecureCta from "@/components/home/SecureCta";
import TrustLogos from "@/components/home/TrustLogos";
import { DEFAULT_OG_IMAGE } from "../lib/seo";

const TITLE =
  "Security Doors Manufacturer London, UK | Bespoke Security Doors – Secure House";
const DESCRIPTION =
  "Bespoke, mastercrafted security doors and windows manufactured in the UK. Explore high-security solutions for homes and businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://secure-house.co.uk/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://secure-house.co.uk/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <>
      <HeroSlider />
      <div
        className="home wp-singular page-template page-template-100-width page-template-100-width-php page page-id-1050 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
        suppressHydrationWarning
      >
        <link key="pl0" rel="stylesheet" href="/legacy-assets/css/homepage-styles.css" />
        <link key="pl1" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/3978f22170001630860f0711fbc80184.min.css" />
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
                    className="post-1050 page type-page status-publish hentry"
                    id="post-1050"
                  >
                    <div
                      className="post-content"
                    >
                      <div
                        id="__hero-slider-mount"
                      ></div>
                      <IntroHeading />
                      <CategoryCards />
                      <LuxuryDoorsDetails />
                      <DoorsDesignVideo />
                      <BespokeManufacturer />
                      <TrustedManufacturer />
                      <OurProjects />
                      <SecureCta />
                      <TrustLogos />
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
