import React, { FC } from "react"
import { StyleSheet, View, ScrollView, Image } from "react-native"

import { FavoritesNavigatorParams, MealsNavigatorParams, ScreenProps } from "../navigation"
import { Typography } from "../components/Typography"
import { Colors, Fonts } from "../theme"
import { meals } from "../__mock__"


type Props = ScreenProps<MealsNavigatorParams | FavoritesNavigatorParams, "meal-detail">

export const MealDetailScreen: FC<Props> = (props) => {
  const meal = meals.find(meal => meal.id === props.route.params.id)!

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
