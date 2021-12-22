import React, { FC, useEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { unwrapResult } from "@reduxjs/toolkit"

import { Colors } from "../../theme"
import { RootNavigatorParams } from "../../navigation"
import { Auth, useDispatch } from "../../store"


type Props = StackScreenProps<RootNavigatorParams, "intro">

export const StartupScreen: FC<Props> = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Auth.authenticate())
      .then(unwrapResult)
      .catch(() => props.navigation.replace("auth"))
  }, [])

  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}

const styles= StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
