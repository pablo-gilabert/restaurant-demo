import { useState } from "react";
import Swal from "sweetalert2";
import SEO from "../../components/SEO/SEO";
import AdminShell from "../../components/AdminShell/AdminShell";
import { useDisplay } from "../../context/DisplayContext";
import { useDemo } from "../../context/DemoContext";
import { categories } from "../../data/categories";
import { money, type Meal } from "../../data/DemoTypes";
import { area, confirm, dialog, field, select, success, valueOf } from "../../lib/Dialogs";
import styles from "../../styles/AdminShared.module.css";
export default function AdminCatalog() {
    const { language, t } = useDisplay();
    const { database, upsertMeal, deleteMeal } = useDemo();
    const [search, setSearch] = useState("");
    const items = database.meals.filter(m => `${m.name.es} ${m.name.en} ${m.category}`.toLowerCase().includes(search.toLowerCase())).sort((a,b) => a.name[language].localeCompare(b.name[language]));
    const edit = async (meal?: Meal) => {
        const response = await dialog(language).fire({
            title: t(meal ? "editMeal" : "addMeal"),
            html: `<div class="mathilde-fields">${select("category",t("category"),categories.map(c => ({value:c,text:c})),meal?.category || categories[0])}${field("nameEs",t("nameEs"),meal?.name.es || "","text","required maxlength=100")}${field("nameEn",t("nameEn"),meal?.name.en || "","text","required maxlength=100")}${area("descEs",t("descEs"),meal?.description.es || "")}${area("descEn",t("descEn"),meal?.description.en || "")}${field("price",t("price"),String(meal?.price ?? 0),"number","required min=0 step=1")}${select("available",t("active"),[{value:"true",text:t("yes")},{value:"false",text:t("no")}],String(meal?.available ?? true))}</div>`,
            preConfirm: () => {
                const price = Number(valueOf("price"));
                if (!valueOf("nameEs") || !valueOf("nameEn") || !Number.isFinite(price) || price < 0 || !Number.isInteger(price)) { Swal.showValidationMessage(t("invalid")); return false; }
                return { id: meal?.id || crypto.randomUUID(), category: valueOf("category") as Meal["category"], name: { es: valueOf("nameEs"), en: valueOf("nameEn") }, description: { es: valueOf("descEs"), en: valueOf("descEn") }, price, available: valueOf("available") === "true" } as Meal;
            }
        });
        if (response.isConfirmed && response.value) { upsertMeal(response.value as Meal); await success(language); }
    };
    const toggle = async (meal: Meal) => { if (await confirm(language, t(meal.available ? "hide" : "show") + " " + meal.name[language] + "?")) { upsertMeal({ ...meal, available: !meal.available }); await success(language); } };
    const remove = async (meal: Meal) => { if (await confirm(language, `${t("confirmDelete")} ${meal.name[language]}`)) { deleteMeal(meal.id); await success(language); } };
    return <><SEO title={`${t("catalog")} | Maison Aster`} description={t("catalogHint")} /><AdminShell><div className={styles.heading}><div><span className={styles.kicker}>{t("demoTag")}</span><h1>{t("catalog")}</h1><p>{t("catalogHint")}</p></div><button className={styles.primary} onClick={() => edit()}>{t("addMeal")} +</button></div><div className={styles.toolbar}><label>{t("search")}<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder={t("search")} /></label></div><div className={styles.cards}>{items.map(meal => <article className={styles.card} key={meal.id}><div><span className={styles.kicker}>{meal.category} · {t(meal.available ? "active" : "inactive")}</span><h2>{meal.name[language]}</h2><p>{meal.description[language]}</p><strong>{money(meal.price,language)}</strong></div><div className={styles.actions}><button onClick={() => edit(meal)}>{t("edit")}</button><button onClick={() => toggle(meal)}>{t(meal.available ? "hide" : "show")}</button><button className={styles.danger} onClick={() => remove(meal)}>{t("delete")}</button></div></article>)}</div>{!items.length && <p className={styles.empty}>{t("noMeals")}</p>}</AdminShell></>;
}
