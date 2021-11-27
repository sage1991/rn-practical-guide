import React, { FC } from "react"
import { NavigatorScreenParams } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import { TabNavigator, TabNavigatorParams } from "./tab"
import { FiltersScreen } from "../screens"
import { HeaderButton } from "../components"
import { Colors, Fonts } from "../theme"


export type RootNavigatorParams = {
  tab: NavigatorScreenParams<TabNavigatorParams>
  filters: undefined
}

const Drawer = createDrawerNavigator<RootNavigatorParams>()

export const RootNavigator: FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
        drawerLabelStyle: {
          fontFamily: Fonts.regular
        }
      }}
    >
      <Drawer.Screen
        name="tab"
        component={TabNavigator}
        options={{ drawerLabel: "Meals" }}
      />
      <Drawer.Screen
        name="filters"
        component={FiltersScreen}
        options={props => {
          return {
            drawerLabel: "Filters",
            headerShown: true,
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
    </Drawer.Navigator>
  )
}
