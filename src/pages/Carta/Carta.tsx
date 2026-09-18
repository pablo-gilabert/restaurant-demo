import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import { useRef, useEffect, useState } from "react";
import "./_carta.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import 'animate.css';

type Categoria =
  | "Cafetería"
  | "Cosas Dulces"
  | "Tortas"
  | "Desayunos"
  | "Brunch"
  | "Sandwiches"
  | "Entradas"
  | "Papas"
  | "Ensaladas"
  | "Pizzas"
  | "Milanesas"
  | "Grill"
  | "Elaborados"
  | "Pastas"
  | "Postres"
  | "Bebidas"
  | "Cervezas"
  | "Cervezas Artesanales"
  | "Vinos Tintos Malbec"
  | "Vinos Rosados"
  | "Vinos Blancos"
  | "Sidras y Champagne"
  | "Drinks"

type Comida = {
  id: string
  name: string
  description: string
  category: Categoria
  available: boolean
  price: number
}

const categorias: Categoria[] = [
  "Cafetería",
  "Cosas Dulces",
  "Tortas",
  "Desayunos",
  "Brunch",
  "Sandwiches",
  "Entradas",
  "Papas",
  "Ensaladas",
  "Pizzas",
  "Milanesas",
  "Grill",
  "Elaborados",
  "Pastas",
  "Postres",
  "Bebidas",
  "Cervezas",
  "Cervezas Artesanales",
  "Vinos Tintos Malbec",
  "Vinos Rosados",
  "Vinos Blancos",
  "Sidras y Champagne",
  "Drinks",
]

const Carta = () => {

const [CategoriaSeleccionada, setCategoriaSeleccionada] =
  useState<Categoria | null>(null)

  const [comidas, setComidas] = useState<Comida[]>([])

  useEffect(() => {
    const obtenerComidas = async () => {
      const comidasSnapshot = await getDocs(
        collection(db, "comidas")
      )

      const comidasFirebase: Comida[] = comidasSnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Comida)
      )

      setComidas(comidasFirebase)
    }

    obtenerComidas()
  }, [])

  const comidasFiltradas = comidas.filter(
    (comida) =>
      comida.category === CategoriaSeleccionada &&
      comida.available
  )

  const categoriasRef = useRef<HTMLDivElement>(null)

  const [arrastrando, setArrastrando] = useState(false)

  const inicioX = useRef(0)
  const scrollInicial = useRef(0)
  const seMovio = useRef(false)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!categoriasRef.current) return

    inicioX.current = e.pageX
    scrollInicial.current = categoriasRef.current.scrollLeft
    seMovio.current = false

    setArrastrando(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!arrastrando || !categoriasRef.current) return

    const desplazamiento = e.pageX - inicioX.current

    if (Math.abs(desplazamiento) > 5) {
      seMovio.current = true
    }

    categoriasRef.current.scrollLeft =
      scrollInicial.current - desplazamiento
  }

  const handleMouseUp = () => {
    setArrastrando(false)
  }

  const handleMouseLeave = () => {
    setArrastrando(false)
  }

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    categoria: Categoria
  ) => {
    if (seMovio.current) {
      e.preventDefault()
      e.stopPropagation()

      seMovio.current = false
      return
    }

    setCategoriaSeleccionada(categoria)
  }

  return (
    <>
      <Navbar />

      <main className="carta">

        <div
          ref={categoriasRef}
          className={`cartaCategorias carta animate__animated animate__backInRight ${
            arrastrando ? "arrastrando" : ""
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >

          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`cartaCategoria ${
                CategoriaSeleccionada === categoria
                  ? "cartaCategoria--active"
                  : ""
              }`}
              onClick={(e) => handleClick(e, categoria)}
            >
              {categoria}
            </button>
          ))}

        </div>

        <section className="cartaContenido">

          <h2>{CategoriaSeleccionada}</h2>

          <div className="comidas">

            {comidasFiltradas.map((comida) => (
              <div className="comida" key={comida.id}>

                <div className="baseline"></div>

                <p>{comida.name}</p>

                {comida.description && (
                  <h6>{comida.description}</h6>
                )}

                {comida.price > 0 && <span>${comida.price}</span>}

              </div>
            ))}

          </div>

        </section>

        <h6 className="h6 animate__animated animate__backInUp">¡Elegí una categoría y comenzá a explorar!</h6>

      </main>

      <Footer/>
    </>
  )
}

export default Carta