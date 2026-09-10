import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // "/new" is the not-yet-live JSX-conversion preview of the whole
        // site (see migration-log/PROGRESS.md) - keep it out of the index
        // even though nothing on the live site links into it.
        disallow: "/new",
      },
    ],
    sitemap: "https://secure-house-next-js.vercel.app/sitemap.xml",
  };
}
