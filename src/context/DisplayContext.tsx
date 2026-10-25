import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language } from "../data/DemoTypes";
import { translate, type UiKey } from "../i18n/Translations";

export type Theme = "dark" | "light";

type Value = {
    language: Language;
    theme: Theme;
    setLanguage: (language: Language) => void;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    t: (key: UiKey) => string;
};

const Context = createContext<Value | null>(null);

function readValue<T extends string>(key: string, fallback: T, options: readonly T[]): T {
    try {
        const value = localStorage.getItem(key);
        return options.find(option => option === value) ?? fallback;
    } catch {
        return fallback;
    }
}

export function DisplayProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => readValue("maison-aster-demo-language", "es", ["es", "en"]));
    const [theme, setTheme] = useState<Theme>(() => readValue("maison-aster-demo-theme", "dark", ["dark", "light"]));

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.lang = language === "es" ? "es-AR" : "en";
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#121412" : "#f5f0e7");

        try {
            localStorage.setItem("maison-aster-demo-language", language);
            localStorage.setItem("maison-aster-demo-theme", theme);
        } catch {
            // Local storage persistence is optional for the demo.
        }
    }, [language, theme]);

    return (
        <Context.Provider
            value={{
                language,
                theme,
                setLanguage,
                setTheme,
                toggleTheme: () => setTheme(current => (current === "dark" ? "light" : "dark")),
                t: key => translate(language, key),
            }}
        >
            {children}
        </Context.Provider>
    );
}

export function useDisplay(): Value {
    const value = useContext(Context);
    if (!value) throw new Error("DisplayProvider is missing");
    return value;
}
