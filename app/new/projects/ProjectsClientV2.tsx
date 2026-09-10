"use client";

import { useEffect, useRef } from "react";

interface Props {
  className: string;
  children: React.ReactNode;
}

export default function ProjectsClientV2({ className, children }: Props) {
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
    <div ref={wrapperRef} className={className} suppressHydrationWarning>
      {children}
    </div>
  );
}
