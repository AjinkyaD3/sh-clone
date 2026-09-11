"use client";

import { useEffect } from "react";

// Every FAQ accordion and "Read more" toggle across the site uses Avada's
// Bootstrap-derived collapse markup: a trigger link with
// data-toggle="collapse" / data-target="#id" / aria-expanded, and a target
// panel with class="panel-collapse collapse" that the page's own compiled
// CSS already hides by default (.collapse{display:none}) and reveals via
// an added .in class (.collapse.in{display:block}). That CSS is real and
// already loads correctly - what's missing is Bootstrap's collapse.js,
// which this static migration never pulls in, so nothing ever adds .in on
// click. This restores just that one behavior via event delegation (one
// listener handles every toggle on the page, including ones added later),
// without installing Bootstrap itself.
export default function AccordionToggle() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const trigger = (e.target as HTMLElement)?.closest<HTMLElement>(
        '[data-toggle="collapse"]',
      );
      if (!trigger) return;

      const targetSelector =
        trigger.getAttribute("data-target") || trigger.getAttribute("href");
      if (!targetSelector || !targetSelector.startsWith("#")) return;

      // getElementById, not querySelector(targetSelector): these ids are
      // content hashes and often start with a digit (e.g. "8b62c..."),
      // which querySelector rejects as an invalid CSS selector and throws -
      // silently breaking every toggle whose id happens to start with 0-9
      // (roughly half of them) since the throw happens before
      // preventDefault() below.
      const target = document.getElementById(targetSelector.slice(1));
      if (!target) return;

      e.preventDefault();

      const isOpen = target.classList.contains("in");

      // Real Bootstrap accordion behavior: if this trigger's target shares
      // a data-parent with other panels, opening one closes the rest.
      const parentSelector = trigger.getAttribute("data-parent");
      if (!isOpen && parentSelector) {
        const parent = document.querySelector(parentSelector);
        parent
          ?.querySelectorAll<HTMLElement>(".panel-collapse.in")
          .forEach((openPanel) => {
            if (openPanel === target) return;
            openPanel.classList.remove("in");
            const openTrigger = document.querySelector<HTMLElement>(
              `[data-target="#${openPanel.id}"], [href="#${openPanel.id}"]`,
            );
            openTrigger?.setAttribute("aria-expanded", "false");
            openTrigger?.classList.remove("active");
          });
      }

      target.classList.toggle("in", !isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
      // The chevron icon swap (fusion-toggle-icon-wrapper's active-icon vs
      // inactive-icon) is keyed off this "active" class on the trigger
      // itself, per the page's compiled CSS - not aria-expanded.
      trigger.classList.toggle("active", !isOpen);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
