import type { Metadata } from "next";
import CollabsibleGrilles from "@/components/grilles-shutters/colllabsible-grilles/CollabsibleGrilles";
import Row4 from "@/components/grilles-shutters/colllabsible-grilles/Row4";
import CollapsibleSecurityGrilles from "@/components/grilles-shutters/colllabsible-grilles/CollapsibleSecurityGrilles";
import Row6 from "@/components/grilles-shutters/colllabsible-grilles/Row6";
import Row7 from "@/components/grilles-shutters/colllabsible-grilles/Row7";
import Cx1EntryLevelSecurityGrilles from "@/components/grilles-shutters/colllabsible-grilles/Cx1EntryLevelSecurityGrilles";
import WhatSecurityGrille from "@/components/grilles-shutters/colllabsible-grilles/WhatSecurityGrille";
import FeaturesDoorWindowCollapsibleGrilles from "@/components/grilles-shutters/colllabsible-grilles/FeaturesDoorWindowCollapsibleGrilles";
import KeyFactsAboutSecurityGrilles from "@/components/grilles-shutters/colllabsible-grilles/KeyFactsAboutSecurityGrilles";
import CollabsibleGrillesGallery from "@/components/grilles-shutters/colllabsible-grilles/CollabsibleGrillesGallery";
import LetsSecurePropertyTogether from "@/components/grilles-shutters/colllabsible-grilles/LetsSecurePropertyTogether";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Colllabsible grilles - Secure House",
  description:
    "Collapsible security grilles. A security grille can add a valuable layer of security for your doors as well as windows in both commercial and private premises.",
  alternates: {
    canonical:
      "https://secure-house.co.uk/grilles-shutters/colllabsible-grilles",
  },
  openGraph: {
    title: "Colllabsible grilles - Secure House",
    description: "Collapsible security grilles. A security grille can add a valuable layer of security for your doors as well as windows in both commercial and private premises.",
    url: "https://secure-house.co.uk/grilles-shutters/colllabsible-grilles",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colllabsible grilles - Secure House",
    description: "Collapsible security grilles. A security grille can add a valuable layer of security for your doors as well as windows in both commercial and private premises.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2208 page-child parent-pageid-2126 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
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
                  className="post-2208 page type-page status-publish has-post-thumbnail hentry"
                  id="post-2208"
                >
                  <div
                    className="post-content"
                  >
      <CollabsibleGrilles />
      <Row4 />
      <CollapsibleSecurityGrilles />
      <Row6 />
      <Row7 />
      <Cx1EntryLevelSecurityGrilles />
      <WhatSecurityGrille />
      <FeaturesDoorWindowCollapsibleGrilles />
      <KeyFactsAboutSecurityGrilles />
      <CollabsibleGrillesGallery />
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
