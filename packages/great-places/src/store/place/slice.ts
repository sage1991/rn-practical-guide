import { createSlice } from "@reduxjs/toolkit"

import { PlaceAction } from "./actions"
import { addPlace } from "./reducers"
import { Place } from "../../model/Place"


export interface PlaceState {
  places: Place[]
}

const initialState: PlaceState = {
  places: []
}

const slice = createSlice({
  name: "place",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(PlaceAction.add.fulfilled, addPlace)
  }
})

export const place = slice.reducer
