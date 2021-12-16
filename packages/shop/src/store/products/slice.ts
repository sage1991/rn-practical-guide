import { createSlice } from "@reduxjs/toolkit"

import { Product } from "../../models"
import { Products } from "./actions"
import { createProductReducer, initProductsReducer, removeProductReducer, updateProductReducer } from "./reducers"


export interface ProductsState {
  available: Product[]
  user: Product[]
}

const INITIAL_STATE: ProductsState = {
  available: [],
  user: []
}

const slice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Products.init.fulfilled, initProductsReducer)
      .addCase(Products.remove, removeProductReducer)
      .addCase(Products.create.fulfilled, createProductReducer)
      .addCase(Products.update, updateProductReducer)
  }
})

export const products = slice.reducer
