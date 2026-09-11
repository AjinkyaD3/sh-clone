"use client";

import { useEffect } from "react";

// Every "See more" gallery button (16 pages) uses Avada's awb-gallery
// widget: the first batch of photos renders visible, the rest are already
// in the DOM as .fusion-gallery-column.awb-gallery-item-hidden (the page's
// own compiled CSS sets display:none on that class), and clicking
// .awb-gallery-load-more-btn is supposed to reveal the next
// data-limit-sized batch - driven by real Avada JS this static migration
// never pulls in, so right now the button does nothing and most of each
// gallery (as high as 94% on some pages) stays invisible. This restores
// just that reveal behavior via one delegated listener, same approach as
// AccordionToggle.tsx.
export default function GalleryLoadMore() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const btn = (e.target as HTMLElement)?.closest<HTMLElement>(
        ".awb-gallery-load-more-btn",
      );
      if (!btn) return;

      const wrapper = btn.closest<HTMLElement>(".awb-gallery-wrapper");
      if (!wrapper) return;

      e.preventDefault();

      const limit = parseInt(wrapper.getAttribute("data-limit") || "3", 10);
      const hidden = wrapper.querySelectorAll<HTMLElement>(
        ".fusion-gallery-column.awb-gallery-item-hidden",
      );

      for (let i = 0; i < Math.min(limit, hidden.length); i++) {
        hidden[i].classList.remove("awb-gallery-item-hidden");
      }

      const remaining = wrapper.querySelectorAll(
        ".fusion-gallery-column.awb-gallery-item-hidden",
      ).length;
      if (remaining === 0) {
        btn.style.display = "none";
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
