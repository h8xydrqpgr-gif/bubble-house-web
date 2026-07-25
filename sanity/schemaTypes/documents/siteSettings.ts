import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "SEO & Site Settings",
  type: "document",
  groups: [
    { name: "seo", title: "SEO", default: true },
    { name: "social", title: "Open Graph" },
    { name: "local", title: "Local Business" },
  ],
  fields: [
    defineField({
      name: "websiteTitle",
      title: "Website title",
      type: "string",
      group: "seo",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "openGraphTitle",
      title: "Open Graph title",
      type: "string",
      group: "social",
    }),
    defineField({
      name: "openGraphDescription",
      title: "Open Graph description",
      type: "text",
      rows: 3,
      group: "social",
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph image",
      type: "image",
      group: "social",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "localBusinessName",
      title: "Local business name",
      type: "string",
      group: "local",
      description:
        "Defaults to Business Information when this field is left empty.",
    }),
    defineField({
      name: "businessInfo",
      title: "Business information",
      type: "reference",
      group: "local",
      to: [{ type: "businessInfo" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "SEO & Site Settings" };
    },
  },
});
