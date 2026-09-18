import Link from "next/link";

// No hero photo yet - the client's own photos for this page were confirmed
// gone (not on the Wayback Machine, not on the still-live WordPress server -
// genuinely deleted, not just hidden). Rather than a broken/empty image box
// (see the homepage "Our Projects" cards for what that looks like), this
// uses a solid brand-navy panel so the page reads as finished, real content -
// swap in a real background photo once one exists.
export default function Hero() {
  return (
    <div
      style={{
        backgroundColor: "#1c1e36",
        padding: "180px 40px 90px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 500,
          fontSize: "50px",
          lineHeight: 1.2,
          color: "#ffffff",
          margin: "0 0 24px",
        }}
      >
        Stylish &amp; Durable Industrial Style Doors for Modern UK Living
      </h1>
      <p
        style={{
          fontFamily: '"Montserrat", sans-serif',
          fontSize: "18px",
          lineHeight: 1.6,
          color: "#dcd7ca",
          maxWidth: "700px",
          margin: "0 auto 40px",
        }}
      >
        Industrial style doors &apos;steel&apos; the show - new design additions to our
        steel portfolio that offer an industrial look, bespoke made to
        measure, with material thicknesses up to 5mm and FD30 fire
        resistance.
      </p>
      <Link
        href="#get-a-quote-trigger"
        style={{
          display: "inline-block",
          backgroundColor: "#f5efe9",
          color: "#1c1e36",
          padding: "16px 36px",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        Get a Free Consultation
      </Link>
    </div>
  );
}
