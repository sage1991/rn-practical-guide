import React, { FC, useLayoutEffect, useState } from "react"
import { ScrollView, StyleSheet, TextInput, View } from "react-native"
import { CompositeScreenProps } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import { AdminNavigatorParams, ShopNavigatorParams } from "../../navigation"
import { Products, useDispatch, useSelector } from "../../store"
import { HeaderButton, Typography } from "../../components/ui"
import { Colors } from "../../theme"
import { Product } from "../../models"


type Props = CompositeScreenProps<
  StackScreenProps<AdminNavigatorParams, "edit">,
  DrawerScreenProps<ShopNavigatorParams>
>

export const EditProductScreen: FC<Props> = (props) => {
  const id = props.route.params?.id
  const isAdd = !id

  const dispatch = useDispatch()
  const product = useSelector(state => (
    state.products.available.find(product => product.id === id)
  ))

  const [ title, setTitle ] = useState<string>(product ? product.title : "")
  const [ imageUrl, setImageUrl ] = useState<string>(product ? product.imageUrl : "")
  const [ price, setPrice ] = useState<string>(product ? `${product.price}` : "")
  const [ description, setDescription ] = useState<string>(product ? product.description : "")

  const submit = () => {
    const __product: Product = {
      id: isAdd ? Date.now() : product!.id,
      ownerId: 1,
      title: title,
      price: +price,
      imageUrl: imageUrl,
      description: description
    }
    dispatch(isAdd ? Products.create(__product) : Products.update(__product))
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: product ? "Edit Product" : "Add Product",
      headerRight: buttonProps => (
        <HeaderButtons
          {...buttonProps}
          HeaderButtonComponent={HeaderButton}
        >
          <Item
            title="Save"
            iconName="ios-checkmark"
            onPress={submit}
          />
        </HeaderButtons>
      )
    })
  }, [ product, submit ])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.control}>
          <Typography
            variant="bold"
            style={styles.label}
          >
            Title
          </Typography>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.control}>
          <Typography
            variant="bold"
            style={styles.label}
          >
            Image Url
          </Typography>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
          />
        </View>
        {
          isAdd &&
          <View style={styles.control}>
            <Typography
              variant="bold"
              style={styles.label}
            >
              Price
            </Typography>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
            />
          </View>
        }
        <View style={styles.control}>
          <Typography
            variant="bold"
            style={styles.label}
          >
            Description
          </Typography>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  control: {
    width: "100%",
    marginBottom: 10
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1
  }
})
