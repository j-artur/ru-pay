import { useEffect, useState } from "react"
import QRCode from "react-qr-code"
import { Navigate } from "react-router-dom"
import { useAuth } from "../components/auth_context"
import Container from "../components/container"
import Footer from "../components/footer"
import { getMealTypes, MealType } from "../services/api/meal_type"
import { getPayments, Payment, PaymentStatus } from "../services/api/payment"

const Home = () => {
  const { token, user } = useAuth()

  const [payments, setPayments] = useState<Payment[]>([])
  const [mealTypes, setMealTypes] = useState<MealType[]>([])
  const [selectedMealTypeId, setSelectedMealTypeId] = useState(0)

  useEffect(() => {
    if (user) {
      getPayments({ userId: user.id, status: PaymentStatus.Pending }).then(
        setPayments,
      )
      getMealTypes().then(types => {
        setMealTypes(types)
        setSelectedMealTypeId(types[0].id)
      })
    }
  }, [user])

  const selectedPayments = payments.filter(
    payment => payment.mealType.id === selectedMealTypeId,
  )

  if (!token) {
    return <Navigate to="/login" />
  }

  const getQRCode = (payment: Payment) => {
    const qrCode = {
      id: payment.id,
      mealType: {
        id: payment.mealType.id,
        name: payment.mealType.name,
        price: payment.mealType.price,
      },
      user: {
        id: payment.user.id,
        name: payment.user.name,
        registration: payment.user.registration,
      },
      userId: payment.userId,
      status: payment.status,
    }

    return JSON.stringify(qrCode)
  }

  return (
    <>
      <Container>
        <div className="">
          <img src="images/logo.png" alt="logo" className="m-auto w-32 pb-5" />
          <img src="images/rupay.png" alt="rupay" className="m-auto w-64" />
        </div>
        <div className="flex w-full justify-center">
          <div className="flex flex-grow text-4xl text-center items-center justify-center w-24 my-8">
            <h1 className="border-b-primary-default border-b-2 pb-2">
              Voucher
            </h1>
          </div>
        </div>
        <div className="flex justify-center p-4">
          {mealTypes.map(curMealType => (
            <button
              key={curMealType.id}
              onClick={() => setSelectedMealTypeId(curMealType.id)}
              className={
                "py-1 px-2 text-2xl flex justify-center items-center  rounded border-2 border-primary-dark w-32 " +
                (curMealType.id === selectedMealTypeId
                  ? "bg-primary-transparent border-transparent"
                  : "border-primary-dark")
              }
            >
              {curMealType.name.charAt(0).toUpperCase() +
                curMealType.name.slice(1)}
            </button>
          ))}
        </div>
        <div>
          <div className="flex flex-col items-center justify-center p-4">
            {selectedPayments.length ? (
              <>
                <div className="text-center mb-4">
                  Aqui estão seus vouchers:
                </div>
                <div className="flex flex-col items-center justify-center p-4">
                  {selectedPayments.map(payment => (
                    <div className="pb-8">
                      <div className="p-4 bg-white">
                        <QRCode value={getQRCode(payment)} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-2/3 text-center">
                Olá, {user?.name}. Você ainda não tem um voucher, por favor, vá
                para a aba "Pagar" e compre um voucher para ter direito a sua
                refeição no RU.
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Home
