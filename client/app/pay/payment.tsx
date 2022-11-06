"use client"

import Link from "next/link"
import { useState } from "react"

const Payment = () => {
  const [typeMeal, setTypeMeal] = useState("lunch")
  const [typePayment, setTypePayment] = useState("pix")
  return (
    <>
      <div className="flex justify-center space-x-12 p-4">
        <button
          onClick={() => setTypeMeal("lunch")}
          className={
            "py-1 px-2 text-2xl flex justify-center items-center  rounded border-2 border-primary-dark w-32 " +
            (typeMeal === "lunch" ? "bg-primary-default" : "")
          }
        >
          Almoço
        </button>
        <button
          onClick={() => setTypeMeal("dinner")}
          className={
            "py-1 px-2 text-2xl flex justify-center items-center  rounded border-2 border-primary-dark w-32 " +
            (typeMeal === "dinner" ? "bg-primary-default" : "")
          }
        >
          Jantar
        </button>
      </div>
      <div className="flex justify-center text-xl">
        Valor: R${typeMeal === "lunch" ? "2,50" : "2,00"}
      </div>
      <div className="flex flex-col justify-center items-center p-4 space-y-10">
        <button
          onClick={() => setTypePayment("pix")}
          className={
            "flex text-2xl text-center items-center justify-center border-2 border-primary-dark rounded w-64 p-2 " +
            (typePayment === "pix" ? "bg-primary-default" : "")
          }
        >
          Pix
        </button>
        <button
          onClick={() => setTypePayment("card")}
          className={
            "flex text-2xl text-center items-center justify-center border-2 border-primary-dark rounded w-64 p-2 " +
            (typePayment === "card" ? "bg-primary-default" : "")
          }
        >
          Cartão
        </button>
        <Link
          href="/"
          className={
            "flex text-2xl text-center items-center justify-center border-2 border-primary-dark rounded w-56 p-2 bg-primary-default"
          }
        >
          Pagar
        </Link>
      </div>
    </>
  )
}

export default Payment
