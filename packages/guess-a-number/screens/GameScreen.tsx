import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { ScrollView, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { Card, Number, Typography, Button } from "../components/ui"
import { Color, createStyle } from "../theme"
import { alert } from "../utils/react-native"


const generateIntBetween = (minimum: number, maximum: number, exclude?: number): number => {
  const boundary = maximum - minimum - 1
  const offset = minimum + 1
  const random: number = Math.floor(boundary * Math.random()) + offset
  if (random === exclude) {
    return generateIntBetween(minimum, maximum, exclude)
  }
  return random
}


interface Props {
  selectedNumber: number
  gameOver: (round: number) => void
}

export const GameScreen: FC<Props> = (props) => {
  const minimum = useRef<number>(0)
  const maximum = useRef<number>(100)
  const INITIAL_GUESS = useMemo(() => generateIntBetween(0, 100, props.selectedNumber), [ props.selectedNumber ])
  const [ guessNumber, setGuessNumber ] = useState<number>(INITIAL_GUESS)
  const [ guessList, setGuessList ] = useState<number[]>([ INITIAL_GUESS ])
  const styles = useStyle()

  useEffect(() => {
    if (props.selectedNumber === guessNumber) {
      props.gameOver(guessList.length)
    }
  }, [ props.selectedNumber, props.gameOver, guessNumber, guessList ])

  const onNextGuessPressed = (type: "lower" | "greater") => () => {
    const direction = type === "lower" ? -1 : 1
    if (props.selectedNumber * direction < guessNumber * direction) {
      return alert({
        title: "Don't lie!",
        message: "You Know that this is wrong...",
        button: "Sorry!",
        style: "cancel",
      })
    }

    if (type === "lower") {
      maximum.current = guessNumber
    } else {
      minimum.current = guessNumber
    }
    const nextGuess = generateIntBetween(minimum.current, maximum.current)
    setGuessNumber(nextGuess)
    setGuessList(prev => [ nextGuess, ...prev ])
  }

  return (
    <View style={styles.screen}>
      <View style={styles.gamePanel}>
        <Typography variant="title" style={styles.title}>Opponent's Guess</Typography>
        <Number>{ guessNumber }</Number>
        <Card style={styles.actions}>
          <Button
            style={styles.lower}
            onPress={onNextGuessPressed("lower")}
          >
            <Ionicons name="md-remove" color={Color.white} size={18} />
          </Button>
          <Button
            style={styles.greater}
            onPress={onNextGuessPressed("greater")}
          >
            <Ionicons name="md-add" color={Color.white} size={18} />
          </Button>
        </Card>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.list}
      >
        {
          guessList.map((guess, index) => {
            return (
              <View key={guess} style={styles.listItem}>
                <Typography>#{ guessList.length - index }</Typography>
                <Typography>{ guess }</Typography>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}


const useStyle = createStyle(({ height, width }) => {
  return {
    screen: {
      flex: 1,
      padding: 10,
      flexDirection: width > height ? "row" : "column",
      alignItems: "center"
    },
    gamePanel: {
      alignItems: "center",
      flex: width > 600 ? 1 : 0
    },
    title: {
      fontSize: 20,
      marginVertical: 10,
      color: Color.black
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: width > height ? 20 : 10,
      width: 300,
      maxWidth: "80%"
    },
    lower: {
      flex: 1,
      marginRight: 5
    },
    greater: {
      flex: 1,
    },
    scrollView: {
      width: "100%",
      flex: 1
    },
    list: {
      alignItems: "center",
    },
    listItem: {
      width: "80%",
      borderColor: Color.grey,
      borderWidth: 1,
      padding: 10,
      marginVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around"
    }
  }
})
