import React, { FC } from "react"
import { StyleSheet, Text, TextProps, TextStyle } from "react-native"

import { Fonts } from "../theme"


interface Props extends TextProps {
  style?: TextStyle
}

export const Typography: FC<Props> = (props) => {
  return (
    <Text
      {...props}
      style={{ ...styles.root, ...props.style }}
    >
      { props.children }
    </Text>
  )
}


const styles = StyleSheet.create({
  root: {
    fontFamily: Fonts.regular
  }
})
