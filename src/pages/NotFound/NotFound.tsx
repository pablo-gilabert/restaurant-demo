import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SEO from "../../components/SEO/SEO";
import { useDisplay } from "../../context/DisplayContext";
import "./_notFound.scss";
export default function NotFound() {
    const { t } = useDisplay();
    return <><SEO title={`${t("notFound")} | Mathilde Resto`} description={t("notFoundMessage")} /><Navbar /><main className="notFound"><div className="notFoundContent"><p className="notFoundCode">404</p><h1 className="notFoundTitle">{t("notFound")}</h1><p className="notFoundMessage">{t("notFoundMessage")}</p><Link className="notFoundButton" to="/">{t("returnHome")}</Link></div></main><Footer /></>;
}
