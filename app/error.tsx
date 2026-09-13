"use client";

import { useEffect } from "react";
import Link from "next/link";

// Catches unexpected rendering/runtime errors anywhere under the root
// layout (Next.js error boundary convention - must be a client component,
// receives `error` and a `reset()` that re-renders the segment without a
// full page reload). Still renders inside the root layout, so Header/
// Footer/chat widget/Get-a-Quote tab all still appear. This does NOT catch
// an error thrown by the root layout itself - that needs global-error.tsx,
// which has its own separate file since it must supply its own <html>/<body>.
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      {/* Same fix as not-found.tsx and the earlier /blog bug - Header/Footer
          need this bundle's shared base theme CSS, which only scraped pages
          load automatically. */}
      <link
        rel="stylesheet"
        href="/legacy-assets/uploads/fusion-styles/3978f22170001630860f0711fbc80184.min.css"
      />
      <div className="error-page">
      <p className="error-eyebrow">Something went wrong</p>
      <h1>Sorry, that page hit a snag</h1>
      <p className="error-body">
        This isn&apos;t you - it&apos;s us. Try again, or head back to the
        homepage. If it keeps happening, give us a call and we&apos;ll sort
        it out directly.
      </p>

      <div className="error-actions">
        <button type="button" onClick={() => reset()} className="error-retry">
          Try again
        </button>
        <Link href="/" className="error-home">
          Back to homepage
        </Link>
      </div>

      <p className="error-phone">
        Or call us on <a href="tel:+442078594207">+44 20 7859 4207</a>
      </p>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .error-page {
              min-height: 60vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 120px 24px;
              background-color: #f5efe9;
              color: #1c1e36;
            }
            .error-eyebrow {
              font-size: 13px;
              font-weight: 600;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: #847b73;
              margin: 0 0 16px;
            }
            .error-page h1 {
              font-family: "Playfair Display", serif;
              font-weight: 500;
              font-size: clamp(28px, 5vw, 42px);
              margin: 0 0 16px;
              color: #1c1e36 !important;
            }
            .error-body {
              font-size: 16px;
              line-height: 1.6;
              max-width: 480px;
              margin: 0 0 32px;
            }
            .error-actions {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 16px;
              margin-bottom: 32px;
            }
            .error-retry {
              background-color: #1c1e36;
              color: #f5efe9;
              border: 1px solid #1c1e36;
              padding: 12px 28px;
              font-size: 14px;
              font-weight: 600;
              letter-spacing: 0.02em;
              text-transform: uppercase;
              cursor: pointer;
            }
            .error-retry:hover {
              background-color: #635548;
              border-color: #635548;
            }
            .error-home {
              display: inline-flex;
              align-items: center;
              background: transparent;
              color: #1c1e36;
              border: 1px solid #1c1e36;
              padding: 12px 28px;
              font-size: 14px;
              font-weight: 600;
              letter-spacing: 0.02em;
              text-transform: uppercase;
              text-decoration: none;
            }
            .error-home:hover {
              background-color: #1c1e36;
              color: #f5efe9;
            }
            .error-phone {
              font-size: 14px;
              color: #635548;
            }
            .error-phone a {
              color: #1c1e36;
              font-weight: 600;
              text-decoration: none;
              border-bottom: 1px solid #847b73;
            }
          `,
        }}
      />
      </div>
    </>
  );
}
