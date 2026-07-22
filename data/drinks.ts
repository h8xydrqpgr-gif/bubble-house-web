import type { Drink, DrinkCategory } from "@/types/drinks";

export const menuCategories = [
  "Loaded Teas",
  "Mega Teas",
  "Milk Teas",
  "Protein Shakes",
  "Coffee",
  "Waffles",
  "Add-ons",
] as const satisfies readonly DrinkCategory[];

export const drinks: readonly Drink[] = [
  {
    id: "red-venom",
    name: "Red Venom",
    category: "Loaded Teas",
    description:
      "Mango Tango, pineapple, piña colada and strawberry flavors.",
    price: 11,
  },
  {
    id: "kentucky-sunset",
    name: "Kentucky Sunset",
    category: "Loaded Teas",
    description: "A colorful and refreshing Bubble House signature tea.",
    price: 11,
    featured: true,
  },
  {
    id: "blue-lagoon",
    name: "Blue Lagoon",
    category: "Loaded Teas",
    description: "A bright tropical tea with refreshing blue flavors.",
    price: 11,
  },
  {
    id: "mexico",
    name: "Mexico",
    category: "Loaded Teas",
    description: "Green apple and strawberry flavors.",
    price: 11,
  },
  {
    id: "south-africa",
    name: "South Africa",
    category: "Loaded Teas",
    description:
      "Blue raspberry, Blue Blast, green apple, pineapple and strawberry flavors.",
    price: 11,
  },
  {
    id: "mega-tea",
    name: "Mega Tea",
    category: "Mega Teas",
    description:
      "A larger energizing tea prepared with your choice of available flavors.",
    price: 12,
  },
  {
    id: "taro-milk-tea",
    name: "Taro Milk Tea",
    category: "Milk Teas",
    description:
      "Creamy taro milk tea with chewy boba and a smooth, perfectly sweet flavor.",
    price: 11,
    featured: true,
  },
  {
    id: "coco-strawberry",
    name: "Coco Strawberry",
    category: "Milk Teas",
    description: "Creamy coconut and strawberry flavors blended together.",
    price: 11,
  },
  {
    id: "mango-strawberry",
    name: "Mango Strawberry",
    category: "Milk Teas",
    description:
      "Mango and strawberry flavors with brown sugar and optional boba.",
    price: 11,
  },
  {
    id: "strawberry-watermelon",
    name: "Strawberry Watermelon",
    category: "Milk Teas",
    description:
      "Strawberry, watermelon and piña colada flavors with a creamy finish.",
    price: 11,
  },
  {
    id: "dulce-de-leche",
    name: "Dulce de Leche",
    category: "Protein Shakes",
    description: "A creamy shake with rich dulce de leche flavor.",
    price: 11,
  },
  {
    id: "cookies-and-cream",
    name: "Cookies & Cream",
    category: "Protein Shakes",
    description: "A smooth cookies and cream protein shake.",
    price: 11,
  },
  {
    id: "strawberry-cheesecake",
    name: "Strawberry Cheesecake",
    category: "Protein Shakes",
    description: "A creamy strawberry cheesecake-inspired shake.",
    price: 11,
    featured: true,
  },
  {
    id: "chocolate-peanut-butter",
    name: "Chocolate Peanut Butter",
    category: "Protein Shakes",
    description:
      "Chocolate and peanut butter blended into a rich protein shake.",
    price: 11,
  },
  {
    id: "banana-caramel",
    name: "Banana Caramel",
    category: "Protein Shakes",
    description: "Banana and caramel flavors blended together.",
    price: 11,
  },
  {
    id: "peanut-butter-banana",
    name: "Peanut Butter Banana",
    category: "Protein Shakes",
    description: "Creamy peanut butter and banana protein shake.",
    price: 11,
  },
  {
    id: "strawberry-banana",
    name: "Strawberry Banana",
    category: "Protein Shakes",
    description: "A classic strawberry and banana protein shake.",
    price: 11,
  },
  {
    id: "protein-coffee",
    name: "Protein Coffee",
    category: "Coffee",
    description:
      "Smooth coffee prepared with protein and your choice of available flavor.",
    price: 8,
  },
  {
    id: "protein-waffle",
    name: "Protein Waffle",
    category: "Waffles",
    description:
      "A freshly prepared protein waffle topped with fruit and delicious flavor.",
    price: 11,
    featured: true,
  },
  {
    id: "boba",
    name: "Boba",
    category: "Add-ons",
    description: "Chewy tapioca pearls added to your drink.",
    price: 1.5,
  },
];
