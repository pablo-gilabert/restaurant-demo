import Fondo from "../../assets/img/fondo.jpg";
import Navbar from "../Navbar/Navbar";
import { useDisplay } from "../../context/DisplayContext";
import "./_header.scss";
export default function Header() {
    const { t } = useDisplay();
    return <div className="headerWrapper"><img className="background" src={Fondo} alt="" aria-hidden="true" /><Navbar />
        <header className="header"><h1 className="headerTitle">Mathilde Resto</h1><p className="headerHero">{t("homeHero")}</p></header>
    </div>;
}
