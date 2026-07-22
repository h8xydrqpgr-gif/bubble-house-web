import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bubble House Nutrition",
    short_name: "Bubble House",
    description:
      "Refreshing teas, shakes, boba, coffee and waffles in Lexington, Kentucky.",
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
