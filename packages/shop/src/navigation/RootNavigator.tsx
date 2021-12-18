import React, { FC } from "react"
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"

import { ShopNavigator, ShopNavigatorParams } from "./shop"
import { createStackNavigator } from "@react-navigation/stack"
import { AuthScreen } from "../screens/user/AuthScreen"
import { useSelector } from "../store"

export type RootNavigatorParams = {
  auth: undefined
  shop: NavigatorScreenParams<ShopNavigatorParams>
}

const Stack = createStackNavigator<RootNavigatorParams>()

export const RootNavigator: FC = () => {
  const token = useSelector(state => state.auth.token)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          !token &&
          <Stack.Screen
            name="auth"
            component={AuthScreen}
            options={{
              headerTitle: "Authenticate"
            }}
          />
        }
        {
          !!token &&
          <Stack.Screen name="shop" component={ShopNavigator} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
