import React, { FC } from "react"
import { View } from "react-native"

import { Color, createStyle } from "../../theme"
import { Typography } from "./Typography"


export const Number: FC = (props) => {
  const styles = useStyle()
  return (
    <View style={styles.root}>
      <Typography variant="body" style={styles.text}>
        { props.children }
      </Typography>
    </View>
  )
}


const useStyle = createStyle(() => {
  return {
    root: {
      borderWidth: 2,
      borderColor: Color.accent,
      padding: 10,
      borderRadius: 10,
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    text: {
      color: Color.accent,
      fontSize: 22
    }
  }
})
