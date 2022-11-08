import { useEffect, useState } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../components/auth_context"
import Container from "../components/container"
import Footer from "../components/footer"
import LoggedAs from "../components/loggedAs"
import { getMeals, Meal } from "../services/api/meal"
import { getMealTypes, MealType } from "../services/api/meal_type"

const Menu = () => {
  const { token } = useAuth()

  const [meals, setMeals] = useState([] as Meal[])
  const [mealTypes, setMealTypes] = useState([] as MealType[])
  const [selectedMealType, setSelectedMealType] = useState(0)

  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const [date, setDate] = useState(d)

  useEffect(() => {
    getMealTypes().then(mealTypes => {
      setMealTypes(mealTypes)
      setSelectedMealType(mealTypes[0].id)
    })
    getMeals({ date: date.toISOString() }).then(meal => setMeals(meal))
  }, [date])

  if (!token) {
    return <Navigate to="/login" />
  }

  const meal = meals.find(
    meal =>
      meal.mealTypeId === selectedMealType && meal.date === date.toISOString(),
  )

  return (
    <>
      <LoggedAs />
      <Container>
        <div className="">
          <img src="images/logo.png" alt="logo" className="m-auto w-32 pb-5" />
          <img src="images/rupay.png" alt="rupay" className="m-auto w-64" />
        </div>
        <div className="flex w-full justify-center h-12">
          <button
            onClick={() => {
              const newDate = new Date(date)
              newDate.setDate(date.getDate() - 1)
              setDate(newDate)
            }}
            className="flex justify-center items-center bg-primary-default rounded-l-lg border-2 border-primary-dark w-12"
          >
            <FaAngleLeft className="text-white text-4xl" />
          </button>
          <h1 className="flex flex-grow text-2xl text-center items-center justify-center bg-primary-default border-y-2  border-primary-dark w-24">
            {date.toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </h1>
          <button
            onClick={() => {
              const newDate = new Date(date)
              newDate.setDate(date.getDate() + 1)
              setDate(newDate)
              console.log(date.toISOString())
            }}
            className="flex justify-center items-center bg-primary-default rounded-r-lg border-2 border-primary-dark w-12"
          >
            <FaAngleRight className="text-white text-4xl" />
          </button>
        </div>
        <div className="flex justify-center space-x-12 p-4">
          {mealTypes.map(curMealType => (
            <button
              onClick={() => setSelectedMealType(curMealType.id)}
              className={
                "py-1 px-2 text-2xl flex justify-center items-center  rounded border-2 border-primary-dark w-32 " +
                (curMealType.id === selectedMealType
                  ? "bg-primary-transparent border-transparent"
                  : "border-primary-dark")
              }
            >
              {curMealType.name.charAt(0).toUpperCase() +
                curMealType.name.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex justify-center my-5">
          <Link to="/register_meal">
            <button className="flex text-xl text-center items-center justify-center border-2 border-primary-dark rounded  p-2 bg-primary-default">
              Cadastrar nova refeição
            </button>
          </Link>
        </div>
        <div>
          <div className="flex justify-center">
            {meal ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b-primary-default border-b-4">
                    <th className="text-left text-2xl">Menu</th>
                    <th className="text-left text-2xl">Item</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(JSON.parse(meal.description)).map(
                    ([key, value]) => (
                      <tr
                        key={key}
                        className="border-b-primary-default border-b-2"
                      >
                        <td className="text-left text-2xl">{key}</td>
                        <td className="text-left text-2xl font-sans">
                          <pre>{value as string}</pre>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            ) : (
              <div>
                Ainda não temos uma entrada para o dia e a refeição solicitados.
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Menu
