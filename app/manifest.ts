import type { MetadataRoute } from "next";
import { getSiteContent } from "@/sanity/lib/get-site-content";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { business, settings } = await getSiteContent();

  return {
    name: business.name,
    short_name: business.name.replace(/\s+Nutrition$/, ""),
    description: settings.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfaf7",
    theme_color: "#7e22ce",
    icons: [
      {
        src: "/images/logobb.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
