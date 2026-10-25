import type { Booking, Database } from "./DemoTypes";
import { importedMeals } from "./ImportedMeals";

// Imported menu is a demo-only snapshot; sample reservations and opening hours are fictional.
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
    meals: importedMeals.map(meal => ({ ...meal, name: { ...meal.name }, description: { ...meal.description } })),
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
