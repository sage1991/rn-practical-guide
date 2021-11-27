import React, { FC } from "react"

import { MealsNavigatorParams, ScreenProps } from "../navigation"
import { MealList } from "../components"
import { meals } from "../__mock__"


type Props = ScreenProps<MealsNavigatorParams, "category-meals">

export const CategoryMealsScreen: FC<Props> = (props) => {
  const categoryMeals = meals.filter(meal => meal.categoryIds.includes(props.route.params.id))

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
