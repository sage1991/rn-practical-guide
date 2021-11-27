import React, { FC } from "react"
import { FlatList, ListRenderItem } from "react-native"

import { MealsNavigatorParams, ScreenProps } from "../navigation"
import { CategoryGridTile } from "../components"
import { categories } from "../__mock__"
import { Category } from "../models"


type Props = ScreenProps<MealsNavigatorParams, "categories">

export const CategoriesScreen: FC<Props> = (props) => {
  const navigateWithId = (id: number) => () => props.navigation.navigate({
    name: "category-meals",
    params: { id }
  })

  const renderItem: ListRenderItem<Category> = ({ item }) => {
    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onPress={navigateWithId(item.id)}
      />
    )
  }

  return (
    <FlatList
      numColumns={2}
      data={categories}
      renderItem={renderItem}
    />
  )
}
