import { useEffect, useState } from "react"
import { FaBan, FaCheck, FaPen, FaTrash } from "react-icons/fa"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../components/auth_context"
import Container from "../components/container"
import Footer from "../components/footer"
import LoggedAs from "../components/loggedAs"
import {
  deleteMealType,
  getMealTypes,
  MealType,
  updateMealType,
} from "../services/api/meal_type"

const MealTypes = () => {
  const { token } = useAuth()

  const [mealTypes, setMealTypes] = useState<MealType[]>([])

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    getMealTypes().then(setMealTypes)
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  const handleUpdate = async (event: React.MouseEvent) => {
    setSelected(0)
    try {
      await updateMealType(selected, { name, price })
      alert("Refeição editada com sucesso!")
    } catch (error) {
      console.log(error)
      alert("Erro ao editar refeição!")
    }
  }
  const handleDelete = async (id: number) => {
    setSelected(0)
    try {
      await deleteMealType(id)
      alert("Refeição deletada com sucesso!")
    } catch (error) {
      console.log(error)
      alert("Erro ao deletar refeição!")
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
            <h1 className="text-2xl font-bold">Tipos de Refeição</h1>

            <Link to="/register_meal_type">
              <button className="flex text-xl text-center items-center justify-center border-2 border-primary-dark rounded  p-2 bg-primary-default">
                Cadastrar novo tipo de refeição
              </button>
            </Link>
          </div>
          <table className="flex flex-col w-full text-xl">
            <thead className="flex w-full">
              <tr className="flex w-full">
                <th className="flex-1">Nome</th>
                <th className="flex-1">Preço</th>
                <th className="flex-1">Ações</th>
              </tr>
            </thead>
            <tbody className="flex flex-col items-center justify-between w-full border-b-2 border-primary-default">
              {mealTypes.map(mealType => (
                <tr
                  key={mealType.id}
                  className="flex w-full border-t-2 border-primary-default"
                >
                  <td className="flex-1 flex items-center justify-center">
                    {selected === mealType.id ? (
                      <input
                        type="text"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        className="bg-primary-transparent text-white text-center w-40"
                      />
                    ) : (
                      mealType.name
                    )}
                  </td>
                  <td className="flex-1 flex items-center justify-center">
                    {selected === mealType.id ? (
                      <input
                        type="number"
                        value={price}
                        onChange={event => setPrice(Number(event.target.value))}
                        className="bg-primary-transparent text-white text-center w-40"
                      />
                    ) : (
                      "R$" + (mealType.price / 100).toFixed(2).replace(".", ",")
                    )}
                  </td>
                  <td className="flex-1 flex items-center justify-center gap-2">
                    {selected === mealType.id ? (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleUpdate}
                      >
                        <FaCheck />
                      </button>
                    ) : (
                      <button
                        className="bg-primary-default hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setSelected(mealType.id)
                          setName(mealType.name)
                          setPrice(mealType.price)
                        }}
                      >
                        <FaPen />
                      </button>
                    )}
                    {selected === mealType.id ? (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setSelected(0)}
                      >
                        <FaBan />
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(mealType.id)}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default MealTypes
