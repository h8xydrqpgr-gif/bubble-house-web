import { defineQuery } from "next-sanity";

export const menuQuery = defineQuery(`
  *[
    _type == "category" &&
    coalesce(isActive, isVisible, true) == true
  ]
  | order(coalesce(sortOrder, displayOrder, 9999) asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    "sortOrder": coalesce(sortOrder, displayOrder, 9999),
    "products": *[
      _type == "product" &&
      references(^._id) &&
      coalesce(isAvailable, true) == true
    ]
    | order(coalesce(sortOrder, displayOrder, 9999) asc, name asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      ingredients,
      price,
      "featured": coalesce(featured, isFeatured, false),
      "sortOrder": coalesce(sortOrder, displayOrder, 9999),
      image {
        asset,
        crop,
        hotspot,
        alt
      }
    }
  }
`);
