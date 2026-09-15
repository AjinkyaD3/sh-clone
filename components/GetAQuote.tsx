"use client";

import { useEffect, useState } from "react";

// Live site (secure-house.co.uk) has a persistent "Get a Quote" vertical tab
// fixed to the right edge on every page, opening a slide-in panel with a
// proper enquiry form (product-interest checkboxes + enquiry + contact
// details) - a much higher-intent CTA than the plain contact form, reachable
// from anywhere without navigating away. This never made it into the
// migration. Ported as a self-contained global component (mounted once in
// layout.tsx, same pattern as Header's off-canvas menu) since nothing else
// on the site currently owns this UI.
//
// The submit handler has no backend yet - same state as the main
// /contact-us form (see migration-log/CHANGES-NEEDED.md, "contact form
// backend") - so this only confirms receipt and closes the panel.
const INTERESTS = [
  "Security doors",
  "Windows",
  "Garage doors",
  "Security shutters",
  "Security grillers",
  "Doors for trade",
];

export default function GetAQuote() {
  const [open, setOpen] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const toggleInterest = (label: string) => {
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label="Get a quote"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="get-a-quote-tab"
      >
        Get a quote
      </button>

      <div
        className={`get-a-quote-overlay${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`get-a-quote-panel${open ? " is-open" : ""}`}
        inert={!open}
        aria-label="Get a quote"
      >
        <button
          type="button"
          aria-label="Close"
          className="get-a-quote-close"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>

        {sent ? (
          <div className="get-a-quote-thanks">
            <h2>Thank you</h2>
            <p>Your enquiry has been received. We&apos;ll be in touch shortly.</p>
          </div>
        ) : (
          <>
            <h2>Get a Quote</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                setSending(true);
                const form = e.currentTarget;
                const data = new FormData(form);
                try {
                  const res = await fetch("/api/enquiry", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      formType: "quote",
                      interests,
                      enquiry: data.get("enquiry"),
                      name: data.get("name"),
                      email: data.get("email"),
                      phone: data.get("phone"),
                      address: data.get("address"),
                    }),
                  });
                  const body = await res.json();
                  if (!res.ok) throw new Error(body.error || "Something went wrong.");
                  setSent(true);
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Something went wrong.");
                } finally {
                  setSending(false);
                }
              }}
            >
              <fieldset className="get-a-quote-fieldset">
                <legend>I&apos;m interested in:</legend>
                {INTERESTS.map((label) => (
                  <label key={label} className="get-a-quote-checkbox">
                    <input
                      type="checkbox"
                      checked={interests.includes(label)}
                      onChange={() => toggleInterest(label)}
                    />
                    {label}
                  </label>
                ))}
              </fieldset>
              <label className="get-a-quote-field">
                Your enquiry <span aria-hidden="true">*</span>
                <textarea name="enquiry" required rows={3} />
              </label>
              <label className="get-a-quote-field">
                Name <span aria-hidden="true">*</span>
                <input name="name" type="text" required />
              </label>
              <label className="get-a-quote-field">
                Email <span aria-hidden="true">*</span>
                <input name="email" type="email" required />
              </label>
              <label className="get-a-quote-field">
                Phone number <span aria-hidden="true">*</span>
                <input name="phone" type="tel" required />
              </label>
              <label className="get-a-quote-field">
                Full postal address <span aria-hidden="true">*</span>
                <input name="address" type="text" required />
              </label>
              {error && <p className="get-a-quote-error">{error}</p>}
              <button type="submit" className="get-a-quote-submit" disabled={sending}>
                {sending ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          </>
        )}
      </aside>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .get-a-quote-tab {
              position: fixed;
              top: 50%;
              right: 0;
              transform: translateY(-50%) rotate(180deg);
              writing-mode: vertical-rl;
              background-color: #e1d8c0;
              color: #1c1e36;
              border: none;
              padding: 18px 16px;
              min-width: 44px;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              cursor: pointer;
              z-index: 10020;
              box-shadow: -1px 0 4px rgba(0, 0, 0, 0.15);
            }
            .get-a-quote-tab:hover {
              background-color: #d6cbae;
            }

            .get-a-quote-overlay {
              position: fixed;
              inset: 0;
              background-color: rgba(28, 30, 54, 0.65);
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.3s ease;
              z-index: 10021;
            }
            .get-a-quote-overlay.is-open {
              opacity: 1;
              pointer-events: auto;
            }

            .get-a-quote-panel {
              position: fixed;
              top: 0;
              right: 0;
              bottom: 0;
              width: min(420px, 100vw);
              background-color: #f5efe9;
              color: #1c1e36;
              z-index: 10022;
              padding: 48px 40px;
              overflow-y: auto;
              transform: translateX(100%);
              transition: transform 0.35s ease;
            }
            .get-a-quote-panel.is-open {
              transform: translateX(0);
            }

            .get-a-quote-close {
              position: absolute;
              top: 16px;
              right: 20px;
              background: none;
              border: none;
              font-size: 28px;
              line-height: 1;
              color: #1c1e36;
              cursor: pointer;
              padding: 4px 8px;
            }

            .get-a-quote-panel h2 {
              font-family: "Playfair Display", serif;
              font-weight: 400;
              font-size: 32px;
              margin: 0 0 28px;
            }

            .get-a-quote-fieldset {
              border: none;
              padding: 0;
              margin: 0 0 20px;
            }
            .get-a-quote-fieldset legend {
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 0.06em;
              text-transform: uppercase;
              padding: 0 0 10px;
            }
            .get-a-quote-checkbox {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 14px;
              padding: 4px 0;
              cursor: pointer;
            }
            .get-a-quote-checkbox input {
              accent-color: #847b73;
            }

            .get-a-quote-field {
              display: block;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 0.04em;
              text-transform: uppercase;
              margin-bottom: 18px;
            }
            .get-a-quote-field input,
            .get-a-quote-field textarea {
              display: block;
              width: 100%;
              margin-top: 8px;
              font-size: 15px;
              font-weight: 400;
              text-transform: none;
              letter-spacing: normal;
              font-family: inherit;
              background: transparent;
              border: none;
              border-bottom: 1px solid #847b73;
              padding: 6px 0;
              resize: vertical;
            }
            .get-a-quote-field input:focus,
            .get-a-quote-field textarea:focus {
              outline: none;
              border-bottom-color: #1c1e36;
            }

            .get-a-quote-submit {
              display: inline-block;
              background: transparent;
              border: 1px solid #1c1e36;
              color: #1c1e36;
              padding: 14px 32px;
              font-size: 14px;
              font-weight: 600;
              letter-spacing: 0.04em;
              text-transform: uppercase;
              cursor: pointer;
              margin-top: 8px;
            }
            .get-a-quote-submit:hover {
              background-color: #1c1e36;
              color: #f5efe9;
            }
            .get-a-quote-submit:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }

            .get-a-quote-error {
              color: #a33;
              font-size: 13px;
              margin: -6px 0 14px;
            }

            .get-a-quote-thanks h2 {
              font-family: "Playfair Display", serif;
              font-weight: 400;
              font-size: 28px;
              margin: 0 0 16px;
            }
            .get-a-quote-thanks p {
              font-size: 15px;
              line-height: 1.6;
            }

            @media (max-width: 640px) {
              .get-a-quote-panel {
                padding: 40px 24px;
              }
            }
          `,
        }}
      />
    </>
  );
}
