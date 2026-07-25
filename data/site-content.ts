import { business } from "@/data/business";
import type { SiteContent } from "@/types/site-content";

export const fallbackSiteContent: SiteContent = {
  business: {
    name: business.name,
    phone: business.phone,
    phoneLink: business.phoneLink,
    address: {
      street: business.address,
      city: business.city,
      state: business.state,
      zip: business.zip,
    },
    businessHours: [
      {
        label: "Monday – Saturday",
        hours: business.hours.mondaySaturday,
        schemaDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
      {
        label: "Sunday",
        hours: business.hours.sunday,
        schemaDays: ["Sunday"],
      },
    ],
    googleMapsUrl: business.maps.google,
    appleMapsUrl: business.maps.apple,
    orderingUrl: business.delivery.doordash,
    socialLinks: [
      { label: "Facebook", url: business.social.facebook },
      { label: "Yelp", url: business.social.yelp },
    ],
  },
  settings: {
    websiteTitle:
      "Bubble House Nutrition | Boba, Loaded Teas & Protein Shakes in Lexington, KY",
    metaDescription:
      "Visit Bubble House Nutrition in Lexington, Kentucky for refreshing loaded teas, creamy milk teas with boba, protein shakes, protein coffee and freshly prepared waffles.",
    openGraphTitle: "Bubble House Nutrition in Lexington, KY",
    openGraphDescription:
      "Refreshing teas, creamy shakes, boba, coffee and waffles made fresh in Lexington, Kentucky.",
    openGraphImageUrl: "/images/tarotwaffle.png",
    openGraphImageAlt: "Bubble House signature drinks and protein waffle",
    localBusinessName: business.name,
  },
  header: {
    announcementText: `Fresh drinks made daily in ${business.city}, Kentucky`,
    orderButtonText: "Order Online",
  },
  hero: {
    isActive: true,
    sortOrder: 1,
    eyebrow: `✨ Freshly Made in ${business.city}`,
    headlineLineOne: "Handcrafted",
    headlineLineTwo: "drinks",
    headlineHighlight: "you'll love.",
    supportingText: `Creamy milk teas, refreshing loaded teas, protein shakes and delicious waffles prepared fresh at ${business.name}.`,
    imageUrl: "/images/tarotwaffle.png",
    imageAlt: "Bubble House Signature",
    primaryButton: { text: "Explore Menu", destination: "#menu" },
    secondaryButton: { text: "Order Online", destination: "" },
    trustPoints: ["Made Fresh", "Premium Flavors", "Delivery Available"],
    imageBadgeEyebrow: "Customer Favorite",
    imageBadgeText: "Freshly Prepared ✨",
  },
  categoriesSection: {
    isActive: true,
    sortOrder: 2,
    eyebrow: "Explore the menu",
    title: "Something for every craving",
    description:
      "From creamy favorites to refreshing teas and protein-packed shakes.",
  },
  homepageCategories: [
    {
      id: "category-milk-teas",
      name: "Milk Teas",
      description:
        "Creamy, smooth and customizable with delicious flavors and optional boba.",
      icon: "🧋",
      imageAlt: "Milk Teas",
      buttonText: "View menu",
      sortOrder: 1,
    },
    {
      id: "category-loaded-teas",
      name: "Loaded Teas",
      description:
        "Refreshing, colorful and packed with energizing flavor combinations.",
      icon: "⚡",
      imageAlt: "Loaded Teas",
      buttonText: "View menu",
      sortOrder: 2,
    },
    {
      id: "category-protein-shakes",
      name: "Protein Shakes",
      description:
        "Creamy, satisfying and prepared with delicious protein-packed flavors.",
      icon: "🥤",
      imageAlt: "Protein Shakes",
      buttonText: "View menu",
      sortOrder: 3,
    },
  ],
  menuSection: {
    isActive: true,
    sortOrder: 3,
    eyebrow: "Our Menu",
    title: "Find your new favorite",
    description:
      "Explore refreshing teas, creamy shakes, milk teas, coffee, waffles, delicious add-ons and wellness boosters.",
  },
  favoritesSection: {
    isActive: true,
    sortOrder: 4,
    eyebrow: "Bubble House Favorites",
    title: "Customer favorites",
    description: "Discover three of our most-loved Bubble House creations.",
    buttonText: "View menu",
  },
  favorites: [
    {
      id: "taro-milk-tea",
      name: "Taro Milk Tea",
      label: "Customer Favorite",
      description:
        "Creamy taro milk tea with chewy boba and a smooth, perfectly sweet flavor.",
      imageUrl: "/images/hero/taro.png",
      imageAlt: "Taro Milk Tea from Bubble House Nutrition",
      sortOrder: 1,
    },
    {
      id: "strawberry-cheesecake",
      name: "Strawberry Cheesecake",
      label: "Sweet & Creamy",
      description:
        "A creamy strawberry cheesecake-inspired drink with a rich and refreshing finish.",
      imageUrl: "/images/hero/strawberry-chesecake.png",
      imageAlt: "Strawberry Cheesecake drink from Bubble House Nutrition",
      sortOrder: 2,
    },
    {
      id: "protein-waffle",
      name: "Protein Waffle",
      label: "Perfect Breakfast",
      description:
        "A freshly prepared protein waffle topped with fruit and delicious flavor.",
      imageUrl: "/images/hero/protein-waffle.png",
      imageAlt: "Protein Waffle from Bubble House Nutrition",
      sortOrder: 3,
    },
  ],
  whySection: {
    isActive: true,
    sortOrder: 5,
    eyebrow: "Why Bubble House?",
    title: "More than a drink.",
    description:
      "Every drink is handcrafted with attention to detail, premium ingredients and friendly service.",
  },
  benefits: [
    {
      icon: "✨",
      title: "Made Fresh",
      description: "Every drink is prepared fresh when you order.",
      sortOrder: 1,
    },
    {
      icon: "💜",
      title: "Made With Care",
      description: "Friendly service and quality in every visit.",
      sortOrder: 2,
    },
    {
      icon: "🧋",
      title: "Premium Ingredients",
      description: "Quality ingredients for bold flavors you'll love.",
      sortOrder: 3,
    },
    {
      icon: "🚗",
      title: "Delivery Available",
      description: "Enjoy Bubble House at home with DoorDash.",
      sortOrder: 4,
    },
  ],
  gallerySection: {
    isActive: true,
    sortOrder: 6,
    eyebrow: "Gallery",
    title: "Crafted to impress.",
    description:
      "Every drink is made fresh and prepared with attention to every detail.",
  },
  galleryItems: [1, 2, 3, 4].map((sortOrder) => ({
    id: `gallery-${sortOrder}`,
    title: `Bubble House Drink ${sortOrder}`,
    imageUrl: "/images/drink.jpeg",
    alt: "Bubble House Drink",
    sortOrder,
  })),
  visitSection: {
    isActive: true,
    sortOrder: 7,
    eyebrow: "Visit Bubble House",
    title: "Come see us",
    description:
      "Stop by for your favorite drinks, shakes, coffee and waffles.",
    directionsButtonText: "Open in Google Maps",
    callButtonText: "Call us",
    orderButtonText: "Order online",
    mapEyebrow: `Find us in ${business.city}`,
    mapTitle: "Your next favorite is nearby",
  },
  footer: {
    description:
      "Refreshing teas, creamy shakes, coffee, waffles and delicious favorites made for every craving.",
    copyrightText: "All rights reserved.",
    closingText: "Made with care in Kentucky.",
  },
};
