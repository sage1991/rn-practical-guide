import React, { FC, useState } from "react"
import {
  View,
  Button,
  Text,
  Alert,
  StyleSheet, ActivityIndicator
} from "react-native"
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location"

import { Colors } from "../../theme/colors"
import { MapPreview } from "./MapPreview"


export const LocationPicker: FC = (props) => {
  const [ isFetching, setIsFetching ] = useState<boolean>(false)
  const [ location, setLocation ] = useState<{ lat: number, lng: number }>()

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
      setLocation({ lat: coords.latitude, lng: coords.longitude })
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
        location={location}
        fallback={(
          isFetching
            ? <ActivityIndicator size="large" color={Colors.primary} />
            : <Text>No location chosen yet!</Text>
        )}
      />
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 15
  }
})
