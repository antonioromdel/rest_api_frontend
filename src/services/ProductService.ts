import { DraftProductSchema, ProductSchema, ProductsSchema } from "../types"
import { safeParse } from "valibot"
import axios from "axios"

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
    try{

        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        if(result.success){

            const url = `${import.meta.env.VITE_API_URL}/api`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })

        } else {
            throw new Error('Datos no válidos')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getProducts () {
    try{

        const url = `${import.meta.env.VITE_API_URL}/api`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        } else {
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.log(error)
    }
}