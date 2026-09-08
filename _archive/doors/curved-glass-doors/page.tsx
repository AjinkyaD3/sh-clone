import fs from 'fs';
import path from 'path';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curved Glass Doors | Made to Measure & Secure Design',
  description: 'Made-to-measure curved glass doors, manufactured in the UK. Stunning design with multi-point security as standard. Free consultation.',
  alternates: {
    canonical: 'https://secure-house-next-js.vercel.app/doors/curved-glass-doors',
  },
};

export default function Page() {
  const filePath = path.join(process.cwd(), 'app', 'doors/curved-glass-doors', 'content.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return (
    <div className="wp-singular page-template page-template-100-width page-template-100-width-php page page-child wp-theme-Avada fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
  );
}
