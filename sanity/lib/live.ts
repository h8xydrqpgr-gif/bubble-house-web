import { defineLive } from "next-sanity/live";
import { sanityClient } from "@/sanity/lib/client";

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
});
