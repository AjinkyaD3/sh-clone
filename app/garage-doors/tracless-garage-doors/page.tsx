import type { Metadata } from "next";
import Row3 from "@/components/garage-doors/tracless-garage-doors/Row3";
import Row4 from "@/components/garage-doors/tracless-garage-doors/Row4";
import Row5 from "@/components/garage-doors/tracless-garage-doors/Row5";
import Row6 from "@/components/garage-doors/tracless-garage-doors/Row6";
import Row7 from "@/components/garage-doors/tracless-garage-doors/Row7";
import Row8 from "@/components/garage-doors/tracless-garage-doors/Row8";
import Row9 from "@/components/garage-doors/tracless-garage-doors/Row9";
import Row10 from "@/components/garage-doors/tracless-garage-doors/Row10";
import Row11 from "@/components/garage-doors/tracless-garage-doors/Row11";
import Row12 from "@/components/garage-doors/tracless-garage-doors/Row12";
import Row13 from "@/components/garage-doors/tracless-garage-doors/Row13";
import Row16 from "@/components/garage-doors/tracless-garage-doors/Row16";
import Row17 from "@/components/garage-doors/tracless-garage-doors/Row17";
import Row18 from "@/components/garage-doors/tracless-garage-doors/Row18";
import Row19 from "@/components/garage-doors/tracless-garage-doors/Row19";
import Row20 from "@/components/garage-doors/tracless-garage-doors/Row20";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Tracless garage doors - Secure House",
  description:
    "Our security garage doors is an innovative product with high level of security and design since 2010. Original opening system that doesn't require ceiling tracks.",
  alternates: {
    canonical:
      "https://secure-house.co.uk/garage-doors/tracless-garage-doors",
  },
  openGraph: {
    title: "Tracless garage doors - Secure House",
    description: "Our security garage doors is an innovative product with high level of security and design since 2010. Original opening system that doesn't require ceiling tracks.",
    url: "https://secure-house.co.uk/garage-doors/tracless-garage-doors",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracless garage doors - Secure House",
    description: "Our security garage doors is an innovative product with high level of security and design since 2010. Original opening system that doesn't require ceiling tracks.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2198 page-child parent-pageid-2124 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
    >
      <link key="pl2" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/628a3ba944756a428dd4700fe760b384.min.css?ver=3.13.3" />
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
                  className="post-2198 page type-page status-publish has-post-thumbnail hentry"
                  id="post-2198"
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
      <Row12 />
      <Row13 />
      <Row16 />
      <Row17 />
      <Row18 />
      <Row19 />
      <Row20 />
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
