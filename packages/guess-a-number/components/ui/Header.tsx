import React, { FC } from "react"
import { Platform, SafeAreaView, View } from "react-native"

import { Color, createStyle } from "../../theme"
import { Typography } from "./Typography"


interface Props {
  title: string
}

export const Header: FC<Props> = (props) => {
  const styles = useStyle()
  return (
    <View style={styles.root}>
      <SafeAreaView>
        <Typography variant="title" style={styles.title}>
          { props.title }
        </Typography>
      </SafeAreaView>
    </View>
  )
}


const useStyle = createStyle(() => {
  return {
    root: {
      width: "100%",
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Platform.OS === "android" ? Color.primary : Color.white,
      borderBottomColor: Platform.OS === "android" ? Color.primary : Color.grey,
      borderBottomWidth: 1
    },
    title: {
      color: Platform.OS === "android" ? Color.white : Color.primary,
      fontSize: 18,
    }
  }
})
