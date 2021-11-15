import React, { FC, ReactNode, useState } from "react"
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native"

import { Card, Input, Number, Typography, Button } from "../components/ui"
import { Color, createStyle } from "../theme"
import { alert } from "../utils/react-native"


interface Props {
  startGame: (num: number) => void
}

export const StartGameScreen: FC<Props> = (props) => {
  const [ number, setNumber ] = useState<string>("")
  const [ confirmedNumber, setConfirmedNumber ] = useState<number>(0)
  const [ isConfirmed, setIsConfirmed ] = useState<boolean>(false)
  const styles = useStyle()

  const onChangeText = (text: string) => {
    setNumber(text.replace(/[^\d]/g, ""))
  }

  const onReset = () => {
    setNumber("")
    setIsConfirmed(false)
  }

  const onSubmit = () => {
    const __number = +number
    if (isNaN(__number) || __number <= 0 || __number > 99) {
      return alert({
        title: "Invalid number",
        message: "Number has to be a number between 1 and 99.",
        button: "OK"
      })
        .then(onReset)
    }

    setNumber("")
    setIsConfirmed(true)
    setConfirmedNumber(__number)
    Keyboard.dismiss()
  }

  const onStartGame = () => props.startGame(confirmedNumber)

  let confirm: ReactNode = null
  if (isConfirmed) {
    confirm = (
      <Card style={styles.summary}>
        <Typography variant="body">You select</Typography>
        <Number>{ confirmedNumber }</Number>
        <Button style={styles.start} onPress={onStartGame}>
          START GAME
        </Button>
      </Card>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Typography variant="title" style={styles.title}>Start a Number Game!</Typography>
            <Card style={styles.container}>
              <Typography variant="body">Select a Number</Typography>
              <Input
                style={styles.input}
                placeholder="number"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                blurOnSubmit
                onSubmitEditing={onSubmit}
                onChangeText={onChangeText}
                value={number}
              />
              <View style={styles.actions}>
                <Button style={styles.reset} onPress={onReset}>
                  Reset
                </Button>
                <Button style={styles.confirm} onPress={onSubmit}>
                  Confirm
                </Button>
              </View>
            </Card>
            { confirm }
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}


const useStyle = createStyle(({ width }) => {
  return {
    screen: {
      flex: 1,
      padding: 10,
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      marginVertical: 10,
      color: Color.black
    },
    container: {
      alignItems: "center",
      width: width * 0.8,
      marginBottom: 20
    },
    input: {
      width: "60%",
      textAlign: "center",
      fontFamily: "open-sans"
    },
    actions: {
      flexDirection: "row",
      width: "100%"
    },
    reset: {
      flex: 1,
      marginRight: 10,
      backgroundColor: Color.accent
    },
    confirm: {
      flex: 1,
    },
    summary: {
      alignItems: "center"
    },
    start: {
      width: width / 2
    }
  }
})
