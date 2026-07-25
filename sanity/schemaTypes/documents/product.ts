import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "display", title: "Availability and display" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      group: "content",
      description: "Add ingredients in the order they should be presented.",
      of: [
        defineField({
          name: "ingredient",
          title: "Ingredient",
          type: "string",
          validation: (rule) => rule.required().max(100),
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      group: "content",
      validation: (rule) => rule.required().min(0).precision(2),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the image for visitors using screen readers.",
          validation: (rule) => rule.required().max(160),
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "display",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isAvailable",
      title: "Available",
      type: "boolean",
      group: "display",
      description: "Show this product as available on the public menu.",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      group: "display",
      description:
        "Lower numbers appear first within the selected category.",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      category: "category.name",
      media: "image",
      price: "price",
      isAvailable: "isAvailable",
    },
    prepare({ title, category, media, price, isAvailable }) {
      const formattedPrice =
        typeof price === "number" ? `$${price.toFixed(2)}` : "No price";

      return {
        title,
        subtitle: `${category ?? "Uncategorized"} · ${formattedPrice}${
          isAvailable ? "" : " · Unavailable"
        }`,
        media,
      };
    },
  },
});
