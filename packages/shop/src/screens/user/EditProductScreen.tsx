import React, { FC, useLayoutEffect } from "react"
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  Keyboard
} from "react-native"
import { CompositeScreenProps } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import { AdminNavigatorParams, ShopNavigatorParams } from "../../navigation"
import { Products, useDispatch, useSelector } from "../../store"
import { HeaderButton, Input } from "../../components/ui"
import { Product } from "../../models"
import { useInput } from "../../hooks"


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

  const title = useInput(product?.title, isNotEmpty)
  const imageUrl = useInput(product?.imageUrl, isValidUrl)
  const price = useInput(product?.price.toString(), isNumber)
  const description = useInput(product?.description, isNotEmpty)
  const submittable = title.valid && imageUrl.valid && price.valid && description.valid

  const submit = () => {
    if (!submittable) {
      Alert.alert(
        "Wrong input!",
        "Please check the error in the form",
        [ { text: "Okay", style: "default" } ]
      )
      return
    }

    const __product: Product = {
      id: isAdd ? Date.now() : product!.id,
      ownerId: 1,
      title: title.value,
      price: +price.value,
      imageUrl: imageUrl.value,
      description: description.value
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView>
          <View style={styles.form}>
            <Input
              label="Title"
              value={title.value}
              onChangeText={title.set}
              error={title.error}
              errorText="Please enter a valid title!"
              keyboardType="default"
              returnKeyType="next"
            />
            <Input
              label="Image Url"
              value={imageUrl.value}
              onChangeText={imageUrl.set}
              error={imageUrl.error}
              errorText="Please enter a valid image url!"
              keyboardType="default"
              returnKeyType="next"
            />
            {
              isAdd &&
              <Input
                label="Price"
                value={price.value}
                onChangeText={price.set}
                error={price.error}
                errorText="Please enter a valid price!"
                keyboardType="numbers-and-punctuation"
                returnKeyType="next"
              />
            }
            <Input
              label="Description"
              value={description.value}
              onChangeText={description.set}
              error={description.error}
              errorText="Please enter a valid description!"
              keyboardType="default"
              returnKeyType="default"
              autoCapitalize="sentences"
              numberOfLines={3}
              multiline
              autoCorrect
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  }
})

const isNotEmpty = (text: string) => !!text.trim()
const isValidUrl = (text: string) => /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(text)
const isNumber = (text: string) => /^(\d+)(.\d+)?$/g.test(text)
