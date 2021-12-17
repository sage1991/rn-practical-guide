import { createSlice } from "@reduxjs/toolkit"

import {
  addOrderReducer,
  initOrderPendingReducer,
  initOrderReducer,
  initOrderRejectedReducer
} from "./reducers"
import { Order } from "../../models/order"
import { Orders } from "./actions"


export interface OrderState {
  loading: boolean
  error: boolean
  list: Order[]
}

const INITIAL_STATE: OrderState = {
  loading: false,
  error: false,
  list: []
}

const slice = createSlice({
  name: "order",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Orders.init.pending, initOrderPendingReducer)
      .addCase(Orders.init.rejected, initOrderRejectedReducer)
      .addCase(Orders.init.fulfilled, initOrderReducer)
      .addCase(Orders.add.fulfilled, addOrderReducer)
  }
})

export const orders = slice.reducer
