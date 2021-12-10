import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { Colors, Fonts } from "../../theme"
import { OrdersScreen } from "../../screens/shop"


export type OrdersNavigatorParams = {
  orders: undefined
}

const Stack = createStackNavigator<OrdersNavigatorParams>()

export const OrdersNavigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.white },
        headerTintColor: Colors.primary,
        headerTitleStyle: { fontFamily: Fonts.bold },
        headerBackTitleStyle: { fontFamily: Fonts.bold }
      }}
    >
      <Stack.Screen
        name="orders"
        component={OrdersScreen}
      />
    </Stack.Navigator>
  )
}
