import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"

import { isCategory } from "../data/categories"
import { db } from "../firebase/db"
import type { Meal } from "../types/meal"

const mealsCollection = collection(db, "comidas")

// Converts Firestore documents into validated application meals and rejects malformed records.
const normalizeMeal = (id: string, data: Record<string, unknown>): Meal | null => {
  if (
    typeof data.name !== "string" ||
    typeof data.description !== "string" ||
    typeof data.available !== "boolean" ||
    typeof data.price !== "number" ||
    !Number.isFinite(data.price) ||
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
    price: data.price
  }
}

// Fetches either the complete admin collection or only meals visible on the public menu.
export const getMeals = async (onlyAvailable = false): Promise<Meal[]> => {
  const mealsQuery = onlyAvailable
    ? query(mealsCollection, where("available", "==", true))
    : mealsCollection

  const mealsSnapshot = await getDocs(mealsQuery)

  return mealsSnapshot.docs
    .map((mealDocument) => normalizeMeal(mealDocument.id, mealDocument.data()))
    .filter((meal): meal is Meal => meal !== null)
}

// Creates a new meal and returns the generated Firestore id with the submitted data.
export const createMeal = async (meal: Omit<Meal, "id">): Promise<Meal> => {
  const mealDocument = await addDoc(mealsCollection, meal)

  return { id: mealDocument.id, ...meal }
}

// Updates editable fields while intentionally preserving the category enforced by security rules.
export const updateMeal = async (meal: Meal): Promise<void> => {
  await updateDoc(doc(db, "comidas", meal.id), {
    name: meal.name,
    description: meal.description,
    price: meal.price,
    available: meal.available
  })
}

// Toggles whether a meal is exposed by the public availability query.
export const toggleMealAvailability = async (meal: Meal): Promise<void> => {
  await updateDoc(doc(db, "comidas", meal.id), { available: !meal.available })
}
