import React, { FC, useLayoutEffect } from "react"
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { CompositeScreenProps } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"

import { ProductNavigatorParams, ShopNavigatorParams } from "../../navigation"
import { Cart, useDispatch, useSelector } from "../../store"
import { Colors } from "../../theme"


type Props = CompositeScreenProps<
  StackScreenProps<ProductNavigatorParams, "product-detail">,
  DrawerScreenProps<ShopNavigatorParams>
>

export const ProductDetailScreen: FC<Props> = (props) => {
  const id = props.route.params.id
  const dispatch = useDispatch()
  const product = useSelector(state => (
    state.products.available.find(product => product.id === id)!
  ))

  useLayoutEffect(() => {
    props.navigation.setOptions({ headerTitle: product.title })
  }, [ props.route.params.id ])

  const addToCart = () => dispatch(Cart.add(product))

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title="Add To Cart"
          onPress={addToCart}
          color={Colors.primary}
        />
      </View>
      <Text style={styles.price}>${ product.price.toFixed(2) }</Text>
      <Text style={styles.description}>{ product.description }</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: "center"
  },
  price: {
    fontSize: 20,
    color: Colors.gray,
    textAlign: "center",
    marginVertical: 20
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20
  }
})
