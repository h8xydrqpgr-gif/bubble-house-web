import { businessInfoType } from "@/sanity/schemaTypes/documents/businessInfo";
import { categoryType } from "@/sanity/schemaTypes/documents/category";
import { galleryItemType } from "@/sanity/schemaTypes/documents/galleryItem";
import { homePageType } from "@/sanity/schemaTypes/documents/homePage";
import { productType } from "@/sanity/schemaTypes/documents/product";
import { siteSettingsType } from "@/sanity/schemaTypes/documents/siteSettings";

export const schemaTypes = [
  businessInfoType,
  homePageType,
  siteSettingsType,
  galleryItemType,
  categoryType,
  productType,
];
