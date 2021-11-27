import React, { FC } from "react"
import { Platform } from "react-native"
import {
  HeaderButton as ReactNavigationHeaderButton,
  HeaderButtonProps
} from "react-navigation-header-buttons"
import { Ionicons } from "@expo/vector-icons"

import { Colors } from "../theme"


interface Props extends HeaderButtonProps {}

export const HeaderButton: FC<Props> = (props) => {
  return (
    <ReactNavigationHeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "ios" ? Colors.primary : Colors.white}
    />
  )
}
