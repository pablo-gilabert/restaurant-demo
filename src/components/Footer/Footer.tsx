import { Link } from "react-router-dom";
import { useDisplay } from "../../context/DisplayContext";

export default function Footer() {
    const { language, t } = useDisplay();
    const es = language === "es";

    return (
        <footer className="luxe-footer">
            <div className="luxe-footer-top">
                <span className="luxe-eyebrow">{es ? "TE ESPERAMOS" : "WE LOOK FORWARD TO SEEING YOU"}</span>
                <h2>{es ? "Tu mesa te espera." : "Your table awaits."}</h2>
                <Link className="luxe-button luxe-button-gold" to="/reservations">
                    {t("footerBook")} ↗
                </Link>
            </div>

            <div className="luxe-footer-bottom luxe-container">
                <div className="luxe-footer-brand">
                    <span className="luxe-brand-large">MAISON ASTER</span>
                    <small>D E M O · F I N E · D I N I N G</small>
                </div>

                <div>
                    <span className="luxe-eyebrow">{es ? "VISITANOS" : "FIND US"}</span>
                    <p>Pasaje de las Magnolias 245<br />Puerto Cristal, Buenos Aires</p>
                </div>

                <div>
                    <span className="luxe-eyebrow">{es ? "EXPLORÁ" : "EXPLORE"}</span>
                    <Link to="/menu">{t("navMenu")}</Link>
                    <Link to="/about">{t("navAbout")}</Link>
                    <Link to="/login">{es ? "Acceso demo" : "Demo access"}</Link>
                </div>
            </div>

            <div className="luxe-footer-legal luxe-container">
                <span>© {new Date().getFullYear()} MAISON ASTER</span>
                <span>{es ? "PROYECTO DE PORTFOLIO · EXPERIENCIA DEMOSTRATIVA" : "PORTFOLIO PROJECT · DEMONSTRATION EXPERIENCE"}</span>
            </div>
        </footer>
    );
}
