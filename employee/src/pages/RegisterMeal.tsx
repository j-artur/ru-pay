import { useEffect, useState } from "react"
import { useAuth } from "../components/auth_context"
import { Navigate } from "react-router-dom"
import Footer from "../components/footer"
import Container from "../components/container"
import {
  createMealType,
  getMealTypes,
  MealType,
} from "../services/api/meal_type"
import { createMeal } from "../services/api/meal"

const RegisterMeal = () => {
  const { token } = useAuth()

  const [mealTypes, setMealTypes] = useState([] as MealType[])
  const [selectedMealType, setSelectedMealType] = useState(0)
  const [mealDate, setMealDate] = useState("")
  const [mealRows, setMealRows] = useState(
    [] as { menu: string; description: string; saved: boolean }[],
  )
  const [mealDescription, setMealDescription] = useState("")

  useEffect(() => {
    getMealTypes().then(mealTypes => {
      setMealTypes(mealTypes)
      setSelectedMealType(mealTypes[0].id)
    })
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  const handleSubmit = async (event: React.MouseEvent) => {
    try {
      await createMeal({
        type: selectedMealType,
        date: mealDate,
        description: mealDescription,
      })
      alert("Menu cadastrado com sucesso!")
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
            <form className="flex flex-col w-full text-2xl items-center">
              <label className="w-full">
                Data da Refeição
                <input
                  type="date"
                  className="w-full my-4 bg-transparent pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                  onChange={event => {
                    const d = new Date(event.target.value)
                    d.setHours(0, 0, 0, 0)
                    setMealDate(d.toISOString())
                  }}
                />
              </label>
              <label className="mt-5 w-full">
                Tipos de Refeição
                <select
                  className="w-full my-4 bg-background pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                  onChange={event => {
                    setSelectedMealType(parseInt(event.target.value))
                  }}
                >
                  {mealTypes.map(mealType => (
                    <option value={mealType.id} key={mealType.id}>
                      {mealType.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-5">
                Descrição
                {mealRows.map((row, index) => (
                  <div className="flex flex-row w-full" key={row.menu}>
                    <input
                      type="text"
                      className="w-2/5 mr-5 my-4 bg-transparent pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                      value={row.menu}
                      onChange={event => {
                        const newRows = [...mealRows]
                        newRows[index].menu = event.target.value
                        setMealRows(newRows)
                      }}
                    />
                    <textarea
                      rows={3}
                      className="resize-none w-3/5 my-4 bg-transparent pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                      value={row.description}
                      onChange={event => {
                        const newRows = [...mealRows]
                        newRows[index].description = event.target.value
                        setMealRows(newRows)
                      }}
                    />
                    {row.saved ? (
                      <button
                        className="w-1/5 bg-primary-default text-white rounded-md py-2 px-4"
                        onClick={async event => {
                          event.preventDefault()
                          const newRows = [...mealRows]
                          newRows[index].saved = false
                          setMealRows(newRows)
                        }}
                      >
                        x
                      </button>
                    ) : row.menu.length && row.description.length ? (
                      <button
                        className="w-10 h-10 my-auto bg-primary-default rounded-full text-white"
                        onClick={event => {
                          event.preventDefault()
                          const newRows = [...mealRows]
                          newRows[index].saved = true
                          setMealRows(newRows)
                        }}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className="w-10 h-10 my-auto bg-primary-default rounded-full text-white"
                        onClick={event => {
                          event.preventDefault()
                          const newRows = [...mealRows]
                          newRows.splice(index, 1)
                          setMealRows(newRows)
                        }}
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="w-10 h-10 bg-primary-default rounded-full text-white"
                  onClick={event => {
                    event.preventDefault()
                    const newRows = [...mealRows]
                    newRows.push({
                      menu: "",
                      description: "",
                      saved: false,
                    })
                    setMealRows(newRows)
                  }}
                >
                  +
                </button>
                {/* <div className="flex">
                  <input
                    type="text"
                    className="w-2/5 mr-5 my-4 bg-transparent pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                  />
                  <textarea
                    rows={3}
                    className="resize-none w-3/5 my-4 bg-transparent pl-3 placeholder:text-white border-b-4 border-primary-default focus:outline-none focus:border-primary-default focus:placeholder:text-transparent"
                  />
                  <button className="pl-4">x</button>
                </div> */}
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
