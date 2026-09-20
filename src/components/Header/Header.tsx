import Navbar from "../Navbar/Navbar"

import "./_header.scss"

import Mathilde from "../../assets/img/icons/mathilde.png"
import Fondo from "../../assets/img/fondo.jpg"

const Header = () => {
  return (

    <div className="headerWrapper">

      <img className="background" src={Fondo} alt="Almuerzo completo"/>

      <Navbar/>

      <header className="header">

        <img src={Mathilde} alt="Mathilde Resto Logo" className="logo"/>

        <h1 className="headerTitle">Mathilde Resto</h1>

        <p className="headerHero">En Mathilde, cada comida es un momento para disfrutar</p>

      </header>
    </div>
  )
}

export default Header