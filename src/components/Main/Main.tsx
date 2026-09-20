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

import BifeChorizo from "../../assets/img/principales/bifeChorizoProvenzal.jpg"
import BifeMalbec from "../../assets/img/principales/bifeMalbec.jpg"
import PolloCarbonara from "../../assets/img/principales/polloCarbonara.jpg"
import PolloRelleno from "../../assets/img/principales/polloRellenoChampiñon.jpg"
import Risotto from "../../assets/img/principales/risottoHongos.jpg"
import Sorrentinos from "../../assets/img/principales/sorrentinosSalimon.jpg"

const Main = () => {
  return (

    <main className="main">

      <p className="mainTitle">Desayunos</p>

      <section className="section">

        <img className="mainImage" src={Capuchino} alt="Capuchino"/>
        <img className="mainImage" src={Pavlova} alt="Café con pavlova"/>
        <img className="mainImage" src={Submarino} alt="Submarino"/>
        <img className="mainImage" src={Tostados} alt="Tostados de jamón y queso"/>
        <img className="mainImage" src={Variado} alt="Café con medialunas, cheesecake, etcétera"/>
        <img className="mainImage" src={CafeMedialunas} alt="Café con medialunas de jamón y queso"/>

      </section>

      <p className="mainTitle">Postres</p>

      <section className="section">

        <img className="mainImage" src={Cheesecake} alt="Cheesecake de pistacho"/>
        <img className="mainImage" src={CheesecakeClasico} alt="Cheesecake"/>
        <img className="mainImage" src={Chocotorta} alt="Chocotorta"/>

      </section>

      <p className="mainTitle">Platos principales</p>

      <section className="section">

        <img className="mainImage" src={BifeChorizo} alt="Bife de chorizo a la provenzal"/>
        <img className="mainImage" src={BifeMalbec} alt="Bife al malbec con papas crocantes"/>
        <img className="mainImage" src={PolloCarbonara} alt="Pollo a la carbonara con papas rejilla"/>
        <img className="mainImage" src={PolloRelleno} alt="Pollo relleno al champiñón"/>
        <img className="mainImage" src={Risotto} alt="Risotto de champiñones"/>
        <img className="mainImage" src={Sorrentinos} alt="Sorrentinos de salmón con salsa de camarones"/>

      </section>

    </main>
  )
}

export default Main