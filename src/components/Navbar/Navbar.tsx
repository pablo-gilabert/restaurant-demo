import "./_navbar.scss";
import "../../styles/base/_global.scss"
import "../../styles/base/_reset.scss"
import 'animate.css';

const Navbar = () => {
  return (
    <nav className="navbar animate__animated animate__backInUp">
      <button>Inicio</button>
      <button>Carta</button>
      <button>Reservaciones</button>
      <button>Nosotros</button>
      <button>Contacto</button>
      <button>Sesión</button>
    </nav>
  )
}

export default Navbar