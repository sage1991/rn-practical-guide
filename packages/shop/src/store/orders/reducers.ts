import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

import { OrderState } from "./slice"
import { Order } from "../../models/order"


export const addOrderReducer: CaseReducer<OrderState, PayloadAction<Order>> = (state, action) => {
  state.list.push(action.payload)
}
