import { useDisplay } from "../../context/DisplayContext";
import styles from "./DisplayControls.module.css";
export default function DisplayControls() {
    const { language, theme, setLanguage, toggleTheme } = useDisplay();
    return <div className={styles.controls} aria-label="Language and appearance">
        <button type="button" className={styles.button} aria-label={language === "es" ? "Change to English" : "Cambiar a español"} onClick={() => setLanguage(language === "es" ? "en" : "es") }>
            <img src={language === "es" ? "/flags/Spain.svg" : "/flags/UnitedKingdom.svg"} alt="" /> {language === "es" ? "ESP" : "EN"}
        </button>
        <button type="button" className={styles.button} onClick={toggleTheme} aria-label={language === "es" ? "Cambiar tema" : "Change theme"} aria-pressed={theme === "light"}>
            {theme === "dark" ? "☀" : "☾"} <span>{theme === "dark" ? (language === "es" ? "Claro" : "Light") : (language === "es" ? "Oscuro" : "Dark")}</span>
        </button>
    </div>;
}
