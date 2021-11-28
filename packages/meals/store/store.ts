import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { meals } from "./meals"


const reducer = combineReducers({ meals })
export const store = configureStore({ reducer, devTools: true })

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export type RootAction = Parameters<typeof store.dispatch>[0]
export type RootStore = typeof store
