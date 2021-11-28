import React, { FC, useLayoutEffect } from "react"

import { MealsNavigatorParams, ScreenProps } from "../navigation"
import { MealList } from "../components"
import { useSelector } from "../store"
import { categories } from "../__mock__"
import { StyleSheet, View } from "react-native"
import { Typography } from "../components/Typography"


type Props = ScreenProps<MealsNavigatorParams, "category-meals">

export const CategoryMealsScreen: FC<Props> = (props) => {
  useLayoutEffect(() => {
    const category = categories.find(category => category.id === props.route.params.id)!
    props.navigation.setOptions({
      headerTitle: category.title,
    })
  }, [ props.navigation ])

  const categoryMeals = useSelector((state) => (
    state.meals.filtered.filter(meal => meal.categoryIds.includes(props.route.params.id))
  ))

  const navigate = (id: number) => props.navigation.navigate({
    name: "meal-detail",
    params: { id }
  })

  if (categoryMeals.length === 0) {
    return (
      <View style={styles.empty}>
        <Typography>
          No meals found.
        </Typography>
      </View>
    )
  }

  return (
    <MealList
      items={categoryMeals}
      onMealItemPress={navigate}
    />
  )
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
