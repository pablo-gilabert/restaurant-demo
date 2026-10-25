import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import SEO from "../../components/SEO/SEO";
import AdminShell from "../../components/AdminShell/AdminShell";
import { useDisplay } from "../../context/DisplayContext";
import { useDemo } from "../../context/DemoContext";
import { categories, type Category } from "../../data/categories";
import { money, type Meal } from "../../data/DemoTypes";
import type { UiKey } from "../../i18n/Translations";
import { area, confirm, dialog, field, select, success, valueOf } from "../../lib/Dialogs";
import styles from "../../styles/AdminShared.module.css";
import catalogStyles from "./AdminCatalog.module.css";

type AlphabeticalOrder = "asc" | "desc";
type PriceOrder = "none" | "asc" | "desc";

const categoryKeys: Record<Category, UiKey> = {
    "Cafetería": "category_Cafetería",
    "Cosas Dulces": "category_CosasDulces",
    "Tortas": "category_Tortas",
    "Desayunos": "category_Desayunos",
    "Brunch": "category_Brunch",
    "Sandwiches": "category_Sandwiches",
    "Entradas": "category_Entradas",
    "Papas": "category_Papas",
    "Ensaladas": "category_Ensaladas",
    "Pizzas": "category_Pizzas",
    "Milanesas": "category_Milanesas",
    "Grill": "category_Grill",
    "Elaborados": "category_Elaborados",
    "Pastas": "category_Pastas",
    "Postres": "category_Postres",
    "Bebidas": "category_Bebidas",
    "Cervezas": "category_Cervezas",
    "Cervezas Artesanales": "category_CervezasArtesanales",
    "Vinos Tintos Malbec": "category_VinosTintosMalbec",
    "Vinos Rosados": "category_VinosRosados",
    "Vinos Blancos": "category_VinosBlancos",
    "Sidras y Champagne": "category_SidrasChampagne",
    "Drinks": "category_Drinks",
};

export default function AdminCatalog() {
    const { language, t } = useDisplay();
    const { database, upsertMeal, deleteMeal } = useDemo();
    const [search, setSearch] = useState("");
    const [alphabeticalOrder, setAlphabeticalOrder] = useState<AlphabeticalOrder>("asc");
    const [priceOrder, setPriceOrder] = useState<PriceOrder>("none");
    const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");

    // Search and category filtering are always applied together. When a price
    // order is selected, it is the primary sort and alphabetical order breaks ties.
    const items = useMemo(() => {
        const collator = new Intl.Collator(language === "es" ? "es-AR" : "en", {
            sensitivity: "base",
            numeric: true,
        });

        return database.meals
            .filter(meal => {
                const matchesSearch = `${meal.name.es} ${meal.name.en} ${meal.category}`
                    .toLowerCase()
                    .includes(search.toLowerCase());
                const matchesCategory = categoryFilter === "all" || meal.category === categoryFilter;
                return matchesSearch && matchesCategory;
            })
            .sort((first, second) => {
                if (priceOrder !== "none") {
                    const difference = first.price - second.price;
                    if (difference !== 0) return priceOrder === "asc" ? difference : -difference;
                }

                const alphabetical = collator.compare(first.name[language], second.name[language]);
                return alphabeticalOrder === "asc" ? alphabetical : -alphabetical;
            });
    }, [database.meals, language, search, alphabeticalOrder, priceOrder, categoryFilter]);

    const edit = async (meal?: Meal) => {
        const response = await dialog(language).fire({
            title: t(meal ? "editMeal" : "addMeal"),
            html: `<div class="mathilde-fields">${select("category", t("category"), categories.map(category => ({ value: category, text: category })), meal?.category || categories[0])}${field("nameEs", t("nameEs"), meal?.name.es || "", "text", "required maxlength=100")}${field("nameEn", t("nameEn"), meal?.name.en || "", "text", "required maxlength=100")}${area("descEs", t("descEs"), meal?.description.es || "")}${area("descEn", t("descEn"), meal?.description.en || "")}${field("price", t("price"), String(meal?.price ?? 0), "number", "required min=0 step=1")}<p class="mathilde-price-note">${t("priceZeroHint")}</p>${select("available", t("active"), [{ value: "true", text: t("yes") }, { value: "false", text: t("no") }], String(meal?.available ?? true))}</div>`,
            preConfirm: () => {
                const price = Number(valueOf("price"));
                if (!valueOf("nameEs") || !valueOf("nameEn") || !Number.isFinite(price) || price < 0 || !Number.isInteger(price)) {
                    Swal.showValidationMessage(t("invalid"));
                    return false;
                }

                return {
                    id: meal?.id || crypto.randomUUID(),
                    category: valueOf("category") as Meal["category"],
                    name: { es: valueOf("nameEs"), en: valueOf("nameEn") },
                    description: { es: valueOf("descEs"), en: valueOf("descEn") },
                    price,
                    available: valueOf("available") === "true",
                } as Meal;
            },
        });

        if (response.isConfirmed && response.value) {
            upsertMeal(response.value as Meal);
            await success(language);
        }
    };

    const toggle = async (meal: Meal) => {
        if (await confirm(language, t(meal.available ? "hide" : "show") + " " + meal.name[language] + "?")) {
            upsertMeal({ ...meal, available: !meal.available });
            await success(language);
        }
    };

    const remove = async (meal: Meal) => {
        if (await confirm(language, `${t("confirmDelete")} ${meal.name[language]}`)) {
            deleteMeal(meal.id);
            await success(language);
        }
    };

    return (
        <>
            <SEO title={`${t("catalog")} | Maison Aster`} description={t("catalogHint")} />
            <AdminShell>
                <div className={styles.heading}>
                    <div>
                        <span className={styles.kicker}>{t("demoTag")}</span>
                        <h1>{t("catalog")}</h1>
                        <p>{t("catalogHint")}</p>
                    </div>
                    <button className={styles.primary} onClick={() => edit()}>{t("addMeal")} +</button>
                </div>

                <div className={`${styles.toolbar} ${catalogStyles.filtersToolbar}`}>
                    <label>
                        {t("search")}
                        <input
                            type="search"
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                            placeholder={t("search")}
                        />
                    </label>

                    <label>
                        {t("alphabeticalOrder")}
                        <select
                            value={alphabeticalOrder}
                            onChange={event => setAlphabeticalOrder(event.target.value as AlphabeticalOrder)}
                        >
                            <option value="asc">{t("alphabeticalAsc")}</option>
                            <option value="desc">{t("alphabeticalDesc")}</option>
                        </select>
                    </label>

                    <label>
                        {t("priceOrder")}
                        <select
                            value={priceOrder}
                            onChange={event => setPriceOrder(event.target.value as PriceOrder)}
                            title={t("priceOrderHint")}
                        >
                            <option value="none">{t("priceUnsorted")}</option>
                            <option value="asc">{t("priceAscending")}</option>
                            <option value="desc">{t("priceDescending")}</option>
                        </select>
                    </label>

                    <label>
                        {t("categoryFilter")}
                        <select
                            value={categoryFilter}
                            onChange={event => setCategoryFilter(event.target.value as Category | "all")}
                        >
                            <option value="all">{t("allCategories")}</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{t(categoryKeys[category])}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className={styles.cards}>
                    {items.map(meal => (
                        <article className={styles.card} key={meal.id}>
                            <div>
                                <span className={styles.kicker}>{meal.category} · {t(meal.available ? "active" : "inactive")}</span>
                                <h2>{meal.name[language]}</h2>
                                <p>{meal.description[language]}</p>
                                <strong>{money(meal.price, language)}</strong>
                            </div>
                            <div className={styles.actions}>
                                <button onClick={() => edit(meal)}>{t("edit")}</button>
                                <button onClick={() => toggle(meal)}>{t(meal.available ? "hide" : "show")}</button>
                                <button className={styles.danger} onClick={() => remove(meal)}>{t("delete")}</button>
                            </div>
                        </article>
                    ))}
                </div>
                {!items.length && <p className={styles.empty}>{t("noMeals")}</p>}
            </AdminShell>
        </>
    );
}
