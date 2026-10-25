import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useDisplay } from "../../context/DisplayContext";

export default function Header() {
    const { language, t } = useDisplay();
    const es = language === "es";

    return (
        <section className="luxe-hero">
            <div className="luxe-hero-image" aria-hidden="true" />
            <Navbar overlay />

            <div className="luxe-hero-inner">
                <span className="luxe-eyebrow luxe-hero-eyebrow">
                    <i /> {es ? "COCINA · ATMÓSFERA · ENCUENTRO" : "CUISINE · ATMOSPHERE · CONNECTION"} <i />
                </span>
                <span className="luxe-hero-wordmark">MAISON ASTER</span>
                <div className="luxe-hero-rule"><span>DINING HOUSE</span><span>EST. 2026 · PUERTO CRISTAL</span></div>
                <h1>
                    {es ? "El arte de disfrutar" : "The art of savoring"}
                    <br />
                    <em>{es ? "cada instante." : "every moment."}</em>
                </h1>
                <p>
                    {es
                        ? "Una pausa en el tiempo. Una mesa que invita a quedarse. Una experiencia que comienza mucho antes del primer plato."
                        : "A pause in time. A table that invites you to linger. An experience that begins long before the first course."}
                </p>
                <div className="luxe-hero-actions">
                    <Link className="luxe-button luxe-button-gold" to="/reservations">
                        {t("footerBook")} <span aria-hidden="true">↗</span>
                    </Link>
                    <Link className="luxe-button luxe-button-outline-light" to="/menu">
                        {t("navMenu")} <span aria-hidden="true">↗</span>
                    </Link>
                </div>
            </div>

            <div className="luxe-hero-foot">
                <span>{es ? "UNA EXPERIENCIA DE HOSPITALIDAD" : "AN EXPERIENCE IN HOSPITALITY"}</span>
                <span>{es ? "DESLIZÁ PARA DESCUBRIR" : "SCROLL TO DISCOVER"} ↓</span>
            </div>
        </section>
    );
}
