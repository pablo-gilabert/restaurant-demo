import Pavlova from "../../assets/img/cafe/cafe con pavlova.jpg";
import Variado from "../../assets/img/cafe/cafe fariado.jpg";
import CafeMedialunas from "../../assets/img/cafe/cafeMedialunas.jpg";
import Capuchino from "../../assets/img/cafe/capuchino.jpg";
import Submarino from "../../assets/img/cafe/submarino.jpg";
import Tostados from "../../assets/img/cafe/tostados.jpg";
import Cheesecake from "../../assets/img/postres/cheesecake pistacho.jpg";
import CheesecakeClasico from "../../assets/img/postres/cheesecakeclasico.jpg";
import Chocotorta from "../../assets/img/postres/chocotorta.jpg";
import BifeChorizo from "../../assets/img/principales/bifeChorizoProvenzal.jpg";
import BifeMalbec from "../../assets/img/principales/bifeMalbec.jpg";
import PolloCarbonara from "../../assets/img/principales/polloCarbonara.jpg";
import PolloRelleno from "../../assets/img/principales/polloRellenoChampiñon.jpg";
import Risotto from "../../assets/img/principales/risottoHongos.jpg";
import Sorrentinos from "../../assets/img/principales/sorrentinosSalimon.jpg";
import { useDisplay } from "../../context/DisplayContext";
import "./_main.scss";

export default function Main() {
    const { t } = useDisplay();
    const sections = [
        { id: "breakfast", title: t("breakfast"), images: [Capuchino, Pavlova, Submarino, Tostados, Variado, CafeMedialunas] },
        { id: "desserts", title: t("desserts"), images: [Cheesecake, CheesecakeClasico, Chocotorta] },
        { id: "main-courses", title: t("mainDishes"), images: [BifeChorizo, BifeMalbec, PolloCarbonara, PolloRelleno, Risotto, Sorrentinos] },
    ];
    return <main className="main">{sections.map(section => <section className="mainSection" key={section.id} aria-labelledby={`${section.id}Title`}><h2 className="mainTitle" id={`${section.id}Title`}>{section.title}</h2><div className="mainGallery">{section.images.map((src, i) => <img className="mainImage" key={src} src={src} alt={`${section.title} ${i + 1}`} loading="lazy" decoding="async" />)}</div></section>)}</main>;
}
