import type { MetadataRoute } from "next";
import { siteUrl } from "./lib/content";

// Single-page site: sections are #anchors, so only the root URL is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
