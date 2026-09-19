import {
  collection,
  getDocs,
} from "firebase/firestore"

import {
  useCallback,
  useEffect,
  useRef,
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
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null)

  const [meals, setMeals] = useState<Meal[]>([])

  const categoriesRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] =
    useState(false)

  const startX = useRef(0)
  const initialScroll = useRef(0)
  const hasMoved = useRef(false)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsSnapshot = await getDocs(
          collection(db, "comidas")
        )

        const firebaseMeals: Meal[] =
          mealsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          } as Meal))

        setMeals(firebaseMeals)
      } catch (error) {
        console.error(
          "Error al obtener las comidas:",
          error
        )
      }
    }

    fetchMeals()
  }, [])

  const filteredMeals = meals.filter(
    (meal) =>
      meal.category === selectedCategory &&
      meal.available
  )

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const categoriesElement =
        categoriesRef.current

      if (!categoriesElement) return

      startX.current = event.pageX

      initialScroll.current =
        categoriesElement.scrollLeft

      hasMoved.current = false

      setIsDragging(true)
    },
    []
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const categoriesElement =
        categoriesRef.current

      if (
        !isDragging ||
        !categoriesElement
      ) {
        return
      }

      const displacement =
        event.pageX - startX.current

      if (Math.abs(displacement) > 5) {
        hasMoved.current = true
      }

      categoriesElement.scrollLeft =
        initialScroll.current - displacement
    },
    [isDragging]
  )

  const stopDragging = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleCategoryClick = (
    category: Category
  ) => {
    if (hasMoved.current) {
      hasMoved.current = false
      return
    }

    setSelectedCategory(category)
  }

  return (
    <>
      <Navbar />

      <main className="menu">

        <div
          ref={categoriesRef}
          className={`menuCategories ${
            isDragging
              ? "menuCategories--dragging"
              : ""
          } animate__animated animate__backInRight`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`menuCategory ${
                selectedCategory === category
                  ? "menuCategory--active"
                  : ""
              }`}
              onClick={() =>
                handleCategoryClick(category)
              }
            >
              {category}
            </button>
          ))}
        </div>

        <section className="menuContent">
          {selectedCategory && (
            <h2>{selectedCategory}</h2>
          )}

          <div className="meals">
            {filteredMeals.map((meal) => (
              <article
                className="meal"
                key={meal.id}
              >
                <div className="mealDivider" />

                <p>{meal.name}</p>

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
              </article>
            ))}
          </div>
        </section>

        <p className="menuPrompt animate__animated animate__backInUp">
          ¡Elegí una categoría y comenzá a explorar!
        </p>

      </main>

      <Footer />
    </>
  )
}

export default Menu