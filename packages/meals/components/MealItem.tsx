import React, { FC } from "react"
import { StyleSheet, TouchableOpacity, View, ImageBackground } from "react-native"

import { Colors, Fonts } from "../theme"
import { Typography } from "./Typography"


interface Props {
  title: string
  duration: number
  complexity: string
  affordability: string
  imageUrl: string
  onPress: () => void
}

export const MealItem: FC<Props> = (props) => {
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={props.onPress}
    >
      <View>
        <View style={styles.titleRow}>
          <ImageBackground
            style={styles.image}
            source={{ uri: props.imageUrl }}
            fadeDuration={300}
          >
            <Typography style={styles.title} numberOfLines={1}>
              { props.title }
            </Typography>
          </ImageBackground>
        </View>
        <View style={styles.detailRow}>
          <Typography>
            { `${props.duration}m` }
          </Typography>
          <Typography>
            { props.complexity.toUpperCase() }
          </Typography>
          <Typography>
            { props.affordability.toUpperCase() }
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  root: {
    height: 250,
    width: "100%",
    backgroundColor: Colors.gray,
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  titleRow: {
    flexDirection: "row",
    height: "85%"
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: Colors.white,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  detailRow: {
    height: "15%",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center"
  }
})
