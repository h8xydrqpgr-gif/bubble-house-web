import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "display", title: "Display" },
    { name: "homepage", title: "Homepage Card" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(80),
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      group: "display",
      description: "Lower numbers appear first in the public menu.",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      group: "display",
      description: "Inactive categories are hidden from the public menu.",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on homepage",
      type: "boolean",
      group: "homepage",
      initialValue: false,
      description:
        "Show this category in the three-card category overview above the menu.",
    }),
    defineField({
      name: "homepageDescription",
      title: "Homepage description",
      type: "text",
      rows: 3,
      group: "homepage",
      description:
        "Short marketing copy for the homepage card. Falls back to the category description.",
    }),
    defineField({
      name: "homepageIcon",
      title: "Homepage icon",
      type: "string",
      group: "homepage",
      description:
        "Optional text or emoji used when no homepage image is provided.",
    }),
    defineField({
      name: "homepageImage",
      title: "Homepage image",
      type: "image",
      group: "homepage",
      options: { hotspot: true },
    }),
    defineField({
      name: "homepageImageAlt",
      title: "Homepage image alternative text",
      type: "string",
      group: "homepage",
    }),
    defineField({
      name: "homepageButtonText",
      title: "Button text",
      type: "string",
      group: "homepage",
    }),
    defineField({
      name: "homepageSortOrder",
      title: "Homepage display order",
      type: "number",
      group: "homepage",
      validation: (rule) => rule.integer().min(0),
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
      sortOrder: "sortOrder",
      isActive: "isActive",
    },
    prepare({ title, sortOrder, isActive }) {
      return {
        title,
        subtitle: `Order ${sortOrder ?? "not set"} · ${
          isActive ? "Active" : "Inactive"
        }`,
      };
    },
  },
});
