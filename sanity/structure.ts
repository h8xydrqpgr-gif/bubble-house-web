import type { StructureResolver } from "sanity/structure";

const singletonItem = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string,
) =>
  S.listItem()
    .title(title)
    .schemaType(schemaType)
    .child(
      S.document()
        .title(title)
        .schemaType(schemaType)
        .documentId(documentId),
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Bubble House CMS")
    .items([
      singletonItem(S, "Business Information", "businessInfo", "businessInfo"),
      singletonItem(S, "Homepage", "homePage", "homePage"),
      S.documentTypeListItem("galleryItem").title("Gallery"),
      S.divider(),
      S.listItem()
        .title("Menu")
        .child(
          S.list()
            .title("Menu")
            .items([
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("product").title("Products"),
            ]),
        ),
      S.divider(),
      singletonItem(
        S,
        "SEO & Site Settings",
        "siteSettings",
        "siteSettings",
      ),
    ]);
