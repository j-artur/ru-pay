import api from "."
import { User } from "./user"

interface RegisterParams {
  name: string
  registration: string
  password: string
}

export const register = async (params: RegisterParams): Promise<User> => {
  const { data } = await api.post("/user_auth/register/", params)
  return data
}

interface LoginParams {
  registration: string
  password: string
}

interface LoginResponse {
  token: string
}

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const { data } = await api.post("/user_auth/login", params)
  return data
}

interface UserJWT {
  id: number
  name: string
  registration: string
}

export const me = async (): Promise<UserJWT> => {
  const { data } = await api.get("/user_auth/me")
  return data
}

export const getSavedUser = (): UserJWT | null => {
  const user = localStorage.getItem("user")
  if (user) {
    return JSON.parse(user)
  }
  return null
}

export const saveUser = (user: UserJWT | null): void => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user))
  } else {
    localStorage.removeItem("user")
  }
}

export const getSavedToken = () => localStorage.getItem("token")

export const saveToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token)
  } else {
    localStorage.removeItem("token")
  }
}
