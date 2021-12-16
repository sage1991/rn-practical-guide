import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { EditProductScreen, UserProductsScreen } from "../../screens/user"
import { Colors, Fonts } from "../../theme"


export type AdminNavigatorParams = {
  admin: undefined
  edit?: { id: string }
}

const Stack = createStackNavigator<AdminNavigatorParams>()

export const AdminNavigator: FC = () => {
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
        name="admin"
        component={UserProductsScreen}
      />
      <Stack.Screen
        name="edit"
        component={EditProductScreen}
      />
    </Stack.Navigator>
  )
}
