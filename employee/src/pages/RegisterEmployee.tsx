import { useState } from "react"
import { useAuth } from "../components/auth_context"
import { Navigate, useNavigate } from "react-router-dom"
import Footer from "../components/footer"
import Container from "../components/container"
import { createMealType } from "../services/api/meal_type"
import LoggedAs from "../components/loggedAs"
import { createEmployee } from "../services/api/employee"

const RegisterEmployee = () => {
  const { token, user } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (!token) {
    return <Navigate to="/login" />
  }

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      await createEmployee({
        name,
        email,
        password,
      })
      alert("Funcionário cadastrado com sucesso!")
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <LoggedAs />
      <Container>
        <div className="h-screen-1/10 flex flex-col justify-center text-center items-center space-y-10 pb-20">
          <div className="">
            <img
              src="images/logo.png"
              alt="logo"
              className="m-auto w-32 pb-5"
            />
            <img src="images/rupay.png" alt="rupay" className="m-auto w-64" />
          </div>
          <div>
            <form className="flex flex-col w-64 text-2xl items-center">
              <label>
                Nome do funcionário
                <input
                  type="text"
                  className="my-4 bg-transparent pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </label>
              <label>
                E-mail do funcionário
                <input
                  type="text"
                  className="my-4 bg-transparent pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </label>
              <label>
                Senha do funcionário
                <input
                  type="password"
                  className="my-4 bg-transparent pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </label>
              <button
                className="bg-primary-default rounded-md mt-12 mb-4 py-2 w-56"
                onClick={handleSubmit}
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default RegisterEmployee
