"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Avada's "testimonials shortcode" carousel (.fusion-testimonials, used on
// /doors/bullet-proof-doors, /doors/panic-room-doors, all four
// /doors/profile-doors/* variants, /garage-doors/side-hinged-garage-doors,
// and /grilles-shutters/security-shutters) normally cycles between its
// .review panels on a timer and via the .testimonial-pagination dots, driven
// by Avada's real testimonials JS - which this static migration never pulls
// in (see migration-log/DECISIONS.md, the same root cause as ScrollReveal.tsx
// and the trust-logo marquee). Without it, only the first .review (the one
// already marked .active-testimonial in the markup) is ever visible - the
// legacy fusion stylesheets hide the rest via opacity - and the pagination
// dots are plain dead <a href="#"> links. This wires up the same class
// toggling the real widget would have done: auto-advance on each widget's
// own data-speed, and click-to-jump on its dots.
export default function TestimonialsCarousel() {
  const pathname = usePathname();

  useEffect(() => {
    const widgets = document.querySelectorAll<HTMLElement>(".fusion-testimonials");
    if (!widgets.length) return;

    const cleanups: Array<() => void> = [];

    widgets.forEach((widget) => {
      // Guard against React effect double-invocation (dev Strict Mode) or a
      // Fast Refresh re-run wiring the same widget twice, which previously
      // let two independent interval loops fight over the same elements and
      // leave the active dot and active review pointing at different slides.
      if (widget.dataset.testimonialsWired === "1") return;
      widget.dataset.testimonialsWired = "1";

      const reviews = Array.from(widget.querySelectorAll<HTMLElement>(".reviews > .review"));
      const dots = Array.from(widget.querySelectorAll<HTMLAnchorElement>(".testimonial-pagination > a"));
      if (reviews.length < 2 || reviews.length !== dots.length) return;

      const speed = Number(widget.dataset.speed) || 4000;

      // Always derive the current slide from the DOM rather than a separate
      // counter, so dots and reviews can never drift out of sync with
      // each other even if a tick fires from a stale closure.
      const currentIndex = () => {
        const idx = reviews.findIndex((r) => r.classList.contains("active-testimonial"));
        return idx < 0 ? 0 : idx;
      };

      const goTo = (index: number) => {
        const current = currentIndex();
        reviews[current]?.classList.remove("active-testimonial");
        dots[current]?.classList.remove("activeSlide");
        reviews[index]?.classList.add("active-testimonial");
        dots[index]?.classList.add("activeSlide");
      };

      let timer = window.setInterval(() => goTo((currentIndex() + 1) % reviews.length), speed);

      const handlers = dots.map((dot, i) => {
        const handler = (e: MouseEvent) => {
          e.preventDefault();
          window.clearInterval(timer);
          goTo(i);
          timer = window.setInterval(() => goTo((currentIndex() + 1) % reviews.length), speed);
        };
        dot.addEventListener("click", handler);
        return { dot, handler };
      });

      cleanups.push(() => {
        window.clearInterval(timer);
        handlers.forEach(({ dot, handler }) => dot.removeEventListener("click", handler));
        delete widget.dataset.testimonialsWired;
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
