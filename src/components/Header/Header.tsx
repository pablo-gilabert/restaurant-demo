import Navbar from "../Navbar/Navbar"

import "./_header.scss"

import Mathilde from "../../assets/img/icons/mathilde.png"
import Fondo from "../../assets/img/fondo.jpg"

const Header = () => {
  return (
    <div className="headerWrapper">
      <img
        className="background"
        src={Fondo}
        alt="Almuerzo completo"
      />

      <Navbar />

      <header className="header">
        <img
          src={Mathilde}
          alt="Mathilde Resto Logo"
          className="logo animate__animated animate__backInRight"
        />

        <h1 className="headerTitle animate__animated animate__backInLeft">
          Mathilde Resto
        </h1>

        <p className="headerHero animate__animated animate__backInLeft">
          En Mathilde, cada comida es un momento para disfrutar.
        </p>

      </header>
    </div>
  )
}

export default Header