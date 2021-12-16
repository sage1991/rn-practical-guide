import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { Colors, Fonts } from "../../theme"
import { CartScreen, ProductDetailScreen, ProductOverviewScreen } from "../../screens/shop"


export type ProductNavigatorParams = {
  overview: undefined
  "product-detail": { id: string }
  cart: undefined
}

const Stack = createStackNavigator<ProductNavigatorParams>()

export const ProductNavigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.white },
        headerTintColor: Colors.primary,
        headerTitleStyle: { fontFamily: Fonts.bold },
        headerBackTitleStyle: { fontFamily: Fonts.regular }
      }}
    >
      <Stack.Screen
        name="overview"
        component={ProductOverviewScreen}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name="cart"
        component={CartScreen}
        options={{ headerTitle: "Your Cart" }}
      />
    </Stack.Navigator>
  )
}
