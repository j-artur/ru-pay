import Link from "next/link"
import React from "react"

const Login = () => {
  return (
    <div className="h-screen-1/10 flex flex-col justify-center text-center items-center space-y-10 pb-20">
      <div className="">
        <img src="images/logo.png" alt="logo" className="m-auto w-32 pb-5" />
        <img src="images/rupay.png" alt="rupay" className="m-auto w-64" />
      </div>
      <div>
        <form className="flex flex-col w-64 text-2xl items-center">
          <input
            type="text"
            placeholder="Matrícula"
            className="my-4 bg-transparent text-center placeholder:text-white border-b-4 border-blue-500 focus:outline-none focus:border-blue-500 focus:placeholder:text-transparent"
          />
          <input
            type="password"
            placeholder="Senha"
            className="mb-6 bg-transparent text-center placeholder:text-white border-b-4 border-blue-500 focus:outline-none focus:border-blue-500 focus:placeholder:text-transparent"
          />
          <Link href="/" className="bg-blue-500 rounded-md mt-2 mb-4 py-2 w-56">
            Entrar
          </Link>
          <div className="flex flex-col pt-4 underline text-lg w-fit">
            <Link href="/login/#" className="mb-4">
              Esqueci minha senha
            </Link>
            <Link href="/login/#">Não tenho cadastro</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
