import Navbar from "../../components/Navbar/Navbar"

import "./_reservations.scss"

const Reservations = () => {
  return (
    <>
      <Navbar/>

      <section className="reservations">

        <p>Podés reservar tu mesa</p>

        <p>de Lunes a Sábados</p>

        <p>de 08:00hs a 00:00hs</p>

        <a
          className="reservationButton"
          href="https://wa.me/5491121908068?text=%C2%A1Hola%21%20Quisiera%20hacer%20una%20reserva."
          target="_blank"
          rel="noopener noreferrer">
          Reserva ahora
        </a>

      </section>
    </>
  )
}

export default Reservations