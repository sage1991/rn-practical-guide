import { createSlice } from "@reduxjs/toolkit"

import { CartItem } from "../../models"
import { Cart } from "./actions"
import { addToCartReducer, clearCartReducer, removeAllFromCartReducer, removeFromCartReducer } from "./reducers"


export interface CartState {
  items: CartItem[]
  amount: number
}

const INITIAL_STATE: CartState = {
  items: [],
  amount: 0
}

const slice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Cart.add, addToCartReducer)
      .addCase(Cart.remove, removeFromCartReducer)
      .addCase(Cart.clear, clearCartReducer)
      .addCase(Cart.removeAll, removeAllFromCartReducer)
  }
})

export const cart = slice.reducer
