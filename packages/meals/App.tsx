import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens"
import { StatusBar } from "expo-status-bar"
import AppLoading from "expo-app-loading"
import { loadAsync } from "expo-font"
import "react-native-gesture-handler"

import { Fonts } from "./theme"
import { RootNavigator } from "./navigation"


enableScreens()

const loadFonts = () => loadAsync({
  [Fonts.regular]: require("./assets/fonts/OpenSans-Regular.ttf"),
  [Fonts.bold]: require("./assets/fonts/OpenSans-Bold.ttf")
})


export default function App() {
  const [ isLoading, setLoading ] = useState<boolean>(true)

  if (isLoading) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setLoading(false)}
        onError={(error) => console.log(error)}
      />
    )
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootNavigator />
    </NavigationContainer>
  )
}
