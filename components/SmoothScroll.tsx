"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Site-wide inertial ("buttery") wheel scrolling, the same Lenis setup the
// reference build (olivedrab-dove-173337.hostingersite.com) uses: 1.2s
// duration with an exponential ease-out. Lenis drives the real window
// scroll position (window.scrollTo), so everything that listens to native
// scroll events - the sticky header, ScrollReveal's IntersectionObserver,
// position:sticky - keeps working unchanged.
//
// Deliberately NOT enabled:
// - `anchors`: Lenis would intercept every <a href="#..."> click, and this
//   site uses hash links as JS triggers (#products-panel-trigger,
//   #mobile-menu-trigger, #get-a-quote-trigger) - those must stay untouched.
// - lenis/dist/lenis.css: its `.lenis-smooth iframe { pointer-events: none }`
//   rule would make YouTube embeds, maps and the Tawk.to chat unclickable.
//   The parts we do need are in the <style> below instead.
// Touch devices keep native scrolling (syncTouch defaults to false), and
// prefers-reduced-motion turns the smoothing off entirely.
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      // Scrollable panels (full-screen products menu, quote drawer, any
      // overflow:auto box) scroll themselves instead of the page.
      allowNestedScroll: true,
      autoRaf: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Client-side navigation: Next.js resets the scroll position itself. Kill
  // any in-flight inertia from the previous page so Lenis doesn't keep
  // easing toward a target that belonged to the old route, then re-measure
  // the new page's height.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    lenis.resize();
  }, [pathname]);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          html.lenis, html.lenis body { height: auto; }
          .lenis.lenis-smooth { scroll-behavior: auto !important; }
          .lenis [data-lenis-prevent] { overscroll-behavior: contain; }
          .lenis.lenis-stopped { overflow: clip; }
        `,
      }}
    />
  );
}
