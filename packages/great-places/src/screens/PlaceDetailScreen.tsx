import React, { FC } from "react"
import { View, Text, StyleSheet, ScrollView, Image } from "react-native"
import { MapPreview } from "../components/place/MapPreview"
import { StackScreenProps } from "@react-navigation/stack"
import { PlacesNavigatorParams } from "../navigation"
import { useSelector } from "../store"
import { Colors } from "../theme/colors"


type Props = StackScreenProps<PlacesNavigatorParams, "places-detail">

export const PlaceDetailScreen: FC<Props> = (props) => {
  const place = useSelector((state) => (
    state.place.places.find(place => place.id === props.route.params.id)!
  ))

  const showMap = () => props.navigation.navigate({
    name: "map",
    params: {
      readonly: true,
      location: { lat: place.lat, lng: place.lng }
    }
  })

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Image style={styles.image} source={{ uri: place.image }} />
      <View style={styles.mapContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{ place.address }</Text>
        </View>
        <MapPreview style={styles.map} location={{ lng: place.lng, lat: place.lat }} onPress={showMap} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center"
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#cccccc"
  },
  mapContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
    alignItems: "center"
  },
  map: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
})
