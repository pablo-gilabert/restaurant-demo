import { useState } from "react"
import { Link } from "react-router-dom"

import Mathilde from "../../assets/img/icons/mathilde.webp"
import { useAuth } from "../../context/useAuth"

import "./_navbar.scss"

// Renders the responsive navigation and exposes the admin link only to authorized users.
const Navbar = () => {
  const { user, role } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Closes the mobile menu after navigation.
  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="navbarContent">
        <div className="navbarHeader">
          <Link
            to="/"
            className="navbarLogoLink"
            aria-label="Ir al inicio de Mathilde Resto"
            onClick={handleCloseMenu}>
            <img className="navbarLogo" src={Mathilde} alt="Mathilde Resto"/>
          </Link>

          <button
            className={`navbarToggle ${isMenuOpen ? "navbarToggle--open" : ""}`}
            type="button"
            aria-controls="navbarMenu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsMenuOpen((current) => !current)}>
            <span className="navbarToggleIcon" aria-hidden="true"/>
          </button>
        </div>

        <div className={`navbarMenu ${isMenuOpen ? "navbarMenu--open" : ""}`} id="navbarMenu">
          <Link className="navbarLink" to="/" onClick={handleCloseMenu}>Inicio</Link>
          <Link className="navbarLink" to="/menu" onClick={handleCloseMenu}>Carta</Link>

          {user && role === "admin" && (
            <Link className="navbarLink navbarAdminLink" to="/admin" onClick={handleCloseMenu}>
              Panel de Control
            </Link>
          )}

          <Link className="navbarLink" to="/reservations" onClick={handleCloseMenu}>Reservaciones</Link>
          <Link className="navbarLink" to="/about" onClick={handleCloseMenu}>Nosotros</Link>
          <Link className="navbarLink" to="/login" onClick={handleCloseMenu}>Sesión</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
