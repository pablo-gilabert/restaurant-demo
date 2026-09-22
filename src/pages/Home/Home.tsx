import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Main from "../../components/Main/Main"
import SEO from "../../components/SEO/SEO"

// Composes the public landing page from the hero, gallery and footer sections.
const Home = () => {
  return (
    <>
      <SEO
        title="Mathilde Resto | Restaurante en Guernica"
        description="Mathilde Resto, restaurante en Guernica. Disfrutá nuestra carta, desayunos, platos principales, postres y más."/>

      <Header/>
      <Main/>
      <Footer/>
    </>
  )
}

export default Home
