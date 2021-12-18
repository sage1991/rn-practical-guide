import { createAsyncThunk } from "@reduxjs/toolkit"

import { Order } from "../../models/order"
import { Const } from "../../common"
import { NetworkError } from "../../errors"
import { RootState } from "../store"


export namespace Orders {
  export const init = createAsyncThunk<Order[], void, { state: RootState }>("orders/init", async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    const response = await fetch(`${Const.DATABASE_URL}/orders/u1.json?auth=${state.auth.token?.access}`)
    if (!response.ok) {
      throw new NetworkError(`${response.status}`, response.statusText)
    }
    const body = await response.json()
    return (
      Object
        .entries(body)
        .map<Order>(([ id, order ]) => ({ id, ...order as Omit<Order, "id"> }))
    )
  })

  export const add = createAsyncThunk<Order, Omit<Order, "id">, { state: RootState }>("orders/add", async (order, thunkAPI) => {
    const state = thunkAPI.getState()
    const response = await fetch(`${Const.DATABASE_URL}/orders/u1.json?auth=${state.auth.token?.access}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(order)
    })
    if (!response.ok) {
      throw new NetworkError(`${response.status}`, response.statusText)
    }
    const body = await response.json()
    return { id: body.name, ...order }
  })

}
