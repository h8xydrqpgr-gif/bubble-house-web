import type { MetadataRoute } from "next";

const siteUrl = "https://www.bubblehousenutrition.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
