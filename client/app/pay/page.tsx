"use client"

import Payment from "./payment"

const Pay = () => {
  return (
    <>
      <div className="flex">
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
        <Payment />
      </div>
    </>
  )
}

export default Pay
