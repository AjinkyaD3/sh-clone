import fs from "fs";
import path from "path";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade - Secure House",
  description:
    "Doors for trade. At Door World Factory we manufacture high security, steel timber clad doors, slim line industrial steel doors, French doors, bespoke doors.",
  alternates: {
    canonical: "https://secure-house.co.uk/trade",
  },
};

export default function Page() {
  const filePath = path.join(process.cwd(), "app",
    "legacy", "trade", "content.html");
  const html = fs.readFileSync(filePath, "utf-8");
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2669 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
