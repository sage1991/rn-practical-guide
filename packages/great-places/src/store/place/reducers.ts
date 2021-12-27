import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

import { PlaceState } from "./slice"
import { Place } from "../../model/Place"


export const addPlace: CaseReducer<PlaceState, PayloadAction<Omit<Place, "id">>> = (state, action) => {
  state.places.push({
    ...action.payload,
    id: `${Date.now()}`
  })
}
