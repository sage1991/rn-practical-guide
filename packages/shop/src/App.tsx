import "react-native-gesture-handler"

import React, { FC, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { registerRootComponent } from "expo"
import { Provider } from "react-redux"
import { enableScreens } from "react-native-screens"
import AppLoading from "expo-app-loading"
import { loadAsync } from "expo-font"

import { store } from "./store"
import { Fonts } from "./theme"
import { RootNavigator } from "./navigation"


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
      <RootNavigator />
    </Provider>
  )
}

registerRootComponent(App)
