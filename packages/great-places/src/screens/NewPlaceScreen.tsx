import React, { FC, useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { Colors } from "../theme/colors"
import { PlaceAction, useDispatch } from "../store"
import { PlacesNavigatorParams } from "../navigation"
import { ImagePicker } from "../components/place"
import { LocationPicker } from "../components/place/LocationPicker"
import { Location } from "../model/Location"


type Props = StackScreenProps<PlacesNavigatorParams, "new-place">

export const NewPlaceScreen: FC<Props> = (props) => {
  const [ title, setTitle ] = useState<string>("")
  const [ image, setImage ] = useState<string>("")
  const [ selectedLocation, setSelectedLocation ] = useState<Location>({ lat: 0, lng: 0 })
  const dispatch = useDispatch()

  const savePlace = () => {
    dispatch(PlaceAction.add({ title, image, address: "", lat: selectedLocation.lat, lng: selectedLocation.lng }))
    props.navigation.goBack()
  }

  const onImageTaken = (image: string) => setImage(image)
  const showMap = () => props.navigation.navigate({ name: "map", params: { readonly: false } })
  const selectLocation = (location: Location) => setSelectedLocation(location)

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>
          Title
        </Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <ImagePicker
          image={image}
          onImageTaken={onImageTaken}
        />
        <LocationPicker
          location={props.route.params?.location}
          pickLocationOnMap={showMap}
          selectLocation={selectLocation}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlace}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  input: {
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
})
