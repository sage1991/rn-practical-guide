import React, { FC } from "react"
import { Platform } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import { FavoritesScreen, MealDetailScreen } from "../../screens"
import { Colors, Fonts } from "../../theme"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { HeaderButton } from "../../components"


export type FavoritesNavigatorParams = {
  favorites: undefined
  "meal-detail": { id: number }
}

const Stack = createStackNavigator<FavoritesNavigatorParams>()

export const FavoritesNavigator: FC = () => {
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
        name="favorites"
        component={FavoritesScreen}
        options={props => {
          return {
            headerTitle: "Your Favorites",
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
      <Stack.Screen name="meal-detail" component={MealDetailScreen} />
    </Stack.Navigator>
  )
}
