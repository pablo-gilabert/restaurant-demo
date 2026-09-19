import {
  useState,
} from "react"

import {
  Link,
  useNavigate,
} from "react-router-dom"

import {
  HiMenu,
  HiX,
} from "react-icons/hi"

import Mathilde from "../../assets/img/icons/mathilde.png"

import "./_navbar.scss"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen((previousState) => !previousState)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault()

    closeMenu()

    navigate(path, {
      state: {
        refresh: Date.now(),
      },
    })
  }

  return (
    <>
      <nav className="navbar">

        <div className="navbarContent">

          <div className="navbarHeader">

            <Link
              to="/"
              className="navbarLogoLink"
              onClick={(event) =>
                handleNavigation(event, "/")
              }
            >
              <img
                className="navbarLogo"
                src={Mathilde}
                alt="Mathilde Resto"
              />
            </Link>

            <button
              type="button"
              className="navbarToggle"
              onClick={toggleMenu}
              aria-label={
                isMenuOpen
                  ? "Cerrar menú"
                  : "Abrir menú"
              }
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <HiX />
              ) : (
                <HiMenu />
              )}
            </button>

          </div>

          <div
            className={`navbarMenu ${
              isMenuOpen
                ? "navbarMenu--open"
                : ""
            }`}
          >

            <Link
              to="/"
              onClick={(event) =>
                handleNavigation(event, "/")
              }
            >
              Inicio
            </Link>

            <Link
              to="/menu"
              onClick={(event) =>
                handleNavigation(event, "/menu")
              }
            >
              Carta
            </Link>

            <Link
              to="/reservations"
              onClick={(event) =>
                handleNavigation(
                  event,
                  "/reservations"
                )
              }
            >
              Reservaciones
            </Link>

            <Link
              to="/about"
              onClick={(event) =>
                handleNavigation(
                  event,
                  "/about"
                )
              }
            >
              Nosotros
            </Link>

            <button
              type="button"
              onClick={closeMenu}
            >
              Sesión
            </button>

          </div>

        </div>

      </nav>

      <div className="navbarSpacer" />
    </>
  )
}

export default Navbar