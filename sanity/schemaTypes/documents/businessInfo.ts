import { defineField, defineType } from "sanity";

export const businessInfoType = defineType({
  name: "businessInfo",
  title: "Business Information",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "contact", title: "Contact & Location" },
    { name: "hours", title: "Business Hours" },
    { name: "links", title: "Maps, Social & Ordering" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Business name",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
      group: "contact",
      description: "The formatted number shown to visitors.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phoneLink",
      title: "Phone link value",
      type: "string",
      group: "contact",
      description: "Digits only, used for tap-to-call links.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "street", title: "Street", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "state", title: "State", type: "string" }),
        defineField({ name: "zip", title: "ZIP code", type: "string" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "businessHours",
      title: "Business hours",
      type: "array",
      group: "hours",
      description: "Add rows in the order they should appear on the website.",
      of: [
        defineField({
          name: "businessHoursRow",
          title: "Hours row",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Days",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "hours",
              title: "Hours",
              type: "string",
              description: "Example: 7:00 AM - 7:00 PM",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "schemaDays",
              title: "Structured-data days",
              type: "array",
              of: [{ type: "string" }],
              description:
                "English weekday names used by search engines, such as Monday.",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "hours" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps link",
      type: "url",
      group: "links",
    }),
    defineField({
      name: "appleMapsUrl",
      title: "Apple Maps link",
      type: "url",
      group: "links",
    }),
    defineField({
      name: "orderingUrl",
      title: "DoorDash or ordering link",
      type: "url",
      group: "links",
    }),
    defineField({
      name: "socialLinks",
      title: "Social media links",
      type: "array",
      group: "links",
      of: [
        defineField({
          name: "socialLink",
          title: "Social link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Business Information" };
    },
  },
});
