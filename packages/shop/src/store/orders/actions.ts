import { createAsyncThunk } from "@reduxjs/toolkit"

import { Order } from "../../models/order"
import { Const } from "../../common"
import { NetworkError } from "../../errors"


export namespace Orders {
  export const init = createAsyncThunk("orders/init", async () => {
    const response = await fetch(`${Const.DATABASE_URL}/orders/u1.json`)
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

  export const add = createAsyncThunk("orders/add", async (order: Omit<Order, "id">) => {
    const response = await fetch(`${Const.DATABASE_URL}/orders/u1.json`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(order)
    })
    if (!response.ok) {
      throw new NetworkError(`${response.status}`, response.statusText)
    }
    const body = await response.json()
    return { id: body.name, ...order } as Order
  })

}
