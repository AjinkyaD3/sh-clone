import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_OG_IMAGE } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Thank You | Secure House",
  description:
    "Thank you for contacting Secure House. We have received your enquiry and will be in touch shortly.",
  openGraph: {
    title: "Thank You | Secure House",
    description: "Thank you for contacting Secure House. We have received your enquiry and will be in touch shortly.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank You | Secure House",
    description: "Thank you for contacting Secure House. We have received your enquiry and will be in touch shortly.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function ThankYouPage() {
  return (
    <>
      <link
        key="pl2"
        rel="stylesheet"
        href="/legacy-assets/uploads/fusion-styles/3978f22170001630860f0711fbc80184.min.css"
      />
      <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#f8f8f8",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "60px 40px",
          borderRadius: "8px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#e3000f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 30px",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#222",
            marginBottom: "16px",
          }}
        >
          Thank You
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#555",
            lineHeight: "1.7",
            marginBottom: "12px",
          }}
        >
          Your enquiry has been received successfully.
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#555",
            lineHeight: "1.7",
            marginBottom: "32px",
          }}
        >
          A member of the Secure House team will be in touch with you shortly to
          discuss your requirements.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            backgroundColor: "#e3000f",
            color: "#fff",
            padding: "14px 36px",
            fontSize: "16px",
            fontWeight: "600",
            textDecoration: "none",
            borderRadius: "4px",
            transition: "background-color 0.3s ease",
          }}
        >
          Return to Home
        </Link>
      </div>
      </div>
    </>
  );
}
