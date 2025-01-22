import { deleteProduct } from "../services/ProductService";
import { Product } from "../types"
import { formatCurrency } from "../utils";
import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom";

type ProductDetailsProps = {
    product: Product
}

export async function action ({params}: ActionFunctionArgs) {

  if(params.id !== undefined){
    await deleteProduct(+params.id)
  }

  return redirect('/')
}

export default function ProductDetails({product}: ProductDetailsProps) {

    const fetcher = useFetcher()
    const isAvailable = product.availability
    const navigate = useNavigate()

  return (
    <>
        <tr className="border-b ">
          <td className="p-3 text-lg text-gray-800 text-center">{product.name}</td>
          <td className="p-3 text-lg text-gray-800 text-center">{formatCurrency(product.price)}</td>
          <td className="p-3 text-lg text-gray-800 text-center">
            <fetcher.Form method="POST">
                <button
                  type="submit"
                  name="id"
                  value={product.id}
                  className={`${isAvailable ? 'text-white bg-green-600' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                >
                {isAvailable ? 'Disponible' : 'No disponible'}
                </button>
            </fetcher.Form>

          </td>
          <td className="p-3 text-lg text-gray-800 ">
              <div className="flex gap-2 items-center">
                  <button 
                    onClick={() => navigate(`producto/${product.id}/editar`)}
                    className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                  >Editar</button>

                  <Form
                    className="w-full"
                    method="POST"
                    action={`producto/${product.id}/eliminar`}
                    onSubmit={(e) => {
                      if( !confirm('¿Eliminar?')){
                        e.preventDefault()
                      }
                    }}
                  >
                    <input 
                      type="submit"
                      value="Eliminar producto"
                      className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:cursor-pointer"
                    />
                  </Form>

              </div>

          </td>
        </tr>
    </>
  );
}
