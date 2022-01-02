import React, { FC, ReactNode } from "react"
import { Image, StyleSheet, View, ViewStyle } from "react-native"

import { Const } from "../../common/const"


interface Props {
  style?: ViewStyle
  location?: {
    lat: number
    lng: number
  }
  fallback: ReactNode
}

export const MapPreview: FC<Props> = (props) => {
  let contents: ReactNode = props.fallback
  if (props.location) {
    contents = (
      <Image
        style={styles.image}
        source={{ uri: getMapStaticUrl(props.location.lat, props.location.lng) }}
      />
    )
  }

  return (
    <View style={{ ...styles.root, ...props.style }}>
      { contents }
    </View>
  )
}

const getMapStaticUrl = (lat: number, lng: number) => (
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${Const.GOOGLE_MAP_API_KEY}`
)

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  }
})
