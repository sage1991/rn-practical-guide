import React, { FC } from "react"
import { Ionicons } from "@expo/vector-icons"
import { HeaderButton as Button, HeaderButtonProps } from "react-navigation-header-buttons"

import { Colors } from "../../theme/colors"


export const HeaderButton: FC<HeaderButtonProps> = (props) => {
  return (
    <Button
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Colors.primary}
    />
  )
}
