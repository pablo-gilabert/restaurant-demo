import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO/SEO";
import { useDisplay } from "../../context/DisplayContext";

export default function NotFound() {
    const { language, t } = useDisplay();
    return (
        <>
            <SEO title={`404 | Maison Aster`} description={t("notFoundMessage")} />
            <Navbar />
            <main className="luxe-404">
                <span className="luxe-eyebrow">MAISON ASTER / 404</span>
                <h1>404</h1>
                <h2>{language === "es" ? "Página no encontrada" : "Page not found"}</h2>
                <p>{t("notFoundMessage")}</p>
                <Link className="luxe-button luxe-button-gold" to="/">{language === "es" ? "VOLVER AL INICIO" : "BACK TO HOME"} ↗</Link>
            </main>
            <Footer />
        </>
    );
}
