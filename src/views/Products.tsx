import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

export async function loader() {

  const products = await getProducts()
  return products ? products : []
}

export async function action({request} : ActionFunctionArgs)  {

  const data = Object.fromEntries(await request.formData())
  await updateAvailability(+data.id)

  return {}
}

export default function Products() {

  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="flex justify-between px-5 pt-4">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="producto/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar producto
        </Link>
      </div>

      <div className="p-2 overflow-x-auto w-full">
        <table className="w-full mt-5 text-balance border-collapse">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              products.length == 0 ? (
                <h2 className="text-center text-2xl mt-10">No hay productos registrados</h2>
              ) : (
                products.map(product => (
                  <ProductDetails 
                    key={product.id}
                    product={product}
                  />
                ))
              )
            }

          </tbody>
        </table>
      </div>
    </>
  );
}
