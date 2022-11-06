import api from "."

export interface User {
  id: number
  name: string
  registration: string
  createdAt: string
  updatedAt: string
}

interface SearchParams {
  name?: string
  registration?: string
}

export const getUsers = async (params: SearchParams = {}): Promise<User[]> => {
  const response = await api.get("/users", { params })
  return response.data
}

export const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

interface CreateParams {
  name: string
  registration: string
  password: string
}

export const createUser = async (user: CreateParams): Promise<User> => {
  const response = await api.post("/users", user)
  return response.data
}

interface UpdateParams {
  name?: string
  registration?: string
  password?: string
  currentPassword: string
}

export const updateUser = async (
  id: number,
  user: UpdateParams
): Promise<User> => {
  const response = await api.put(`/users/${id}`, user)
  return response.data
}

export const deleteUser = async (id: number): Promise<void> => {
  const response = await api.delete(`/users/${id}`)
  return response.data
}
