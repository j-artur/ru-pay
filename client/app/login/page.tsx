"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { login } from "../../services/api/auth"
import { useAuth } from "../auth_context"

const Login = () => {
  const router = useRouter()
  const { saveToken } = useAuth()

  const [registration, setRegistration] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault()

    try {
      const user = await login({ registration, password })
      if (user) {
        saveToken(user.token)
        router.push("/")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="h-screen-1/10 flex flex-col justify-center text-center items-center space-y-10 pb-20">
      <div className="">
        <img src="images/logo.png" alt="logo" className="m-auto w-32 pb-5" />
        <img src="images/rupay.png" alt="rupay" className="m-auto w-64" />
      </div>
      <div>
        <form className="flex flex-col w-64 text-2xl items-center">
          <input
            type="text"
            placeholder="Matrícula"
            className="my-4 bg-transparent text-center placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            value={registration}
            onChange={(event) => setRegistration(event.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="mb-6 bg-transparent text-center placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56"
            onClick={handleSubmit}
          >
            Entrar
          </button>
          <div className="flex flex-col pt-4 underline text-lg w-fit">
            <Link href="/login/#" className="mb-4">
              Esqueci minha senha
            </Link>
            <Link href="/login/#">Não tenho cadastro</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
