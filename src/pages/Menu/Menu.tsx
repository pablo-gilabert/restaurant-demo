import { useRef, useState, type PointerEvent } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SEO from "../../components/SEO/SEO";
import { categories, type Category } from "../../data/categories";
import { money } from "../../data/DemoTypes";
import { useDemo } from "../../context/DemoContext";
import { useDisplay } from "../../context/DisplayContext";


export default function Menu() {
    const { language, t } = useDisplay();
    const { database } = useDemo();
    const [category, setCategory] = useState<Category | null>("Elaborados");
    const [dragging, setDragging] = useState(false);
    const listRef = useRef<HTMLElement>(null);
    const drag = useRef({ pointer: -1, x: 0, scroll: 0, moved: false });
    const suppress = useRef(false);
    const onDown = (e: PointerEvent<HTMLElement>) => { if (e.pointerType === "mouse" && e.button !== 0) return; const list = listRef.current; if (!list) return; drag.current = { pointer: e.pointerId, x: e.clientX, scroll: list.scrollLeft, moved: false }; suppress.current = false; };
    const onMove = (e: PointerEvent<HTMLElement>) => { const list = listRef.current; if (!list || drag.current.pointer !== e.pointerId) return; const distance = e.clientX - drag.current.x; if (!drag.current.moved && Math.abs(distance) < 6) return; if (!drag.current.moved) { drag.current.moved = true; list.setPointerCapture(e.pointerId); setDragging(true); } e.preventDefault(); list.scrollLeft = drag.current.scroll - distance; };
    const onUp = (e: PointerEvent<HTMLElement>) => { const list = listRef.current; if (drag.current.pointer !== e.pointerId) return; suppress.current = drag.current.moved; if (list?.hasPointerCapture(e.pointerId)) list.releasePointerCapture(e.pointerId); drag.current.pointer = -1; setDragging(false); };
    const selectCategory = (c: Category) => { if (suppress.current) { suppress.current = false; return; } setCategory(c); };
    const categoryName = (c: Category): string => {
        const mapping: Record<Category, Parameters<typeof t>[0]> = {
            "Cafetería":"category_Cafetería", "Cosas Dulces":"category_CosasDulces", "Tortas":"category_Tortas", "Desayunos":"category_Desayunos", "Brunch":"category_Brunch", "Sandwiches":"category_Sandwiches", "Entradas":"category_Entradas", "Papas":"category_Papas", "Ensaladas":"category_Ensaladas", "Pizzas":"category_Pizzas", "Milanesas":"category_Milanesas", "Grill":"category_Grill", "Elaborados":"category_Elaborados", "Pastas":"category_Pastas", "Postres":"category_Postres", "Bebidas":"category_Bebidas", "Cervezas":"category_Cervezas", "Cervezas Artesanales":"category_CervezasArtesanales", "Vinos Tintos Malbec":"category_VinosTintosMalbec", "Vinos Rosados":"category_VinosRosados", "Vinos Blancos":"category_VinosBlancos", "Sidras y Champagne":"category_SidrasChampagne", "Drinks":"category_Drinks"
        };
        return t(mapping[c]);
    };
    const displayed = category ? database.meals.filter(m => m.available && m.category === category) : [];
    return <><SEO title={`${t("navMenu")} | Maison Aster`} description={t("menuTitle")} /><Navbar />
        <main className="menu luxe-menu"><header className="luxe-inner-hero luxe-menu-head"><span className="luxe-eyebrow">01 / {language === "es" ? "LA CARTA" : "OUR MENU"}</span><h1>{language === "es" ? <>Cocina con <em>carácter.</em></> : <>Cuisine with <em>character.</em></>}</h1><p>{language === "es" ? "Una selección de sabores, texturas y momentos para descubrir a tu propio ritmo." : "An exploration of flavors, textures, and moments at your own pace."}</p></header><div className="luxe-menu-body"><div className="luxe-menu-categories-heading">{language === "es" ? "EXPLORÁ POR CATEGORÍA" : "EXPLORE BY CATEGORY"}</div><nav ref={listRef} className={`menuCategories ${dragging ? "menuCategories--dragging" : ""}`} aria-label={t("menuTitle")} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}><div className="menuCategoryList">{categories.map(c => <button type="button" className={`menuCategory ${c === category ? "menuCategory--active" : ""}`} key={c} onClick={() => selectCategory(c)} aria-pressed={c === category}>{categoryName(c)}</button>)}</div></nav>
        <section className="menuContent" id="menuMeals"><div className="luxe-menu-heading"><span className="luxe-eyebrow">MAISON ASTER / MENU</span><h2 className="menuTitle">{category ? categoryName(category) : t("menuTitle")}</h2></div>{category && displayed.length === 0 && <p className="menuMessage">{t("emptyCategory")}</p>}{category && <div className="meals">{displayed.map(m => <article className="meal" key={m.id}><h2 className="mealName">{m.name[language]}</h2>{m.description[language] && <p className="mealDescription">{m.description[language]}</p>}{m.price > 0 && <span className="mealPrice">{money(m.price, language)}</span>}<div className="mealDivider" aria-hidden="true" /></article>)}</div>}</section>
        {!category && <p className="menuPrompt">{t("menuPrompt")}</p>}<p className="mathilde-disclaimer">{t("demoNotice")}</p></div></main><Footer /></>;
}
