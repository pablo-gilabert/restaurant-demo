import { Link } from "react-router-dom"

import "./_footer.scss"

import FooterBack from "../../assets/img/footer.jpg"

const Footer = () => {
  return (
    <footer className="footer">

      <img className="footerBack" src={FooterBack} alt="Almuerzo completo."/>

      <p className="footerHero">Estamos listos para entregarte la mejor experiencia.</p>

      <Link to="/reservaciones" className="btnFooter">Reserva ahora</Link>

    </footer>
  )
}

export default Footer