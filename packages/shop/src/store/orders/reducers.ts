import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

import { OrderState } from "./slice"
import { Order } from "../../models/order"


export const initOrderPendingReducer: CaseReducer<OrderState> = (state) => {
  state.loading = true
  state.error = false
}

export const initOrderRejectedReducer: CaseReducer<OrderState> = (state) => {
  state.loading = false
  state.error = true
}

export const initOrderReducer: CaseReducer<OrderState, PayloadAction<Order[]>> = (state, action) => {
  state.loading = false
  state.error = false
  state.list = action.payload
}

export const addOrderReducer: CaseReducer<OrderState, PayloadAction<Order>> = (state, action) => {
  state.list.push(action.payload)
}
