import { useDisplay } from "../../context/DisplayContext";
import styles from "./DisplayControls.module.css";

export default function DisplayControls() {
    const { language, theme, setLanguage, setTheme } = useDisplay();

    return (
        <div className={styles.controls} aria-label="Language and appearance">
            <button
                type="button"
                className={styles.language}
                aria-label={language === "es" ? "Change to English" : "Cambiar a español"}
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
            >
                <img src={language === "es" ? "/flags/Spain.svg" : "/flags/UnitedKingdom.svg"} alt="" />
                <span>{language === "es" ? "ESP" : "EN"}</span>
            </button>

            <div className={styles.switch} role="group" aria-label={language === "es" ? "Tema" : "Theme"}>
                <button
                    type="button"
                    className={`${styles.option} ${theme === "light" ? styles.active : ""}`}
                    aria-pressed={theme === "light"}
                    aria-label={language === "es" ? "Modo claro" : "Light mode"}
                    onClick={() => setTheme("light")}
                >
                    <span aria-hidden="true">☀</span>
                </button>
                <button
                    type="button"
                    className={`${styles.option} ${theme === "dark" ? styles.active : ""}`}
                    aria-pressed={theme === "dark"}
                    aria-label={language === "es" ? "Modo oscuro" : "Dark mode"}
                    onClick={() => setTheme("dark")}
                >
                    <span aria-hidden="true">☾</span>
                </button>
            </div>
        </div>
    );
}
