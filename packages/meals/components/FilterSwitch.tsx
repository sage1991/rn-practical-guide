import React, { FC } from "react"
import { Platform, StyleSheet, Switch, View, ViewStyle } from "react-native"

import { Typography } from "./Typography"
import { Colors } from "../theme"


interface Props {
  style?: ViewStyle
  name: string
  value: boolean
  onValueChange: (value: boolean) => Promise<void> | void
}

export const FilterSwitch: FC<Props> = (props) => {
  return (
    <View style={{ ...styles.root, ...props.style }}>
      <Typography>{ props.name }</Typography>
      <Switch
        value={props.value}
        onValueChange={props.onValueChange}
        trackColor={{ true: Colors.primary }}
        thumbColor={Platform.OS === "ios" ? Colors.white : Colors.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
})
