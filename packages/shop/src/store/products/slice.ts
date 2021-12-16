import { createSlice } from "@reduxjs/toolkit"

import { Product } from "../../models"
import { Products } from "./actions"
import {
  initProductsPendingReducer,
  initProductsRejectReducer,
  initProductsReducer,
  createProductReducer,
  removeProductReducer,
  updateProductReducer
} from "./reducers"


export interface ProductsState {
  loading: boolean
  error: boolean
  available: Product[]
  user: Product[]
}

const INITIAL_STATE: ProductsState = {
  loading: false,
  error: false,
  available: [],
  user: []
}

const slice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Products.init.pending, initProductsPendingReducer)
      .addCase(Products.init.rejected, initProductsRejectReducer)
      .addCase(Products.init.fulfilled, initProductsReducer)
      .addCase(Products.remove, removeProductReducer)
      .addCase(Products.create.fulfilled, createProductReducer)
      .addCase(Products.update, updateProductReducer)
  }
})

export const products = slice.reducer
