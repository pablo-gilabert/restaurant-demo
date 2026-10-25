import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import SEO from "../../components/SEO/SEO";
import AdminShell from "../../components/AdminShell/AdminShell";
import { useDemo } from "../../context/DemoContext";
import { useDisplay } from "../../context/DisplayContext";
import type { Booking, BookingInput } from "../../data/DemoTypes";
import { freeTablesForBooking, timesForDate, todayLocal, isAvailable } from "../../lib/Reservations";
import { area, confirm, dialog, escapeHtml, field, select, success, valueOf } from "../../lib/Dialogs";
import styles from "../../styles/AdminShared.module.css";

export default function AdminDashboard() {
    const { language, t } = useDisplay();
    const { database, book, editBooking, patchBooking, deleteBooking } = useDemo();
    const [date, setDate] = useState(todayLocal());
    const [filter, setFilter] = useState<"all" | "confirmed" | "cancelled">("all");
    const records = useMemo(() => database.bookings.filter(b => b.date === date && (filter === "all" || b.status === filter)).sort((a,b) => a.time.localeCompare(b.time)), [database.bookings,date,filter]);
    const all = database.bookings.filter(b => b.date === date);
    const slots = timesForDate(database, date);

    const editModal = async (existing?: Booking, slot?: string) => {
        const defaults: BookingInput = existing ?? { date, time: slot || "", name: "", phone: "", email: "", guests: 2, note: "" };
        const result = await dialog(language).fire({
            title: t(existing ? "editBooking" : "addBooking"),
            html: `<div class="mathilde-fields">${field("date",t("date"),defaults.date,"date","required")}${field("time",t("time"),defaults.time,"time","required step=1800")}${field("name",t("name"),defaults.name,"text","required maxlength=100")}${field("phone",t("phone"),defaults.phone,"tel","required maxlength=40")}${field("guests",t("guests"),String(defaults.guests),"number","required min=1 max=12")}${field("email",t("email"),defaults.email,"email")}${area("note",t("notes"),defaults.note)}${select("deposit",t("deposit"),[{value:"false",text:t("pending")},{value:"true",text:t("received")}],String(existing?.depositPaid ?? false))}</div>`,
            preConfirm: () => {
                const input: BookingInput = { date: valueOf("date"), time: valueOf("time"), name: valueOf("name"), phone: valueOf("phone"), guests: Number(valueOf("guests")), email: valueOf("email"), note: valueOf("note") };
                if (!input.name || !input.phone || !input.date || !input.time || !Number.isInteger(input.guests) || input.guests < 1 || input.guests > 12) { Swal.showValidationMessage(t("invalid")); return false; }
                if (input.email && !/^\S+@\S+\.\S+$/.test(input.email)) { Swal.showValidationMessage(t("invalid")); return false; }
                const sameSlot = Boolean(existing && existing.date === input.date && existing.time === input.time);
                const free = sameSlot || isAvailable(database, input, existing?.id || "");
                if (!free) { Swal.showValidationMessage(t("unavailable")); return false; }
                return { input, paid: valueOf("deposit") === "true" };
            },
        });
        if (!result.isConfirmed || !result.value) return;
        const payload = result.value as { input: BookingInput; paid: boolean };
        const problem = existing ? editBooking(existing.id, payload.input, payload.paid) : book(payload.input, payload.paid);
        if (problem) await dialog(language).fire({ title: t(problem === "unavailable" ? "unavailable" : "invalid"), icon: "error", showCancelButton: false });
        else await success(language);
    };
    const toggleDeposit = async (b: Booking) => { if (await confirm(language, `${t("deposit")}: ${b.depositPaid ? t("pending") : t("received")}?`)) { patchBooking(b.id, { depositPaid: !b.depositPaid }); await success(language); } };
    const toggleStatus = async (b: Booking) => { if (b.status === "cancelled" && !isAvailable(database, b, b.id)) { await dialog(language).fire({ title: t("unavailable"), icon: "error", showCancelButton: false }); return; } if (await confirm(language, b.status === "cancelled" ? t("booked") + "?" : t("cancelled") + "?")) { patchBooking(b.id, { status: b.status === "cancelled" ? "confirmed" : "cancelled" }); await success(language); } };
    const remove = async (b: Booking) => { if (await confirm(language, t("confirmDelete"))) { deleteBooking(b.id); await success(language); } };
    const details = async (b: Booking) => {
        const response = await dialog(language).fire({
            title: `${escapeHtml(b.name)} · ${escapeHtml(b.time)}`,
            html: `<div class="mathilde-detail"><p><strong>${escapeHtml(t("phone"))}:</strong> ${escapeHtml(b.phone)}</p><p><strong>${escapeHtml(t("guests"))}:</strong> ${b.guests}</p><p><strong>${escapeHtml(t("email"))}:</strong> ${escapeHtml(b.email || "—")}</p><p><strong>${escapeHtml(t("deposit"))}:</strong> ${escapeHtml(t(b.depositPaid ? "received" : "pending"))}</p><p><strong>${escapeHtml(t("notes"))}:</strong> ${escapeHtml(b.note || "—")}</p></div>`,
            showDenyButton: true, denyButtonText: t("edit"), confirmButtonText: t("cancel"), showCancelButton: false,
        });
        if (response.isDenied) await editModal(b);
    };
    return <><SEO title={`${t("dashboard")} | Maison Aster`} description={t("dashboardHint")} /><AdminShell>
        <div className={styles.heading}><div><span className={styles.kicker}>{t("demoTag")}</span><h1>{t("dashboard")}</h1><p>{t("dashboardHint")}</p></div><button className={styles.primary} onClick={() => editModal()}>{t("addBooking")} +</button></div>
        <div className={styles.toolbar}><label>{t("date")}<input type="date" value={date} onChange={e => setDate(e.target.value)} /></label><label>{t("overview")}<select value={filter} onChange={e => setFilter(e.target.value as typeof filter)}><option value="all">{t("total")}</option><option value="confirmed">{t("booked")}</option><option value="cancelled">{t("cancelled")}</option></select></label></div>
        <div className={styles.stats}><div><strong>{all.filter(b => b.status === "confirmed").length}</strong><span>{t("booked")}</span></div><div><strong>{all.filter(b => b.status === "confirmed" && b.depositPaid).length}</strong><span>{t("withDeposit")}</span></div><div><strong>{all.filter(b => b.status === "confirmed" && !b.depositPaid).length}</strong><span>{t("withoutDeposit")}</span></div><div><strong>{all.filter(b => b.status === "cancelled").length}</strong><span>{t("cancelled")}</span></div></div>
        <h2 className={styles.subheading}>{t("time")} · {t("freeTables")}</h2><div className={styles.slots}>{slots.map(time => {  const capacity = database.hours[new Date(date + "T12:00:00").getDay()]?.tables ?? 0; const free = freeTablesForBooking(database, date, time); return <button key={time} type="button" className={free ? styles.slot : styles.full} onClick={() => editModal(undefined,time)} disabled={!free || !isAvailable(database,{date,time})}>{time}<small>{free}/{capacity} {t("freeTables")}</small></button>; })}</div>
        <h2 className={styles.subheading}>{t("overview")}</h2>{records.length === 0 ? <p className={styles.empty}>{t("empty")}</p> : <div className={styles.cards}>{records.map(b => <article className={styles.card} key={b.id}><div><span className={styles.kicker}>{b.date} · {b.time}</span><h3>{b.name}</h3><p>{b.phone} · {b.guests} {t("guests")}</p><p>{t(b.status === "cancelled" ? "cancelled" : "booked")} · {t(b.depositPaid ? "received" : "pending")}</p></div><div className={styles.actions}><button onClick={() => details(b)}>{t("view")}</button><button onClick={() => editModal(b)}>{t("edit")}</button><button onClick={() => toggleDeposit(b)}>{t("deposit")}</button><button onClick={() => toggleStatus(b)}>{t(b.status === "cancelled" ? "booked" : "cancelled")}</button><button className={styles.danger} onClick={() => remove(b)}>{t("delete")}</button></div></article>)}</div>}
    </AdminShell></>;
}
