import { createAsyncThunk } from "@reduxjs/toolkit"

import { Product } from "../../models"
import { Const } from "../../common"
import { NetworkError } from "../../errors"


export namespace Products {
  export const init = createAsyncThunk("products/fetch", async () => {
    const response = await fetch(`${Const.DATABASE_URL}/products.json`)
    if (!response.ok) {
      throw new NetworkError(`${response.status}`, response.statusText)
    }
    const body = await response.json()
    return (
      Object
        .entries(body)
        .map<Product>(([ id, product ]) => ({ id, ...product as Omit<Product, "id"> }))
    )
  })

  export const create = createAsyncThunk("products/create", async (payload: Omit<Product, "id">) => {
    const response = await fetch(`${Const.DATABASE_URL}/products.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      throw new NetworkError(`${response.status}`, response.statusText)
    }
    const body = await response.json()
    return { ...payload, id: body.name } as Product
  })

  export const update = createAsyncThunk("products/update", async ({ id, ...product }: Product) => {
    const response = await fetch(`${Const.DATABASE_URL}/products/${id}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
    if (!response.ok) {
      throw new NetworkError(`${response.status}`, response.statusText)
    }
    return { id, ...product }
  })

  export const remove = createAsyncThunk("products/remove", async (id: string) => {
    const response = await fetch(`${Const.DATABASE_URL}/products/${id}.json`, {
      method: "DELETE"
    })
    if (!response.ok) {
      throw new NetworkError(`${response.status}`, response.statusText)
    }
    return id
  })
}
