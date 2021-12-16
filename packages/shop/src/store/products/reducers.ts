import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

import { ProductsState } from "./slice"
import { Product } from "../../models"


export const initProductsPendingReducer: CaseReducer<ProductsState> = (state) => {
  state.loading = true
  state.error = false
}

export const initProductsRejectReducer: CaseReducer<ProductsState> = (state) => {
  state.loading = false
  state.error = true
}

export const initProductsReducer: CaseReducer<ProductsState, PayloadAction<Product[]>> = (state, action) => {
  state.loading = false
  state.error = false
  state.available = action.payload
  state.user = action.payload.filter(product => product.ownerId === 1)
}

export const removeProductReducer: CaseReducer<ProductsState, PayloadAction<string>> = (state, action) => {
  state.user = state.user.filter(product => product.id !== action.payload)
}

export const createProductReducer: CaseReducer<ProductsState, PayloadAction<Product>> = (state, action) => {
  state.available.push(action.payload)
  state.user.push(action.payload)
}

export const updateProductReducer: CaseReducer<ProductsState, PayloadAction<Product>> = (state, action) => {
  state.available = state.available.map(product => {
    if (product.id === action.payload.id) {
      return action.payload
    }
    return product
  })
  state.user = state.user.map(product => {
    if (product.id === action.payload.id) {
      return action.payload
    }
    return product
  })
}
