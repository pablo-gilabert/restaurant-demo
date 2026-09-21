import {
  useContext,
  useEffect,
  useState,
} from "react"

import {
  Link,
} from "react-router-dom"

import Mathilde from "../../assets/img/icons/mathilde.png"

import {
  AuthContext,
} from "../../context/AuthContext"

import "./_navbar.scss"

const Navbar = () => {

  const {
    user,
    role,
  } = useContext(AuthContext)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {

    const handleResize = () => {

      const mobile = window.innerWidth < 1024

      setIsMobile(mobile)

      if (!mobile) {
        setIsMenuOpen(false)
      }

    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }

  }, [])

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav
      className="navbar navbar-expand-lg"
      aria-label="Navegación principal"
    >

      <div className="navbarContent">

        <div className="navbarHeader">

          {isMobile && (
            <Link
              to="/"
              className="navbarLogoLink"
              aria-label="Ir al inicio de Mathilde Resto"
              onClick={handleCloseMenu}
            >
              <img
                className="navbarLogo"
                src={Mathilde}
                alt="Mathilde Resto"
              />
            </Link>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span
              className="navbar-toggler-icon"
              aria-hidden="true"
            ></span>
          </button>

        </div>

        <div
          className={`collapse navbar-collapse navbarMenu ${
            isMenuOpen ? "show" : ""
          }`}
          id="navbarMenu"
        >

          <Link
            className="navbarLink"
            to="/"
            onClick={handleCloseMenu}
          >
            Inicio
          </Link>

          <Link
            className="navbarLink"
            to="/menu"
            onClick={handleCloseMenu}
          >
            Carta
          </Link>

          {user && role === "admin" && (
            <Link
              className="navbarLink navbarAdminLink"
              to="/admin"
              onClick={handleCloseMenu}
            >
              Panel de Control
            </Link>
          )}

          <Link
            className="navbarLink"
            to="/reservations"
            onClick={handleCloseMenu}
          >
            Reservaciones
          </Link>

          <Link
            className="navbarLink"
            to="/about"
            onClick={handleCloseMenu}
          >
            Nosotros
          </Link>

          <Link
            className="navbarLink"
            to="/login"
            onClick={handleCloseMenu}
          >
            Sesión
          </Link>

        </div>

      </div>

    </nav>
  )
}

export default Navbar