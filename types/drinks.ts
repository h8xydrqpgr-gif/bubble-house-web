export type DrinkCategory =
  | "Loaded Teas"
  | "Mega Teas"
  | "Milk Teas"
  | "Protein Shakes"
  | "Coffee"
  | "Waffles"
  | "Add-ons";

export type MenuFilter = "All" | DrinkCategory;

export interface Drink {
  id: string;
  name: string;
  category: DrinkCategory;
  description: string;
  price: number;
  featured?: boolean;
}
