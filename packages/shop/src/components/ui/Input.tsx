import React, { FC } from "react"
import { KeyboardTypeOptions, ReturnKeyTypeOptions, StyleSheet, TextInput, View } from "react-native"

import { Typography } from "./Typography"
import { Colors } from "../../theme"


interface Props {
  label: string
  error?: boolean
  errorText?: string
  value?: string
  onChangeText?: (text: string) => void
  keyboardType?: KeyboardTypeOptions
  returnKeyType?: ReturnKeyTypeOptions
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  numberOfLines?: number
  multiline?: boolean
  autoCorrect?: boolean
  autoFocus?: boolean
  secureTextEntry?: boolean
}

export const Input: FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <Typography
        variant="bold"
        style={styles.label}
      >
        { props.label }
      </Typography>
      <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        returnKeyType={props.returnKeyType}
        autoCapitalize={props.autoCapitalize}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        autoCorrect={props.autoCorrect}
        autoFocus={props.autoFocus}
        secureTextEntry={props.secureTextEntry}
      />
      { props.error && <Typography style={styles.error}>{ props.errorText }</Typography> }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    marginBottom: 10
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1
  },
  error: {
    color: Colors.accent,
    fontSize: 13,
    paddingVertical: 3
  }
})
