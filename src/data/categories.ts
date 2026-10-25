// Categories shared between the sample catalog, public menu, and administration.
export const categories = [
  "Cafetería", "Cosas Dulces", "Tortas", "Desayunos", "Brunch", "Sandwiches",
  "Entradas", "Papas", "Ensaladas", "Pizzas", "Milanesas", "Grill", "Elaborados",
  "Pastas", "Postres", "Bebidas", "Cervezas", "Cervezas Artesanales", "Vinos Tintos Malbec",
  "Vinos Rosados", "Vinos Blancos", "Sidras y Champagne", "Drinks"
] as const;
export type Category = (typeof categories)[number];
export const isCategory = (value: unknown): value is Category => typeof value === "string" && (categories as readonly string[]).includes(value);
