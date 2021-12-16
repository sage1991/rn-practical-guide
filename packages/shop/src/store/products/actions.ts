import { createAction, createAsyncThunk } from "@reduxjs/toolkit"

import { Product } from "../../models"
import { Const } from "../../common"


export namespace Products {
  export const init = createAsyncThunk("products/fetch", async () => {
    const response = await fetch(`${Const.DATABASE_URL}/products.json`)
    const body = await response.json()
    return (
      Object
        .entries(body)
        .map<Product>(([ id, product ]) => ({ id, ...product as Omit<Product, "id"> }))
    )
  })

  export const create = createAsyncThunk("products/create", async (payload: Omit<Product, "id">) => {
    const response = await fetch(`${Const.DATABASE_URL}/products.json`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const body = await response.json()
    return { ...payload, id: body.name } as Product
  })

  export const update = createAction<Product>("products/update")

  export const remove = createAction<string>("products/remove")
}
