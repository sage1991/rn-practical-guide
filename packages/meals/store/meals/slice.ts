import { createSlice } from "@reduxjs/toolkit"

import { Meal } from "../../models/meal"
import { setFilter, toggleFavorite } from "./actions"
import { setFilterReducer, toggleFavoriteReducer } from "./reducers"
import { meals as mealsData } from "../../__mock__"


export interface MealsState {
  list: Meal[]
  filters: Filters
  filtered: Meal[]
  favorites: Meal[]
}

export interface Filters {
  isGlutenFree: boolean
  isVegan: boolean
  isVegetarian: boolean
  isLactoseFree: boolean
}

const INITIAL_STATE: MealsState = {
  list: mealsData,
  filters: {
    isGlutenFree: false,
    isVegan: false,
    isVegetarian: false,
    isLactoseFree: false
  },
  filtered: mealsData,
  favorites: []
}

const slice = createSlice({
  name: "meals",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavorite, toggleFavoriteReducer)
      .addCase(setFilter, setFilterReducer)
  }
})

export const meals = slice.reducer
