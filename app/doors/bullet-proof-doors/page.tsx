import type { Metadata } from "next";
import CTABlock from "@/components/CTABlock";
import BulletProofDoorsUltimateSafetySecurity from "@/components/doors/bullet-proof-doors/BulletProofDoorsUltimateSafetySecurity";
import Row4 from "@/components/doors/bullet-proof-doors/Row4";
import Row5 from "@/components/doors/bullet-proof-doors/Row5";
import TrustedSupplierBulletProofDoorsUk from "@/components/doors/bullet-proof-doors/TrustedSupplierBulletProofDoorsUk";
import Row7 from "@/components/doors/bullet-proof-doors/Row7";
import BulletProofSteelDoorsFromSecure from "@/components/doors/bullet-proof-doors/BulletProofSteelDoorsFromSecure";
import FourReasonsToConsider from "@/components/doors/bullet-proof-doors/FourReasonsToConsider";
import BespokeFrontDoorMakeLastingFirst from "@/components/doors/bullet-proof-doors/BespokeFrontDoorMakeLastingFirst";
import KeyFeaturesBulletProofSteelDoors from "@/components/doors/bullet-proof-doors/KeyFeaturesBulletProofSteelDoors";
import Video from "@/components/doors/bullet-proof-doors/Video";
import BulletProofDoorsJewelleryStores from "@/components/doors/bullet-proof-doors/BulletProofDoorsJewelleryStores";
import BulletProofDoorsHomesResidentialAreas from "@/components/doors/bullet-proof-doors/BulletProofDoorsHomesResidentialAreas";
import LetsUsFindYouBestSecurity from "@/components/doors/bullet-proof-doors/LetsUsFindYouBestSecurity";
import BulletProofDoorsGallery from "@/components/doors/bullet-proof-doors/BulletProofDoorsGallery";
import FrequentlyAskedUestionsFaq from "@/components/doors/bullet-proof-doors/FrequentlyAskedUestionsFaq";
import LetsSecurePropertyTogether from "@/components/doors/bullet-proof-doors/LetsSecurePropertyTogether";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Bullet Proof Doors | Bullet Proof Doors for Safety",
  description:
    "Enhance your security with premium bullet proof doors. Explore high-quality bullet proof door solutions for homes, offices, institutions and VIP facilities.",
  alternates: {
    canonical:
      "https://secure-house.co.uk/doors/bullet-proof-doors/",
  },
  openGraph: {
    title: "Bullet Proof Doors | Bullet Proof Doors for Safety",
    description: "Enhance your security with premium bullet proof doors. Explore high-quality bullet proof door solutions for homes, offices, institutions and VIP facilities.",
    url: "https://secure-house.co.uk/doors/bullet-proof-doors/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bullet Proof Doors | Bullet Proof Doors for Safety",
    description: "Enhance your security with premium bullet proof doors. Explore high-quality bullet proof door solutions for homes, offices, institutions and VIP facilities.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2188 page-child parent-pageid-2163 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
    >
      <link key="pl2" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/204df758eb3b02ccb4b196bc9ff47862.min.css" />
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
                  className="post-2188 page type-page status-publish has-post-thumbnail hentry"
                  id="post-2188"
                >
                  <div
                    className="post-content"
                  >
      <BulletProofDoorsUltimateSafetySecurity />
      <Row4 />
      <Row5 />
      <TrustedSupplierBulletProofDoorsUk />
      <Row7 />
      <BulletProofSteelDoorsFromSecure />
      <FourReasonsToConsider />
      <BespokeFrontDoorMakeLastingFirst />
      <KeyFeaturesBulletProofSteelDoors />
      <Video />
      <BulletProofDoorsJewelleryStores />
      <BulletProofDoorsHomesResidentialAreas />
      <LetsUsFindYouBestSecurity />
      <BulletProofDoorsGallery />
      <FrequentlyAskedUestionsFaq />
      <LetsSecurePropertyTogether />
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <CTABlock
        heading="Choose Protection Built Around Your Needs"
        text="Talk to our specialists about a bespoke ballistic door solution for your home, business, or high-security property."
        buttonLabel="Get Expert Advice"
      />
    </div>
  );
}
