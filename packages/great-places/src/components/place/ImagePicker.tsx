import React, { FC } from "react"
import { Alert, Button, Image, Linking, NativeModules, Platform, StyleSheet, Text, View } from "react-native"
import { launchCameraAsync, requestCameraPermissionsAsync } from "expo-image-picker"

import { Colors } from "../../theme/colors"


interface Props {
  image: string
  onImageTaken: (image: string) => void
}

export const ImagePicker: FC<Props> = (props) => {

  const openAppSetting = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:")
    }
    if (Platform.OS === "android") {
      NativeModules.RNAndroidOpenSettings.appDetailsSettings()
    }
  }

  const openCamera = async () => {
    const permission = await requestCameraPermissionsAsync()

    try {
      if (!permission.granted) {
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

      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [ 16, 9 ],
        quality: 0.5
      })
      if (!image.cancelled) {
        props.onImageTaken && props.onImageTaken(image.uri)
      }
    } catch (e) {

    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.preview}>
        {
          props.image
            ? <Image style={styles.image} source={{ uri: props.image }} />
            : <Text>No image picked yet.</Text>
        }
      </View>
      <Button title="Tack Image" color={Colors.primary} onPress={openCamera} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    marginBottom: 15
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
