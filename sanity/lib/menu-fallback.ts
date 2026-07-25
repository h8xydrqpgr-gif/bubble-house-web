import { drinks, menuCategories } from "@/data/drinks";
import type { MenuData } from "@/types/menu";

const localProductImages: Readonly<
  Record<string, { imageUrl: string; imageAlt: string }>
> = {
  "taro-milk-tea": {
    imageUrl: "/images/hero/taro.png",
    imageAlt: "Taro Milk Tea from Bubble House Nutrition",
  },
  "strawberry-cheesecake": {
    imageUrl: "/images/hero/strawberry-cheesecake.png",
    imageAlt: "Strawberry Cheesecake drink from Bubble House Nutrition",
  },
  "protein-waffle": {
    imageUrl: "/images/hero/protein-waffle.png",
    imageAlt: "Protein Waffle from Bubble House Nutrition",
  },
};

export function getFallbackMenuData(): MenuData {
  return {
    source: "fallback",
    categories: menuCategories.map((category, index) => ({
      id: category,
      name: category,
      slug: category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sortOrder: index + 1,
    })),
    products: drinks.map((drink, index) => ({
      id: drink.id,
      name: drink.name,
      category: drink.category,
      description: drink.description,
      price: drink.price,
      featured: drink.featured ?? false,
      sortOrder: index + 1,
      ...localProductImages[drink.id],
    })),
  };
}
