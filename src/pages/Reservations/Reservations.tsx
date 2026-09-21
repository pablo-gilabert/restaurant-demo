import Navbar from "../../components/Navbar/Navbar"
import SEO from "../../components/SEO/SEO"

import "./_reservations.scss"

const Reservations = () => {
  return (
    <>

      <SEO
        title="Reservaciones | Mathilde Resto"
        description="Reservá tu mesa en Mathilde Resto, restaurante en Guernica."
      />

      <Navbar/>

      <main className="reservations">

        <h1>
          Podés reservar tu mesa
        </h1>

        <p>
          de Lunes a Sábados
        </p>

        <p>
          de 08:00hs a 00:00hs
        </p>

        <a
          className="reservationButton"
          href="https://wa.me/5491121908068?text=%C2%A1Hola%21%20Quisiera%20hacer%20una%20reserva."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Reservar mesa por WhatsApp"
        >
          Reserva ahora
        </a>

      </main>
    </>
  )
}

export default Reservations