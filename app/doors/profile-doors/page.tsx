import type { Metadata } from "next";
import ProfileDoors from "@/components/doors/profile-doors/ProfileDoors";
import Row4 from "@/components/doors/profile-doors/Row4";
import UnicoSlimeLine from "@/components/doors/profile-doors/UnicoSlimeLine";
import LetsSecurePropertyTogether from "@/components/doors/profile-doors/LetsSecurePropertyTogether";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Profile Doors UK – Bespoke Security & Premium Door Systems",
  description:
    "Profile doors: Unico slim line, Fuego fire, Presto bullet proof, Stainless steel.",
  alternates: {
    canonical: "https://secure-house.co.uk/doors/profile-doors",
  },
  openGraph: {
    title: "Profile Doors UK – Bespoke Security & Premium Door Systems",
    description: "Profile doors: Unico slim line, Fuego fire, Presto bullet proof, Stainless steel.",
    url: "https://secure-house.co.uk/doors/profile-doors",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Profile Doors UK – Bespoke Security & Premium Door Systems",
    description: "Profile doors: Unico slim line, Fuego fire, Presto bullet proof, Stainless steel.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2190 page-parent page-child parent-pageid-2163 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
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
                  className="post-2190 page type-page status-publish has-post-thumbnail hentry"
                  id="post-2190"
                >
                  <div
                    className="post-content"
                  >
      <ProfileDoors />
      <Row4 />
      <UnicoSlimeLine />
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
