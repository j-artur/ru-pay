import { Fragment, useState } from "react"
import { useAuth } from "../components/auth_context"
import { login } from "../services/api/auth"
import { Link, useNavigate, redirect, Navigate } from "react-router-dom"
import Footer from "../components/footer"
import Container from "../components/container"
import { createMealType } from "../services/api/meal_type"

const RegisterMeal = () => {
  const { token } = useAuth()

  const [mealName, setMealName] = useState("")
  const [mealPrice, setMealPrice] = useState(0)

  if (!token) {
    return <Navigate to="/login" />
  }

  const handleSubmit = async (event: React.MouseEvent) => {
    try {
      await createMealType({
        name: mealName,
        price: mealPrice,
      })
      alert("Refeição cadastrada com sucesso!")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
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
                Nome da refeição
                <input
                  type="text"
                  className="my-4 bg-transparent pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                  value={mealName}
                  onChange={event => setMealName(event.target.value)}
                />
              </label>
              <label className="mt-5">
                Preço da refeição
                <input
                  type="number"
                  defaultValue={0}
                  className="my-4 bg-transparent pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                  value={mealPrice}
                  onChange={event => setMealPrice(parseInt(event.target.value))}
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

export default RegisterMeal
