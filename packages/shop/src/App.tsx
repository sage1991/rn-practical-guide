import "react-native-gesture-handler"

import React, { FC, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { registerRootComponent } from "expo"
import { Provider } from "react-redux"
import { enableScreens } from "react-native-screens"
import { NavigationContainer } from "@react-navigation/native"
import AppLoading from "expo-app-loading"
import { loadAsync } from "expo-font"

import { store } from "./store"
import { Fonts } from "./theme"
import { ShopNavigator } from "./navigation"


enableScreens()

const App: FC = () => {
  const [ loading, setLoading ] = useState<boolean>(true)

  const loadFonts = () => loadAsync({
    [Fonts.regular]: require("./assets/fonts/OpenSans-Regular.ttf"),
    [Fonts.bold]: require("./assets/fonts/OpenSans-Bold.ttf")
  })

  if (loading) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setLoading(false)}
        onError={() => {}}
      />
    )
  }

  return (
    <Provider store={store}>
      <StatusBar/>
      <NavigationContainer>
        <ShopNavigator />
      </NavigationContainer>
    </Provider>
  )
}

registerRootComponent(App)
