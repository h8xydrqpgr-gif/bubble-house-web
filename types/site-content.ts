import type { SanityMenuImage } from "@/types/menu";

export interface BusinessHoursRow {
  label: string;
  hours: string;
  schemaDays: readonly string[];
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface BusinessInfoContent {
  name: string;
  phone: string;
  phoneLink: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  businessHours: readonly BusinessHoursRow[];
  googleMapsUrl: string;
  appleMapsUrl: string;
  orderingUrl: string;
  socialLinks: readonly LinkItem[];
}

export interface SectionContent {
  isActive: boolean;
  sortOrder: number;
  eyebrow: string;
  title: string;
  description: string;
}

export interface HeroContent {
  isActive: boolean;
  sortOrder: number;
  eyebrow: string;
  headlineLineOne: string;
  headlineLineTwo: string;
  headlineHighlight: string;
  supportingText: string;
  imageUrl: string;
  imageAlt: string;
  primaryButton: { text: string; destination: string };
  secondaryButton: { text: string; destination: string };
  trustPoints: readonly string[];
  imageBadgeEyebrow: string;
  imageBadgeText: string;
}

export interface HomepageCategoryContent {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl?: string;
  imageAlt: string;
  buttonText: string;
  sortOrder: number;
}

export interface FavoriteProductContent {
  id: string;
  name: string;
  label: string;
  description: string;
  imageUrl?: string;
  imageAlt: string;
  sortOrder: number;
}

export interface BenefitContent {
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
}

export interface GalleryItemContent {
  id: string;
  title: string;
  imageUrl: string;
  alt: string;
  sortOrder: number;
}

export interface VisitSectionContent extends SectionContent {
  directionsButtonText: string;
  callButtonText: string;
  orderButtonText: string;
  mapEyebrow: string;
  mapTitle: string;
}

export interface HeaderContent {
  announcementText: string;
  orderButtonText: string;
}

export interface FavoritesSectionContent extends SectionContent {
  buttonText: string;
}

export interface FooterContent {
  description: string;
  copyrightText: string;
  closingText: string;
}

export interface SiteSettingsContent {
  websiteTitle: string;
  metaDescription: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImageUrl?: string;
  openGraphImageAlt: string;
  localBusinessName: string;
}

export interface SiteContent {
  business: BusinessInfoContent;
  settings: SiteSettingsContent;
  header: HeaderContent;
  hero: HeroContent;
  categoriesSection: SectionContent;
  homepageCategories: readonly HomepageCategoryContent[];
  menuSection: SectionContent;
  favoritesSection: FavoritesSectionContent;
  favorites: readonly FavoriteProductContent[];
  whySection: SectionContent;
  benefits: readonly BenefitContent[];
  gallerySection: SectionContent;
  galleryItems: readonly GalleryItemContent[];
  visitSection: VisitSectionContent;
  footer: FooterContent;
}

export interface RawSiteImage extends SanityMenuImage {
  _type?: "image";
}
