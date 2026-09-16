import "./_footer.scss"

import FooterBack from "../../assets/img/footer.jpg"

const Footer = () => {

  return (

    <footer className="footer">

      <img className="footerBack" src={FooterBack} alt="Almuerzo completo."/>

      <p className="footerHero">Estamos listos para entregarte la mejor experiencia.</p>

      <button className="btnFooter">Reserva ahora</button>

    </footer>

  )
}

export default Footer