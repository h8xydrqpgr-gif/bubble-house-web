import { createReadStream } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import { sanityEnv } from "../sanity/env";

const client = getCliClient({
  apiVersion: sanityEnv.apiVersion,
}).withConfig({ useCdn: false });

async function uploadImage(relativePath: string, filename: string) {
  const existingId = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );

  if (existingId) {
    return existingId;
  }

  const absolutePath = path.join(process.cwd(), "public", relativePath);
  const asset = await client.assets.upload(
    "image",
    createReadStream(absolutePath),
    { filename },
  );

  return asset._id;
}

function image(assetId: string, alt?: string) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    ...(alt ? { alt } : {}),
  };
}

async function importSiteContent() {
  const [heroAssetId, galleryAssetId] = await Promise.all([
    uploadImage("images/tarotwaffle.png", "cms-hero-tarotwaffle.png"),
    uploadImage("images/drink.jpeg", "cms-gallery-drink.jpeg"),
  ]);

  await client.createOrReplace({
    _id: "businessInfo",
    _type: "businessInfo",
    name: "Bubble House Nutrition",
    phone: "(859) 913-1662",
    phoneLink: "8599131662",
    address: {
      street: "100 Regency Point Path",
      city: "Lexington",
      state: "KY",
      zip: "40503",
    },
    businessHours: [
      {
        _key: "monday-saturday",
        _type: "businessHoursRow",
        label: "Monday – Saturday",
        hours: "7:00 AM - 7:00 PM",
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
        _key: "sunday",
        _type: "businessHoursRow",
        label: "Sunday",
        hours: "8:30 AM - 5:30 PM",
        schemaDays: ["Sunday"],
      },
    ],
    googleMapsUrl:
      "https://maps.app.goo.gl/JZLV5eBN83gnvnza9?g_st=ic",
    appleMapsUrl: "https://maps.apple/p/fR72KIppD8Tmrq",
    orderingUrl:
      "https://www.doordash.com/store/38516335?utm_source=mx_share&aw=Sg-hfZPH_arUx0Bg",
    socialLinks: [
      {
        _key: "facebook",
        _type: "socialLink",
        label: "Facebook",
        url: "https://www.facebook.com/share/1KwEcNVSst/?mibextid=wwXIfr",
      },
      {
        _key: "yelp",
        _type: "socialLink",
        label: "Yelp",
        url: "https://yelp.to/6rNGuq4rvD",
      },
    ],
  });

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    websiteTitle:
      "Bubble House Nutrition | Boba, Loaded Teas & Protein Shakes in Lexington, KY",
    metaDescription:
      "Visit Bubble House Nutrition in Lexington, Kentucky for refreshing loaded teas, creamy milk teas with boba, protein shakes, protein coffee and freshly prepared waffles.",
    openGraphTitle: "Bubble House Nutrition in Lexington, KY",
    openGraphDescription:
      "Refreshing teas, creamy shakes, boba, coffee and waffles made fresh in Lexington, Kentucky.",
    openGraphImage: image(
      heroAssetId,
      "Bubble House signature drinks and protein waffle",
    ),
    localBusinessName: "Bubble House Nutrition",
    businessInfo: {
      _type: "reference",
      _ref: "businessInfo",
    },
  });

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    header: {
      announcementText: "Fresh drinks made daily in Lexington, Kentucky",
      orderButtonText: "Order Online",
    },
    hero: {
      isActive: true,
      sortOrder: 1,
      eyebrow: "✨ Freshly Made in Lexington",
      headlineLineOne: "Handcrafted",
      headlineLineTwo: "drinks",
      headlineHighlight: "you'll love.",
      supportingText:
        "Creamy milk teas, refreshing loaded teas, protein shakes and delicious waffles prepared fresh at Bubble House Nutrition.",
      image: image(heroAssetId),
      imageAlt: "Bubble House Signature",
      primaryButton: { text: "Explore Menu", destination: "#menu" },
      secondaryButton: { text: "Order Online", destination: "" },
      trustPoints: [
        "Made Fresh",
        "Premium Flavors",
        "Delivery Available",
      ],
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
      description:
        "Discover three of our most-loved Bubble House creations.",
      buttonText: "View menu",
      items: [
        {
          _key: "taro-milk-tea",
          _type: "favoriteProduct",
          product: { _type: "reference", _ref: "product-taro-milk-tea" },
          label: "Customer Favorite",
          sortOrder: 1,
          isActive: true,
        },
        {
          _key: "strawberry-cheesecake",
          _type: "favoriteProduct",
          product: {
            _type: "reference",
            _ref: "product-strawberry-cheesecake",
          },
          label: "Sweet & Creamy",
          sortOrder: 2,
          isActive: true,
        },
        {
          _key: "protein-waffle",
          _type: "favoriteProduct",
          product: { _type: "reference", _ref: "product-protein-waffle" },
          label: "Perfect Breakfast",
          sortOrder: 3,
          isActive: true,
        },
      ],
    },
    whySection: {
      isActive: true,
      sortOrder: 5,
      eyebrow: "Why Bubble House?",
      title: "More than a drink.",
      description:
        "Every drink is handcrafted with attention to detail, premium ingredients and friendly service.",
      benefits: [
        {
          _key: "made-fresh",
          _type: "benefit",
          icon: "✨",
          title: "Made Fresh",
          description: "Every drink is prepared fresh when you order.",
          sortOrder: 1,
          isActive: true,
        },
        {
          _key: "made-with-care",
          _type: "benefit",
          icon: "💜",
          title: "Made With Care",
          description: "Friendly service and quality in every visit.",
          sortOrder: 2,
          isActive: true,
        },
        {
          _key: "premium-ingredients",
          _type: "benefit",
          icon: "🧋",
          title: "Premium Ingredients",
          description: "Quality ingredients for bold flavors you'll love.",
          sortOrder: 3,
          isActive: true,
        },
        {
          _key: "delivery",
          _type: "benefit",
          icon: "🚗",
          title: "Delivery Available",
          description: "Enjoy Bubble House at home with DoorDash.",
          sortOrder: 4,
          isActive: true,
        },
      ],
    },
    gallerySection: {
      isActive: true,
      sortOrder: 6,
      eyebrow: "Gallery",
      title: "Crafted to impress.",
      description:
        "Every drink is made fresh and prepared with attention to every detail.",
    },
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
      mapEyebrow: "Find us in Lexington",
      mapTitle: "Your next favorite is nearby",
    },
    footer: {
      description:
        "Refreshing teas, creamy shakes, coffee, waffles and delicious favorites made for every craving.",
      copyrightText: "All rights reserved.",
      closingText: "Made with care in Kentucky.",
    },
  });

  const galleryItems = [1, 2, 3, 4].map((sortOrder) => ({
    _id: `gallery-item-${sortOrder}`,
    _type: "galleryItem" as const,
    title: `Bubble House Drink ${sortOrder}`,
    image: image(galleryAssetId),
    alt: "Bubble House Drink",
    isFeatured: sortOrder === 1,
    sortOrder,
    isActive: true,
  }));

  await Promise.all(
    galleryItems.map((galleryItem) => client.createOrReplace(galleryItem)),
  );

  const homepageCategories = [
    {
      id: "category-milk-teas",
      description:
        "Creamy, smooth and customizable with delicious flavors and optional boba.",
      icon: "🧋",
      sortOrder: 1,
    },
    {
      id: "category-loaded-teas",
      description:
        "Refreshing, colorful and packed with energizing flavor combinations.",
      icon: "⚡",
      sortOrder: 2,
    },
    {
      id: "category-protein-shakes",
      description:
        "Creamy, satisfying and prepared with delicious protein-packed flavors.",
      icon: "🥤",
      sortOrder: 3,
    },
  ];

  await Promise.all(
    homepageCategories.map((category) =>
      client
        .patch(category.id)
        .set({
          showOnHomepage: true,
          homepageDescription: category.description,
          homepageIcon: category.icon,
          homepageButtonText: "View menu",
          homepageSortOrder: category.sortOrder,
        })
        .commit({ visibility: "sync" }),
    ),
  );

  console.log(
    "Site content migration complete: 3 singletons, 4 gallery items, and 3 homepage category cards.",
  );
}

importSiteContent().catch((error: unknown) => {
  console.error(
    error instanceof Error ? error.message : "Unknown migration error.",
  );
  process.exitCode = 1;
});
