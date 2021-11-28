import { createAction } from "@reduxjs/toolkit"
import { Filters } from "./slice"


export const toggleFavorite = createAction<number>("meals/toggleFavorite")

export const setFilter = createAction<Filters>("meals/setFilter")
