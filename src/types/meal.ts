export type Category =
  | "Cafetería"
  | "Cosas Dulces"
  | "Tortas"
  | "Desayunos"
  | "Brunch"
  | "Sandwiches"
  | "Entradas"
  | "Papas"
  | "Ensaladas"
  | "Pizzas"
  | "Milanesas"
  | "Grill"
  | "Elaborados"
  | "Pastas"
  | "Postres"
  | "Bebidas"
  | "Cervezas"
  | "Cervezas Artesanales"
  | "Vinos Tintos Malbec"
  | "Vinos Rosados"
  | "Vinos Blancos"
  | "Sidras y Champagne"
  | "Drinks"

export type Meal = {
  id: string
  name: string
  description: string
  category: Category
  available: boolean
  price: number
}

export type Filter =
  | "all"
  | "available"
  | "hidden"

export type SortOption =
  | "az"
  | "za"
  | "priceLow"
  | "priceHigh"