import type { Category } from "../data/categories"

export type { Category } from "../data/categories"

// Represents a normalized meal used by the public menu and administration panel.
export type Meal = {
  id: string
  name: string
  description: string
  category: Category
  available: boolean
  price: number
}

export type Filter = "all" | "available" | "hidden"
export type SortOption = "az" | "za" | "priceLow" | "priceHigh"
