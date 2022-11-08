import { useState } from "react"
import { useAuth } from "../components/auth_context"
import { register } from "../services/api/auth"
import { Link, useNavigate, redirect } from "react-router-dom"
import { getUsers } from "../services/api/user"

const Register = () => {
  const navigate = useNavigate()
  const { saveToken, saveUser } = useAuth()
  const { user } = useAuth()

  const [name, setName] = useState("")
  const [registration, setRegistration] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault()

    try {
      await register({ name, registration, password })
      alert("Cadastro realizado com sucesso!")
      navigate("/")
    } catch (error) {
      alert("Erro ao cadastrar")
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
            placeholder="Nome"
            className="bg-transparent text-center placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Matrícula"
            className="my-4 bg-transparent text-center placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            value={registration}
            onChange={event => setRegistration(event.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="mb-6 bg-transparent text-center placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button
            className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56"
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
