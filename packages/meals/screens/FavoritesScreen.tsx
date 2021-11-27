import React, { FC } from "react"

import { FavoritesNavigatorParams, ScreenProps } from "../navigation"
import { MealList } from "../components"
import { meals } from "../__mock__"


type Props = ScreenProps<FavoritesNavigatorParams, "favorites">

export const FavoritesScreen: FC<Props> = (props) => {
  const categoryMeals = meals.filter(meal => meal.id === 1 || meal.id === 2)

  const navigate = (id: number) => props.navigation.navigate({
    name: "meal-detail",
    params: { id }
  })

  return (
    <MealList
      items={categoryMeals}
      onMealItemPress={navigate}
    />
  )
}
