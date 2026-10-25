import type { Booking, BookingInput, Database } from "../data/DemoTypes";

export const BOOKING_MINUTES = 90;
export const SLOT_MINUTES = 30;
export const todayLocal = (): string => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export const toMinutes = (time: string): number => {
    const match = /^(\d{2}):(\d{2})$/.exec(time);
    return match ? Number(match[1]) * 60 + Number(match[2]) : Number.NaN;
};
export const toClock = (minutes: number): string => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
export const weekday = (date: string): number => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!match) return -1;
    const d = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return d.getFullYear() === Number(match[1]) && d.getMonth() === Number(match[2]) - 1 && d.getDate() === Number(match[3]) ? d.getDay() : -1;
};

// One reservation takes one table for 90 minutes. Any overlapping 30-minute interval must remain below table capacity.
export function occupiedTables(data: Database, date: string, time: string, skipId = ""): number {
    const from = toMinutes(time);
    return data.bookings.filter(b => b.id !== skipId && b.status === "confirmed" && b.date === date && toMinutes(b.time) < from + SLOT_MINUTES && from < toMinutes(b.time) + BOOKING_MINUTES).length;
}
export function freeTablesForBooking(data: Database, date: string, time: string, skipId = ""): number {
    const hours = data.hours[weekday(date)];
    if (!hours?.open) return 0;
    const from = toMinutes(time);
    if (!Number.isFinite(from)) return 0;
    let remaining = hours.tables;
    for (let minute = from; minute < from + BOOKING_MINUTES; minute += SLOT_MINUTES) {
        remaining = Math.min(remaining, hours.tables - occupiedTables(data, date, toClock(minute), skipId));
    }
    return Math.max(0, remaining);
}
export function isAvailable(data: Database, request: Pick<BookingInput, "date" | "time">, skipId = "", allowPast = false): boolean {
    const day = weekday(request.date);
    const hours = data.hours[day];
    const start = toMinutes(request.time);
    if (!hours?.open || !Number.isFinite(start) || start % SLOT_MINUTES !== 0) return false;
    if (start < toMinutes(hours.from) || start + BOOKING_MINUTES > toMinutes(hours.to)) return false;
    if (!allowPast && `${request.date}T${request.time}` <= `${todayLocal()}T${toClock(new Date().getHours() * 60 + new Date().getMinutes())}`) return false;
    return freeTablesForBooking(data, request.date, request.time, skipId) > 0;
}
export function timesForDate(data: Database, date: string): string[] {
    const hours = data.hours[weekday(date)];
    if (!hours?.open) return [];
    const from = toMinutes(hours.from), until = toMinutes(hours.to);
    if (!Number.isFinite(from) || !Number.isFinite(until)) return [];
    const times: string[] = [];
    for (let t = from; t + BOOKING_MINUTES <= until; t += SLOT_MINUTES) times.push(toClock(t));
    return times;
}
export function bookingProblem(data: Database, request: BookingInput, skipId = "", allowPast = false): string | null {
    if (!request.name.trim() || !request.phone.trim() || !Number.isInteger(request.guests) || request.guests < 1 || request.guests > 12) return "invalid";
    return isAvailable(data, request, skipId, allowPast) ? null : "unavailable";
}
export function makeBooking(request: BookingInput, depositPaid = false): Booking {
    return { ...request, id: crypto.randomUUID(), status: "confirmed", depositPaid, createdAt: new Date().toISOString() };
}
