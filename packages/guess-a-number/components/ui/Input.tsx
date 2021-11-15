import React, { FC } from "react"
import { TextInput, TextInputProps, TextStyle } from "react-native"

import { Color, createStyle } from "../../theme"


interface Props extends TextInputProps {
  style?: TextStyle
}

export const Input: FC<Props> = (props) => {
  const styles = useStyle()
  return <TextInput { ...props } style={{ ...styles.root, ...props.style }} />
}


const useStyle = createStyle(() => {
  return {
    root: {
      height: 30,
      borderBottomColor: Color.grey,
      borderBottomWidth: 1,
      marginVertical: 10
    }
  }
})
