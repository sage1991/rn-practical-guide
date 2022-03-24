import React, { FC } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native"

export const App: FC = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Text>hi</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
})
