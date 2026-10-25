import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO/SEO";
import { useDisplay } from "../../context/DisplayContext";

export default function Home() {
    const { language } = useDisplay();

    return (
        <>
            <SEO
                title="Maison Aster | The art of savoring"
                description={
                    language === "es"
                        ? "Maison Aster: una interpretación contemporánea del fine dining. Carta bilingüe, reservas de demostración y gestión guardada en localStorage."
                        : "Maison Aster: a contemporary fine-dining concept with a bilingual menu, demo reservations and localStorage-based management."
                }
            />
            <Header />
            <Main />
            <Footer />
        </>
    );
}
