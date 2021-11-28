import React, { FC } from "react"
import { Platform } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import { CategoriesScreen, CategoryMealsScreen, MealDetailScreen } from "../../screens"
import { HeaderButton } from "../../components"
import { Colors, Fonts } from "../../theme"


export type MealsNavigatorParams = {
  categories: undefined
  "category-meals": { id: number }
  "meal-detail": { id: number }
}

const Stack = createStackNavigator<MealsNavigatorParams>()

export const MealsNavigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "ios" ? Colors.white : Colors.primary
        },
        headerTitleStyle: {
          fontFamily: Fonts.bold
        },
        headerBackTitleStyle: {
          fontFamily: Fonts.regular
        },
        headerTintColor: Platform.OS === "ios" ? Colors.primary : Colors.white
      }}
    >
      <Stack.Screen
        name="categories"
        component={CategoriesScreen}
        options={props => {
          return {
            headerTitle: "Meal Categories",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="menu"
                  iconName="ios-menu"
                  onPress={props.navigation.toggleDrawer}
                />
              </HeaderButtons>
            )
          }
        }}
      />
      <Stack.Screen
        name="category-meals"
        component={CategoryMealsScreen}
      />
      <Stack.Screen
        name="meal-detail"
        component={MealDetailScreen}
      />
    </Stack.Navigator>
  )
}
