import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const Menu = () => {
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
        <button className="flex justify-center items-center bg-primary-default rounded-l-lg border-2 border-primary-dark w-12">
          <FaAngleLeft className="text-white text-4xl" />
        </button>
        <h1 className="flex flex-grow text-2xl text-center items-center justify-center bg-primary-default border-y-2  border-primary-dark w-24">
          11/05/2022
        </h1>
        <button className="flex justify-center items-center bg-primary-default rounded-r-lg border-2 border-primary-dark w-12">
          <FaAngleRight className="text-white text-4xl" />
        </button>
      </div>
      <div className="flex justify-center space-x-12 p-4">
        <button className="py-1 px-2 text-2xl flex justify-center items-center bg-primary-default rounded border-2 border-primary-dark w-24">
          Almoço
        </button>
        <button className="py-1 px-2 text-2xl flex justify-center items-center bg-primary-default rounded border-2 border-primary-dark w-24">
          Jantar
        </button>
      </div>
      <div>
        <div className="flex justify-center">
          <table className="w-full">
            <thead>
              <tr className="border-b-primary-default border-b-4">
                <th className="text-left text-2xl">Menu</th>
                <th className="text-left text-2xl">Item</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-primary-default border-b-2">
                <td className="text-left text-2xl">Salada</td>
                <td className="text-left text-2xl">
                  Acelga, couve, alface e laranja
                </td>
              </tr>
              <tr className="border-b-primary-default border-b-2">
                <td className="text-left text-2xl">Prato Principal 1</td>
                <td className="text-left text-2xl">
                  Fricassê de frango com batata palha
                </td>
              </tr>
              <tr className="border-b-primary-default border-b-2">
                <td className="text-left text-2xl">Prato Principal 2</td>
                <td className="text-left text-2xl">
                  Lombo suíno ao molho de maracujá
                </td>
              </tr>
              <tr className="border-b-primary-default border-b-2">
                <td className="text-left text-2xl">Prato vegetariano</td>
                <td className="text-left text-2xl">Tomate recheada</td>
              </tr>
              <tr className="border-b-primary-default border-b-2">
                <td className="text-left text-2xl">Leguminosas</td>
                <td className="text-left text-2xl">Feijão preto</td>
              </tr>
              <tr className="border-b-primary-default border-b-2">
                <td className="text-left text-2xl pr-5">Acompanhamento</td>
                <td className="text-left text-2xl">
                  Arroz temperado com açafrão
                </td>
              </tr>
              <tr className="border-b-primary-default border-b-2">
                <td className="text-left text-2xl">Guarnição</td>
                <td className="text-left text-2xl">Macarrão ao alho e óleo</td>
              </tr>
              <tr className="border-b-primary-default border-b-2">
                <td className="text-left text-2xl">Bebida</td>
                <td className="text-left text-2xl">Cajá</td>
              </tr>
              <tr className="border-b-primary-default border-b-2">
                <td className="text-left text-2xl">Sobremesa</td>
                <td className="text-left text-2xl">Doce/laranja</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Menu
