import Navbar from "../../components/Navbar/Navbar"
import "./_reservaciones.scss"

import 'animate.css';

const Reservaciones = () => {
  return (
    <div>
        <Navbar/>

        <main className="reservaciones">
            <section>
                <p className="animate__animated animate__backInLeft">Podés reservar tu mesa</p>
                <p className="animate__animated animate__backInRight">de Lunes a Sábados</p>
                <p className="animate__animated animate__backInLeft">de 08:00hs a 00:00hs</p>
                <a
                  className="animate__animated animate__backInRight"
                  href="https://wa.me/5491121908068?text=%C2%A1Hola%21%20Quisiera%20hacer%20una%20reserva."
                  target="_blank"
                  rel="noopener noreferrer">
                  Reserva ahora
                </a>
            </section>
        </main>
    </div>
  )
}

export default Reservaciones