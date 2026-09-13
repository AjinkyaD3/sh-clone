"use client";

// Separate from error.tsx on purpose: this is the ONLY boundary that catches
// an error thrown by the root layout itself (Header/Footer/the big inline
// <style> block/the Tawk.to script, etc.) - Next.js requires it to render
// its own full <html>/<body>, since the layout that would normally provide
// those is exactly what's assumed broken. Kept intentionally minimal and
// dependency-free (no Header/Footer/Link) for the same reason - anything it
// imports could itself be part of what crashed.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "24px",
            backgroundColor: "#f5efe9",
            color: "#1c1e36",
            fontFamily:
              'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#847b73",
              margin: "0 0 16px",
            }}
          >
            Secure House
          </p>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(24px, 5vw, 36px)",
              margin: "0 0 16px",
            }}
          >
            Something went badly wrong
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 480, margin: "0 0 32px" }}>
            The whole page failed to load. Please try again, or call us on{" "}
            <a href="tel:+442078594207" style={{ color: "#1c1e36" }}>
              +44 20 7859 4207
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              backgroundColor: "#1c1e36",
              color: "#f5efe9",
              border: "1px solid #1c1e36",
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
