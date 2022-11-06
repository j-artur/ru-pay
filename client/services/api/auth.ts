import api from "."
import { User } from "./user"

interface RegisterParams {
  name: string
  registration: string
  password: string
}

export const register = async (params: RegisterParams): Promise<User> => {
  const { data } = await api.post("/user_auth/register/user", params)
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
