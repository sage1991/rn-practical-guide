import React, { FC, useLayoutEffect } from "react"
import { FlatList, ListRenderItem, Text } from "react-native"
import { CompositeScreenProps } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import dayjs from "dayjs"

import { useSelector } from "../../store"
import { Order } from "../../models/order"
import { OrdersNavigatorParams, ShopNavigatorParams } from "../../navigation"
import { HeaderButton } from "../../components/ui"
import { CartItem, OrderItem } from "../../components/shop"


type Props = CompositeScreenProps<
  StackScreenProps<OrdersNavigatorParams, "orders">,
  DrawerScreenProps<ShopNavigatorParams>
>

export const OrdersScreen: FC<Props> = (props) => {
  const orders = useSelector(state => state.orders.list)

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Your Orders",
      headerLeft: headerProps => (
        <HeaderButtons
          {...headerProps}
          HeaderButtonComponent={HeaderButton}
        >
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={props.navigation.toggleDrawer}
          />
        </HeaderButtons>
      )
    })
  }, [])

  const renderItem: ListRenderItem<Order> = ({ item }) => {
    return (
      <OrderItem
        amount={item.amount}
        date={dayjs(item.date).format("YYYY-MM-DD HH:mm")}
      >
        {
          item.items.map((cart) => (
            <CartItem
              key={cart.id}
              quantity={cart.quantity}
              title={cart.title}
              amount={cart.sum}
            />
          ))
        }
      </OrderItem>
    )
  }

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
    />
  )
}
