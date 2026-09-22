import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"

import Navbar from "../../components/Navbar/Navbar"
import SEO from "../../components/SEO/SEO"
import { useAuth } from "../../context/useAuth"
import { categories } from "../../data/categories"
import { createMeal, getMeals, toggleMealAvailability, updateMeal } from "../../services/meals"
import type { Category, Filter, Meal, SortOption } from "../../types/meal"

import "./_admin.scss"

type FormMode = "create" | "edit"

type MealFormState = {
  name: string
  description: string
  price: string
  category: Category
  available: boolean
}

const emptyMealForm: MealFormState = {
  name: "",
  description: "",
  price: "",
  category: "Cafetería",
  available: true
}

// Builds the editable form state from an existing normalized meal.
const getMealFormState = (meal: Meal): MealFormState => ({
  name: meal.name,
  description: meal.description,
  price: meal.price.toString(),
  category: meal.category,
  available: meal.available
})

// Sorts a copied meal array without mutating the source state.
const sortMeals = (meals: Meal[], sort: SortOption) => {
  return [...meals].sort((firstMeal, secondMeal) => {
    if (sort === "az") {
      return firstMeal.name.localeCompare(secondMeal.name)
    }

    if (sort === "za") {
      return secondMeal.name.localeCompare(firstMeal.name)
    }

    if (sort === "priceLow") {
      return firstMeal.price - secondMeal.price
    }

    return secondMeal.price - firstMeal.price
  })
}

// Provides the secured interface used to create, edit, search and manage menu availability.
const Admin = () => {
  const { user, role, loading } = useAuth()
  const [meals, setMeals] = useState<Meal[]>([])
  const [loadingMeals, setLoadingMeals] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<Filter>("all")
  const [sort, setSort] = useState<SortOption>("az")
  const [formMode, setFormMode] = useState<FormMode | null>(null)
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null)
  const [form, setForm] = useState<MealFormState>(emptyMealForm)
  const adminTitleRef = useRef<HTMLHeadingElement>(null)
  const shouldReturnFocus = useRef(false)

  useEffect(() => {
    // Returns keyboard focus to the panel title after closing a create or edit form.
    if (!formMode && shouldReturnFocus.current) {
      adminTitleRef.current?.focus()
      shouldReturnFocus.current = false
    }
  }, [formMode])

  useEffect(() => {
    if (!user || role !== "admin") {
      return
    }

    // Loads the complete collection because administrators can also see hidden meals.
    const fetchMeals = async () => {
      setLoadingMeals(true)
      setError("")

      try {
        setMeals(await getMeals())
      } catch (error) {
        console.error("Failed to load meals for the admin panel:", error)
        setError("No se pudieron cargar las comidas. Intentá nuevamente.")
      } finally {
        setLoadingMeals(false)
      }
    }

    fetchMeals()
  }, [user, role])

  const filteredMeals = useMemo(() => {
    // Applies availability and free-text filters before sorting the visible result set.
    const normalizedSearch = search.toLowerCase().trim()
    const visibleMeals = meals.filter((meal) => {
      const matchesAvailability =
        filter === "all" ||
        (filter === "available" && meal.available) ||
        (filter === "hidden" && !meal.available)

      if (!matchesAvailability) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      const searchableText = [
        meal.name,
        meal.description,
        meal.category,
        meal.price.toString(),
        meal.available ? "disponible" : "oculta"
      ].join(" ").toLowerCase()

      return searchableText.includes(normalizedSearch)
    })

    return sortMeals(visibleMeals, sort)
  }, [meals, search, filter, sort])

  // Updates public visibility while keeping the local list synchronized with Firestore.
  const handleToggleAvailable = async (meal: Meal) => {
    if (saving) {
      return
    }

    setSaving(true)
    setError("")
    setSuccess("")

    try {
      await toggleMealAvailability(meal)

      setMeals((currentMeals) => currentMeals.map((currentMeal) => (
        currentMeal.id === meal.id
          ? { ...currentMeal, available: !currentMeal.available }
          : currentMeal
      )))

      setSuccess(
        meal.available
          ? `"${meal.name}" fue ocultada.`
          : `"${meal.name}" volvió a estar disponible.`
      )
    } catch (error) {
      console.error("Failed to update meal availability:", error)
      setError("No se pudo modificar la disponibilidad. Intentá nuevamente.")
    } finally {
      setSaving(false)
    }
  }

  // Opens an empty form configured for a new meal.
  const handleStartCreate = () => {
    setError("")
    setSuccess("")
    setEditingMeal(null)
    setForm({ ...emptyMealForm })
    setFormMode("create")
    shouldReturnFocus.current = true
  }

  // Opens the shared form populated with an existing meal.
  const handleEdit = (meal: Meal) => {
    setError("")
    setSuccess("")
    setEditingMeal(meal)
    setForm(getMealFormState(meal))
    setFormMode("edit")
    shouldReturnFocus.current = true
  }

  // Closes the shared form without persisting its current values.
  const handleCancelForm = () => {
    setFormMode(null)
    setEditingMeal(null)
    setError("")
    setSuccess("")
  }

  // Validates and persists either a new meal or the editable fields of an existing meal.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formMode || saving) {
      return
    }

    const name = form.name.trim()
    const description = form.description.trim()
    const price = Number(form.price)

    setError("")
    setSuccess("")

    if (!name) {
      setError("El nombre de la comida es obligatorio.")
      return
    }

    if (!form.price.trim()) {
      setError("El precio es obligatorio.")
      return
    }

    if (!Number.isFinite(price) || price < 0) {
      setError("El precio debe ser un número igual o mayor a 0.")
      return
    }

    setSaving(true)

    try {
      if (formMode === "create") {
        const newMeal = await createMeal({
          name,
          description,
          category: form.category,
          available: form.available,
          price
        })

        setMeals((currentMeals) => [...currentMeals, newMeal])
        setSuccess(`"${name}" fue agregada correctamente.`)
      } else if (editingMeal) {
        const updatedMeal: Meal = {
          ...editingMeal,
          name,
          description,
          available: form.available,
          price
        }

        await updateMeal(updatedMeal)
        setMeals((currentMeals) => currentMeals.map((meal) => meal.id === updatedMeal.id ? updatedMeal : meal))
        setSuccess(`"${name}" fue modificada correctamente.`)
      }

      setFormMode(null)
      setEditingMeal(null)
    } catch (error) {
      console.error(`Failed to ${formMode} meal:`, error)
      setError(
        formMode === "create"
          ? "No se pudo agregar la comida. Intentá nuevamente."
          : "No se pudo modificar la comida. Intentá nuevamente."
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <>
        <SEO title="Panel de administración | Mathilde Resto" description="Panel de administración de Mathilde Resto."/>
        <Navbar/>
        <main className="admin"><p className="adminMessage" role="status">Verificando acceso...</p></main>
      </>
    )
  }

  if (!user || role !== "admin") {
    return (
      <>
        <SEO title="Panel de administración | Mathilde Resto" description="Panel de administración de Mathilde Resto."/>
        <Navbar/>

        <main className="admin">
          <h1 className="adminTitle">Acceso denegado</h1>
          <p className="adminMessage">Necesitás iniciar sesión como administrador para acceder a esta sección.</p>
        </main>
      </>
    )
  }

  if (formMode) {
    const isCreating = formMode === "create"

    return (
      <>
        <SEO title="Panel de administración | Mathilde Resto" description="Panel de administración de Mathilde Resto."/>
        <Navbar/>

        <main className="admin">
          <section className="adminForm" aria-labelledby="mealFormTitle">
            <h1 className="adminTitle" id="mealFormTitle">{isCreating ? "Agregar comida" : "Editar comida"}</h1>
            {error && <p className="adminError" role="alert">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="adminField">
                <label className="adminLabel" htmlFor="mealName">Nombre</label>
                <input
                  className="adminInput"
                  type="text"
                  id="mealName"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="El título es obligatorio"
                  required
                  autoFocus/>
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="mealDescription">Descripción</label>
                <textarea
                  className="adminInput"
                  id="mealDescription"
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  placeholder="La descripción es opcional"/>
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="mealPrice">Precio</label>
                <input
                  className="adminInput"
                  type="number"
                  id="mealPrice"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                  placeholder="0 = sin precio visible"
                  aria-describedby="mealPriceHint"
                  required/>
                <p className="adminHint" id="mealPriceHint">Puede ser 0. Si el precio es 0, no se mostrará a los clientes.</p>
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="mealCategory">Categoría</label>

                {isCreating ? (
                  <select
                    className="adminInput"
                    id="mealCategory"
                    value={form.category}
                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as Category }))}>
                    {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                ) : (
                  <input className="adminInput" type="text" id="mealCategory" value={form.category} disabled/>
                )}
              </div>

              <div className="adminField">
                <label className="adminLabel" htmlFor="mealAvailable">Disponibilidad</label>
                <select
                  className="adminInput"
                  id="mealAvailable"
                  value={form.available.toString()}
                  onChange={(event) => setForm((current) => ({ ...current, available: event.target.value === "true" }))}>
                  <option value="true">Disponible</option>
                  <option value="false">Oculta</option>
                </select>
              </div>

              <div className="adminFormActions">
                <button className="adminButton" type="submit" disabled={saving} aria-busy={saving}>
                  {saving ? "Guardando..." : isCreating ? "Agregar comida" : "Guardar cambios"}
                </button>

                <button className="adminButton adminButton--secondary" type="button" onClick={handleCancelForm} disabled={saving}>
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
      <SEO title="Panel de administración | Mathilde Resto" description="Panel de administración de Mathilde Resto."/>
      <Navbar/>

      <main className="admin">
        <section aria-labelledby="adminTitle">
          <h1 className="adminTitle" id="adminTitle" ref={adminTitleRef} tabIndex={-1}>Panel de administración</h1>
          <p className="adminMessage">Desde este panel podés buscar, ordenar, editar y ocultar o mostrar las comidas de la carta.</p>
          <p className="adminMessage">Las comidas ocultas no aparecen en la carta pública y pueden volver a mostrarse en cualquier momento.</p>

          {error && <p className="adminError" role="alert">{error}</p>}
          {success && <p className="adminSuccess" role="status" aria-live="polite">{success}</p>}

          <div className="adminCreate">
            <button className="adminButton" type="button" onClick={handleStartCreate}>Agregar comida</button>
          </div>

          <div className="adminControls">
            <div className="adminField">
              <label className="adminLabel" htmlFor="adminSearch">Buscar</label>
              <input
                className="adminInput"
                type="search"
                id="adminSearch"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nombre, descripción, precio, categoría o disponibilidad"/>
            </div>

            <div className="adminField">
              <label className="adminLabel" htmlFor="adminFilter">Mostrar</label>
              <select className="adminInput" id="adminFilter" value={filter} onChange={(event) => setFilter(event.target.value as Filter)}>
                <option value="all">Todas</option>
                <option value="available">Solo disponibles</option>
                <option value="hidden">Solo ocultas</option>
              </select>
            </div>

            <div className="adminField">
              <label className="adminLabel" htmlFor="adminSort">Ordenar</label>
              <select className="adminInput" id="adminSort" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
                <option value="priceLow">Precio: menor a mayor</option>
                <option value="priceHigh">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          {loadingMeals ? (
            <p className="adminMessage" role="status" aria-live="polite">Cargando comidas...</p>
          ) : (
            <section className="adminMeals" aria-label="Listado de comidas">
              {filteredMeals.map((meal) => (
                <article className="adminMeal" key={meal.id}>
                  <div className="adminMealInfo">
                    <h2 className="adminMealName">{meal.name}</h2>
                    <span className="adminMealStatus">{meal.available ? "Disponible" : "Oculta"}</span>
                  </div>

                  <div className="adminMealActions">
                    <button className="adminButton" type="button" onClick={() => handleEdit(meal)} disabled={saving}>Editar</button>
                    <button
                      className="adminButton adminButton--secondary"
                      type="button"
                      onClick={() => handleToggleAvailable(meal)}
                      disabled={saving}
                      aria-busy={saving}>
                      {saving ? "Guardando..." : meal.available ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </article>
              ))}

              {filteredMeals.length === 0 && <p className="adminMessage">No se encontraron comidas.</p>}
            </section>
          )}
        </section>
      </main>
    </>
  )
}

export default Admin
