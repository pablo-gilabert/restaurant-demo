import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DEMO_ADMIN, useDemo } from "../../context/DemoContext";
import { useDisplay } from "../../context/DisplayContext";
import DisplayControls from "../../components/DisplayControls/DisplayControls";
import SEO from "../../components/SEO/SEO";
import styles from "./AdminLogin.module.css";

export default function AdminLogin() {
    const { authenticated, login } = useDemo();
    const { t } = useDisplay();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>(DEMO_ADMIN.email);
    const [password, setPassword] = useState<string>(DEMO_ADMIN.password);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);

    if (authenticated) return <Navigate to="/admin/turnos" replace />;

    const enter = (em: string, pass: string) => {
        if (login(em, pass)) navigate("/admin/turnos", { replace: true });
        else setError(true);
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        enter(email, password);
    };

    return (
        <div className={styles.page}>
            <SEO title={`${t("navLogin")} | Maison Aster`} description={t("loginSubtitle")} />

            <aside className={styles.story}>
                <div className={styles.logo}><Link to="/">✦ MAISON ASTER <span>DEMO</span></Link></div>
                <div className={styles.intro}>
                    <span className={styles.kicker}>{t("demoTag")}</span>
                    <h1>{t("loginStoryTitle")}<br /><em>{t("loginStoryAccent")}</em></h1>
                    <p>{t("loginStoryText")}</p>
                    <div className={styles.tiles}><span>◷ {t("dashboard")}</span><span>◈ {t("catalog")}</span><span>✧ {t("schedule")}</span></div>
                </div>
                <small>{t("security")}</small>
            </aside>

            <main className={styles.right}>
                <header className={styles.top}><Link to="/">← {t("back")}</Link><DisplayControls /></header>
                <section className={styles.formWrap}>
                    <span className={styles.lock}>♜</span>
                    <h2>{t("loginTitle")}</h2>
                    <p>{t("loginSubtitle")}</p>
                    <form className={styles.form} onSubmit={submit}>
                        <label>{t("email")}<input type="email" autoComplete="username" required value={email} onChange={event => { setEmail(event.target.value); setError(false); }} /></label>
                        <label>{t("password")}<div className={styles.password}><input type={show ? "text" : "password"} autoComplete="current-password" required value={password} onChange={event => { setPassword(event.target.value); setError(false); }} /><button type="button" aria-label={t(show ? "hidePassword" : "showPassword")} onClick={() => setShow(value => !value)}>{show ? "◉" : "◎"}</button></div></label>
                        {error && <p role="alert" className={styles.error}>{t("loginError")}</p>}
                        <button className={styles.submit} type="submit">{t("loginEnter")} ↗</button>
                    </form>
                    <div className={styles.account}><strong>{t("loginDemo")}</strong><code>{DEMO_ADMIN.email}</code><code>{DEMO_ADMIN.password}</code><button type="button" onClick={() => enter(DEMO_ADMIN.email, DEMO_ADMIN.password)}>{t("loginOneClick")} →</button></div>
                </section>
                <footer className={styles.legal}>{t("security")}</footer>
            </main>
        </div>
    );
}
