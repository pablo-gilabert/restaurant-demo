// Central source of truth for every category accepted by the UI and Firestore mapping layer.
export const categories = [
  "Cafetería",
  "Cosas Dulces",
  "Tortas",
  "Desayunos",
  "Brunch",
  "Sandwiches",
  "Entradas",
  "Papas",
  "Ensaladas",
  "Pizzas",
  "Milanesas",
  "Grill",
  "Elaborados",
  "Pastas",
  "Postres",
  "Bebidas",
  "Cervezas",
  "Cervezas Artesanales",
  "Vinos Tintos Malbec",
  "Vinos Rosados",
  "Vinos Blancos",
  "Sidras y Champagne",
  "Drinks"
] as const

export type Category = (typeof categories)[number]

// Validates unknown Firestore values against the supported category list.
export const isCategory = (value: unknown): value is Category => {
  return typeof value === "string" && (categories as readonly string[]).includes(value)
}
