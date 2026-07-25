import { getCliClient } from "sanity/cli";
import { drinks, menuCategories } from "../data/drinks";
import type { DrinkCategory } from "../types/drinks";
import { sanityEnv } from "../sanity/env";

const categoryDescriptions: Partial<Record<DrinkCategory, string>> = {
  "Milk Teas":
    "Creamy, smooth and customizable with delicious flavors and optional boba.",
  "Loaded Teas":
    "Refreshing, colorful and packed with energizing flavor combinations.",
  "Protein Shakes":
    "Creamy, satisfying and prepared with delicious protein-packed flavors.",
};

function toSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function categoryDocumentId(category: DrinkCategory) {
  return `category-${toSlug(category)}`;
}

function assertSourceData() {
  const categorySet = new Set<string>(menuCategories);
  const productIds = new Set<string>();

  for (const drink of drinks) {
    if (!categorySet.has(drink.category)) {
      throw new Error(
        `Product "${drink.name}" uses unknown category "${drink.category}".`,
      );
    }

    if (productIds.has(drink.id)) {
      throw new Error(`Duplicate product id "${drink.id}".`);
    }

    productIds.add(drink.id);
  }
}

async function importDrinks() {
  assertSourceData();

  const client = getCliClient({
    apiVersion: sanityEnv.apiVersion,
  }).withConfig({
    useCdn: false,
  });

  const categoryDocuments = menuCategories.map((category, index) => ({
    _id: categoryDocumentId(category),
    _type: "category",
    name: category,
    slug: {
      _type: "slug",
      current: toSlug(category),
    },
    ...(categoryDescriptions[category]
      ? { description: categoryDescriptions[category] }
      : {}),
    sortOrder: index + 1,
    isActive: true,
  }));

  const productDocuments = drinks.map((drink, index) => ({
    _id: `product-${drink.id}`,
    _type: "product",
    name: drink.name,
    slug: {
      _type: "slug",
      current: drink.id,
    },
    description: drink.description,
    price: drink.price,
    category: {
      _type: "reference",
      _ref: categoryDocumentId(drink.category),
    },
    isAvailable: true,
    featured: drink.featured ?? false,
    sortOrder: index + 1,
  }));

  let transaction = client.transaction();

  for (const document of categoryDocuments) {
    transaction = transaction.createIfNotExists(document);
  }

  for (const document of productDocuments) {
    transaction = transaction.createIfNotExists(document);
  }

  await transaction.commit({ visibility: "sync" });

  console.log(
    `Import complete: ${categoryDocuments.length} categories and ${productDocuments.length} products processed.`,
  );
  console.log(
    "Existing documents with the same deterministic IDs were left unchanged.",
  );
}

importDrinks().catch((error: unknown) => {
  console.error(
    error instanceof Error ? error.message : "Unknown import error.",
  );
  process.exitCode = 1;
});
