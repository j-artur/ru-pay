import api from "."
import { standardDate } from "../../util/date"

export interface Meal {
  id: number
  date: string
  description: string
  mealTypeId: number
  createdAt: string
  updatedAt: string
}

interface SearchParams {
  type?: number
  date?: Date
}

export const getMeals = async (params: SearchParams = {}): Promise<Meal[]> => {
  const date = params.date ? standardDate(params.date) : undefined
  const response = await api.get("/meals", {
    params: { type: params.type, date },
  })
  return response.data
}

export const getMeal = async (id: number): Promise<Meal> => {
  const response = await api.get(`/meals/${id}`)
  return response.data
}

interface CreateParams {
  type: number
  description: string
  date: string
}

export const createMeal = async (meal: CreateParams): Promise<Meal> => {
  const response = await api.post("/meals", meal)
  return response.data
}

interface UpdateParams {
  description?: string
  date?: string
}

export const updateMeal = async (
  id: number,
  meal: UpdateParams,
): Promise<Meal> => {
  const response = await api.put(`/meals/${id}`, meal)
  return response.data
}

export const deleteMeal = async (id: number): Promise<void> => {
  const response = await api.delete(`/meals/${id}`)
  return response.data
}
