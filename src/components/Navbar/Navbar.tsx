import { Link } from "react-router-dom";

import "./_navbar.scss";
import 'animate.css';

const Navbar = () => {
  return (
    <nav className="navbar animate__animated animate__backInUp">
      <Link to="/">Inicio</Link>
      <Link to="/carta">Carta</Link>
      <Link to="/reservaciones">Reservaciones</Link>
      <Link to="/nosotros">Nosotros</Link>
      <button>Sesión</button>
    </nav>
  )
}

export default Navbar