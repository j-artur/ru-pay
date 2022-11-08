import api from "."

export interface Employee {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface SearchParams {
  name?: string
  email?: string
}

export const getEmployees = async (
  params: SearchParams = {},
): Promise<Employee[]> => {
  const response = await api.get("/employees", { params })
  return response.data
}

export const getEmployee = async (id: number): Promise<Employee> => {
  const response = await api.get(`/employees/${id}`)
  return response.data
}

interface CreateParams {
  name: string
  email: string
  password: string
}

export const createEmployee = async (user: CreateParams): Promise<Employee> => {
  const response = await api.post("/employees", user)
  return response.data
}

interface UpdateParams {
  name?: string
  registration?: string
  password?: string
  currentPassword: string
}

export const updateEmployee = async (
  id: number,
  user: UpdateParams,
): Promise<Employee> => {
  const response = await api.put(`/employees/${id}`, user)
  return response.data
}

export const deleteEmployee = async (id: number): Promise<void> => {
  const response = await api.delete(`/employees/${id}`)
  return response.data
}
