import Fondo from "../../assets/img/fondo.jpg"
import Navbar from "../Navbar/Navbar"

import "./_header.scss"

// Presents the restaurant hero section over the main background image.
const Header = () => {
  return (
    <div className="headerWrapper">
      <img className="background" src={Fondo} alt="" aria-hidden="true"/>
      <Navbar/>

      <header className="header">
        <h1 className="headerTitle">Mathilde Resto</h1>
        <p className="headerHero">En Mathilde, cada comida es un momento para disfrutar</p>
      </header>
    </div>
  )
}

export default Header
