import Swal from "sweetalert2";
import type { Language } from "../data/DemoTypes";
import { translate } from "../i18n/Translations";

export const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, x => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[x] ?? x);
export const field = (id: string, label: string, value = "", type = "text", extra = "") => `<label class="mathilde-field"><span>${escapeHtml(label)}</span><input data-id="${id}" type="${type}" value="${escapeHtml(value)}" ${extra}></label>`;
export const area = (id: string, label: string, value = "") => `<label class="mathilde-field"><span>${escapeHtml(label)}</span><textarea data-id="${id}">${escapeHtml(value)}</textarea></label>`;
export const select = (id: string, label: string, options: { value: string; text: string }[], current: string) => `<label class="mathilde-field"><span>${escapeHtml(label)}</span><select data-id="${id}">${options.map(x => `<option value="${escapeHtml(x.value)}" ${x.value === current ? "selected" : ""}>${escapeHtml(x.text)}</option>`).join("")}</select></label>`;
export const valueOf = (id: string): string => (Swal.getPopup()?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[data-id="${id}"]`)?.value ?? "").trim();
export const dialog = (language: Language) => Swal.mixin({
    customClass: { popup: "mathilde-dialog", confirmButton: "mathilde-confirm", cancelButton: "mathilde-cancel" },
    buttonsStyling: false, showCancelButton: true, reverseButtons: true,
    confirmButtonText: translate(language, "save"), cancelButtonText: translate(language, "cancel"),
    width: "min(94vw, 580px)",
});
export async function confirm(language: Language, question: string): Promise<boolean> {
    return (await dialog(language).fire({ title: question, icon: "warning", confirmButtonText: translate(language, "yes") })).isConfirmed;
}
export async function success(language: Language, message = translate(language, "saveSuccess")): Promise<void> {
    await dialog(language).fire({ title: message, icon: "success", showCancelButton: false, showConfirmButton: false, timer: 1300 });
}
