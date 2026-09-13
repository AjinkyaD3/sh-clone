import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // "/legacy" holds the old pre-conversion pages, kept for reference
        // after the swap to live JSX routes (see migration-log/PROGRESS.md)
        // - keep it out of the index even though nothing on the live site
        // links into it.
        disallow: "/legacy",
      },
    ],
    sitemap: "https://secure-house.co.uk/sitemap.xml",
  };
}
