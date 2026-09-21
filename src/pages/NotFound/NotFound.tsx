import {
  Link,
} from "react-router-dom"

import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import SEO from "../../components/SEO/SEO"

import "./_notFound.scss"

const NotFound = () => {
  return (
    <>

      <SEO
        title="Página no encontrada | Mathilde Resto"
        description="La página que estás buscando no existe."
      />

      <Navbar/>

      <main
        className="notFound"
        aria-labelledby="notFoundTitle"
      >

        <div className="notFoundContent">

          <p className="notFoundCode">
            404
          </p>

          <h1
            className="notFoundTitle"
            id="notFoundTitle"
          >
            Página no encontrada
          </h1>

          <p className="notFoundMessage">
            La página que estás buscando no existe o fue movida.
          </p>

          <Link
            className="notFoundButton"
            to="/"
          >
            Volver al inicio
          </Link>

        </div>

      </main>

      <Footer/>
    </>
  )
}

export default NotFound