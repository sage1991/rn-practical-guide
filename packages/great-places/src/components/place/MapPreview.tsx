import React, { FC, ReactNode } from "react"
import { Image, StyleSheet, View } from "react-native"


interface Props {
  location?: {
    lat: number
    lng: number
  }
  fallback: ReactNode
}

export const MapPreview: FC<Props> = (props) => {
  let contents: ReactNode = props.fallback
  if (props.location) {
    const apiUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    contents = <Image source={{ uri: apiUrl }} style={styles.image} />
  }

  return (
    <View style={styles.root}>
      { contents }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#cccccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%"
  }
})
