"use client";

import { useEffect, useState } from "react";

// The live site's 3 Forster/Janisol profile-door pages (Fuego Fire, Presto
// Bullet Proof, Unico Slim Line) each have a "System overview" button below
// their spec table that opens a panel listing real downloadable PDF spec
// sheets (fire-rating certs, glazing/hardware system posters). Our scraped
// content.html captured the button (styled correctly, already in each
// page's JSX) but not the panel it was supposed to open - href="#awb-oc__..."
// pointed at an off-canvas element that only Avada's own JS builds at
// runtime, which never runs here. This is that panel, rebuilt for real, with
// the actual PDFs (sourced from the live site, see migration-log) now served
// from public/downloads/ instead of the dead anchor link.
export interface SystemOverviewItem {
  label: string;
  href: string;
}

export default function SystemOverviewModal({
  heading,
  items,
  triggerClassName,
  triggerStyle,
}: {
  heading: string;
  items: SystemOverviewItem[];
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        style={triggerStyle}
        onClick={() => setOpen(true)}
      >
        <span className="fusion-button-text awb-button__text awb-button__text--default">
          {`System overview`}
        </span>
      </button>

      <div
        className={`system-overview-overlay${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`system-overview-modal${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close"
          className="system-overview-close"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        <h2>{heading}</h2>
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              <p>{item.label}</p>
              <a href={item.href} target="_blank" rel="noreferrer">
                View/Download
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .system-overview-overlay {
              position: fixed;
              inset: 0;
              background-color: rgba(28, 30, 54, 0.65);
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.3s ease;
              z-index: 10021;
            }
            .system-overview-overlay.is-open {
              opacity: 1;
              pointer-events: auto;
            }

            .system-overview-modal {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) scale(0.96);
              width: min(560px, calc(100vw - 40px));
              max-height: calc(100vh - 80px);
              overflow-y: auto;
              background-color: #ffffff;
              color: #1c1e36;
              padding: 40px;
              z-index: 10022;
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.2s ease, transform 0.2s ease;
            }
            .system-overview-modal.is-open {
              opacity: 1;
              pointer-events: auto;
              transform: translate(-50%, -50%) scale(1);
            }

            .system-overview-close {
              position: absolute;
              top: 12px;
              right: 16px;
              background: none;
              border: none;
              font-size: 26px;
              line-height: 1;
              color: #1c1e36;
              cursor: pointer;
              padding: 4px 8px;
            }

            .system-overview-modal h2 {
              font-family: "Playfair Display", serif;
              font-weight: 500;
              font-size: 24px;
              text-align: center;
              margin: 0 0 28px;
            }

            .system-overview-modal ul {
              list-style: none;
              margin: 0;
              padding: 0;
            }
            .system-overview-modal li {
              padding: 14px 0;
              border-bottom: 1px solid #e7e2da;
            }
            .system-overview-modal li:last-child {
              border-bottom: none;
            }
            .system-overview-modal li p {
              margin: 0 0 4px;
              font-size: 15px;
              line-height: 1.4;
            }
            .system-overview-modal li a {
              font-size: 14px;
              color: #847b73;
              text-decoration: underline;
            }
            .system-overview-modal li a:hover {
              color: #1c1e36;
            }
          `,
        }}
      />
    </>
  );
}
