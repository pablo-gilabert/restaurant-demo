import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO/SEO";
import { useDisplay } from "../../context/DisplayContext";

export default function About() {
    const { language, t } = useDisplay();
    const es = language === "es";

    return (
        <>
            <SEO title={`${t("navAbout")} | Maison Aster`} description={t("aboutTitle")} />
            <Navbar />

            <main className="luxe-about">
                <header className="luxe-page-head luxe-container">
                    <span className="luxe-eyebrow">MAISON ASTER / 2026 — {es ? "HOY" : "TODAY"}</span>
                    <h1>{es ? <>Más que un lugar, <em>una forma de sentir.</em></> : <>More than a place, <em>a way to feel.</em></>}</h1>
                    <p>
                        {es
                            ? "Creemos en la hospitalidad que transforma un encuentro sencillo en un recuerdo extraordinario."
                            : "We believe in hospitality that can transform an ordinary gathering into an extraordinary memory."}
                    </p>
                </header>

                <div className="luxe-about-image" role="img" aria-label={es ? "Ambiente elegante de restaurante" : "Elegant restaurant atmosphere"} />

                <section className="luxe-about-story luxe-container">
                    <div>
                        <span className="luxe-eyebrow">01 / {es ? "NUESTRA ESENCIA" : "OUR ESSENCE"}</span>
                        <h2>{es ? <>El lujo de estar <em>presentes.</em></> : <>The luxury of being <em>present.</em></>}</h2>
                    </div>
                    <div>
                        <p>
                            {es
                                ? "La mesa es nuestra manera favorita de celebrar. Nos inspiran los sabores memorables, las texturas delicadas y esos pequeños rituales que hacen especial una comida."
                                : "The table is our favorite way to celebrate. We are inspired by memorable flavors, delicate textures, and the small rituals that make a meal special."}
                        </p>
                        <p>
                            {es
                                ? "Esta página es una reinterpretación visual para portfolio. La identidad, las imágenes, el menú y las reservas son completamente ficticios y fueron creados para demostración."
                                : "This page is a visual portfolio concept. The identity, imagery, menu and reservations are completely fictional and were created for demonstration purposes."}
                        </p>
                    </div>
                </section>

                <section className="luxe-location luxe-container">
                    <div>
                        <span className="luxe-eyebrow">02 / {es ? "ENCONTRANOS" : "FIND US"}</span>
                        <h2>{t("aboutTitle")}</h2>
                        <p>{t("aboutAddress")}</p>
                        <p>{t("aboutWelcome")}</p>
                    </div>

                    <div className="luxe-location-card" role="img" aria-label={t("aboutMap")}>
                        <div className="luxe-location-visual" />
                        <div className="luxe-location-rows">
                            <div>
                                <span>{es ? "Dirección" : "Address"}</span>
                                <strong>Pasaje de las Magnolias 245</strong>
                            </div>
                            <div>
                                <span>{es ? "Ciudad" : "City"}</span>
                                <strong>Puerto Cristal, Buenos Aires</strong>
                            </div>
                            <div>
                                <span>{es ? "Contacto demo" : "Demo contact"}</span>
                                <strong>+54 11 5555-0187 · reservas@maisonaster.demo</strong>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
