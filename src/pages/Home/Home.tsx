import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Main from "../../components/Main/Main"
import SEO from "../../components/SEO/SEO"

const Home = () => {
  return (
    <div>

      <SEO
        title="Mathilde Resto | Restaurante en Guernica"
        description="Mathilde Resto, restaurante en Guernica. Disfrutá nuestra carta, 
        desayunos, platos principales, postres y más."
      />

      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default Home