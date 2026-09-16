import "./_main.scss"

import Pavlova from "../../assets/img/cafe/cafe con pavlova.jpg"
import Variado from "../../assets/img/cafe/cafe fariado.jpg"
import Capuchino from "../../assets/img/cafe/capuchino.jpg"
import Submarino from "../../assets/img/cafe/submarino.jpg"
import Tostados from "../../assets/img/cafe/tostados.jpg"
import CafeMedialunas from "../../assets/img/cafe/cafeMedialunas.jpg"

import Cheesecake from "../../assets/img/postres/cheesecake pistacho.jpg"
import CheesecakeClasico from "../../assets/img/postres/cheesecakeclasico.jpg"
import Chocotorta from "../../assets/img/postres/chocotorta.jpg"
import Dubai from "../../assets/img/postres/dubaicombo.jpg"
import Tiramisu from "../../assets/img/postres/tiramisu.jpg"
import TortaOreo from "../../assets/img/postres/tortaoreo.jpg"

import BifeChorizo from "../../assets/img/principales/bifeChorizoProvenzal.jpg"
import BifeMalbec from "../../assets/img/principales/bifeMalbec.jpg"
import PolloCarbonara from "../../assets/img/principales/polloCarbonara.jpg"
import PolloRelleno from "../../assets/img/principales/polloRellenoChampiñon.jpg"
import Risotto from "../../assets/img/principales/risottoHongos.jpg"
import Sorrentinos from "../../assets/img/principales/sorrentinosSalimon.jpg"

const Main = () => {
    return (

    <main className="main">

        <p>Desayunos</p>

        <section className="section">

            <img src={Capuchino} alt="Capuchino."/>
            <img src={Pavlova} alt="Café con pavlova."/>
            <img src={Submarino} alt="Submarino."/>
            <img src={Tostados} alt="Tostados de jamón y queso."/>
            <img src={Variado} alt="Café con medialunas, cheesecake, etctétera."/>
            <img src={CafeMedialunas} alt="Café con medialunas de jamón y queso."/>

        </section>

        <p>Postres</p>

        <section className="section">

            <img src={Cheesecake} alt="Cheesecake de pistacho."/>
            <img src={CheesecakeClasico} alt="Cheesecake."/>
            <img src={Chocotorta} alt="Chocotorta."/>
            <img src={Dubai} alt="Combo Dubai."/>
            <img src={Tiramisu} alt="Tiramisú."/>
            <img src={TortaOreo} alt="Torta Oreo."/>

        </section>

        <p>Platos principales</p>

        <section className="section">

            <img src={BifeChorizo} alt="Bife de chorizo a la provenzal"/>
            <img src={BifeMalbec} alt="Bife al malbec con papas crocantes."/>
            <img src={PolloCarbonara} alt="Pollo a la carbonara con papas rejilla."/>
            <img src={PolloRelleno} alt="Pollo relleno al champiñon."/>
            <img src={Risotto} alt="Risotto de champiñones."/>
            <img src={Sorrentinos} alt="Sorrentinon de salmón con salsa de camarones."/>

        </section>

    </main>
  )
}

export default Main