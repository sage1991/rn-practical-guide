import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { meals } from "./meals"


const reducer = combineReducers({ meals })
export const store = configureStore({ reducer, devTools: true })

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export type RootStore = typeof store
