import React, { FC, useLayoutEffect } from "react"
import { Button, FlatList, ListRenderItem } from "react-native"
import { CompositeScreenProps } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import { ProductNavigatorParams, ShopNavigatorParams } from "../../navigation"
import { useDispatch, useSelector, Cart, Products } from "../../store"
import { ProductItem } from "../../components/shop"
import { Product } from "../../models"
import { Colors } from "../../theme"
import { HeaderButton } from "../../components/ui"


type Props = CompositeScreenProps<
  StackScreenProps<ProductNavigatorParams, "overview">,
  DrawerScreenProps<ShopNavigatorParams>
>

export const ProductOverviewScreen: FC<Props> = (props) => {
  const products = useSelector(state => state.products.available)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(Products.init())

    props.navigation.setOptions({
      headerTitle: "All Products",
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
            title="Cart"
            iconName="ios-cart"
            onPress={() => props.navigation.navigate("cart")}
          />
        </HeaderButtons>
      )
    })
  }, [])

  const viewDetail = (id: string) => () => {
    props.navigation.navigate("product-detail", { id })
  }

  const addToCart = (product: Product) => () => {
    dispatch(Cart.add(product))
  }

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    return (
        <ProductItem
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onSelect={viewDetail(item.id)}
          actions={(
            <>
              <Button
                title="View Details"
                onPress={viewDetail(item.id)}
                color={Colors.primary}
              />
              <Button
                title="To Cart"
                onPress={addToCart(item)}
                color={Colors.primary}
              />
            </>
          )}
        />
    )
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
    />
  )
}
