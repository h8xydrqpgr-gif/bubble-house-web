import type { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from "@/sanity/lib/image";
import { getFallbackMenuData } from "@/sanity/lib/menu-fallback";
import type {
  MenuCategory,
  MenuData,
  MenuProduct,
  SanityMenuCategory,
  SanityMenuImage,
} from "@/types/menu";

function hasImageAsset(
  image: SanityMenuImage | undefined,
): image is SanityMenuImage & {
  asset: { _type?: "reference"; _ref: string };
} {
  return Boolean(image?.asset?._ref);
}

function getSanityImageUrl(image: SanityMenuImage | undefined) {
  if (!hasImageAsset(image)) {
    return undefined;
  }

  return urlForImage(image as SanityImageSource)
    .width(800)
    .fit("max")
    .auto("format")
    .url();
}

export function adaptSanityMenu(
  sanityCategories: readonly SanityMenuCategory[],
): MenuData {
  const fallback = getFallbackMenuData();
  const fallbackProducts = new Map(
    fallback.products.map((product) => [product.id, product]),
  );
  const categories: MenuCategory[] = [];
  const products: MenuProduct[] = [];

  for (const category of sanityCategories) {
    const categoryName = category.name?.trim();

    if (!category._id || !categoryName) {
      continue;
    }

    const normalizedProducts: MenuProduct[] = [];

    for (const product of category.products ?? []) {
      const productName = product.name?.trim();

      if (!product._id || !productName || typeof product.price !== "number") {
        continue;
      }

      const normalizedId =
        product.slug?.trim() || product._id.replace(/^product-/, "");
      const localFallback = fallbackProducts.get(normalizedId);
      const imageUrl =
        getSanityImageUrl(product.image) || localFallback?.imageUrl;
      const imageAlt =
        product.image?.alt?.trim() || localFallback?.imageAlt;
      const description =
        product.description?.trim() ||
        product.ingredients?.filter(Boolean).join(", ") ||
        "";

      normalizedProducts.push({
        id: normalizedId,
        name: productName,
        category: categoryName,
        description,
        price: product.price,
        featured: product.featured ?? false,
        sortOrder: product.sortOrder ?? Number.MAX_SAFE_INTEGER,
        ...(imageUrl ? { imageUrl } : {}),
        ...(imageAlt ? { imageAlt } : {}),
      });
    }

    if (normalizedProducts.length === 0) {
      continue;
    }

    categories.push({
      id: category._id,
      name: categoryName,
      slug: category.slug?.trim() || category._id,
      sortOrder: category.sortOrder ?? Number.MAX_SAFE_INTEGER,
    });
    products.push(...normalizedProducts);
  }

  return {
    source: "sanity",
    categories,
    products,
  };
}
