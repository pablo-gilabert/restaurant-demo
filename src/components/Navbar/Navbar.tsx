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

          <Link className="navbarLink" to="/">
            Inicio
          </Link>

          <Link className="navbarLink" to="/menu">
            Carta
          </Link>

          {user && role === "admin" && (
            <Link className="navbarLink navbarAdminLink" to="/admin">
              Panel de Control
            </Link>
          )}

          <Link className="navbarLink" to="/reservations">
            Reservaciones
          </Link>

          <Link className="navbarLink" to="/about">
            Nosotros
          </Link>

          <Link className="navbarLink" to="/login">
            Sesión
          </Link>

        </div>

      </div>

    </nav>
  )
}

export default Navbar