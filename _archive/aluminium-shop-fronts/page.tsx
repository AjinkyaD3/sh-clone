import fs from 'fs';
import path from 'path';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure & Stylish Aluminium Shop Fronts for Your Business',
  description: 'Protect your store with Secure House\'s aluminium shop fronts — combining strength, style, and advanced security to keep your business safe.',
  alternates: {
    canonical: 'https://secure-house-next-js.vercel.app/aluminium-shop-fronts',
  },
};

export default function Page() {
  const filePath = path.join(process.cwd(), 'app', 'aluminium-shop-fronts', 'content.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return (
    <>
      <div className="wp-singular post-template-default single single-post postid-9663 single-format-standard wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BlogPosting","mainEntityOfPage":{"@type":"WebPage","@id":"https://secure-house-next-js.vercel.app/aluminium-shop-fronts"},"headline":"Secure & Stylish Aluminium Shop Fronts for Your Business.","description":"Protect your store with Secure House's aluminium shop fronts, combining strength, style, and advanced security to keep your business safe.","image":"","author":{"@type":"Organization","name":""},"publisher":{"@type":"Organization","name":"Secure House","logo":{"@type":"ImageObject","url":"https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},"datePublished":"2025-10-14","dateModified":"2025-10-15"}) }} />
    </>
  );
}
