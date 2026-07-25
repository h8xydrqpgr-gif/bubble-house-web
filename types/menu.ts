export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
}

export interface MenuProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  featured: boolean;
  sortOrder: number;
  imageUrl?: string;
  imageAlt?: string;
}

export interface MenuData {
  categories: readonly MenuCategory[];
  products: readonly MenuProduct[];
  source: "sanity" | "fallback";
}

export interface SanityMenuImage {
  asset?: {
    _type?: "reference";
    _ref?: string;
  };
  crop?: {
    _type?: "sanity.imageCrop";
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  hotspot?: {
    _type?: "sanity.imageHotspot";
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  };
  alt?: string;
}

export interface SanityMenuProduct {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  ingredients?: string[];
  price?: number;
  featured?: boolean;
  sortOrder?: number;
  image?: SanityMenuImage;
}

export interface SanityMenuCategory {
  _id?: string;
  name?: string;
  slug?: string;
  sortOrder?: number;
  products?: SanityMenuProduct[];
}
