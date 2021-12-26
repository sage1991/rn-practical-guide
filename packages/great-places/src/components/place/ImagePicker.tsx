import React, { FC } from "react"
import { Alert, Button, Image, Linking, NativeModules, Platform, StyleSheet, Text, View } from "react-native"
import { launchCameraAsync, requestCameraPermissionsAsync } from "expo-image-picker"

import { Colors } from "../../theme/colors"


export const ImagePicker: FC = () => {
  const openAppSetting = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:")
    }
    if (Platform.OS === "android") {
      NativeModules.RNAndroidOpenSettings.appDetailsSettings()
    }
  }

  const openCamera = async () => {
    const result = await requestCameraPermissionsAsync()

    try {
      if (!result.granted) {
        Alert.alert(
          "Insufficient permissions!",
          "You need to grant camera permission to use this app",
          [
            { text: "No Thanks" },
            { text: "Okay", onPress: openAppSetting }
          ]
        )
        return
      }

      await launchCameraAsync()
    } catch (e) {

    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.preview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} source={{ uri: "" }} />
      </View>
      <Button title="Tack Image" color={Colors.primary} onPress={openCamera} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center"
  },
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 1
  },
  image: {
    width: "100%",
    height: "100%"
  }
})
