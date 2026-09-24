import type { Metadata } from "next";
import GrillesShutters from "@/components/grilles-shutters/GrillesShutters";
import SecurityRatedShuttersGrillesHomesBusinesses from "@/components/grilles-shutters/SecurityRatedShuttersGrillesHomesBusinesses";
import SecurityShutters from "@/components/grilles-shutters/SecurityShutters";
import LetsSecurePropertyTogether from "@/components/grilles-shutters/LetsSecurePropertyTogether";
import { DEFAULT_OG_IMAGE } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Grilles, shutters - Secure House",
  description:
    "Security-rated shutters and grilles for homes and businesses. Security shutters, High security shutters, Collapsible grilles.",
  alternates: {
    canonical: "https://secure-house.co.uk/grilles-shutters/",
  },
  openGraph: {
    title: "Grilles, shutters - Secure House",
    description: "Security-rated shutters and grilles for homes and businesses. Security shutters, High security shutters, Collapsible grilles.",
    url: "https://secure-house.co.uk/grilles-shutters/",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grilles, shutters - Secure House",
    description: "Security-rated shutters and grilles for homes and businesses. Security shutters, High security shutters, Collapsible grilles.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2126 page-parent wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
    >
      <link key="pl2" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/e1ae33d6da5dd988a158e532df4f0662.min.css" />
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
                  className="post-2126 page type-page status-publish hentry"
                  id="post-2126"
                >
                  <div
                    className="post-content"
                  >
      <GrillesShutters />
      <SecurityRatedShuttersGrillesHomesBusinesses />
      <SecurityShutters />
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
