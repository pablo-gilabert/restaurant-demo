import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Mathilde from "../../assets/img/icons/mathilde.png"

import "./_navbar.scss"

const Navbar = () => {

  //USE EFFECT & USE REFT TO HIDE THE BUTTON LOGO ON DESKTOP
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <nav className="navbar navbar-expand-lg">

      <div className="navbarContent">

        <div className="navbarHeader">

          {/* CONDITIONAL RENDER */}
          {isMobile && (
            <Link to="/" className="navbarLogoLink">
              <img className="navbarLogo" src={Mathilde} alt="Mathilde Resto"/>
            </Link>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Abrir menú">
            <span className="navbar-toggler-icon"></span>
          </button>

        </div>

        <div className="collapse navbar-collapse navbarMenu" id="navbarMenu">

          <Link className="navbarLink" to="/">Inicio</Link>

          <Link className="navbarLink" to="/menu">Carta</Link>

          <Link className="navbarLink" to="/reservations">Reservaciones</Link>

          <Link className="navbarLink" to="/about">Nosotros</Link>

          <Link className="navbarLink" to="/login">Sesión</Link>

        </div>

      </div>

    </nav>
  )
}

export default Navbar