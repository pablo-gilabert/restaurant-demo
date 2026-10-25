import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO/SEO";
import { useDisplay } from "../../context/DisplayContext";
import { useDemo } from "../../context/DemoContext";
import type { BookingInput } from "../../data/DemoTypes";
import { freeTablesForBooking, timesForDate, todayLocal, isAvailable } from "../../lib/Reservations";
import { success } from "../../lib/Dialogs";
import "./_reservations.scss";

const WHATSAPP = "https://wa.me/5491121908068?text=%C2%A1Hola%21%20Quisiera%20hacer%20una%20reserva.";
export default function Reservations() {
    const { t, language } = useDisplay();
    const { database, book } = useDemo();
    const [form, setForm] = useState<BookingInput>({ date: todayLocal(), time: "", name: "", phone: "", email: "", guests: 2, note: "" });
    const [message, setMessage] = useState("");
    const slots = timesForDate(database, form.date).filter(time => isAvailable(database, { date: form.date, time }));
    const update = (key: keyof BookingInput, value: string | number) => setForm(prev => ({ ...prev, [key]: value, ...(key === "date" ? { time: "" } : {}) }));
    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const error = book(form);
        if (error) { setMessage(t(error === "unavailable" ? "unavailable" : "invalid")); return; }
        setMessage("");
        await success(language, t("bookingSuccess"));
        setForm(prev => ({ ...prev, name: "", phone: "", email: "", note: "", time: "" }));
    };
    return <><SEO title={`${t("navBookings")} | Mathilde Resto`} description={t("bookSubtitle")} /><Navbar />
        <main className="mathilde-booking"><div className="mathilde-booking-intro"><h1>{t("bookTitle")}</h1><p>{t("bookSubtitle")}</p><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mathilde-link-button">{t("whatsapp")} ↗</a></div>
        <form onSubmit={submit} className="mathilde-booking-form"><div className="mathilde-form-grid">
            <label>{t("date")}<input type="date" required min={todayLocal()} value={form.date} onChange={e => update("date", e.target.value)} /></label>
            <label>{t("time")}<select required value={form.time} onChange={e => update("time", e.target.value)}><option value="">{t("chooseTime")}</option>{slots.map(time => <option key={time} value={time}>{time} · {t("freeTables")}: {Math.max(0, freeTablesForBooking(database, form.date, time))}</option>)}</select></label>
            <label>{t("name")}<input required maxLength={100} value={form.name} onChange={e => update("name", e.target.value)} /></label>
            <label>{t("phone")}<input type="tel" required maxLength={40} value={form.phone} onChange={e => update("phone", e.target.value)} /></label>
            <label>{t("guests")}<input type="number" min="1" max="12" required value={form.guests} onChange={e => update("guests", Number(e.target.value))} /></label>
            <label>{t("email")}<input type="email" value={form.email} onChange={e => update("email", e.target.value)} /></label>
        </div><label>{t("notes")}<textarea value={form.note} onChange={e => update("note", e.target.value)} maxLength={500} /></label>
        {!slots.length && <p>{t("noTimes")}</p>}{message && <p role="alert" className="mathilde-error">{message}</p>}<button type="submit" className="mathilde-primary">{t("confirmBooking")}</button><p className="mathilde-disclaimer">{t("bookDisclaimer")}</p></form>
        </main><Footer /></>;
}
