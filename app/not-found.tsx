import Link from "next/link";

// Renders inside the root layout (Header/Footer/chat widget/Get-a-Quote tab
// all still appear automatically) whenever a route doesn't match anything -
// including every one of the ~150 URLs archived out of scope back in
// September, which now hit this instead of a generic Next.js default page.
export default function NotFound() {
  return (
    <>
      {/* Without this, the shared Header/Footer render almost completely
          unstyled - every Avada-scraped page loads its own compiled
          fusion-styles bundle carrying the shared base theme CSS those
          components depend on, and this isn't a scraped page. Same root
          cause and same fix as the earlier /blog bug (see
          migration-log/CHANGES-NEEDED.md). */}
      <link
        rel="stylesheet"
        href="/legacy-assets/uploads/fusion-styles/3978f22170001630860f0711fbc80184.min.css"
      />
      <div className="not-found-page">
      <p className="not-found-eyebrow">Error 404</p>
      <h1>We couldn&apos;t find that page</h1>
      <p className="not-found-body">
        The page you&apos;re looking for may have been moved or no longer
        exists. Try one of the links below, or head back to the homepage.
      </p>

      <nav aria-label="Popular pages" className="not-found-links">
        <Link href="/">Home</Link>
        <Link href="/doors">Doors</Link>
        <Link href="/windows">Windows</Link>
        <Link href="/garage-doors">Garage Doors</Link>
        <Link href="/grilles-shutters">Grilles &amp; Shutters</Link>
        <Link href="/projects">Our Projects</Link>
        <Link href="/contact-us">Contact Us</Link>
      </nav>

      <p className="not-found-phone">
        Or call us directly on{" "}
        <a href="tel:+442078594207">+44 20 7859 4207</a>
      </p>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .not-found-page {
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
            .not-found-eyebrow {
              font-size: 13px;
              font-weight: 600;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: #847b73;
              margin: 0 0 16px;
            }
            .not-found-page h1 {
              font-family: "Playfair Display", serif;
              font-weight: 500;
              font-size: clamp(28px, 5vw, 42px);
              margin: 0 0 16px;
              color: #1c1e36 !important;
            }
            .not-found-body {
              font-size: 16px;
              line-height: 1.6;
              max-width: 480px;
              margin: 0 0 32px;
              color: #1c1e36;
            }
            .not-found-links {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 12px 28px;
              margin-bottom: 32px;
            }
            .not-found-links a {
              color: #1c1e36;
              font-size: 14px;
              font-weight: 600;
              letter-spacing: 0.02em;
              text-decoration: none;
              border-bottom: 1px solid #847b73;
              padding-bottom: 2px;
            }
            .not-found-links a:hover {
              border-bottom-color: #1c1e36;
            }
            .not-found-phone {
              font-size: 14px;
              color: #635548;
            }
            .not-found-phone a {
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
