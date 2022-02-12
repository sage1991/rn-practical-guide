import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import MapView, { Marker, MapEvent, Region } from "react-native-maps"
import { StackScreenProps } from "@react-navigation/stack"

import { PlacesNavigatorParams } from "../navigation"
import { Colors } from "../theme/colors"
import { Location } from "../model/Location"


type Props = StackScreenProps<PlacesNavigatorParams, "map">

export const MapScreen: FC<Props> = (props) => {
  const [ location, setLocation ] = useState<Location>()
  const region: Region = {
    latitude: props.route.params.location?.lat ?? 37.78,
    longitude: props.route.params.location?.lng ?? -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  useEffect(() => {
    if (props.route.params.location) {
      setLocation(props.route.params.location)
    }
  }, [ props.route.params.location ])

  const saveLocation = useCallback(() => {
    if (props.route.params.readonly) return
    props.navigation.navigate({ name: "new-place", params: { location } })
  }, [ location, props.route.params.readonly ])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: (headerProps) => (
        <TouchableOpacity style={styles.headerButton} onPress={saveLocation}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      )
    })
  } , [ saveLocation ])

  const selectLocation = (e: MapEvent) => {
    if (props.route.params.readonly) return
    setLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude
    })
  }

  return (
    <MapView
      style={styles.root}
      initialRegion={region}
      onPress={selectLocation}>
      {
        location &&
        <Marker
          title="picked location"
          coordinate={{ latitude: location.lat, longitude: location.lng }}
        />
      }
    </MapView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Colors.primary
  }
})
