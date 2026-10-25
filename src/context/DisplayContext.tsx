import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language } from "../data/DemoTypes";
import { translate, type UiKey } from "../i18n/Translations";
export type Theme = "dark" | "light";
type Value = { language: Language; theme: Theme; setLanguage: (language: Language) => void; toggleTheme: () => void; t: (key: UiKey) => string };
const Context = createContext<Value | null>(null);
function readValue<T extends string>(key: string, fallback: T, options: readonly T[]): T {
    try { const value = localStorage.getItem(key); return options.find(x => x === value) ?? fallback; } catch { return fallback; }
}
export function DisplayProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => readValue("mathilde-demo-language", "es", ["es", "en"]));
    const [theme, setTheme] = useState<Theme>(() => readValue("mathilde-demo-theme", "dark", ["dark", "light"]));
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.lang = language === "es" ? "es-AR" : "en";
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#091413" : "#f7f1e5");
        try { localStorage.setItem("mathilde-demo-language", language); localStorage.setItem("mathilde-demo-theme", theme); } catch { /* Storage optional */ }
    }, [language, theme]);
    return <Context.Provider value={{ language, theme, setLanguage, toggleTheme: () => setTheme(x => x === "dark" ? "light" : "dark"), t: key => translate(language, key) }}>{children}</Context.Provider>;
}
export function useDisplay(): Value {
    const value = useContext(Context);
    if (!value) throw new Error("DisplayProvider is missing");
    return value;
}
