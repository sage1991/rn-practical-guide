import { createAsyncThunk } from "@reduxjs/toolkit"

import { Product } from "../../models"
import { Const } from "../../common"
import { NetworkError } from "../../errors"
import { RootState } from "../store"


export namespace Products {
  export const init = createAsyncThunk<Product[], void, { state: RootState }>("products/fetch", async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    const response = await fetch(`${Const.DATABASE_URL}/products.json?auth=${state.auth.token?.access}`)
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

  export const create = createAsyncThunk<Product, Omit<Product, "id">, { state: RootState }>("products/create", async (payload, thunkAPI) => {
    const state = thunkAPI.getState()
    const response = await fetch(`${Const.DATABASE_URL}/products.json?auth=${state.auth.token?.access}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      throw new NetworkError(`${response.status}`, response.statusText)
    }
    const body = await response.json()
    return { ...payload, id: body.name }
  })

  export const update = createAsyncThunk<Product, Product, { state: RootState }>("products/update", async ({ id, ...product }, thunkAPI) => {
    const state = thunkAPI.getState()
    const response = await fetch(`${Const.DATABASE_URL}/products/${id}.json?auth=${state.auth.token?.access}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
    if (!response.ok) {
      throw new NetworkError(`${response.status}`, response.statusText)
    }
    return { id, ...product }
  })

  export const remove = createAsyncThunk<string, string, { state: RootState }>("products/remove", async (id, thunkAPI) => {
    const state = thunkAPI.getState()
    const response = await fetch(`${Const.DATABASE_URL}/products/${id}.json?auth=${state.auth.token?.access}`, {
      method: "DELETE"
    })
    if (!response.ok) {
      throw new NetworkError(`${response.status}`, response.statusText)
    }
    return id
  })
}
