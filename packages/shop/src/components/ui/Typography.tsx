import React, { FC } from "react"
import { StyleSheet, Text, TextProps, TextStyle } from "react-native"

import { Fonts } from "../../theme"


interface Props extends TextProps {
  style?: TextStyle
  variant?: "regular" | "bold"
}

export const Typography: FC<Props> = (props) => (
  <Text
    {...props}
    style={{
      ...props.style,
      ...styles[props.variant ?? "regular"]
    }}
  >
    { props.children }
  </Text>
)

const styles = StyleSheet.create({
  regular: { fontFamily: Fonts.regular },
  bold: { fontFamily: Fonts.bold }
})
