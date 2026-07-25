"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityEnv } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

const singletonTypes = new Set(["businessInfo", "homePage", "siteSettings"]);

export default defineConfig({
  name: "bubble-house",
  title: "Bubble House Nutrition",
  basePath: "/studio",
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        (template) => !singletonTypes.has(template.schemaType),
      ),
  },
  document: {
    newDocumentOptions: (options) =>
      options.filter((option) => !singletonTypes.has(option.templateId)),
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : actions,
  },
});
