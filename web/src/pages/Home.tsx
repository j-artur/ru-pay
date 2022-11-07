import Footer from "../components/footer"
import { Navigate } from "react-router-dom"
import { useAuth } from "../components/auth_context"
import { useEffect, useState } from "react"
import { getPayments, Payment } from "../services/api/payment"
import QRCode from "react-qr-code"

const Home = () => {
  const { token, user } = useAuth()

  if (!token) {
    return <Navigate to="/login" />
  }

  const [payment, setPayment] = useState({} as Payment)

  useEffect(() => {
    getPayments().then(payments => {
      const p = payments.find(
        payment =>
          payment.userId === Number(user?.id) && payment.status === "Pending",
      )
      p && setPayment(p)
    })
  }, [])

  return (
    <>
      <div>
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
              Voucher
            </h1>
          </div>
        </div>
        <div>
          <div className="flex justify-center space-x-12 p-4">
            {payment.id === undefined ? (
              <p>
                Você ainda não tem um voucher, por favor, vá para a aba "Pagar"
                e compre um.
              </p>
            ) : (
              <div>
                <div className="text-center mb-4">Aqui está seu voucher:</div>
                <QRCode value={JSON.stringify(payment)} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
