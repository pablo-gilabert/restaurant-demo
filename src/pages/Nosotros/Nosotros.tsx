import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"

import "./_nosotros.scss"

import Logo from "../../assets/img/icons/mathilde.png"

const Nosotros = () => {
  
  return (
    <>
        <Navbar/>

        <main className="nosotros">
          
          <p>¿Dónde estamos?</p>
          <p>Guernica, Calle 6 N° 110</p>
          <p>¡Te esperamos!</p>

          <img src={Logo} alt="Mathilde Resto" />
          <p className="heroNosotros">Since 2013</p>
        
          {/* GOOGLE MAPS */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.6258508183223!2d-58.37819679999999!3d-34.9158378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bd2ac9edea9fed%3A0xc6cbe5396ad47d33!2sMATHILDE!5e0!3m2!1ses!2sar!4v1789764484994!5m2!1ses!2sar" width="600" height="450"  loading="lazy"></iframe>
        
        </main>

        <Footer/>
    </>
  )
}

export default Nosotros