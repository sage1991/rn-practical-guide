import React, { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { Button, StyleSheet, Text, View } from "react-native"


export default function App() {
  const [ isTextChange, setIsTextChange ] = useState<boolean>(false)
  const changeText = () => setIsTextChange(prev => !prev)

  let title: string = "Open up App.tsx to start working on your app!"
  if (isTextChange) {
    title = "The Text Changed!"
  }

  return (
    <View style={styles.container}>
      <Text>{ title }</Text>
      <StatusBar style="auto"/>
      <Button
        title="Change Text"
        onPress={changeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
})
