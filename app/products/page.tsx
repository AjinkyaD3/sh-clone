import type { Metadata } from "next";
import Products from "@/components/products/Products";
import Row4 from "@/components/products/Row4";
import ResidentialDoors from "@/components/products/ResidentialDoors";
import CommercialDoors from "@/components/products/CommercialDoors";
import Windows from "@/components/products/Windows";
import Shutters from "@/components/products/Shutters";
import GarageDoors from "@/components/products/GarageDoors";
import LetsSecurePropertyTogether from "@/components/products/LetsSecurePropertyTogether";
import { DEFAULT_OG_IMAGE } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Products - Secure House",
  description:
    "Products: Security doors, Windows, Security shutters, Garage doors. Residential doors: Premium high security doors, Panic room doors, Steel security doors.",
  alternates: {
    canonical: "https://secure-house.co.uk/products",
  },
  openGraph: {
    title: "Products - Secure House",
    description: "Products: Security doors, Windows, Security shutters, Garage doors. Residential doors: Premium high security doors, Panic room doors, Steel security doors.",
    url: "https://secure-house.co.uk/products",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products - Secure House",
    description: "Products: Security doors, Windows, Security shutters, Garage doors. Residential doors: Premium high security doors, Panic room doors, Steel security doors.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-7483 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
    >
      <link key="pl2" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/26c924201688b4151aeccfd2f78fb6a8.min.css" />
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
                  className="post-7483 page type-page status-publish hentry"
                  id="post-7483"
                >
                  <div
                    className="post-content"
                  >
      <Products />
      <Row4 />
      <ResidentialDoors />
      <CommercialDoors />
      <Windows />
      <Shutters />
      <GarageDoors />
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
