import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

import { PlaceState } from "./slice"
import { Place } from "../../model/Place"


export const addPlace: CaseReducer<PlaceState, PayloadAction<Place>> = (state, action) => {
  state.places.push(action.payload)
}

export const initPlaces: CaseReducer<PlaceState, PayloadAction<Place[]>> = (state, action) => {
  state.places = action.payload
}

export const removeAllPlaces: CaseReducer<PlaceState> = (state) => {
  state.places = []
}
