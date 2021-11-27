import React, { FC } from "react"
import { Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { NavigatorScreenParams } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import {
  MealsNavigator,
  MealsNavigatorParams,
  FavoritesNavigator,
  FavoritesNavigatorParams
} from "../stack"
import { Colors, Fonts } from "../../theme"


export type TabNavigatorParams = {
  "meals-tab": NavigatorScreenParams<MealsNavigatorParams>
  "favorites-tab": NavigatorScreenParams<FavoritesNavigatorParams>
}

const Tab = createBottomTabNavigator<TabNavigatorParams>()

export const TabNavigator: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={(props) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.accent,
        tabBarLabelStyle: {
          fontFamily: Fonts.regular
        },
        headerStyle: { backgroundColor: Platform.OS === "ios" ? Colors.white : Colors.primary },
        headerTintColor: Platform.OS === "ios" ? Colors.primary : Colors.white,
        tabBarIcon: ({ color, size, focused }) => {
          if (props.route.name === "meals-tab") {
            return (
              <Ionicons
                name="ios-restaurant"
                color={color}
                size={size}
              />
            )
          }
          return (
            <Ionicons
              name="ios-star"
              color={color}
              size={size}
            />
          )
        }
      })}
    >
      <Tab.Screen
        name="meals-tab"
        component={MealsNavigator}
        options={{
          tabBarLabel: "Meals"
        }}
      />
      <Tab.Screen
        name="favorites-tab"
        component={FavoritesNavigator}
        options={{
          tabBarLabel: "Favorites"
        }}
      />
    </Tab.Navigator>
  )
}
