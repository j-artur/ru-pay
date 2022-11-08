import { Link, Navigate, useNavigate } from "react-router-dom"
import Footer from "../components/footer"
import { useAuth } from "../components/auth_context"
import { useEffect, useState } from "react"
import { getMealTypes, MealType } from "../services/api/meal_type"
import { createPayment } from "../services/api/payment"
import Container from "../components/container"

const Pay = () => {
  const navigate = useNavigate()
  const { token, user } = useAuth()

  const [selectedMealType, setSelectedMealType] = useState({
    id: 0,
    name: "",
    price: 0,
  })
  const [mealTypes, setMealTypes] = useState([] as MealType[])
  const [paymentType, setPaymentType] = useState("pix")

  useEffect(() => {
    getMealTypes().then(mealType => {
      setMealTypes(mealType)
      setSelectedMealType({
        id: mealType[0].id,
        name: mealType[0].name,
        price: mealType[0].price,
      })
    })
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  const handlePayment = async (event: React.MouseEvent) => {
    event.preventDefault()

    try {
      if (user) {
        await createPayment({
          userId: Number(user.id),
          mealTypeId: selectedMealType.id,
        })
        navigate("/")
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Container>
        <div className="flex p-4">
          <img src="images/logo.png" alt="logo" className="ml-auto w-32 pb-5" />
          <img
            src="images/rupay.png"
            alt="rupay"
            className="ml-10 mr-auto my-auto w-64"
          />
        </div>
        <div className="flex w-full justify-center">
          <div className="flex flex-grow text-4xl text-center items-center justify-center w-24 my-8">
            <h1 className="border-b-primary-default border-b-2 pb-2">
              Pagamento
            </h1>
          </div>
        </div>
        <div>
          <div className="flex justify-center space-x-12 p-4">
            {mealTypes.map(curMealType => (
              <button
                onClick={() =>
                  setSelectedMealType({
                    id: curMealType.id,
                    name: curMealType.name,
                    price: curMealType.price,
                  })
                }
                className={
                  "py-1 px-2 text-2xl flex justify-center items-center  rounded border-2 border-primary-dark w-32 " +
                  (curMealType.name === selectedMealType.name
                    ? "bg-primary-default"
                    : "")
                }
              >
                {curMealType.name.charAt(0).toUpperCase() +
                  curMealType.name.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex justify-center text-xl">
            Valor: R${(selectedMealType.price / 100).toFixed(2)}
          </div>
          <div className="flex flex-col justify-center items-center p-4 space-y-10">
            <button
              onClick={() => setPaymentType("pix")}
              className={
                "flex text-2xl text-center items-center justify-center border-2 border-primary-dark rounded w-64 p-2 " +
                (paymentType === "pix" ? "bg-primary-default" : "")
              }
            >
              Pix
            </button>
            <button
              onClick={() => setPaymentType("card")}
              className={
                "flex text-2xl text-center items-center justify-center border-2 border-primary-dark rounded w-64 p-2 " +
                (paymentType === "card" ? "bg-primary-default" : "")
              }
            >
              Cartão
            </button>
            <button
              onClick={handlePayment}
              className={
                "flex text-2xl text-center items-center justify-center border-2 border-primary-dark rounded w-56 p-2 bg-primary-default"
              }
            >
              Pagar
            </button>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Pay
