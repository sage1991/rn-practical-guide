import React, { FC, useLayoutEffect } from "react"
import { Button, FlatList, ListRenderItem, Alert } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { CompositeScreenProps } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"

import { AdminNavigatorParams, ShopNavigatorParams } from "../../navigation"
import { Cart, Products, useDispatch, useSelector } from "../../store"
import { Product } from "../../models"
import { ProductItem } from "../../components/shop"
import { HeaderButton } from "../../components/ui"
import { Colors } from "../../theme"


type Props = CompositeScreenProps<
  StackScreenProps<AdminNavigatorParams, "admin">,
  DrawerScreenProps<ShopNavigatorParams>
>

export const UserProductsScreen: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.user)

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: "Your Products",
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
      ),
      headerRight: headerProps => (
        <HeaderButtons
          {...headerProps}
          HeaderButtonComponent={HeaderButton}
        >
          <Item
            title="Menu"
            iconName="ios-create"
            onPress={() =>  props.navigation.navigate("edit")}
          />
        </HeaderButtons>
      )
    })
  }, [])

  const viewEdit = (id: number) => () => {
    props.navigation.navigate("edit", { id })
  }

  const deleteItem = (id: number) => () => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete this item?",
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            dispatch(Products.remove(id))
            dispatch(Cart.removeAll(id))
          }
        }
      ]
    )
  }

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    return (
      <ProductItem
        id={item.id}
        title={item.title}
        price={item.price}
        image={item.imageUrl}
        onSelect={viewEdit(item.id)}
        actions={(
          <>
            <Button
              title="Edit"
              onPress={viewEdit(item.id)}
              color={Colors.primary}
            />
            <Button
              title="Delete"
              onPress={deleteItem(item.id)}
              color={Colors.primary}
            />
          </>
        )}
      />
    )
  }

  return (
    <FlatList data={products} renderItem={renderItem} />
  )
}
