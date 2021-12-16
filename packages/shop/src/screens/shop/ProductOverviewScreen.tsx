import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { ActivityIndicator, Button, FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from "react-native"
import { CompositeScreenProps } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import { ProductNavigatorParams, ShopNavigatorParams } from "../../navigation"
import { useDispatch, useSelector, Cart, Products } from "../../store"
import { HeaderButton, Typography } from "../../components/ui"
import { ProductItem } from "../../components/shop"
import { Product } from "../../models"
import { Colors } from "../../theme"


type Props = CompositeScreenProps<
  StackScreenProps<ProductNavigatorParams, "overview">,
  DrawerScreenProps<ShopNavigatorParams>
>

export const ProductOverviewScreen: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.available)
  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)
  const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false)

  const initProducts = useCallback(() => {
    setIsRefreshing(true)
    dispatch(Products.init())
      .finally(() => setIsRefreshing(false))
  }, [])

  useEffect(() => {
    props.navigation.addListener("focus", initProducts)
    return () => props.navigation.removeListener("focus", initProducts)
  }, [ initProducts ])

  useLayoutEffect(() => {
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

  if (products.length === 0 && loading) {
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
          onPress={initProducts}
          color={Colors.primary}
        />
      </View>
    )
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      refreshControl={(
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={initProducts}
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
