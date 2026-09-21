import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore"

import {
  AuthContext,
} from "../../context/AuthContext"

import {
  db,
} from "../../firebase/config"

import Navbar from "../../components/Navbar/Navbar"

import "./_admin.scss"

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

type Filter = "all" | "available" | "hidden"

type SortOption =
  | "az"
  | "za"
  | "priceLow"
  | "priceHigh"

const Admin = () => {

  const {
    user,
    role,
    loading,
  } = useContext(AuthContext)

  const [meals, setMeals] = useState<Meal[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<Filter>("all")
  const [sort, setSort] = useState<SortOption>("az")

  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)

  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [editAvailable, setEditAvailable] = useState("true")

  useEffect(() => {

    if (!user || role !== "admin") {
      return
    }

    const fetchMeals = async () => {

      try {

        const mealsSnapshot = await getDocs(
          collection(db, "comidas")
        )

        const firebaseMeals: Meal[] = mealsSnapshot.docs.map((mealDocument) => ({
          id: mealDocument.id,
          ...mealDocument.data(),
        } as Meal))

        setMeals(firebaseMeals)

      } catch (error) {

        console.error("Error al obtener las comidas:", error)

      }
    }

    fetchMeals()

  }, [user, role])

  const filteredMeals = useMemo(() => {

    const normalizedSearch = search.toLowerCase().trim()

    const result = meals
      .filter((meal) => {

        if (filter === "available" && !meal.available) {
          return false
        }

        if (filter === "hidden" && meal.available) {
          return false
        }

        return true
      })
      .filter((meal) => {

        if (!normalizedSearch) {
          return true
        }

        return (
          meal.name.toLowerCase().includes(normalizedSearch) ||
          meal.description.toLowerCase().includes(normalizedSearch) ||
          meal.category.toLowerCase().includes(normalizedSearch) ||
          meal.price.toString().includes(normalizedSearch) ||
          (meal.available ? "disponible" : "no disponible").includes(normalizedSearch)
        )
      })

    return [...result].sort((a, b) => {

      if (sort === "az") {
        return a.name.localeCompare(b.name)
      }

      if (sort === "za") {
        return b.name.localeCompare(a.name)
      }

      if (sort === "priceLow") {
        return a.price - b.price
      }

      return b.price - a.price
    })

  }, [meals, search, filter, sort])

  const handleToggleAvailable = async (meal: Meal) => {

    try {

      await updateDoc(
        doc(db, "comidas", meal.id),
        {
          available: !meal.available,
        }
      )

      setMeals((currentMeals) =>
        currentMeals.map((currentMeal) =>
          currentMeal.id === meal.id
            ? {
                ...currentMeal,
                available: !currentMeal.available,
              }
            : currentMeal
        )
      )

    } catch (error) {

      console.error("Error al modificar la disponibilidad:", error)

    }
  }

  const handleEdit = (meal: Meal) => {

    setEditingMeal(meal)

    setEditName(meal.name)
    setEditDescription(meal.description)
    setEditPrice(meal.price.toString())
    setEditAvailable(meal.available.toString())

  }

  const handleCancelEdit = () => {

    setEditingMeal(null)

  }

  const handleSaveEdit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    if (!editingMeal) {
      return
    }

    const price = Number(editPrice)

    if (!editName.trim()) {
      return
    }

    if (Number.isNaN(price) || price < 0) {
      return
    }

    try {

      const available = editAvailable === "true"

      await updateDoc(
        doc(db, "comidas", editingMeal.id),
        {
          name: editName.trim(),
          description: editDescription.trim(),
          price,
          available,
        }
      )

      setMeals((currentMeals) =>
        currentMeals.map((meal) =>
          meal.id === editingMeal.id
            ? {
                ...meal,
                name: editName.trim(),
                description: editDescription.trim(),
                price,
                available,
              }
            : meal
        )
      )

      setEditingMeal(null)

    } catch (error) {

      console.error("Error al modificar la comida:", error)

    }
  }

  if (loading) {
    return null
  }

  if (!user || role !== "admin") {

    return (
      <>
        <Navbar/>

        <main className="admin">

          <h1 className="adminTitle">
            Acceso denegado
          </h1>

          <p className="adminMessage">
            Necesitás iniciar sesión como administrador para acceder a esta sección.
          </p>

        </main>
      </>
    )
  }

  if (editingMeal) {

    return (
      <>
        <Navbar/>

        <main className="admin">

          <section className="adminForm">

            <h1 className="adminTitle">
              Editar comida
            </h1>

            <form onSubmit={handleSaveEdit}>

              <div className="mb-3">

                <label
                  className="form-label"
                  htmlFor="adminName"
                >
                  Nombre
                </label>

                <input
                  className="form-control adminInput"
                  type="text"
                  id="adminName"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  required
                />

              </div>

              <div className="mb-3">

                <label
                  className="form-label"
                  htmlFor="adminDescription"
                >
                  Descripción
                </label>

                <textarea
                  className="form-control adminInput"
                  id="adminDescription"
                  value={editDescription}
                  onChange={(event) => setEditDescription(event.target.value)}
                />

              </div>

              <div className="mb-3">

                <label
                  className="form-label"
                  htmlFor="adminPrice"
                >
                  Precio
                </label>

                <input
                  className="form-control adminInput"
                  type="number"
                  id="adminPrice"
                  min="0"
                  step="0.01"
                  value={editPrice}
                  onChange={(event) => setEditPrice(event.target.value)}
                  required
                />

              </div>

              <div className="mb-3">

                <label
                  className="form-label"
                  htmlFor="adminCategory"
                >
                  Categoría
                </label>

                <input
                  className="form-control adminInput"
                  type="text"
                  id="adminCategory"
                  value={editingMeal.category}
                  disabled
                />

              </div>

              <div className="mb-3">

                <label
                  className="form-label"
                  htmlFor="adminAvailable"
                >
                  Disponibilidad
                </label>

                <select
                  className="form-select adminInput"
                  id="adminAvailable"
                  value={editAvailable}
                  onChange={(event) => setEditAvailable(event.target.value)}
                >

                  <option value="true">
                    Disponible
                  </option>

                  <option value="false">
                    Oculta
                  </option>

                </select>

              </div>

              <div className="adminFormActions">

                <button
                  className="btn adminButton"
                  type="submit"
                >
                  Guardar cambios
                </button>

                <button
                  className="btn adminButton adminButton--secondary"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </button>

              </div>

            </form>

          </section>

        </main>
      </>
    )
  }

  return (
    <>
      <Navbar/>

      <main className="admin">

        <section className="adminPanel">

          <h1 className="adminTitle">
            Panel de administración
          </h1>

          <p className="adminMessage">
            Desde este panel podés buscar, ordenar, editar y ocultar o mostrar las comidas de la carta.
          </p>

          <p className="adminMessage">
            Para editar una comida seleccioná "Editar". Para ocultarla o mostrarla utilizá el botón correspondiente. Las comidas ocultas no aparecen en la carta pública.
          </p>

          <div className="adminControls">

            <div className="mb-3">

              <label
                className="form-label"
                htmlFor="adminSearch"
              >
                Buscar
              </label>

              <input
                className="form-control adminInput"
                type="search"
                id="adminSearch"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nombre, descripción, precio, categoría o disponibilidad"
              />

            </div>

            <div className="mb-3">

              <label
                className="form-label"
                htmlFor="adminFilter"
              >
                Mostrar
              </label>

              <select
                className="form-select adminInput"
                id="adminFilter"
                value={filter}
                onChange={(event) => setFilter(event.target.value as Filter)}
              >

                <option value="all">
                  Todas
                </option>

                <option value="available">
                  Solo disponibles
                </option>

                <option value="hidden">
                  Solo ocultas
                </option>

              </select>

            </div>

            <div className="mb-3">

              <label
                className="form-label"
                htmlFor="adminSort"
              >
                Ordenar
              </label>

              <select
                className="form-select adminInput"
                id="adminSort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
              >

                <option value="az">
                  A → Z
                </option>

                <option value="za">
                  Z → A
                </option>

                <option value="priceLow">
                  Precio: menor a mayor
                </option>

                <option value="priceHigh">
                  Precio: mayor a menor
                </option>

              </select>

            </div>

          </div>

          <section className="adminMeals">

            {filteredMeals.map((meal) => (

              <article
                className="adminMeal"
                key={meal.id}
              >

                <div className="adminMealInfo">

                  <p className="adminMealName">
                    {meal.name}
                  </p>

                  <span className="adminMealStatus">
                    {meal.available ? "Disponible" : "Oculta"}
                  </span>

                </div>

                <div className="adminMealActions">

                  <button
                    className="btn adminButton"
                    type="button"
                    onClick={() => handleEdit(meal)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn adminButton adminButton--secondary"
                    type="button"
                    onClick={() => handleToggleAvailable(meal)}
                  >
                    {meal.available ? "Ocultar" : "Mostrar"}
                  </button>

                </div>

              </article>

            ))}

            {filteredMeals.length === 0 && (
              <p className="adminMessage">
                No se encontraron comidas.
              </p>
            )}

          </section>

        </section>

      </main>
    </>
  )
}

export default Admin