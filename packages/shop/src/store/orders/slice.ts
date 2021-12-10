import { createSlice } from "@reduxjs/toolkit"

import { Order } from "../../models/order"
import { Orders } from "./actions"
import { addOrderReducer } from "./reducers"


export interface OrderState {
  list: Order[]
}

const INITIAL_STATE: OrderState = {
  list: []
}

const slice = createSlice({
  name: "order",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Orders.add, addOrderReducer)
  }
})

export const orders = slice.reducer
