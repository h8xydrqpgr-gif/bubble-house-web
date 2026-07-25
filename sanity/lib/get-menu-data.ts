import "server-only";

import { connection } from "next/server";
import { isSanityConfigured } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";
import { adaptSanityMenu } from "@/sanity/lib/menu-adapter";
import { getFallbackMenuData } from "@/sanity/lib/menu-fallback";
import { menuQuery } from "@/sanity/queries/menu";
import type { MenuData, SanityMenuCategory } from "@/types/menu";

export async function getMenuData(): Promise<MenuData> {
  if (!isSanityConfigured) {
    console.error(
      "Sanity menu fallback: NEXT_PUBLIC_SANITY_PROJECT_ID is not configured.",
    );
    return getFallbackMenuData();
  }

  await connection();

  try {
    const sanityCategories = await sanityClient.fetch<SanityMenuCategory[]>(
      menuQuery,
      {},
      {
        cache: "no-store",
        useCdn: false,
      },
    );
    const menu = adaptSanityMenu(
      sanityCategories,
    );

    if (menu.products.length === 0) {
      console.error(
        "Sanity menu fallback: the query returned zero valid available products.",
      );
      return getFallbackMenuData();
    }

    return menu;
  } catch (error: unknown) {
    console.error(
      "Sanity menu fallback: failed to load the catalog.",
      error instanceof Error ? error.message : error,
    );
    return getFallbackMenuData();
  }
}
