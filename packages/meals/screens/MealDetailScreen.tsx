import React, { FC, useLayoutEffect } from "react"
import { StyleSheet, View, ScrollView, Image } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import { FavoritesNavigatorParams, MealsNavigatorParams, ScreenProps } from "../navigation"
import { Typography } from "../components/Typography"
import { Colors, Fonts } from "../theme"
import { useDispatch, useSelector, toggleFavorite } from "../store"
import { HeaderButton } from "../components"


type Props = ScreenProps<MealsNavigatorParams | FavoritesNavigatorParams, "meal-detail">

export const MealDetailScreen: FC<Props> = (props) => {
  const mealId = props.route.params.id
  const dispatch = useDispatch()
  const meal = useSelector(state => (
    state.meals.list.find(meal => meal.id === mealId)!
  ))
  const isFavorite = useSelector(state => (
    state.meals.favorites.some(meal => meal.id === mealId)
  ))

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: meal.title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="favorite"
            iconName={isFavorite ? "ios-star" : "ios-star-outline"}
            onPress={() => dispatch(toggleFavorite(meal.id))}
          />
        </HeaderButtons>
      )
    })
  }, [ isFavorite, meal, props.navigation ])

  const ingredients: JSX.Element[] = meal.ingredients.map((ingredient, index) =>
    <View key={index} style={styles.listItem}>
      <Typography>
        { `${index + 1}. ${ingredient}` }
      </Typography>
    </View>
  )

  const steps: JSX.Element[] = meal.steps.map((step, index) =>
    <View key={index} style={styles.listItem}>
      <Typography>
        { `${index + 1}. ${step}` }
      </Typography>
    </View>
  )

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: meal.imageUrl }}
      />
      <View style={styles.details}>
        <Typography>
          { `${meal.duration}m` }
        </Typography>
        <Typography>
          { meal.complexity.toUpperCase() }
        </Typography>
        <Typography>
          { meal.affordability.toUpperCase() }
        </Typography>
      </View>
      <Typography style={styles.title}>Ingredients</Typography>
      { ingredients }
      <Typography style={styles.title}>Steps</Typography>
      { steps }
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    textAlign: "center",
    marginTop: 15,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 10
  }
})
