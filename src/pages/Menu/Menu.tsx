import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"

import {
  useEffect,
  useState,
} from "react"

import { db } from "../../firebase/config"

import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

import "./_menu.scss"

type Category =
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

type Meal = {
  id: string
  name: string
  description: string
  category: Category
  available: boolean
  price: number
}

const categories: Category[] = [
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

const Menu = () => {

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const [meals, setMeals] = useState<Meal[]>([])

  useEffect(() => {

    const fetchMeals = async () => {

      try {

        const mealsQuery = query(
          collection(db, "comidas"),
          where("available", "==", true)
        )

        const mealsSnapshot = await getDocs(mealsQuery)

        const firebaseMeals: Meal[] = mealsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Meal))

        setMeals(firebaseMeals)

      } catch (error) {

        console.error("Error al obtener las comidas:", error)

      }
    }

    fetchMeals()

  }, [])

  const filteredMeals = meals.filter((meal) =>
    meal.category === selectedCategory
  )

  return (
    <>
      <Navbar/>

      <main className="menu">

        <div className="menuCategories overflow-auto">

          <div className="d-flex flex-nowrap gap-2">

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                className={`menuCategory flex-shrink-0 ${
                  selectedCategory === category ? "menuCategory--active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>

            ))}

          </div>

        </div>

        <section className="menuContent">

          <div className="meals">

            {filteredMeals.map((meal) => (

              <article
                className="meal"
                key={meal.id}
              >

                <p className="mealName">
                  {meal.name}
                </p>

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

                <div className="mealDivider"/>

              </article>

            ))}

          </div>

        </section>

        {!selectedCategory && (
          <p className="menuPrompt">
            ¡Elegí una categoría y comenzá a explorar!
          </p>
        )}

      </main>

      <Footer/>
    </>
  )
}

export default Menu