import { Link } from "react-router-dom";
import FooterBack from "../../assets/img/footer.jpg";
import { useDisplay } from "../../context/DisplayContext";
import "./_footer.scss";
export default function Footer() {
    const { t } = useDisplay();
    return <footer className="footer"><img className="footerBackground" src={FooterBack} alt="" aria-hidden="true" loading="lazy" /><p className="footerHero">{t("footerHero")}</p><Link to="/reservations" className="footerButton">{t("footerBook")}</Link></footer>;
}
