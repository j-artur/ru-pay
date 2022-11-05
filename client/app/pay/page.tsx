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
      <div className="flex w-full justify-center h-12">
        <h1 className="flex flex-grow text-2xl text-center items-center justify-center bg-blue-500 border-2 border-blue-600 w-24">
          Pagamento
        </h1>
      </div>
      <div>
        <Payment />
      </div>
    </>
  )
}

export default Pay
