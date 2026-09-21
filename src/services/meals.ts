import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"

import {
  db,
} from "../firebase/config"

import {
  categories,
} from "../data/categories"

import type {
  Category,
  Meal,
} from "../types/meal"

const mealsCollection = collection(db, "comidas")

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

export const getMeals = async (
  onlyAvailable = false,
): Promise<Meal[]> => {

  const mealsQuery = onlyAvailable
    ? query(
        mealsCollection,
        where("available", "==", true)
      )
    : mealsCollection

  const mealsSnapshot = await getDocs(mealsQuery)

  return mealsSnapshot.docs
    .map((mealDocument) =>
      normalizeMeal(
        mealDocument.id,
        mealDocument.data(),
      )
    )
    .filter((meal): meal is Meal => meal !== null)

}

export const createMeal = async (
  meal: Omit<Meal, "id">,
): Promise<Meal> => {

  const mealDocument = await addDoc(
    mealsCollection,
    meal
  )

  return {
    id: mealDocument.id,
    ...meal,
  }

}

export const updateMeal = async (
  meal: Meal,
): Promise<void> => {

  await updateDoc(
    doc(db, "comidas", meal.id),
    {
      name: meal.name,
      description: meal.description,
      price: meal.price,
      available: meal.available,
    }
  )

}

export const toggleMealAvailability = async (
  meal: Meal,
): Promise<void> => {

  await updateDoc(
    doc(db, "comidas", meal.id),
    {
      available: !meal.available,
    }
  )

}