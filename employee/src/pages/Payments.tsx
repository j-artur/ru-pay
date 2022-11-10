import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../components/auth_context"
import Container from "../components/container"
import Footer from "../components/footer"
import LoggedAs from "../components/loggedAs"
import { getPayments, Payment } from "../services/api/payment"

const Payments = () => {
  const { token } = useAuth()

  const [payments, setPayments] = useState([] as Payment[])

  useEffect(() => {
    getPayments().then(payments => {
      setPayments(payments)
    })
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <LoggedAs />
      <Container>
        <div className="mb-10">
          <img src="images/logo.png" alt="logo" className="m-auto w-32 pb-5" />
          <img src="images/rupay.png" alt="rupay" className="m-auto w-64" />
        </div>
        <div className="flex w-full justify-center">
          <div className="flex flex-grow text-4xl text-center items-center justify-center w-24 my-8">
            <h1 className="border-b-primary-default border-b-2 pb-2">
              Pagamentos
            </h1>
          </div>
        </div>
        <div>
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b-primary-default border-b-4">
                <th className="text-left text-2xl">ID</th>
                <th className="text-left text-2xl">Usuário</th>
                <th className="text-left text-2xl">Tipo de Refeição</th>
                <th className="text-left text-2xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr
                  className="border-b-primary-default border-b-2"
                  key={payment.id}
                >
                  <td className="text-left text-2xl">{payment.id}</td>
                  <td className="text-left text-2xl">{payment.user.name}</td>
                  <td className="text-left text-2xl">
                    {payment.mealType.name}
                  </td>
                  <td className="text-left text-2xl">
                    {payment.status === "Pending" ? "Pendente" : "Resgatado"}
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

export default Payments
