import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import Row3 from "@/components/projects/Row3";
import Row4 from "@/components/projects/Row4";

export const metadata: Metadata = {
  title: "Projects - Secure House",
  description: "Our projects",
  alternates: {
    canonical: "https://secure-house.co.uk/projects",
  },
};

export default function Page() {
  return (
    <ProjectsClient className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-11 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration">
      <link key="pl2" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/0641d0f1c6e8126c14e3ff8f5cde061e.min.css" />
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
                  className="post-11 page type-page status-publish hentry"
                  id="post-11"
                >
                  <div
                    className="post-content"
                  >
      <Row3 />
      <Row4 />
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </ProjectsClient>
  );
}
