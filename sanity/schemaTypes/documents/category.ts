import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "display", title: "Display" },
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
