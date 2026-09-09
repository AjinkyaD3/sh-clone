"use client";

import { useEffect, useRef } from "react";

interface Props {
  html: string;
}

export default function ProjectsClient({ html }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // --- Projects filter tabs ---
    const filterLinks = wrapper.querySelectorAll<HTMLAnchorElement>(
      ".fusion-filters .fusion-filter a",
    );
    const projectItems = wrapper.querySelectorAll<HTMLLIElement>(
      "ul.fusion-grid > li.post-card-item",
    );

    if (!filterLinks.length || !projectItems.length) return;

    filterLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Update active state on tabs
        wrapper
          .querySelectorAll(".fusion-filters .fusion-filter")
          .forEach((li) => {
            li.classList.remove("fusion-active");
          });
        (link.closest(".fusion-filter") as HTMLElement)?.classList.add(
          "fusion-active",
        );

        const filter = link.getAttribute("data-filter") || "*";

        projectItems.forEach((item) => {
          if (filter === "*") {
            item.style.display = "";
          } else {
            // filter is like ".commercial" → class name is "commercial"
            const cls = filter.replace(".", "");
            item.style.display = item.classList.contains(cls) ? "" : "none";
          }
        });
      });
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-11 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
