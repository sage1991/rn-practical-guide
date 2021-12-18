import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { products } from "./products"
import { cart } from "./cart"
import { orders } from "./orders"
import { auth } from "./auth"


const reducer = combineReducers({ products, cart, orders, auth })
export const store = configureStore({ reducer, devTools: true })

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
