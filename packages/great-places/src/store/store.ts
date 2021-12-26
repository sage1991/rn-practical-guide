import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { place } from "./place"


const reducer = combineReducers({ place })
export const store = configureStore({ reducer })

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export type RootAction = Parameters<RootDispatch>[0]
