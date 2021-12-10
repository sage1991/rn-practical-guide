import React, { FC } from "react"
import { HeaderButton as RNHeaderButton, HeaderButtonProps } from "react-navigation-header-buttons"
import { Ionicons } from "@expo/vector-icons"

import { Colors } from "../../theme"


export const HeaderButton: FC<HeaderButtonProps> = (props) => {
  return (
    <RNHeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Colors.primary}
    />
  )
}
