import Swal from "sweetalert2";
import SEO from "../../components/SEO/SEO";
import AdminShell from "../../components/AdminShell/AdminShell";
import { useDisplay } from "../../context/DisplayContext";
import { useDemo } from "../../context/DemoContext";
import type { Hours } from "../../data/DemoTypes";
import { dialog, field, select, success, valueOf } from "../../lib/Dialogs";
import { toMinutes } from "../../lib/Reservations";
import styles from "../../styles/AdminShared.module.css";
export default function AdminHours() {
    const { language, t } = useDisplay();
    const { database, updateHours } = useDemo();
    const edit = async (day: number) => {
        const hours = database.hours[day];
        const response = await dialog(language).fire({
            title: t(`week${day}` as Parameters<typeof t>[0]),
            html: `<div class="mathilde-fields">${select("open",t("enable"),[{value:"true",text:t("yes")},{value:"false",text:t("no")}],String(hours.open))}${field("from",t("open"),hours.from,"time","required step=1800")}${field("to",t("close"),hours.to,"time","required step=1800")}${field("tables",t("tables"),String(hours.tables),"number","required min=1 max=40")}</div>`,
            preConfirm: () => {
                const next: Hours = { open: valueOf("open") === "true", from: valueOf("from"), to: valueOf("to"), tables: Number(valueOf("tables")) };
                if (!Number.isInteger(next.tables) || next.tables < 1 || next.tables > 40 || !Number.isFinite(toMinutes(next.from)) || !Number.isFinite(toMinutes(next.to)) || toMinutes(next.from) >= toMinutes(next.to) || toMinutes(next.from) % 30 !== 0 || toMinutes(next.to) % 30 !== 0) { Swal.showValidationMessage(t("invalid")); return false; }
                return next;
            }
        });
        if (response.isConfirmed && response.value) { updateHours(day, response.value as Hours); await success(language); }
    };
    return <><SEO title={`${t("schedule")} | Maison Aster`} description={t("hoursHint")} /><AdminShell><div className={styles.heading}><div><span className={styles.kicker}>{t("demoTag")}</span><h1>{t("schedule")}</h1><p>{t("hoursHint")}</p></div></div><div className={styles.cards}>{Array.from({length:7},(_,day) => { const h=database.hours[day]; return <article className={styles.card} key={day}><div><h2>{t(`week${day}` as Parameters<typeof t>[0])}</h2><p>{h.open ? `${h.from} – ${h.to}` : t("closed")}</p><p>{t("tables")}: {h.tables}</p></div><button onClick={() => edit(day)} className={styles.primary}>{t("edit")}</button></article>; })}</div></AdminShell></>;
}
