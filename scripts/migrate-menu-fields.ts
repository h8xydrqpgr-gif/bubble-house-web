import { getCliClient } from "sanity/cli";
import { sanityEnv } from "../sanity/env";

interface LegacyCategory {
  _id: string;
  displayOrder?: number;
  isVisible?: boolean;
}

interface LegacyProduct {
  _id: string;
  displayOrder?: number;
  isFeatured?: boolean;
}

async function migrateMenuFields() {
  const client = getCliClient({
    apiVersion: sanityEnv.apiVersion,
  }).withConfig({
    useCdn: false,
  });

  const [categories, products] = await Promise.all([
    client.fetch<LegacyCategory[]>(
      `*[_type == "category"]{_id, displayOrder, isVisible}`,
    ),
    client.fetch<LegacyProduct[]>(
      `*[_type == "product"]{_id, displayOrder, isFeatured}`,
    ),
  ]);

  let transaction = client.transaction();

  for (const category of categories) {
    transaction = transaction.patch(category._id, (patch) =>
      patch.setIfMissing({
        sortOrder: (category.displayOrder ?? 0) + 1,
        isActive: category.isVisible ?? true,
      }),
    );
  }

  for (const product of products) {
    transaction = transaction.patch(product._id, (patch) =>
      patch.setIfMissing({
        sortOrder: (product.displayOrder ?? 0) + 1,
        featured: product.isFeatured ?? false,
      }),
    );
  }

  await transaction.commit({ visibility: "sync" });

  console.log(
    `Migration complete: ${categories.length} categories and ${products.length} products processed.`,
  );
}

migrateMenuFields().catch((error: unknown) => {
  console.error(
    error instanceof Error ? error.message : "Unknown migration error.",
  );
  process.exitCode = 1;
});
