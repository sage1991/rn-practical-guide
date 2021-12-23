import "react-native-gesture-handler"

import React, { FC } from "react"
import { StatusBar } from "expo-status-bar"
import { registerRootComponent } from "expo"
import { enableScreens } from "react-native-screens"

import { RootNavigator } from "./navigation"


enableScreens()

const App: FC = () => {
  return (
    <>
      <StatusBar />
      <RootNavigator />
    </>
  )
}

registerRootComponent(App)
