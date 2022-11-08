import { Navigate } from "react-router-dom"
import Footer from "../components/footer"
import { useAuth } from "../components/auth_context"
import Container from "../components/container"

const About = () => {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <Container>
        <div className="h-screen-4/5 flex flex-col justify-center items-center">
          <div>
            <p className="text-xl mb-3">
              O RuPay é um aplicativo web desenvolvido para a disciplina de
              Engenharia de Software, regida pela Drª Yaskara Menescal, com o
              objetivo de diminuir as filas no RU da UFERSA, campus Mossoró.
            </p>
            <div>
              <p>Discentes:</p>
              <p>Caio</p>
              <p>George</p>
              <p>Guilherme</p>
              <p>Joao Artur</p>
              <p>Matheus</p>
            </div>
          </div>
        </div>
        <div className="text-center ">RU Pay &copy; 2022</div>
      </Container>
      <Footer />
    </>
  )
}

export default About
