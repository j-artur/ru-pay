import api from "."

export interface MealType {
  id: number
  name: string
  price: number
  createdAt: string
  updatedAt: string
}

interface SearchParams {
  name?: string
  price?: number
}

export const getMealTypes = async (
  params: SearchParams = {}
): Promise<MealType[]> => {
  const response = await api.get("/meal_types", { params })
  return response.data
}

export const getMealType = async (id: number): Promise<MealType> => {
  const response = await api.get(`/meal_types/${id}`)
  return response.data
}

interface CreateParams {
  name: string
  price: number
}

export const createMealType = async (
  mealType: CreateParams
): Promise<MealType> => {
  const response = await api.post("/meal_types", mealType)
  return response.data
}

interface UpdateParams {
  name?: string
  price?: number
}

export const updateMealType = async (
  id: number,
  mealType: UpdateParams
): Promise<MealType> => {
  const response = await api.put(`/meal_types/${id}`, mealType)
  return response.data
}

export const deleteMealType = async (id: number): Promise<void> => {
  const response = await api.delete(`/meal_types/${id}`)
  return response.data
}
