import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { Filters, MealsState } from "./slice"

export const toggleFavoriteReducer: CaseReducer<MealsState, PayloadAction<number>> = (state, action) => {
  const meal = state.list.find(meal => meal.id === action.payload)!

  const isFavoriteMeals = state.favorites.some(favorite => favorite.id === meal.id)
  if (isFavoriteMeals) {
    state.favorites = state.favorites.filter(favorite => favorite.id !== meal.id)
    return
  }

  state.favorites.push(meal)
}

export const setFilterReducer: CaseReducer<MealsState, PayloadAction<Filters>> = (state, action) => {
  state.filters = action.payload
  state.filtered = state.list.filter(meal => {
    if (action.payload.isGlutenFree && !meal.isGlutenFree) {
      return false
    }
    if (action.payload.isVegan && !meal.isVegan) {
      return false
    }
    if (action.payload.isVegetarian && !meal.isVegetarian) {
      return false
    }
    if (action.payload.isLactoseFree && !meal.isLactoseFree) {
      return false
    }
    return true
  })
}
