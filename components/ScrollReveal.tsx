"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Avada's "scroll-stack" Swiper sections (data-animation="stack", used on
// /doors/communal-entrance-doors, /grilles-shutters/colllabsible-grilles,
// and others) normally animate their cards stacking/rotating in as the user
// scrolls, driven by the real Swiper JS library - which this static
// migration never pulls in (see migration-log/DECISIONS.md, "the Swiper
// carousel decision"). The existing global override in layout.tsx already
// turns .swiper-wrapper into a plain static CSS grid so the content is at
// least visible; this adds a lightweight CSS-only scroll-in reveal on top
// of that grid (approved as the cheaper middle-ground option in that same
// decision) - not a replica of the live site's exact stack/rotate motion,
// just real entrance motion instead of "content just appears".
export default function ScrollReveal() {
  // The root layout doesn't remount on client-side <Link> navigation, so
  // this effect must re-run per route (not just once on first load) or a
  // page reached by clicking through the site instead of a fresh load
  // would never get its cards observed.
  const pathname = usePathname();

  useEffect(() => {
    let currentObserver: IntersectionObserver | undefined;

    // Run after the new route's DOM has actually painted, not mid-transition.
    const raf = requestAnimationFrame(() => {
      const targets = document.querySelectorAll<HTMLElement>(
        ".fusion-scroll-section .swiper-slide:not(.scroll-revealed)",
      );
      if (!targets.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("scroll-revealed");
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
      );

      targets.forEach((el) => observer.observe(el));
      currentObserver = observer;
    });

    return () => {
      cancelAnimationFrame(raf);
      currentObserver?.disconnect();
    };
  }, [pathname]);

  return null;
}
