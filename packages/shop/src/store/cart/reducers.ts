import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

import { CartState } from "./slice"
import { Product } from "../../models"


export const addToCartReducer: CaseReducer<CartState, PayloadAction<Product>> = (state, action) => {
  const item = state.items.find(item => item.id === action.payload.id)
  state.amount += action.payload.price

  if (item) {
    item.quantity += 1
    item.sum += action.payload.price
    return
  }

  state.items.push({
    id: action.payload.id,
    title: action.payload.title,
    price: action.payload.price,
    quantity: 1,
    sum: action.payload.price
  })
}


export const removeFromCartReducer: CaseReducer<CartState, PayloadAction<string>> = (state, action) => {
  const item = state.items.find(item => item.id === action.payload)
  if (item) {
    state.amount = +(state.amount - item.price).toFixed(2)
    if (item.quantity <= 1) {
      state.items = state.items.filter(__item => __item !== item)
    }

    if (item.quantity > 1) {
      item.quantity -= 1
      item.sum = +(item.sum - item.price).toFixed(2)
    }
  }
}


export const removeAllFromCartReducer: CaseReducer<CartState, PayloadAction<string>> = (state, action) => {
  const item = state.items.find(item => item.id === action.payload)
  if (item) {
    state.items = state.items.filter(__item => __item !== item)
    state.amount = +(state.amount - item.price).toFixed(2)
  }
}


export const clearCartReducer: CaseReducer<CartState> = state => {
  state.items = []
  state.amount = 0
}
