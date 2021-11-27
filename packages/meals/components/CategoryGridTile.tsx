import React, { FC } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

import { Colors, Fonts } from "../theme"
import { Typography } from "./Typography"


interface Props {
  title: string
  color: string
  onPress: () => void
}

export const CategoryGridTile: FC<Props> = (props) => {
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={props.onPress}
    >
      <View style={{ ...styles.container, backgroundColor: props.color }}>
        <Typography style={styles.text}>
          { props.title }
        </Typography>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 15,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: Colors.dark,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15
  },
  text: {
    textAlign: "center",
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.dark
  }
})
