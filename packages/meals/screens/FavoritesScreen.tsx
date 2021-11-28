import React, { FC } from "react"

import { FavoritesNavigatorParams, ScreenProps } from "../navigation"
import { MealList } from "../components"
import { useSelector } from "../store"
import { StyleSheet, View } from "react-native"
import { Typography } from "../components/Typography"


type Props = ScreenProps<FavoritesNavigatorParams, "favorites">

export const FavoritesScreen: FC<Props> = (props) => {
  const favorites = useSelector(state => state.meals.favorites)

  const navigate = (id: number) => props.navigation.navigate({
    name: "meal-detail",
    params: { id }
  })

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Typography>
          No favorite meals found. Start adding some!
        </Typography>
      </View>
    )
  }

  return (
    <MealList
      items={favorites}
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
