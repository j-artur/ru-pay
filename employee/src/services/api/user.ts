import api from "."

export interface User {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface SearchParams {
  name?: string
  registration?: string
}

export const getUsers = async (params: SearchParams = {}): Promise<User[]> => {
  const response = await api.get("/employees", { params })
  return response.data
}

export const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`/employees/${id}`)
  return response.data
}

interface CreateParams {
  name: string
  email: string
  password: string
}

export const createUser = async (user: CreateParams): Promise<User> => {
  const response = await api.post("/employee", user)
  return response.data
}

interface UpdateParams {
  name?: string
  email?: string
  password?: string
  currentPassword: string
}

export const updateUser = async (
  id: number,
  user: UpdateParams,
): Promise<User> => {
  const response = await api.put(`/employees/${id}`, user)
  return response.data
}

export const deleteUser = async (id: number): Promise<void> => {
  const response = await api.delete(`/employees/${id}`)
  return response.data
}
