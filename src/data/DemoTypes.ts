import type { Category } from "./categories";

export type Language = "es" | "en";
export type Localized = Record<Language, string>;
export type Meal = {
    id: string;
    category: Category;
    name: Localized;
    description: Localized;
    price: number;
    available: boolean;
};
export type Hours = { open: boolean; from: string; to: string; tables: number };
export type Booking = {
    id: string;
    date: string;
    time: string;
    name: string;
    phone: string;
    email: string;
    guests: number;
    note: string;
    depositPaid: boolean;
    status: "confirmed" | "cancelled";
    createdAt: string;
};
export type Database = {
    version: 1;
    meals: Meal[];
    bookings: Booking[];
    hours: Record<number, Hours>;
};
export type BookingInput = Pick<Booking, "date" | "time" | "name" | "phone" | "email" | "guests" | "note">;

export function money(value: number, language: Language): string {
    return new Intl.NumberFormat(language === "es" ? "es-AR" : "en-US", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}
