import type { Booking, Database, Meal } from "./DemoTypes";

// Fictional prices and customers; never presented as the restaurant's live inventory.
const sampleMeals: Omit<Meal, "id">[] = [
    ["Cafetería", "Café con leche", "Coffee with milk", "Café espresso con leche caliente", "Espresso with steamed milk", 4600],
    ["Cafetería", "Capuchino", "Cappuccino", "Espresso, leche y espuma", "Espresso, milk and foam", 5400],
    ["Cafetería", "Submarino", "Hot chocolate", "Leche caliente con chocolate", "Hot milk with chocolate", 5900],
    ["Desayunos", "Café con medialunas", "Coffee and croissants", "Café y dos medialunas", "Coffee and two Argentine croissants", 7900],
    ["Desayunos", "Tostado de jamón y queso", "Ham and cheese toastie", "Pan tostado con jamón y queso", "Toasted bread with ham and cheese", 8700],
    ["Brunch", "Brunch Mathilde", "Mathilde brunch", "Infusión, tostadas y acompañamientos", "Hot drink, toast and assorted sides", 19800],
    ["Tortas", "Cheesecake clásico", "Classic cheesecake", "Porción de cheesecake", "Slice of cheesecake", 7900],
    ["Tortas", "Cheesecake de pistacho", "Pistachio cheesecake", "Cheesecake con pistachos", "Cheesecake with pistachios", 8900],
    ["Cosas Dulces", "Chocotorta", "Chocolate cookie cake", "Postre argentino con galletitas y dulce de leche", "Argentine chocolate-cookie and dulce de leche cake", 7500],
    ["Entradas", "Tabla para compartir", "Sharing platter", "Selección de bocados para compartir", "Selection of small bites to share", 17500],
    ["Papas", "Papas rústicas", "Rustic fries", "Papas doradas con especias", "Golden fries with spices", 9500],
    ["Ensaladas", "Ensalada de estación", "Seasonal salad", "Vegetales frescos de estación", "Fresh seasonal vegetables", 11300],
    ["Pizzas", "Pizza muzzarella", "Mozzarella pizza", "Salsa de tomate y queso muzzarella", "Tomato sauce and mozzarella", 19000],
    ["Milanesas", "Milanesa napolitana", "Napolitana schnitzel", "Milanesa con tomate y queso", "Breaded cutlet with tomato and cheese", 23000],
    ["Grill", "Bife de chorizo a la provenzal", "Sirloin steak with garlic and herbs", "Bife a la parrilla con provenzal", "Grilled sirloin steak with garlic and parsley", 31500],
    ["Elaborados", "Pollo a la carbonara", "Carbonara chicken", "Pollo con salsa cremosa y guarnición", "Chicken with creamy sauce and a side", 24800],
    ["Elaborados", "Bife al Malbec", "Malbec-braised steak", "Carne con salsa de vino Malbec", "Steak with Malbec wine sauce", 32000],
    ["Pastas", "Sorrentinos de salmón", "Salmon-stuffed pasta", "Sorrentinos con salsa de camarones", "Filled pasta with shrimp sauce", 26500],
    ["Pastas", "Risotto de hongos", "Mushroom risotto", "Arroz cremoso con hongos", "Creamy rice with mushrooms", 24400],
    ["Postres", "Pavlova", "Pavlova", "Merengue con crema y frutas", "Meringue with cream and fruit", 8500],
    ["Bebidas", "Limonada", "Lemonade", "Limonada natural", "Fresh lemonade", 5200],
    ["Vinos Tintos Malbec", "Copa de Malbec", "Glass of Malbec", "Copa de vino tinto", "Glass of red wine", 8500],
    ["Drinks", "Gin tonic", "Gin and tonic", "Trago clásico con gin y tónica", "Classic gin and tonic", 11500]
].map(([category, es, en, descEs, descEn, price]) => ({
    category: category as Meal["category"],
    name: { es: es as string, en: en as string },
    description: { es: descEs as string, en: descEn as string },
    price: price as number,
    available: true,
}));

function dateOffset(days: number): string {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + days, 12);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const seeds: Omit<Booking, "id" | "createdAt">[] = [
    { date: dateOffset(1), time: "13:00", name: "Cliente Demo Uno", phone: "11 0000 0001", email: "", guests: 2, note: "Mesa junto a la ventana", depositPaid: true, status: "confirmed" },
    { date: dateOffset(1), time: "13:00", name: "Cliente Demo Dos", phone: "11 0000 0002", email: "", guests: 4, note: "Cumpleaños", depositPaid: false, status: "confirmed" },
    { date: dateOffset(2), time: "21:00", name: "Cliente Demo Tres", phone: "11 0000 0003", email: "", guests: 3, note: "", depositPaid: false, status: "confirmed" },
];

export const createSeed = (): Database => ({
    version: 1,
    meals: sampleMeals.map((m, i) => ({ ...m, id: `meal-${i + 1}` })),
    bookings: seeds.map((b, i) => ({ ...b, id: `seed-${i + 1}`, createdAt: new Date().toISOString() })),
    hours: {
        0: { open: false, from: "08:00", to: "23:30", tables: 4 },
        1: { open: true, from: "08:00", to: "23:30", tables: 4 },
        2: { open: true, from: "08:00", to: "23:30", tables: 4 },
        3: { open: true, from: "08:00", to: "23:30", tables: 4 },
        4: { open: true, from: "08:00", to: "23:30", tables: 4 },
        5: { open: true, from: "08:00", to: "23:30", tables: 4 },
        6: { open: true, from: "08:00", to: "23:30", tables: 4 },
    },
});
