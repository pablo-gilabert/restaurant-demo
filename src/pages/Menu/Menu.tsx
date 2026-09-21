import {
  useEffect,
  useState,
} from "react"

import {
  categories,
} from "../../data/categories"

import {
  getMeals,
} from "../../services/meals"

import type {
  Category,
  Meal,
} from "../../types/meal"

import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import SEO from "../../components/SEO/SEO"

import "./_menu.scss"

const Menu = () => {

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const [meals, setMeals] = useState<Meal[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    const fetchMeals = async () => {

      setLoading(true)
      setError("")

      try {

        const firebaseMeals = await getMeals(true)

        setMeals(firebaseMeals)

      } catch (error) {

        console.error("Error al obtener las comidas:", error)

        setError(
          "No se pudo cargar la carta. Intentá nuevamente."
        )

      } finally {

        setLoading(false)

      }
    }

    fetchMeals()

  }, [])

  const filteredMeals = meals.filter((meal) =>
    meal.category === selectedCategory
  )

  return (
    <>

      <SEO
        title="Carta | Mathilde Resto"
        description="Conocé la carta de Mathilde Resto: desayunos, entradas, platos principales, 
        postres, bebidas y más."
      />

      <Navbar/>

      <main className="menu">

        <nav
          className="menuCategories overflow-auto"
          aria-label="Categorías de la carta"
        >

          <div className="d-flex flex-nowrap gap-2">

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                className={`menuCategory flex-shrink-0 ${
                  selectedCategory === category ? "menuCategory--active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                aria-controls="menuMeals"
              >
                {category}
              </button>

            ))}

          </div>

        </nav>

        <section
          className="menuContent"
          id="menuMeals"
          aria-labelledby="menuTitle"
        >

          <h1
            className="menuTitle"
            id="menuTitle"
          >
            Nuestra carta
          </h1>

          {loading && (
            <p
              className="menuMessage"
              role="status"
              aria-live="polite"
            >
              Cargando carta...
            </p>
          )}

          {error && (
            <p
              className="menuMessage menuMessage--error"
              role="alert"
            >
              {error}
            </p>
          )}

          {!loading && !error && selectedCategory && filteredMeals.length === 0 && (
            <p className="menuMessage">
              No hay comidas disponibles en esta categoría.
            </p>
          )}

          {!loading && !error && selectedCategory && filteredMeals.length > 0 && (

            <div className="meals">

              {filteredMeals.map((meal) => (

                <article
                  className="meal"
                  key={meal.id}
                >

                  <h2 className="mealName">
                    {meal.name}
                  </h2>

                  {meal.description && (
                    <p className="mealDescription">
                      {meal.description}
                    </p>
                  )}

                  {meal.price > 0 && (
                    <span>
                      ${meal.price}
                    </span>
                  )}

                  <div
                    className="mealDivider"
                    aria-hidden="true"
                  />

                </article>

              ))}

            </div>

          )}

        </section>

        {!loading && !error && !selectedCategory && (
          <p
            className="menuPrompt"
            role="status"
          >
            ¡Elegí una categoría y comenzá a explorar!
          </p>
        )}

      </main>

      <Footer/>
    </>
  )
}

export default Menu