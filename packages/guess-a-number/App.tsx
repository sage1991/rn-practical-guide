import React, { ReactNode, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { loadAsync } from "expo-font"
import AppLoading from "expo-app-loading"

import { Header } from "./components/ui"
import { GameScreen, StartGameScreen, GameOverScreen } from "./screens"
import { Fonts } from "./theme"


const loadFont = () => {
  return loadAsync({
    [Fonts.normal]: require("./assets/fonts/OpenSans-Regular.ttf"),
    [Fonts.bold]: require("./assets/fonts/OpenSans-Bold.ttf")
  })
}

export default function App() {
  const [ selectedNumber, setSelectedNumber ] = useState<number>()
  const [ round, setRound ] = useState<number>()
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  if (isLoading) {
    return (
      <AppLoading
        startAsync={loadFont}
        onFinish={() => setIsLoading(false)}
        onError={(error) => console.log(error)}
      />
    )
  }

  const restart = () => {
    setRound(undefined)
    setSelectedNumber(undefined)
  }

  let screen: ReactNode = <StartGameScreen startGame={setSelectedNumber} />
  if (typeof round === "number" && typeof selectedNumber === "number") {
    screen = (
      <GameOverScreen
        selectedNumber={selectedNumber}
        round={round}
        restart={restart}
      />
    )
  } else if (typeof selectedNumber === "number") {
    screen = (
      <GameScreen
        selectedNumber={selectedNumber}
        gameOver={setRound}
      />
    )
  }

  return (
    <>
      <StatusBar style="auto"/>
      <Header title="Guess a Number" />
      <SafeAreaView style={styles.screen}>
        { screen }
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})
