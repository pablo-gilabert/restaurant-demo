import { collection, getDocs } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"

import { db } from "../../firebase/config"

import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

import "./_menu.scss"
import "animate.css"

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

  useEffect(() => {
    const fetchMeals = async () => {
      const mealsSnapshot = await getDocs(
        collection(db, "comidas")
      )

      const firebaseMeals: Meal[] = mealsSnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Meal)
      )

      setMeals(firebaseMeals)
    }

    fetchMeals()
  }, [])

  const filteredMeals = meals.filter(
    (meal) =>
      meal.category === selectedCategory &&
      meal.available
  )

  const categoriesRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)

  const startX = useRef(0)
  const initialScroll = useRef(0)
  const hasMoved = useRef(false)

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!categoriesRef.current) return

    startX.current = event.pageX
    initialScroll.current =
      categoriesRef.current.scrollLeft

    hasMoved.current = false

    setIsDragging(true)
  }

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !categoriesRef.current) return

    const displacement =
      event.pageX - startX.current

    if (Math.abs(displacement) > 5) {
      hasMoved.current = true
    }

    categoriesRef.current.scrollLeft =
      initialScroll.current - displacement
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleCategoryClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: Category
  ) => {
    if (hasMoved.current) {
      event.preventDefault()
      event.stopPropagation()

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
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >

          {categories.map((category) => (
            <button
              key={category}
              className={`menuCategory ${
                selectedCategory === category
                  ? "menuCategory--active"
                  : ""
              }`}
              onClick={(event) =>
                handleCategoryClick(event, category)
              }
            >
              {category}
            </button>
          ))}

        </div>

        <section className="menuContent">

          <h2>{selectedCategory}</h2>

          <div className="meals">

            {filteredMeals.map((meal) => (
              <div
                className="meal"
                key={meal.id}
              >

                <div className="mealDivider"></div>

                <p>{meal.name}</p>

                {meal.description && (
                  <h3>{meal.description}</h3>
                )}

                {meal.price > 0 && (
                  <span>
                    ${meal.price}
                  </span>
                )}

              </div>
            ))}

          </div>

        </section>

        <h6 className="menuPrompt animate__animated animate__backInUp">
          ¡Elegí una categoría y comenzá a explorar!
        </h6>

      </main>

      <Footer />
    </>
  )
}

export default Menu