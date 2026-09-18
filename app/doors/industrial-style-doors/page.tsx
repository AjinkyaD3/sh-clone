import type { Metadata } from "next";
import CTABlock from "@/components/CTABlock";
import Hero from "@/components/doors/industrial-style-doors/Hero";
import Breadcrumb from "@/components/doors/industrial-style-doors/Breadcrumb";
import KeyFeatures from "@/components/doors/industrial-style-doors/KeyFeatures";
import ContentSections from "@/components/doors/industrial-style-doors/ContentSections";
import ComparisonTable from "@/components/doors/industrial-style-doors/ComparisonTable";
import FrequentlyAskedQuestionsFaq from "@/components/doors/industrial-style-doors/FrequentlyAskedQuestionsFaq";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

// Real content restored from the client's doc + a Wayback Machine snapshot
// of the old WordPress page (2026-09-18) - the original scrape had none
// (see migration-log/CHANGES-NEEDED.md's "SEO audit" entry). Photos from
// that same source are NOT recoverable (checked both Wayback and the still-
// live WordPress server, both dead) - gallery section pending real photos
// from the client.
export const metadata: Metadata = {
  title: "Industrial Style Doors | Steel & Crittall-Style Doors UK",
  description:
    "Stylish, durable industrial style doors made to measure in the UK. Slim steel profiles, FD30 fire resistance, and Crittall-style glazing for modern living.",
  alternates: {
    canonical: "https://secure-house.co.uk/doors/industrial-style-doors",
  },
  openGraph: {
    title: "Industrial Style Doors | Steel & Crittall-Style Doors UK",
    description:
      "Stylish, durable industrial style doors made to measure in the UK. Slim steel profiles, FD30 fire resistance, and Crittall-style glazing for modern living.",
    url: "https://secure-house.co.uk/doors/industrial-style-doors",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Style Doors | Steel & Crittall-Style Doors UK",
    description:
      "Stylish, durable industrial style doors made to measure in the UK. Slim steel profiles, FD30 fire resistance, and Crittall-style glazing for modern living.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div>
      <link rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/3978f22170001630860f0711fbc80184.min.css" />
      <Hero />
      <Breadcrumb />
      <KeyFeatures />
      <ContentSections />
      <ComparisonTable />
      <FrequentlyAskedQuestionsFaq />
      <CTABlock
        heading="Bring Industrial Style to Your Doors"
        text="Get a bespoke, made-to-measure industrial or Crittall-style steel door designed for your property."
        buttonLabel="Request a Quote"
      />
    </div>
  );
}
