import { Navigate, useNavigate, useNavigation } from "react-router-dom"
import { useAuth } from "../components/auth_context"
import { useEffect, useState } from "react"
import { confirmPayment, getPayment, Payment } from "../services/api/payment"
import { QrReader } from "react-qr-reader"
import Footer from "../components/footer"
import Container from "../components/container"
import LoggedAs from "../components/loggedAs"

let qrCodeCtrl = false

const refreshPage = () => {
  window.location.reload()
}

const compare = (a: any, b: any): boolean => {
  return Object.entries(a)
    .map(([key, value]) => {
      if (typeof value === "object") {
        return compare(value, b[key])
      }

      return value === b[key]
    })
    .every(v => v === true)
}

const Home = () => {
  const { token } = useAuth()

  const [payment, setPayment] = useState<Payment | null>(null)
  const [reader, setReader] = useState(false)

  if (!token) {
    return <Navigate to="/login" />
  }

  const handleQRCode = (text: string) => {
    setReader(false)
    try {
      const userPayment = JSON.parse(text)

      getPayment(userPayment.id).then(payment => {
        if (compare(userPayment, payment)) {
          setPayment(payment)
        } else {
          alert("QR Code inválido!")
          refreshPage()
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleConfirmation = async () => {
    try {
      await confirmPayment(payment!.id)
      alert("Pagamento confirmado com sucesso!")
      setPayment(null)
      refreshPage()
    } catch (error) {
      console.error(error)
      alert("Erro ao confirmar pagamento!")
    }
  }

  return (
    <>
      <LoggedAs />
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
              Página principal
            </h1>
          </div>
        </div>
        <div>
          <div className="flex justify-center space-x-12 p-4">
            {payment !== null ? (
              <div>
                <div className="flex flex-col text-2xl">
                  <h1 className="text-2xl text-center">
                    Dados validados com sucesso!
                  </h1>
                  <table>
                    <tbody>
                      <tr className="border-b-primary-default border-b-2">
                        <td>Nome:</td>
                        <td>{payment.user.name}</td>
                      </tr>
                      <tr className="border-b-primary-default border-b-2">
                        <td>Matrícula:</td>
                        <td>{payment.user.registration}</td>
                      </tr>
                      <tr className="border-b-primary-default border-b-2">
                        <td>Refeição:</td>
                        <td>{payment.mealType.name}</td>
                      </tr>
                      <tr className="border-b-primary-default border-b-2">
                        <td>Valor:</td>
                        <td>
                          {"R$" + (payment.mealType.price / 100).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-between">
                    <button
                      onClick={handleConfirmation}
                      className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56"
                    >
                      Confirmar Pagamento
                    </button>
                    <button
                      onClick={() => refreshPage()}
                      className="bg-primary-default rounded-md mt-2 mb-4 py-2 w-56"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ) : reader ? (
              <QrReader
                className="w-full"
                constraints={{ width: 300, height: 300 }}
                onResult={(result, error) => {
                  if (!!result && qrCodeCtrl) {
                    qrCodeCtrl = false
                    handleQRCode(result.getText())
                  }
                  if (!!error && qrCodeCtrl) {
                    console.log(error)
                  }
                }}
              />
            ) : (
              <button
                onClick={() => {
                  setReader(true)
                  qrCodeCtrl = true
                }}
              >
                Validar novo pagamento
              </button>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Home
