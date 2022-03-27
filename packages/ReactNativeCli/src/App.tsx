import React, { FC } from "react"
import {
  Button,
  StyleSheet,
  View
} from "react-native"
import { launchCamera } from "react-native-image-picker"

export const App: FC = () => {
  const takeImage = async () => {
    const result = await launchCamera({ mediaType: "photo", saveToPhotos: true })
  }
  return (
    <View style={styles.root}>
      <Button title="Take Image" onPress={takeImage} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
})
