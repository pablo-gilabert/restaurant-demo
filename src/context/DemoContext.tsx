import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createSeed } from "../data/DemoSeed";
import { importedMeals } from "../data/ImportedMeals";
import type { Booking, BookingInput, Database, Hours, Meal } from "../data/DemoTypes";
import { bookingProblem, makeBooking } from "../lib/Reservations";

const DB_KEY = "maison-aster-portfolio-database-v1";
const AUTH_KEY = "maison-aster-portfolio-admin-session-v1";
// One-time additive import; unchanged across refreshes to honor user deletions.
const CATALOG_IMPORT_KEY = "maison-aster-firestore-catalog-v1-imported";
// One-time price upgrade for pre-existing browser catalogs that received $0 from Firestore.
const SAMPLE_PRICE_IMPORT_KEY = "maison-aster-sample-prices-v1-imported";

function catalogKey(value: string): string {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function completeLegacyCatalog(database: Database): Database {
    try {
        if (localStorage.getItem(CATALOG_IMPORT_KEY) === "yes") return database;
        const existingIds = new Set(database.meals.map(meal => meal.id));
        const existingNames = new Set(database.meals.map(meal => catalogKey(meal.name.es)));
        const additional = importedMeals.filter(meal => !existingIds.has(meal.id) && !existingNames.has(catalogKey(meal.name.es)));
        const completed = additional.length ? { ...database, meals: [...database.meals, ...additional] } : database;
        // Persist data before marking the import complete; existing reservations remain untouched.
        localStorage.setItem(DB_KEY, JSON.stringify(completed));
        localStorage.setItem(CATALOG_IMPORT_KEY, "yes");
        return completed;
    } catch {
        // If storage is disabled, React state still receives the expanded catalog.
        const existingIds = new Set(database.meals.map(meal => meal.id));
        const existingNames = new Set(database.meals.map(meal => catalogKey(meal.name.es)));
        return {
            ...database,
            meals: [...database.meals, ...importedMeals.filter(meal => !existingIds.has(meal.id) && !existingNames.has(catalogKey(meal.name.es)))],
        };
    }
}

// Apply sample prices to legacy zero-valued imported items, preserving edited nonzero prices.
// This runs only once so explicitly setting a product back to ARS 0 stays hidden later.
function upgradeSamplePrices(database: Database): Database {
    try {
        if (localStorage.getItem(SAMPLE_PRICE_IMPORT_KEY) === "yes") return database;
    } catch {
        // Storage may be blocked; still upgrade the in-memory snapshot.
    }

    const pricesById = new Map(importedMeals.map(meal => [meal.id, meal.price]));
    const upgradedMeals = database.meals.map(meal => {
        const samplePrice = pricesById.get(meal.id);
        return meal.price === 0 && samplePrice !== undefined && samplePrice > 0
            ? { ...meal, price: samplePrice }
            : meal;
    });
    const upgraded = { ...database, meals: upgradedMeals };

    try {
        localStorage.setItem(DB_KEY, JSON.stringify(upgraded));
        localStorage.setItem(SAMPLE_PRICE_IMPORT_KEY, "yes");
    } catch {
        // Browser-only application remains usable without persistence.
    }
    return upgraded;
}

export const DEMO_ADMIN = { email: "admin@demo.maisonaster", password: "Demo2026!" } as const;

function load(): Database {
    try {
        const saved = localStorage.getItem(DB_KEY);
        if (!saved) {
            const initial = createSeed();
            try { localStorage.setItem(CATALOG_IMPORT_KEY, "yes"); localStorage.setItem(SAMPLE_PRICE_IMPORT_KEY, "yes"); } catch { /* Storage optional. */ }
            return initial;
        }
        const parsed: unknown = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
            const db = parsed as Partial<Database>;
            if (db.version === 1 && Array.isArray(db.meals) && Array.isArray(db.bookings) && db.hours && typeof db.hours === "object") {
                return upgradeSamplePrices(completeLegacyCatalog(db as Database));
            }
        }
    } catch {
        // Private browsing or damaged storage: reset the sample dataset.
    }
    const initial = createSeed();
    try { localStorage.setItem(CATALOG_IMPORT_KEY, "yes"); localStorage.setItem(SAMPLE_PRICE_IMPORT_KEY, "yes"); } catch { /* Storage optional. */ }
    return initial;
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
        try {
            return localStorage.getItem(AUTH_KEY) === "yes";
        } catch {
            return false;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(DB_KEY, JSON.stringify(database));
        } catch {
            // Demo remains usable in memory.
        }
    }, [database]);

    const login = (email: string, password: string): boolean => {
        const valid = email.trim().toLowerCase() === DEMO_ADMIN.email && password === DEMO_ADMIN.password;
        if (valid) {
            setAuthenticated(true);
            try {
                localStorage.setItem(AUTH_KEY, "yes");
            } catch {
                // No persistence available.
            }
        }
        return valid;
    };

    const logout = () => {
        setAuthenticated(false);
        try {
            localStorage.removeItem(AUTH_KEY);
        } catch {
            // No persistence available.
        }
    };

    const book = (input: BookingInput, deposit = false): string | null => {
        const problem = bookingProblem(database, input);
        if (problem) return problem;
        setDatabase(previous => ({ ...previous, bookings: [...previous.bookings, makeBooking(input, deposit)] }));
        return null;
    };

    const editBooking = (id: string, input: BookingInput, deposit: boolean): string | null => {
        const previous = database.bookings.find(booking => booking.id === id);
        if (!previous) return "missing";

        const sameSlot = previous.date === input.date && previous.time === input.time;
        const problem = sameSlot
            ? (!input.name.trim() || !input.phone.trim() || !Number.isInteger(input.guests) || input.guests < 1 || input.guests > 12 ? "invalid" : null)
            : bookingProblem(database, input, id);

        if (problem) return problem;

        setDatabase(previousState => ({
            ...previousState,
            bookings: previousState.bookings.map(booking => (booking.id === id ? { ...booking, ...input, depositPaid: deposit } : booking)),
        }));
        return null;
    };

    const patchBooking = (id: string, patch: Partial<Booking>) => {
        setDatabase(previous => ({
            ...previous,
            bookings: previous.bookings.map(booking => (booking.id === id ? { ...booking, ...patch, id } : booking)),
        }));
    };

    const deleteBooking = (id: string) => {
        setDatabase(previous => ({ ...previous, bookings: previous.bookings.filter(booking => booking.id !== id) }));
    };

    const upsertMeal = (meal: Meal) => {
        setDatabase(previous => ({
            ...previous,
            meals: previous.meals.some(item => item.id === meal.id)
                ? previous.meals.map(item => (item.id === meal.id ? meal : item))
                : [...previous.meals, meal],
        }));
    };

    const deleteMeal = (id: string) => {
        setDatabase(previous => ({ ...previous, meals: previous.meals.filter(meal => meal.id !== id) }));
    };

    const updateHours = (day: number, hours: Hours) => {
        setDatabase(previous => ({ ...previous, hours: { ...previous.hours, [day]: hours } }));
    };

    const reset = () => setDatabase(createSeed());

    return (
        <Context.Provider value={{ database, authenticated, login, logout, book, editBooking, patchBooking, deleteBooking, upsertMeal, deleteMeal, updateHours, reset }}>
            {children}
        </Context.Provider>
    );
}

export function useDemo(): ContextValue {
    const ctx = useContext(Context);
    if (!ctx) throw new Error("useDemo must be called within DemoProvider");
    return ctx;
}
