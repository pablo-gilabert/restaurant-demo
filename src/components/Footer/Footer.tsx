import { Link } from "react-router-dom"

import FooterBack from "../../assets/img/footer.jpg"

import "./_footer.scss"

// Closes public pages with a reservation call to action.
const Footer = () => {
  return (
    <footer className="footer">
      <img className="footerBackground" src={FooterBack} alt="" aria-hidden="true" loading="lazy"/>
      <p className="footerHero">Estamos listos para entregarte la mejor experiencia</p>
      <Link to="/reservations" className="footerButton">Reserva ahora</Link>
    </footer>
  )
}

export default Footer
