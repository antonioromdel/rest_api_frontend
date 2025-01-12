import { Link, useLoaderData } from "react-router-dom"
import { getProducts } from "../services/ProductService"

export async function loader() {

  const products = await getProducts()
  return products
}

export default function Products() {

  const products = useLoaderData()

  return (
    <>
        <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link
                    to='producto/nuevo'
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Agregar producto
                </Link>
        </div>
    </>
  )
}
