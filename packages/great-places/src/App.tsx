import "react-native-gesture-handler"

import React, { FC } from "react"
import { StatusBar } from "expo-status-bar"
import { registerRootComponent } from "expo"
import { enableScreens } from "react-native-screens"
import { Provider } from "react-redux"

import { RootNavigator } from "./navigation"
import { store } from "./store"
import { init } from "./repository"


enableScreens()

init()
  .then(() => console.log("Initialize DB..."))
  .catch(e => console.error(e))


const App: FC = () => {
  return (
    <Provider store={store}>
      <StatusBar />
      <RootNavigator />
    </Provider>
  )
}

registerRootComponent(App)
