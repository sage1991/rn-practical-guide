import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

import { PlaceState } from "./slice"


export const addPlace: CaseReducer<PlaceState, PayloadAction<string>> = (state, action) => {
  state.places.push({
    id: `${Date.now()}`,
    title: action.payload
  })
}
