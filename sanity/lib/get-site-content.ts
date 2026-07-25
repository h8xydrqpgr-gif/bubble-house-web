import "server-only";

import { cache } from "react";
import { connection } from "next/server";
import type { SanityImageSource } from "@sanity/image-url";
import { fallbackSiteContent } from "@/data/site-content";
import { isSanityConfigured } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { siteContentQuery } from "@/sanity/queries/site";
import type {
  BenefitContent,
  BusinessInfoContent,
  FavoriteProductContent,
  GalleryItemContent,
  HomepageCategoryContent,
  RawSiteImage,
  SectionContent,
  SiteContent,
} from "@/types/site-content";

interface RawSection {
  isActive?: boolean;
  sortOrder?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
}

interface RawFavoriteItem {
  label?: string;
  sortOrder?: number;
  product?: {
    _id?: string;
    name?: string;
    slug?: string;
    description?: string;
    ingredients?: string[];
    image?: RawSiteImage;
  };
}

interface RawSiteQueryResult {
  business?: Partial<BusinessInfoContent>;
  settings?: Partial<SiteContent["settings"]> & {
    openGraphImage?: RawSiteImage;
  };
  home?: {
    header?: Partial<SiteContent["header"]>;
    hero?: Partial<SiteContent["hero"]> & { image?: RawSiteImage };
    categoriesSection?: RawSection;
    menuSection?: RawSection;
    favoritesSection?: RawSection & {
      buttonText?: string;
      items?: RawFavoriteItem[];
    };
    whySection?: RawSection & {
      benefits?: Array<Partial<BenefitContent>>;
    };
    gallerySection?: RawSection;
    visitSection?: Partial<SiteContent["visitSection"]>;
    footer?: Partial<SiteContent["footer"]>;
  };
  homepageCategories?: Array<{
    _id?: string;
    name?: string;
    description?: string;
    homepageDescription?: string;
    homepageIcon?: string;
    homepageImage?: RawSiteImage;
    homepageImageAlt?: string;
    homepageButtonText?: string;
    homepageSortOrder?: number;
  }>;
  galleryItems?: Array<{
    _id?: string;
    title?: string;
    image?: RawSiteImage;
    alt?: string;
    isFeatured?: boolean;
    dimensions?: {
      width?: number;
      height?: number;
    };
    sortOrder?: number;
  }>;
}

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function section(
  value: RawSection | undefined,
  fallback: SectionContent,
): SectionContent {
  return {
    isActive: value?.isActive ?? fallback.isActive,
    sortOrder: value?.sortOrder ?? fallback.sortOrder,
    eyebrow: text(value?.eyebrow, fallback.eyebrow),
    title: text(value?.title, fallback.title),
    description: text(value?.description, fallback.description),
  };
}

function imageUrl(image: RawSiteImage | undefined, width: number) {
  if (!image?.asset?._ref) {
    return undefined;
  }

  return urlForImage(image as SanityImageSource)
    .width(width)
    .fit("max")
    .auto("format")
    .url();
}

function adaptBusiness(
  value: Partial<BusinessInfoContent> | undefined,
): BusinessInfoContent {
  const fallback = fallbackSiteContent.business;
  const businessHours = value?.businessHours?.filter(
    (row) => row.label && row.hours,
  );

  return {
    name: text(value?.name, fallback.name),
    phone: text(value?.phone, fallback.phone),
    phoneLink: text(value?.phoneLink, fallback.phoneLink),
    address: {
      street: text(value?.address?.street, fallback.address.street),
      city: text(value?.address?.city, fallback.address.city),
      state: text(value?.address?.state, fallback.address.state),
      zip: text(value?.address?.zip, fallback.address.zip),
    },
    businessHours:
      businessHours && businessHours.length > 0
        ? businessHours
        : fallback.businessHours,
    googleMapsUrl: text(value?.googleMapsUrl, fallback.googleMapsUrl),
    appleMapsUrl: text(value?.appleMapsUrl, fallback.appleMapsUrl),
    orderingUrl: text(value?.orderingUrl, fallback.orderingUrl),
    socialLinks:
      value?.socialLinks?.filter((link) => link.label && link.url) ||
      fallback.socialLinks,
  };
}

function adaptCategories(
  values: RawSiteQueryResult["homepageCategories"],
  isConfigured: boolean,
): readonly HomepageCategoryContent[] {
  const adapted = (values ?? [])
    .filter((item) => item._id && item.name)
    .map((item) => {
      const fallback = fallbackSiteContent.homepageCategories.find(
        (category) => category.id === item._id,
      );

      return {
        id: item._id!,
        name: item.name!.trim(),
        description: text(
          item.homepageDescription || item.description,
          fallback?.description ?? "",
        ),
        icon: text(item.homepageIcon, fallback?.icon ?? ""),
        imageUrl: imageUrl(item.homepageImage, 480),
        imageAlt: text(
          item.homepageImageAlt,
          fallback?.imageAlt ?? item.name!,
        ),
        buttonText: text(
          item.homepageButtonText,
          fallback?.buttonText ?? "View menu",
        ),
        sortOrder:
          item.homepageSortOrder ??
          fallback?.sortOrder ??
          Number.MAX_SAFE_INTEGER,
      };
    });

  return adapted.length > 0 || isConfigured
    ? adapted
    : fallbackSiteContent.homepageCategories;
}

function adaptFavorites(
  values: RawFavoriteItem[] | undefined,
): readonly FavoriteProductContent[] {
  if (!Array.isArray(values)) {
    return fallbackSiteContent.favorites;
  }

  const adapted = values
    .filter((item) => item.product?._id && item.product?.name)
    .map((item) => {
      const product = item.product!;
      const id = product.slug?.trim() || product._id!.replace(/^product-/, "");
      const fallback = fallbackSiteContent.favorites.find(
        (favorite) =>
          favorite.id === id ||
          favorite.id === product._id!.replace(/^product-/, ""),
      );

      return {
        id,
        name: product.name!.trim(),
        label: text(item.label, fallback?.label ?? "Customer Favorite"),
        description: text(
          product.description ||
            product.ingredients?.filter(Boolean).join(", "),
          fallback?.description ?? "",
        ),
        imageUrl: imageUrl(product.image, 900) || fallback?.imageUrl,
        imageAlt: text(
          product.image?.alt,
          fallback?.imageAlt ?? product.name!,
        ),
        sortOrder:
          item.sortOrder ?? fallback?.sortOrder ?? Number.MAX_SAFE_INTEGER,
      };
    });

  return values ? adapted : fallbackSiteContent.favorites;
}

function adaptGallery(
  values: RawSiteQueryResult["galleryItems"],
  isConfigured: boolean,
): readonly GalleryItemContent[] {
  const adapted = (values ?? [])
    .filter((item) => item._id && item.image?.asset?._ref)
    .map((item) => ({
      id: item._id!,
      title: text(item.title, "Gallery image"),
      imageUrl: imageUrl(item.image, 1800)!,
      alt: text(item.alt, item.title ?? "Bubble House drink"),
      isFeatured: item.isFeatured === true,
      width: item.dimensions?.width ?? 1200,
      height: item.dimensions?.height ?? 1200,
      sortOrder: item.sortOrder ?? Number.MAX_SAFE_INTEGER,
    }));

  const resolved =
    adapted.length > 0 || isConfigured
      ? adapted
      : fallbackSiteContent.galleryItems;

  if (resolved.length === 0 || resolved.some((item) => item.isFeatured)) {
    return resolved;
  }

  return resolved.map((item, index) => ({
    ...item,
    isFeatured: index === 0,
  }));
}

async function loadSiteContent(): Promise<SiteContent> {
  if (!isSanityConfigured) {
    return fallbackSiteContent;
  }

  await connection();

  try {
    const result = await sanityClient.fetch<RawSiteQueryResult>(
      siteContentQuery,
      {},
      { cache: "no-store", useCdn: false },
    );
    const home = result.home;
    const isHomepageConfigured = Boolean(home);
    const business = adaptBusiness(result.business);
    const fallback = fallbackSiteContent;
    const heroImageUrl = imageUrl(home?.hero?.image, 1400);
    const openGraphImageUrl = imageUrl(
      result.settings?.openGraphImage,
      1200,
    );

    return {
      business,
      settings: {
        websiteTitle: text(
          result.settings?.websiteTitle,
          fallback.settings.websiteTitle,
        ),
        metaDescription: text(
          result.settings?.metaDescription,
          fallback.settings.metaDescription,
        ),
        openGraphTitle: text(
          result.settings?.openGraphTitle,
          fallback.settings.openGraphTitle,
        ),
        openGraphDescription: text(
          result.settings?.openGraphDescription,
          fallback.settings.openGraphDescription,
        ),
        openGraphImageUrl:
          openGraphImageUrl || fallback.settings.openGraphImageUrl,
        openGraphImageAlt: text(
          result.settings?.openGraphImage?.alt,
          fallback.settings.openGraphImageAlt,
        ),
        localBusinessName: text(
          result.settings?.localBusinessName,
          business.name,
        ),
      },
      header: {
        announcementText: text(
          home?.header?.announcementText,
          fallback.header.announcementText,
        ),
        orderButtonText: text(
          home?.header?.orderButtonText,
          fallback.header.orderButtonText,
        ),
      },
      hero: {
        ...fallback.hero,
        ...home?.hero,
        isActive: home?.hero?.isActive ?? fallback.hero.isActive,
        sortOrder: home?.hero?.sortOrder ?? fallback.hero.sortOrder,
        eyebrow: text(home?.hero?.eyebrow, fallback.hero.eyebrow),
        headlineLineOne: text(
          home?.hero?.headlineLineOne,
          fallback.hero.headlineLineOne,
        ),
        headlineLineTwo: text(
          home?.hero?.headlineLineTwo,
          fallback.hero.headlineLineTwo,
        ),
        headlineHighlight: text(
          home?.hero?.headlineHighlight,
          fallback.hero.headlineHighlight,
        ),
        supportingText: text(
          home?.hero?.supportingText,
          fallback.hero.supportingText,
        ),
        imageUrl: heroImageUrl || fallback.hero.imageUrl,
        imageAlt: text(home?.hero?.imageAlt, fallback.hero.imageAlt),
        primaryButton: {
          text: text(
            home?.hero?.primaryButton?.text,
            fallback.hero.primaryButton.text,
          ),
          destination: text(
            home?.hero?.primaryButton?.destination,
            fallback.hero.primaryButton.destination,
          ),
        },
        secondaryButton: {
          text: text(
            home?.hero?.secondaryButton?.text,
            fallback.hero.secondaryButton.text,
          ),
          destination:
            home?.hero?.secondaryButton?.destination?.trim() ||
            business.orderingUrl,
        },
        trustPoints:
          home?.hero?.trustPoints?.filter(Boolean) ||
          fallback.hero.trustPoints,
        imageBadgeEyebrow: text(
          home?.hero?.imageBadgeEyebrow,
          fallback.hero.imageBadgeEyebrow,
        ),
        imageBadgeText: text(
          home?.hero?.imageBadgeText,
          fallback.hero.imageBadgeText,
        ),
      },
      categoriesSection: section(
        home?.categoriesSection,
        fallback.categoriesSection,
      ),
      homepageCategories: adaptCategories(
        result.homepageCategories,
        isHomepageConfigured,
      ),
      menuSection: section(home?.menuSection, fallback.menuSection),
      favoritesSection: {
        ...section(home?.favoritesSection, fallback.favoritesSection),
        buttonText: text(
          home?.favoritesSection?.buttonText,
          fallback.favoritesSection.buttonText,
        ),
      },
      favorites: adaptFavorites(home?.favoritesSection?.items),
      whySection: section(home?.whySection, fallback.whySection),
      benefits:
        home?.whySection?.benefits
          ?.filter((item) => item.title)
          .map((item, index) => ({
            title: text(item.title, ""),
            description: text(item.description, ""),
            icon: text(item.icon, "✨"),
            sortOrder: item.sortOrder ?? index + 1,
          })) || fallback.benefits,
      gallerySection: section(
        home?.gallerySection,
        fallback.gallerySection,
      ),
      galleryItems: adaptGallery(
        result.galleryItems,
        isHomepageConfigured,
      ),
      visitSection: {
        ...fallback.visitSection,
        ...section(home?.visitSection, fallback.visitSection),
        directionsButtonText: text(
          home?.visitSection?.directionsButtonText,
          fallback.visitSection.directionsButtonText,
        ),
        callButtonText: text(
          home?.visitSection?.callButtonText,
          fallback.visitSection.callButtonText,
        ),
        orderButtonText: text(
          home?.visitSection?.orderButtonText,
          fallback.visitSection.orderButtonText,
        ),
        mapEyebrow: text(
          home?.visitSection?.mapEyebrow,
          `Find us in ${business.address.city}`,
        ),
        mapTitle: text(
          home?.visitSection?.mapTitle,
          fallback.visitSection.mapTitle,
        ),
      },
      footer: {
        description: text(
          home?.footer?.description,
          fallback.footer.description,
        ),
        copyrightText: text(
          home?.footer?.copyrightText,
          fallback.footer.copyrightText,
        ),
        closingText: text(
          home?.footer?.closingText,
          fallback.footer.closingText,
        ),
      },
    };
  } catch (error: unknown) {
    console.error(
      "Sanity site-content fallback: failed to load homepage content.",
      error instanceof Error ? error.message : error,
    );
    return fallbackSiteContent;
  }
}

export const getSiteContent = cache(loadSiteContent);
