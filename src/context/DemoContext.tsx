import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createSeed } from "../data/DemoSeed";
import type { Booking, BookingInput, Database, Hours, Meal } from "../data/DemoTypes";
import { bookingProblem, makeBooking } from "../lib/Reservations";

const DB_KEY = "mathilde-portfolio-database-v1";
const AUTH_KEY = "mathilde-portfolio-admin-session-v1";
export const DEMO_ADMIN = { email: "admin@demo.mathilde", password: "Demo2026!" } as const;

function load(): Database {
    try {
        const saved = localStorage.getItem(DB_KEY);
        if (!saved) return createSeed();
        const parsed: unknown = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
            const db = parsed as Partial<Database>;
            if (db.version === 1 && Array.isArray(db.meals) && Array.isArray(db.bookings) && db.hours && typeof db.hours === "object") return db as Database;
        }
    } catch { /* Private browsing or damaged storage: reset the sample dataset. */ }
    return createSeed();
}

type ContextValue = {
    database: Database;
    authenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    book: (input: BookingInput, deposit?: boolean) => string | null;
    editBooking: (id: string, input: BookingInput, deposit: boolean) => string | null;
    patchBooking: (id: string, patch: Partial<Booking>) => void;
    deleteBooking: (id: string) => void;
    upsertMeal: (meal: Meal) => void;
    deleteMeal: (id: string) => void;
    updateHours: (day: number, hours: Hours) => void;
    reset: () => void;
};
const Context = createContext<ContextValue | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
    const [database, setDatabase] = useState<Database>(load);
    const [authenticated, setAuthenticated] = useState(() => {
        try { return localStorage.getItem(AUTH_KEY) === "yes"; } catch { return false; }
    });
    useEffect(() => {
        try { localStorage.setItem(DB_KEY, JSON.stringify(database)); } catch { /* Demo remains usable in memory. */ }
    }, [database]);
    const login = (email: string, password: string): boolean => {
        const valid = email.trim().toLowerCase() === DEMO_ADMIN.email && password === DEMO_ADMIN.password;
        if (valid) { setAuthenticated(true); try { localStorage.setItem(AUTH_KEY, "yes"); } catch { /* No persistence */ } }
        return valid;
    };
    const logout = () => { setAuthenticated(false); try { localStorage.removeItem(AUTH_KEY); } catch { /* No persistence */ } };
    const book = (input: BookingInput, deposit = false): string | null => {
        const problem = bookingProblem(database, input);
        if (problem) return problem;
        setDatabase(prev => ({ ...prev, bookings: [...prev.bookings, makeBooking(input, deposit)] }));
        return null;
    };
    const editBooking = (id: string, input: BookingInput, deposit: boolean): string | null => {
        const previous = database.bookings.find(b => b.id === id);
        if (!previous) return "missing";
        const sameSlot = previous.date === input.date && previous.time === input.time;
        // Editing customer details or a deposit does not invalidate an existing slot after opening hours change.
        const problem = sameSlot
            ? (!input.name.trim() || !input.phone.trim() || !Number.isInteger(input.guests) || input.guests < 1 || input.guests > 12 ? "invalid" : null)
            : bookingProblem(database, input, id);
        if (problem) return problem;
        setDatabase(prev => ({ ...prev, bookings: prev.bookings.map(b => b.id === id ? { ...b, ...input, depositPaid: deposit } : b) }));
        return null;
    };
    const patchBooking = (id: string, patch: Partial<Booking>) => setDatabase(prev => ({ ...prev, bookings: prev.bookings.map(b => b.id === id ? { ...b, ...patch, id } : b) }));
    const deleteBooking = (id: string) => setDatabase(prev => ({ ...prev, bookings: prev.bookings.filter(b => b.id !== id) }));
    const upsertMeal = (meal: Meal) => setDatabase(prev => ({ ...prev, meals: prev.meals.some(m => m.id === meal.id) ? prev.meals.map(m => m.id === meal.id ? meal : m) : [...prev.meals, meal] }));
    const deleteMeal = (id: string) => setDatabase(prev => ({ ...prev, meals: prev.meals.filter(m => m.id !== id) }));
    const updateHours = (day: number, hours: Hours) => setDatabase(prev => ({ ...prev, hours: { ...prev.hours, [day]: hours } }));
    const reset = () => setDatabase(createSeed());
    return <Context.Provider value={{ database, authenticated, login, logout, book, editBooking, patchBooking, deleteBooking, upsertMeal, deleteMeal, updateHours, reset }}>{children}</Context.Provider>;
}
export function useDemo(): ContextValue {
    const ctx = useContext(Context);
    if (!ctx) throw new Error("useDemo must be called within DemoProvider");
    return ctx;
}
