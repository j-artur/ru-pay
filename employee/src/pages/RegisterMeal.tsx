import { useEffect, useState } from "react"
import { FaBan, FaCheck, FaMinus, FaPlus } from "react-icons/fa"
import { useAuth } from "../components/auth_context"
import { Navigate, useNavigate } from "react-router-dom"
import Container from "../components/container"
import Footer from "../components/footer"
import { createMeal } from "../services/api/meal"
import { getMealTypes, MealType } from "../services/api/meal_type"
import LoggedAs from "../components/loggedAs"

const RegisterMeal = () => {
  const { token } = useAuth()
  const navigate = useNavigate()

  const [mealTypes, setMealTypes] = useState([] as MealType[])
  const [selectedMealType, setSelectedMealType] = useState(0)
  const [mealDate, setMealDate] = useState("")
  const [mealRows, setMealRows] = useState(
    [] as { menu: string; description: string; saved: boolean }[],
  )

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
    event.preventDefault()
    try {
      await createMeal({
        type: selectedMealType,
        date: mealDate,
        description: JSON.stringify(
          mealRows.reduce((acc, row) => {
            if (row.saved) {
              acc[row.menu] = row.description
            }
            return acc
          }, {} as Record<string, string>),
        ),
      })
      alert("Menu cadastrado com sucesso!")
      navigate("/")
    } catch (error) {
      console.error(error)
      alert("Erro ao cadastrar refeição!")
    }
  }
  return (
    <>
      <LoggedAs />
      <Container>
        <div className="flex flex-col justify-center text-center items-center space-y-10">
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
                  className="w-full my-4 bg-transparent pl-3 border-b-4 border-primary-default focus:outline-none focus:border-primary-default "
                  onChange={event => {
                    const d = new Date(event.target.value)
                    d.setHours(12, 0, 0, 0)
                    d.setDate(d.getDate() + 1)
                    setMealDate(d.toISOString())
                  }}
                />
              </label>
              <label className="mt-5 w-full">
                Tipo de Refeição
                <select
                  className="w-full my-4 bg-background pl-3 border-b-4 border-primary-default focus:outline-none focus:border-primary-default "
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
                Itens do Cardápio
                <br />
                {mealRows.map((row, index) => (
                  <div className="flex flex-row w-full" key={index}>
                    <input
                      disabled={row.saved}
                      type="text"
                      placeholder="Menu"
                      className={
                        "w-2/5 mr-5 my-4 bg-transparent pl-3 border-b-4 focus:outline-none " +
                        (row.saved
                          ? "border-primary-default"
                          : "border-primary-light text-gray-400")
                      }
                      value={row.menu}
                      onChange={event => {
                        const newRows = [...mealRows]
                        newRows[index].menu = event.target.value
                        setMealRows(newRows)
                      }}
                    />
                    <textarea
                      disabled={row.saved}
                      rows={3}
                      placeholder={"\nDescrição"}
                      className={
                        "resize-none w-3/5 my-4 bg-transparent pl-3 border-b-4 focus:outline-none " +
                        (row.saved
                          ? "border-primary-default"
                          : "border-primary-light text-gray-400")
                      }
                      value={row.description}
                      onChange={event => {
                        const newRows = [...mealRows]
                        newRows[index].description = event.target.value
                        setMealRows(newRows)
                      }}
                    />
                    {row.saved ? (
                      <button
                        className="bg-primary-default hover:bg-primary-dark text-white font-bold py-2 px-4 rounded self-center"
                        onClick={async event => {
                          event.preventDefault()
                          const newRows = [...mealRows]
                          newRows[index].saved = false
                          setMealRows(newRows)
                        }}
                      >
                        <FaBan />
                      </button>
                    ) : row.menu.length && row.description.length ? (
                      <button
                        className="bg-primary-default hover:bg-primary-dark text-white font-bold py-2 px-4 rounded self-center"
                        onClick={event => {
                          event.preventDefault()
                          const newRows = [...mealRows]
                          newRows[index].saved = true
                          setMealRows(newRows)
                        }}
                      >
                        <FaCheck />
                      </button>
                    ) : (
                      <button
                        className="bg-primary-default hover:bg-primary-dark text-white font-bold py-2 px-4 rounded self-center"
                        onClick={event => {
                          event.preventDefault()
                          const newRows = [...mealRows]
                          newRows.splice(index, 1)
                          setMealRows(newRows)
                        }}
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="bg-primary-default hover:bg-primary-dark text-white font-bold py-2 px-4 rounded self-center"
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
                  <FaPlus />
                </button>
                {/* <div className="flex">
                  <input
                    type="text"
                    className="w-2/5 mr-5 my-4 bg-transparent pl-3 border-b-4 border-primary-default focus:outline-none focus:border-primary-default "
                  />
                  <textarea
                    rows={3}
                    className="resize-none w-3/5 my-4 bg-transparent pl-3 border-b-4 border-primary-default focus:outline-none focus:border-primary-default "
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
