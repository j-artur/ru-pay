import { Navigate } from "react-router-dom"
import { useAuth } from "../components/auth_context"
import { useEffect, useState } from "react"
import { getPayments, Payment } from "../services/api/payment"
import { QrReader } from "react-qr-reader"
import Footer from "../components/footer"

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
              Página principal
            </h1>
          </div>
        </div>
        <div>
          <div className="flex justify-center space-x-12 p-4">
            <QrReader
              className="w-1/2"
              constraints={{ width: 300 }}
              onResult={(result, error) => {
                if (!!result) {
                  console.log(result)
                }
                if (!!error) {
                  console.log(error)
                }
              }}
            />
            aa
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
