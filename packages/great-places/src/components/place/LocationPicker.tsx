import React, { FC, useEffect, useState } from "react"
import {
  View,
  Button,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator
} from "react-native"
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location"

import { Colors } from "../../theme/colors"
import { MapPreview } from "./MapPreview"
import { Location } from "../../model/Location"


interface Props {
  location?: Location
  pickLocationOnMap: () => void
  selectLocation: (location: Location) => void
}

export const LocationPicker: FC<Props> = (props) => {
  const [ isFetching, setIsFetching ] = useState<boolean>(false)
  const [ location, setLocation ] = useState<Location>()

  useEffect(() => {
    if (props.location) {
      setLocation(props.location)
      props.selectLocation(props.location)
    }
  }, [ props.location ])

  const getLocation = async () => {
    const permission = await requestForegroundPermissionsAsync()
    if (!permission.granted) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permission to use this app"
      )
      return
    }

    try {
      setIsFetching(true)
      const { coords } = await getCurrentPositionAsync({ timeInterval: 5000 })
      const location: Location = { lat: coords.latitude, lng: coords.longitude }
      setLocation(location)
      props.selectLocation(location)
    } catch (e) {
      Alert.alert(
        "Fail to fetch location!",
        "Please try again later or pick a location on the map."
      )
    }
    setIsFetching(false)
  }

  return (
    <View style={styles.root}>
      <MapPreview
        style={styles.preview}
        location={location}
        fallback={(
          isFetching
            ? <ActivityIndicator size="large" color={Colors.primary} />
            : <Text>No location chosen yet!</Text>
        )}
        onPress={props.pickLocationOnMap}
      />
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocation}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={props.pickLocationOnMap}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 15
  },
  preview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#cccccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
})
