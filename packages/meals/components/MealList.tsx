import React, { FC } from "react"
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native"

import { Meal } from "../models/meal"
import { MealItem } from "./MealItem"


interface Props {
  items: Meal[]
  onMealItemPress: (id: number) => void
}

export const MealList: FC<Props> = (props) => {
  const renderItem: ListRenderItem<Meal> = ({ item }) => {
    return (
      <MealItem
        title={item.title}
        duration={item.duration}
        complexity={item.complexity}
        affordability={item.affordability}
        imageUrl={item.imageUrl}
        onPress={() => props.onMealItemPress(item.id)}
      />
    )
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={props.items}
        renderItem={renderItem}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 10
  }
})
