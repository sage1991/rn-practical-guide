import React, { FC } from "react"
import { Button, FlatList, ListRenderItem, StyleSheet, View } from "react-native"
import { CompositeScreenProps } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"

import { CartItem } from "../../components/shop"
import { Card, Typography } from "../../components/ui"
import { CartItem as CartItemModel } from "../../models"
import { Cart, useDispatch, useSelector } from "../../store"
import { Colors } from "../../theme"
import { ProductNavigatorParams, ShopNavigatorParams } from "../../navigation"
import { Orders } from "../../store/orders"


type Props = CompositeScreenProps<
  StackScreenProps<ProductNavigatorParams, "cart">,
  DrawerScreenProps<ShopNavigatorParams>
>

export const CartScreen: FC<Props> = () => {
  const items = useSelector(state => state.cart.items)
  const amount = useSelector(state => state.cart.amount)
  const dispatch = useDispatch()

  const order = () => {
    dispatch(Orders.add({
      id: Date.now(),
      amount: amount,
      items: items,
      date: new Date().toISOString()
    }))
    dispatch(Cart.clear())
  }

  const removeItem = (id: number) => () => {
    dispatch(Cart.remove(id))
  }

  const renderItem: ListRenderItem<CartItemModel> = ({ item }) => {
    return (
      <CartItem
        title={item.title}
        quantity={item.quantity}
        amount={item.sum}
        removeItem={removeItem(item.id)}
        deletable
      />
    )
  }

  return (
    <View style={styles.root}>
      <Card style={styles.summary}>
        <Typography variant="bold" style={styles.summaryText}>
          Total: <Typography style={styles.amount}>${ amount.toFixed(2) }</Typography>
        </Typography>
        <Button
          title="Order Now"
          onPress={order}
          color={Colors.accent}
        />
      </Card>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={items}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontSize: 18
  },
  amount: {
    color: Colors.accent
  },
  list: {
    overflow: "visible"
  },
  listContainer: {
    flexGrow: 1,
    padding: 0,
  }
})
