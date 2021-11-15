import React, { FC } from "react"
import { Image, ScrollView, View } from "react-native"

import { Color, createStyle } from "../theme"
import { Typography, Button } from "../components/ui"


interface Props {
  round: number
  selectedNumber: number
  restart: () => void
}

export const GameOverScreen: FC<Props> = (props) => {
  const styles = useStyle()

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <Typography variant="title" style={styles.title}>The Game is Over!</Typography>
        <View style={styles.imageRoot}>
          <Image
            // source={require("../assets/image/success.png")}
            source={{ uri: "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg" }}
            fadeDuration={100}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Typography variant="body" style={styles.result}>
          Your phone needed <Typography variant="title" style={styles.highlight}>{ props.round }</Typography> rounds{"\n"}
          to guess the number <Typography variant="title" style={styles.highlight}>{ props.selectedNumber }</Typography>.
        </Typography>
      </ScrollView>
      <Button style={styles.newGame} onPress={props.restart}>
        NEW GAME
      </Button>
    </View>
  )
}


const useStyle = createStyle(({ width, height }) => {
  const isLandscape = width > height

  let imageSize = width * 0.7
  if (isLandscape) {
    imageSize = height * 0.7
  }

  return {
    scrollView: {
      flex: 1,
      padding: 10,
    },
    screen: {
      flex: 1,
      alignItems: "stretch",
    },
    title: {
      fontSize: 20,
      marginVertical: 10,
      color: Color.black,
      textAlign: "center"
    },
    image: {
      width: "100%",
      height: "100%"
    },
    imageRoot: {
      borderRadius: imageSize * 0.5,
      borderWidth: 3,
      borderColor: Color.black,
      width: imageSize,
      height: imageSize,
      overflow: "hidden",
      marginVertical: height > 600 ? 30 : 20,
      alignSelf: "center"
    },
    result: {
      marginBottom: isLandscape ? 100 : 0,
      fontSize: 16,
      textAlign: "center"
    },
    highlight: {
      color: Color.primary,
      backgroundColor: "#ffff00",
    },
    newGame: {
      width: "90%",
      position: "absolute",
      bottom: 20,
      left: "5%"
    }
  }
})
