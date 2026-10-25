import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Mathilde from "../../assets/img/icons/mathilde.webp";
import { useDisplay } from "../../context/DisplayContext";
import { useDemo } from "../../context/DemoContext";
import DisplayControls from "../DisplayControls/DisplayControls";
import "./_navbar.scss";

export default function Navbar() {
    const { t } = useDisplay();
    const { authenticated } = useDemo();
    const { pathname } = useLocation();
    const [menu, setMenu] = useState(false);
    const nav = [
        ["/", t("navHome")], ["/menu", t("navMenu")], ["/reservations", t("navBookings")], ["/about", t("navAbout")],
        [authenticated ? "/admin/turnos" : "/login", authenticated ? t("navAdmin") : t("navLogin")],
    ];
    return <nav className="navbar mathilde-nav" aria-label="Main navigation" key={pathname}>
        <div className="navbarContent"><div className="navbarHeader">
            <Link to="/" className="navbarLogoLink" onClick={() => setMenu(false)} aria-label="Mathilde Resto"><img className="navbarLogo" src={Mathilde} alt="Mathilde Resto" /></Link>
            <div className="mathilde-nav-actions"><DisplayControls /><button className={`navbarToggle ${menu ? "navbarToggle--open" : ""}`} type="button" aria-expanded={menu} aria-controls="navbarMenu" aria-label={menu ? t("menuClose") : t("menuOpen")} onClick={() => setMenu(x => !x)}><span className="navbarToggleIcon" /></button></div>
        </div><div className={`navbarMenu ${menu ? "navbarMenu--open" : ""}`} id="navbarMenu">
            {nav.map(([path, label]) => <Link className="navbarLink" key={path} to={path} onClick={() => setMenu(false)}>{label}</Link>)}
            <div className="mathilde-nav-desktop-controls"><DisplayControls /></div>
        </div></div>
    </nav>;
}
