import { defineQuery } from "next-sanity";

export const siteContentQuery = defineQuery(`{
  "business": *[_id == "businessInfo"][0]{
    name,
    phone,
    phoneLink,
    address,
    businessHours,
    googleMapsUrl,
    appleMapsUrl,
    orderingUrl,
    socialLinks
  },
  "settings": *[_id == "siteSettings"][0]{
    websiteTitle,
    metaDescription,
    openGraphTitle,
    openGraphDescription,
    openGraphImage,
    localBusinessName
  },
  "home": *[_id == "homePage"][0]{
    header,
    hero,
    categoriesSection,
    menuSection,
    favoritesSection{
      isActive,
      sortOrder,
      eyebrow,
      title,
      description,
      buttonText,
      "items": items[coalesce(isActive, true) == true]
        | order(coalesce(sortOrder, 9999) asc){
          label,
          sortOrder,
          product->{
            _id,
            name,
            "slug": slug.current,
            description,
            ingredients,
            image
          }
        }
    },
    whySection{
      isActive,
      sortOrder,
      eyebrow,
      title,
      description,
      "benefits": benefits[coalesce(isActive, true) == true]
        | order(coalesce(sortOrder, 9999) asc)
    },
    gallerySection,
    visitSection,
    footer
  },
  "homepageCategories": *[
    _type == "category" &&
    coalesce(showOnHomepage, false) == true &&
    coalesce(isActive, isVisible, true) == true
  ] | order(coalesce(homepageSortOrder, 9999) asc, name asc){
    _id,
    name,
    description,
    homepageDescription,
    homepageIcon,
    homepageImage,
    homepageImageAlt,
    homepageButtonText,
    homepageSortOrder
  },
  "galleryItems": *[
    _type == "galleryItem" &&
    coalesce(isActive, true) == true
  ] | order(coalesce(sortOrder, 9999) asc, title asc){
    _id,
    title,
    image,
    alt,
    isFeatured,
    "dimensions": image.asset->metadata.dimensions,
    sortOrder
  }
}`);
