import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDisplay } from "../../context/DisplayContext";
import { useDemo } from "../../context/DemoContext";
import DisplayControls from "../DisplayControls/DisplayControls";

export default function Navbar({ overlay = false }: { overlay?: boolean }) {
    const { t, language } = useDisplay();
    const { authenticated } = useDemo();
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    const links = [
        { to: "/", text: t("navHome"), end: true },
        { to: "/menu", text: t("navMenu") },
        { to: "/about", text: t("navAbout") },
        { to: authenticated ? "/admin/turnos" : "/login", text: authenticated ? t("navAdmin") : (language === "es" ? "Acceso demo" : "Demo login") },
    ];

    return (
        <nav key={pathname} className={`luxe-nav ${overlay ? "luxe-nav-overlay" : ""}`} aria-label={language === "es" ? "Navegación principal" : "Main navigation"}>
            <Link className="luxe-brand" to="/" onClick={() => setOpen(false)} aria-label="Maison Aster — home">
                <span>A</span>
                <span className="luxe-brand-type">
                    <strong>MAISON ASTER</strong>
                    <small>F I N E · D I N I N G</small>
                </span>
            </Link>

            <div className={`luxe-nav-links ${open ? "is-open" : ""}`} id="luxe-nav-links">
                {links.map(link => (
                    <NavLink
                        key={link.to}
                        end={link.end}
                        to={link.to}
                        className={({ isActive }) => (isActive ? "luxe-nav-link is-active" : "luxe-nav-link")}
                        onClick={() => setOpen(false)}
                    >
                        {link.text}
                    </NavLink>
                ))}
                <Link to="/reservations" className="luxe-nav-book" onClick={() => setOpen(false)}>
                    {t("footerBook")} <span>↗</span>
                </Link>
            </div>

            <div className="luxe-nav-tools">
                <DisplayControls />
                <button
                    className="luxe-nav-burger"
                    type="button"
                    aria-controls="luxe-nav-links"
                    aria-expanded={open}
                    aria-label={open ? t("menuClose") : t("menuOpen")}
                    onClick={() => setOpen(current => !current)}
                >
                    <span />
                    <span />
                </button>
            </div>
        </nav>
    );
}
