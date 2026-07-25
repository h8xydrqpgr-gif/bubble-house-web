import { defineField, defineType } from "sanity";

export const galleryItemType = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "An internal, human-friendly name for this image.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for visitors using screen readers.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured image",
      type: "boolean",
      description:
        "Show this as the large editorial image. Only one visible gallery item can be featured.",
      initialValue: false,
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value || !context.document?._id) {
            return true;
          }

          const documentId = context.document._id.replace(/^drafts\./, "");
          const client = context
            .getClient({ apiVersion: "2025-01-01" })
            .withConfig({ perspective: "raw" });
          const featuredCount = await client.fetch<number>(
            `count(*[
              _type == "galleryItem" &&
              isFeatured == true &&
              coalesce(isActive, true) == true &&
              !(_id in [$documentId, "drafts." + $documentId])
            ])`,
            { documentId },
          );

          return featuredCount === 0
            ? true
            : "Another visible gallery item is already featured.";
        }),
    }),
    defineField({
      name: "sortOrder",
      title: "Display order",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "isActive",
      title: "Visible",
      type: "boolean",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      sortOrder: "sortOrder",
      isActive: "isActive",
      isFeatured: "isFeatured",
    },
    prepare({ title, media, sortOrder, isActive, isFeatured }) {
      return {
        title,
        media,
        subtitle: `${isFeatured ? "Featured · " : ""}Order ${
          sortOrder ?? "not set"
        } · ${
          isActive ? "Visible" : "Hidden"
        }`,
      };
    },
  },
});
