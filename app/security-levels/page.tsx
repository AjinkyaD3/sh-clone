import type { Metadata } from "next";
import Row3 from "@/components/security-levels/Row3";
import Row4 from "@/components/security-levels/Row4";
import Row5 from "@/components/security-levels/Row5";
import Row6 from "@/components/security-levels/Row6";
import Row7 from "@/components/security-levels/Row7";
import Row8 from "@/components/security-levels/Row8";
import Row9 from "@/components/security-levels/Row9";
import Row10 from "@/components/security-levels/Row10";
import Row11 from "@/components/security-levels/Row11";

export const metadata: Metadata = {
  title: "Security levels - Secure House",
  description:
    "LS1 Class, RC3 Class, RC4 Class, RC4 + FB4 Class, RC4 + FB6 Class. Make your property a fortress - choose the right security level doors.",
  alternates: {
    canonical: "https://secure-house.co.uk/security-levels",
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-7526 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
    >
      <link key="pl0" rel="stylesheet" href="/legacy-assets/plugins/easy-digital-downloads/includes/blocks/assets/css/edd-blocks.css" />
      <link key="pl1" rel="stylesheet" href="/legacy-assets/plugins/easy-digital-downloads/assets/build/css/frontend/edd.min.css" />
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
                  className="post-7526 page type-page status-publish hentry"
                  id="post-7526"
                >
                  <div
                    className="post-content"
                  >
      <Row3 />
      <Row4 />
      <Row5 />
      <Row6 />
      <Row7 />
      <Row8 />
      <Row9 />
      <Row10 />
      <Row11 />
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
