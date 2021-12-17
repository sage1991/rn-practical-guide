import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import {
  ActivityIndicator,
  Button,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View
} from "react-native"
import { CompositeScreenProps } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import dayjs from "dayjs"

import { useDispatch, useSelector } from "../../store"
import { Order } from "../../models/order"
import { OrdersNavigatorParams, ShopNavigatorParams } from "../../navigation"
import { HeaderButton, Typography } from "../../components/ui"
import { CartItem, OrderItem } from "../../components/shop"
import { Orders } from "../../store/orders"
import { Colors } from "../../theme"


type Props = CompositeScreenProps<
  StackScreenProps<OrdersNavigatorParams, "orders">,
  DrawerScreenProps<ShopNavigatorParams>
>

export const OrdersScreen: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders.list)
  const loading = useSelector(state => state.orders.loading)
  const error = useSelector(state => state.orders.error)
  const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false)

  const fetchOrders = useCallback(() => dispatch(Orders.init()), [])
  const refresh = useCallback(() => {
    setIsRefreshing(true)
    dispatch(Orders.init())
      .finally(() => setIsRefreshing(false))
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [ fetchOrders ])

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

  if (orders.length === 0 && loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Typography>An Error occurred!</Typography>
        <Button
          title="Try again"
          onPress={fetchOrders}
          color={Colors.primary}
        />
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      refreshControl={(
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refresh}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
