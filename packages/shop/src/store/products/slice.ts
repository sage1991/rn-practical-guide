import { createSlice } from "@reduxjs/toolkit"

import { Product } from "../../models"
import { products as productList } from "../../__mock__"
import { Products } from "./actions"
import { createProductReducer, removeProductReducer, updateProductReducer } from "./reducers"


export interface ProductsState {
  available: Product[]
  user: Product[]
}

const INITIAL_STATE: ProductsState = {
  available: productList,
  user: productList.filter(product => product.ownerId === 1)
}

const slice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Products.remove, removeProductReducer)
      .addCase(Products.create, createProductReducer)
      .addCase(Products.update, updateProductReducer)
  }
})

export const products = slice.reducer
