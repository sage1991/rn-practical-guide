import React, { FC } from "react"
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native"

import { Colors } from "../../theme"


interface Props extends ViewProps {
  style?: ViewStyle
}

export const Card: FC<Props> = (props) => (
  <View
    {...props}
    style={{ ...styles.root, ...props.style }}
  >
    { props.children }
  </View>
)

const styles = StyleSheet.create({
  root: {
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
  }
})
