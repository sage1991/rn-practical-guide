import React, { FC, useCallback } from "react"
import { createDrawerNavigator, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { NavigatorScreenParams } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView, View } from "react-native"

import { ProductNavigator, ProductNavigatorParams } from "./ProductNavigator"
import { OrdersNavigator, OrdersNavigatorParams } from "./OrdersNavigator"
import { AdminNavigator, AdminNavigatorParams } from "./AdminNavigator"
import { Colors } from "../../theme"
import { Auth, useDispatch } from "../../store"


export type ShopNavigatorParams = {
  "product-stack": NavigatorScreenParams<ProductNavigatorParams>
  "orders-stack": NavigatorScreenParams<OrdersNavigatorParams>
  "admin-stack": NavigatorScreenParams<AdminNavigatorParams>
}

const Drawer = createDrawerNavigator<ShopNavigatorParams>()

export const ShopNavigator: FC = () => {
  const dispatch = useDispatch()

  const logout = useCallback(() => dispatch(Auth.logout()), [])

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: Colors.primary,
        headerShown: false,
      }}
      drawerContent={props => {
        return (
          <SafeAreaView>
            <DrawerItemList {...props} />
            <DrawerItem
              {...props}
              label="logout"
              onPress={logout}
              icon={iconProps => (
                <Ionicons
                  {...iconProps}
                  name="log-out-outline"
                  size={23}
                />
              )}
            />
          </SafeAreaView>
        )
      }}
    >
      <Drawer.Screen
        name="product-stack"
        component={ProductNavigator}
        options={{
          title: "Product",
          drawerIcon: props => (
            <Ionicons
              {...props}
              name="ios-cart"
              size={23}
            />
          )
        }}
      />
      <Drawer.Screen
        name="orders-stack"
        component={OrdersNavigator}
        options={{
          title: "Orders",
          drawerIcon: props => (
            <Ionicons
              {...props}
              name="ios-list"
              size={23}
            />
          )
        }}
      />
      <Drawer.Screen
        name="admin-stack"
        component={AdminNavigator}
        options={{
          title: "Admin",
          drawerIcon: props => (
            <Ionicons
              {...props}
              name="ios-create"
              size={23}
            />
          )
        }}
      />
    </Drawer.Navigator>
  )
}
