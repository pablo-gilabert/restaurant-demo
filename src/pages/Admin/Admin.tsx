import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"

import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

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

const isCategory = (value: unknown): value is Category => {
  return (
    typeof value === "string" &&
    categories.includes(value as Category)
  )
}

const normalizeMeal = (
  id: string,
  data: Record<string, unknown>,
): Meal | null => {

  if (
    typeof data.name !== "string" ||
    typeof data.description !== "string" ||
    typeof data.available !== "boolean" ||
    typeof data.price !== "number" ||
    !isCategory(data.category)
  ) {
    return null
  }

  return {
    id,
    name: data.name,
    description: data.description,
    category: data.category,
    available: data.available,
    price: data.price,
  }
}

const Admin = () => {

  const {
    user,
    role,
    loading,
  } = useContext(AuthContext)

  const [meals, setMeals] = useState<Meal[]>([])

  const [loadingMeals, setLoadingMeals] = useState(false)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<Filter>("all")
  const [sort, setSort] = useState<SortOption>("az")

  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)
  const [creatingMeal, setCreatingMeal] = useState(false)

  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [editAvailable, setEditAvailable] = useState("true")

  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newCategory, setNewCategory] = useState<Category>("Cafetería")
  const [newAvailable, setNewAvailable] = useState("true")

  useEffect(() => {

    if (!user || role !== "admin") {
      return
    }

    const fetchMeals = async () => {

      setLoadingMeals(true)
      setError("")

      try {

        const mealsSnapshot = await getDocs(
          collection(db, "comidas")
        )

        const firebaseMeals = mealsSnapshot.docs
          .map((mealDocument) =>
            normalizeMeal(
              mealDocument.id,
              mealDocument.data(),
            )
          )
          .filter((meal): meal is Meal => meal !== null)

        setMeals(firebaseMeals)

      } catch (error) {

        console.error("Error al obtener las comidas:", error)

        setError(
          "No se pudieron cargar las comidas. Intentá nuevamente."
        )

      } finally {

        setLoadingMeals(false)

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
          (meal.available ? "disponible" : "no disponible")
            .includes(normalizedSearch)
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

    if (saving) {
      return
    }

    setSaving(true)
    setError("")
    setSuccess("")

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

      setSuccess(
        meal.available
          ? `"${meal.name}" fue ocultada.`
          : `"${meal.name}" volvió a estar disponible.`
      )

    } catch (error) {

      console.error(
        "Error al modificar la disponibilidad:",
        error
      )

      setError(
        "No se pudo modificar la disponibilidad. Intentá nuevamente."
      )

    } finally {

      setSaving(false)

    }
  }

  const handleEdit = (meal: Meal) => {

    setError("")
    setSuccess("")

    setEditingMeal(meal)

    setEditName(meal.name)
    setEditDescription(meal.description)
    setEditPrice(meal.price.toString())
    setEditAvailable(meal.available.toString())

  }

  const handleCancelEdit = () => {

    setEditingMeal(null)
    setError("")
    setSuccess("")

  }

  const handleStartCreate = () => {

    setError("")
    setSuccess("")

    setCreatingMeal(true)

    setNewName("")
    setNewDescription("")
    setNewPrice("")
    setNewCategory("Cafetería")
    setNewAvailable("true")

  }

  const handleCancelCreate = () => {

    setCreatingMeal(false)
    setError("")
    setSuccess("")

  }

  const handleCreateMeal = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    if (saving) {
      return
    }

    const name = newName.trim()
    const description = newDescription.trim()
    const price = Number(newPrice)
    const available = newAvailable === "true"

    setError("")
    setSuccess("")

    if (!name) {
      setError("El nombre de la comida es obligatorio.")
      return
    }

    if (!newPrice.trim()) {
      setError("El precio es obligatorio.")
      return
    }

    if (Number.isNaN(price) || price < 0) {
      setError("El precio debe ser un número igual o mayor a 0.")
      return
    }

    setSaving(true)

    try {

      const mealDocument = await addDoc(
        collection(db, "comidas"),
        {
          name,
          description,
          category: newCategory,
          available,
          price,
        }
      )

      const newMeal: Meal = {
        id: mealDocument.id,
        name,
        description,
        category: newCategory,
        available,
        price,
      }

      setMeals((currentMeals) => [
        ...currentMeals,
        newMeal,
      ])

      setCreatingMeal(false)

      setSuccess(
        `"${name}" fue agregada correctamente.`
      )

    } catch (error) {

      console.error("Error al crear la comida:", error)

      setError(
        "No se pudo agregar la comida. Intentá nuevamente."
      )

    } finally {

      setSaving(false)

    }
  }

  const handleSaveEdit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    if (!editingMeal || saving) {
      return
    }

    const name = editName.trim()
    const description = editDescription.trim()
    const price = Number(editPrice)
    const available = editAvailable === "true"

    setError("")
    setSuccess("")

    if (!name) {
      setError("El nombre de la comida es obligatorio.")
      return
    }

    if (!editPrice.trim()) {
      setError("El precio es obligatorio.")
      return
    }

    if (Number.isNaN(price) || price < 0) {
      setError("El precio debe ser un número igual o mayor a 0.")
      return
    }

    setSaving(true)

    try {

      await updateDoc(
        doc(db, "comidas", editingMeal.id),
        {
          name,
          description,
          price,
          available,
        }
      )

      setMeals((currentMeals) =>
        currentMeals.map((meal) =>
          meal.id === editingMeal.id
            ? {
                ...meal,
                name,
                description,
                price,
                available,
              }
            : meal
        )
      )

      setEditingMeal(null)

      setSuccess(
        `"${name}" fue modificada correctamente.`
      )

    } catch (error) {

      console.error("Error al modificar la comida:", error)

      setError(
        "No se pudo modificar la comida. Intentá nuevamente."
      )

    } finally {

      setSaving(false)

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

  if (creatingMeal) {

    return (
      <>
        <Navbar/>

        <main className="admin">

          <section className="adminForm">

            <h1 className="adminTitle">
              Agregar comida
            </h1>

            {error && (
              <p className="adminError">
                {error}
              </p>
            )}

            <form onSubmit={handleCreateMeal}>

              <div className="mb-3">

                <label
                  className="form-label"
                  htmlFor="newName"
                >
                  Nombre
                </label>

                <input
                  className="form-control adminInput"
                  type="text"
                  id="newName"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  required
                />

              </div>

              <div className="mb-3">

                <label
                  className="form-label"
                  htmlFor="newDescription"
                >
                  Descripción
                </label>

                <textarea
                  className="form-control adminInput"
                  id="newDescription"
                  value={newDescription}
                  onChange={(event) => setNewDescription(event.target.value)}
                />

              </div>

              <div className="mb-3">

                <label
                  className="form-label"
                  htmlFor="newPrice"
                >
                  Precio
                </label>

                <input
                  className="form-control adminInput"
                  type="number"
                  id="newPrice"
                  min="0"
                  step="0.01"
                  value={newPrice}
                  onChange={(event) => setNewPrice(event.target.value)}
                  required
                />

              </div>

              <div className="mb-3">

                <label
                  className="form-label"
                  htmlFor="newCategory"
                >
                  Categoría
                </label>

                <select
                  className="form-select adminInput"
                  id="newCategory"
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value as Category)}
                >

                  {categories.map((category) => (

                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>

                  ))}

                </select>

              </div>

              <div className="mb-3">

                <label
                  className="form-label"
                  htmlFor="newAvailable"
                >
                  Disponibilidad
                </label>

                <select
                  className="form-select adminInput"
                  id="newAvailable"
                  value={newAvailable}
                  onChange={(event) => setNewAvailable(event.target.value)}
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
                  disabled={saving}
                >
                  {saving ? "Agregando..." : "Agregar comida"}
                </button>

                <button
                  className="btn adminButton adminButton--secondary"
                  type="button"
                  onClick={handleCancelCreate}
                  disabled={saving}
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

  if (editingMeal) {

    return (
      <>
        <Navbar/>

        <main className="admin">

          <section className="adminForm">

            <h1 className="adminTitle">
              Editar comida
            </h1>

            {error && (
              <p className="adminError">
                {error}
              </p>
            )}

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
                  disabled={saving}
                >
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>

                <button
                  className="btn adminButton adminButton--secondary"
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={saving}
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

          {error && (
            <p className="adminError">
              {error}
            </p>
          )}

          {success && (
            <p className="adminSuccess">
              {success}
            </p>
          )}

          <div className="adminCreate">

            <button
              className="btn adminButton"
              type="button"
              onClick={handleStartCreate}
            >
              Agregar comida
            </button>

          </div>

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

          {loadingMeals ? (

            <p className="adminMessage">
              Cargando comidas...
            </p>

          ) : (

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
                      disabled={saving}
                    >
                      Editar
                    </button>

                    <button
                      className="btn adminButton adminButton--secondary"
                      type="button"
                      onClick={() => handleToggleAvailable(meal)}
                      disabled={saving}
                    >
                      {saving
                        ? "Guardando..."
                        : meal.available
                          ? "Ocultar"
                          : "Mostrar"
                      }
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

          )}

        </section>

      </main>
    </>
  )
}

export default Admin