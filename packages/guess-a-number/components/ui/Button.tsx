import React, { FC } from "react"
import {
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native"

import { Color, createStyle } from "../../theme"
import { Typography } from "./Typography"



interface Props extends TouchableOpacityProps {
  style?: ViewStyle
  textStyle?: TextStyle
}

export const Button: FC<Props> = (props) => {
  const styles = useStyle()

  return (
    <TouchableOpacity
      { ...props }
      activeOpacity={0.5}
      style={{ ...styles.root, ...props.style }}
    >
      <Typography
        style={{ ...styles.text, ...props.textStyle }}
      >
        { props.children }
      </Typography>
    </TouchableOpacity>
  )
}


const useStyle = createStyle(() => {
  return {
    root: {
      backgroundColor: Color.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 6
    },
    text: {
      color: Color.white,
      fontSize: 16,
      textAlign: "center"
    }
  }
})
