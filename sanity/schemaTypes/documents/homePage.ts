import { defineArrayMember, defineField, defineType } from "sanity";

const sectionDisplayFields = [
  defineField({
    name: "isActive",
    title: "Visible",
    type: "boolean",
    initialValue: true,
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "sortOrder",
    title: "Display order",
    type: "number",
    initialValue: 1,
    validation: (rule) => rule.required().integer().min(0),
  }),
];

const sectionHeadingFields = [
  defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({
    name: "description",
    title: "Description",
    type: "text",
    rows: 3,
  }),
];

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "header", title: "Header" },
    { name: "hero", title: "Hero", default: true },
    { name: "categories", title: "Categories" },
    { name: "menu", title: "Menu" },
    { name: "favorites", title: "Customer Favorites" },
    { name: "why", title: "Why Bubble House" },
    { name: "gallery", title: "Gallery" },
    { name: "visit", title: "Visit Us" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      group: "header",
      fields: [
        defineField({
          name: "announcementText",
          title: "Announcement text",
          type: "string",
        }),
        defineField({
          name: "orderButtonText",
          title: "Ordering button text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        ...sectionDisplayFields,
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "headlineLineOne",
          title: "Headline — first line",
          type: "string",
        }),
        defineField({
          name: "headlineLineTwo",
          title: "Headline — second line",
          type: "string",
        }),
        defineField({
          name: "headlineHighlight",
          title: "Headline — highlighted line",
          type: "string",
        }),
        defineField({
          name: "supportingText",
          title: "Supporting text",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "imageAlt",
          title: "Hero image alternative text",
          type: "string",
        }),
        defineField({
          name: "primaryButton",
          title: "Primary button",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "string" }),
            defineField({
              name: "destination",
              title: "Destination",
              type: "string",
              description: "An anchor such as #menu or a complete URL.",
            }),
          ],
        }),
        defineField({
          name: "secondaryButton",
          title: "Secondary button",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "string" }),
            defineField({
              name: "destination",
              title: "Destination",
              type: "string",
              description:
                "Leave empty to reuse the centralized ordering link.",
            }),
          ],
        }),
        defineField({
          name: "trustPoints",
          title: "Trust points",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "imageBadgeEyebrow",
          title: "Image badge eyebrow",
          type: "string",
        }),
        defineField({
          name: "imageBadgeText",
          title: "Image badge text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "categoriesSection",
      title: "Category section",
      type: "object",
      group: "categories",
      fields: [...sectionDisplayFields, ...sectionHeadingFields],
    }),
    defineField({
      name: "menuSection",
      title: "Menu section",
      type: "object",
      group: "menu",
      fields: [...sectionDisplayFields, ...sectionHeadingFields],
    }),
    defineField({
      name: "favoritesSection",
      title: "Customer Favorites",
      type: "object",
      group: "favorites",
      fields: [
        ...sectionDisplayFields,
        ...sectionHeadingFields,
        defineField({
          name: "buttonText",
          title: "Card button text",
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Featured products",
          type: "array",
          description:
            "References existing menu products; product details are never duplicated.",
          of: [
            defineArrayMember({
              name: "favoriteProduct",
              title: "Favorite product",
              type: "object",
              fields: [
                defineField({
                  name: "product",
                  title: "Product",
                  type: "reference",
                  to: [{ type: "product" }],
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "label",
                  title: "Card label",
                  type: "string",
                }),
                defineField({
                  name: "sortOrder",
                  title: "Display order",
                  type: "number",
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
              preview: {
                select: {
                  title: "product.name",
                  subtitle: "label",
                  media: "product.image",
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "whySection",
      title: "Why Bubble House",
      type: "object",
      group: "why",
      fields: [
        ...sectionDisplayFields,
        ...sectionHeadingFields,
        defineField({
          name: "benefits",
          title: "Benefits",
          type: "array",
          of: [
            defineArrayMember({
              name: "benefit",
              title: "Benefit",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Sparkles", value: "✨" },
                      { title: "Heart", value: "💜" },
                      { title: "Drink", value: "🧋" },
                      { title: "Delivery", value: "🚗" },
                    ],
                    layout: "radio",
                  },
                }),
                defineField({
                  name: "sortOrder",
                  title: "Display order",
                  type: "number",
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
              preview: {
                select: { title: "title", subtitle: "description" },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "gallerySection",
      title: "Gallery",
      type: "object",
      group: "gallery",
      fields: [...sectionDisplayFields, ...sectionHeadingFields],
    }),
    defineField({
      name: "visitSection",
      title: "Visit Us",
      type: "object",
      group: "visit",
      fields: [
        ...sectionDisplayFields,
        ...sectionHeadingFields,
        defineField({
          name: "directionsButtonText",
          title: "Directions button text",
          type: "string",
        }),
        defineField({
          name: "callButtonText",
          title: "Call button text",
          type: "string",
        }),
        defineField({
          name: "orderButtonText",
          title: "Order button text",
          type: "string",
        }),
        defineField({
          name: "mapEyebrow",
          title: "Map eyebrow",
          type: "string",
        }),
        defineField({
          name: "mapTitle",
          title: "Map title",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({
          name: "description",
          title: "Business description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "copyrightText",
          title: "Copyright text",
          type: "string",
          description:
            "Displayed after the current year and business name.",
        }),
        defineField({
          name: "closingText",
          title: "Closing text",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
