import api from "."
import { MealType } from "./meal_type"
import { User } from "./user"

export const PaymentStatus = {
  Pending: "Pending",
  Redeemed: "Redeemed",
}

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus]

export interface Payment {
  id: number
  user: User
  mealType: MealType
  status: PaymentStatus
  userId: number
  mealTypeId: number
  createdAt: string
  updatedAt: string
}

interface SearchParams {
  userId?: number
  mealTypeId?: number
  status?: PaymentStatus
}

export const getPayments = async (
  params: SearchParams = {},
): Promise<Payment[]> => {
  const response = await api.get("/payments", { params })
  return response.data
}

export const getPayment = async (id: number): Promise<Payment> => {
  const response = await api.get(`/payments/${id}`)
  return response.data
}

interface CreateParams {
  userId: number
  mealTypeId: number
}

export const createPayment = async (
  payment: CreateParams,
): Promise<Payment> => {
  const response = await api.post("/payments", payment)
  return response.data
}

interface UpdateParams {
  status?: PaymentStatus
}

export const updatePayment = async (
  id: number,
  payment: UpdateParams,
): Promise<Payment> => {
  const response = await api.put(`/payments/${id}`, payment)
  return response.data
}

export const deletePayment = async (id: number): Promise<void> => {
  const response = await api.delete(`/payments/${id}`)
  return response.data
}
