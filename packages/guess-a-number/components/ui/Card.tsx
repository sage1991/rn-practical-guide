import React, { FC } from "react"
import { View, ViewProps, ViewStyle } from "react-native"

import { Color, createStyle } from "../../theme"


interface Props extends ViewProps {
  style?: ViewStyle
}

export const Card: FC<Props> = (props) => {
  const styles = useStyle()
  return (
    <View { ...props } style={{ ...styles.root, ...props.style }}>
      { props.children }
    </View>
  )
}


const useStyle = createStyle(() => {
  return {
    root: {
      backgroundColor: Color.white,
      shadowColor: Color.black,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      shadowOpacity: 0.26,
      elevation: 3,
      padding: 20,
      borderRadius: 16
    }
  }
})
