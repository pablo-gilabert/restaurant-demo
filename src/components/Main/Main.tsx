import Pavlova from "../../assets/img/cafe/cafe con pavlova.jpg"
import Variado from "../../assets/img/cafe/cafe fariado.jpg"
import CafeMedialunas from "../../assets/img/cafe/cafeMedialunas.jpg"
import Capuchino from "../../assets/img/cafe/capuchino.jpg"
import Submarino from "../../assets/img/cafe/submarino.jpg"
import Tostados from "../../assets/img/cafe/tostados.jpg"
import Cheesecake from "../../assets/img/postres/cheesecake pistacho.jpg"
import CheesecakeClasico from "../../assets/img/postres/cheesecakeclasico.jpg"
import Chocotorta from "../../assets/img/postres/chocotorta.jpg"
import BifeChorizo from "../../assets/img/principales/bifeChorizoProvenzal.jpg"
import BifeMalbec from "../../assets/img/principales/bifeMalbec.jpg"
import PolloCarbonara from "../../assets/img/principales/polloCarbonara.jpg"
import PolloRelleno from "../../assets/img/principales/polloRellenoChampiñon.jpg"
import Risotto from "../../assets/img/principales/risottoHongos.jpg"
import Sorrentinos from "../../assets/img/principales/sorrentinosSalimon.jpg"

import "./_main.scss"

const gallerySections = [
  {
    id: "breakfast",
    title: "Desayunos",
    images: [
      { src: Capuchino, alt: "Capuchino" },
      { src: Pavlova, alt: "Café con pavlova" },
      { src: Submarino, alt: "Submarino" },
      { src: Tostados, alt: "Tostados de jamón y queso" },
      { src: Variado, alt: "Café con medialunas, cheesecake y otros acompañamientos" },
      { src: CafeMedialunas, alt: "Café con medialunas de jamón y queso" }
    ]
  },
  {
    id: "desserts",
    title: "Postres",
    images: [
      { src: Cheesecake, alt: "Cheesecake de pistacho" },
      { src: CheesecakeClasico, alt: "Cheesecake" },
      { src: Chocotorta, alt: "Chocotorta" }
    ]
  },
  {
    id: "main-courses",
    title: "Platos principales",
    images: [
      { src: BifeChorizo, alt: "Bife de chorizo a la provenzal" },
      { src: BifeMalbec, alt: "Bife al malbec con papas crocantes" },
      { src: PolloCarbonara, alt: "Pollo a la carbonara con papas rejilla" },
      { src: PolloRelleno, alt: "Pollo relleno al champiñón" },
      { src: Risotto, alt: "Risotto de champiñones" },
      { src: Sorrentinos, alt: "Sorrentinos de salmón con salsa de camarones" }
    ]
  }
]

// Renders the home-page image galleries from a data-driven section definition.
const Main = () => {
  return (
    <main className="main">
      {gallerySections.map(({ id, title, images }) => (
        <section className="mainSection" key={id} aria-labelledby={`${id}Title`}>
          <h2 className="mainTitle" id={`${id}Title`}>{title}</h2>

          <div className="mainGallery">
            {images.map(({ src, alt }) => (
              <img
                className="mainImage"
                key={src}
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"/>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export default Main
