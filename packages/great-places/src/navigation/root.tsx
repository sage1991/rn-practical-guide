import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"

import { PlacesNavigator } from "./places"


export const RootNavigator: FC = () => {
  return (
    <NavigationContainer>
      <PlacesNavigator />
    </NavigationContainer>
  )
}
