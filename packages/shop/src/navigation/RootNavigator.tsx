import React, { FC } from "react"
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { ShopNavigator, ShopNavigatorParams } from "./shop"
import { StartupScreen } from "../screens/intro"
import { AuthScreen } from "../screens/user"
import { useSelector } from "../store"


export type RootNavigatorParams = {
  intro: undefined
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
          <>
            <Stack.Screen
              name="intro"
              component={StartupScreen}
              options={{
                headerTitle: "Authenticate"
              }}
            />
            <Stack.Screen
              name="auth"
              component={AuthScreen}
              options={{
                headerTitle: "Authenticate"
              }}
            />
          </>
        }
        {
          !!token &&
          <Stack.Screen name="shop" component={ShopNavigator} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
