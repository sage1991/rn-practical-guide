import React, { FC } from "react"
import { Text, TextProps, TextStyle } from "react-native"

import { createStyle, Fonts } from "../../theme"


interface Props extends TextProps {
  variant?: "title" | "body"
  style?: TextStyle
}

export const Typography: FC<Props> = (props) => {
  const styles = useStyle()
  return (
    <Text
      { ...props }
      style={{ ...styles[props.variant ?? "body"], ...props.style }}
    >
      { props.children }
    </Text>
  )
}


const useStyle = createStyle(() => {
  return {
    body: {
      fontFamily: Fonts.normal
    },
    title: {
      fontFamily: Fonts.bold
    }
  }
})
