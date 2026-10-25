import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import DisplayControls from "../DisplayControls/DisplayControls";
import { useDemo } from "../../context/DemoContext";
import { useDisplay } from "../../context/DisplayContext";
import { confirm, success } from "../../lib/Dialogs";
import styles from "./AdminShell.module.css";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const { logout, reset } = useDemo();
    const { t, language } = useDisplay();
    const navigate = useNavigate();
    const resetData = async () => { if (await confirm(language, t("confirmReset"))) { reset(); await success(language); } };
    return <><Navbar /><div className={styles.wrap}><aside className={styles.sidebar} aria-label={t("manage")}><strong>{t("manage")}</strong>
        <NavLink to="/admin/turnos" className={({ isActive }) => isActive ? styles.current : styles.link}>{t("dashboard")}</NavLink>
        <NavLink to="/admin/carta" className={({ isActive }) => isActive ? styles.current : styles.link}>{t("catalog")}</NavLink>
        <NavLink to="/admin/horarios" className={({ isActive }) => isActive ? styles.current : styles.link}>{t("schedule")}</NavLink>
        <div className={styles.controls}><DisplayControls /><button type="button" onClick={resetData}>{t("reset")}</button><button type="button" onClick={() => { logout(); navigate("/login", { replace: true }); }}>{t("logout")}</button><Link to="/">{t("back")}</Link></div>
        </aside><main id="main-content" className={styles.main}>{children}<p className={styles.notice}>{t("demoNotice")}</p></main></div></>;
}
