import React, { ComponentType, FC, ReactNode } from "react"
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform,
} from "react-native"

import { Colors } from "../../theme"
import { Card, Typography } from "../ui"


interface Props {
  id: string
  title: string
  price: number
  image: string
  onSelect?: () => void
  actions?: ReactNode
}

export const ProductItem: FC<Props> = (props) => {
  const Touchable: ComponentType<any> = (
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity
  )

  return (
    <Touchable onPress={props.onSelect} useForeground>
      <Card style={styles.root}>
        <Image
          style={styles.image}
          source={{ uri: props.image }}
        />
        <View style={styles.details}>
          <Typography variant="bold" style={styles.title}>
            { props.title }
          </Typography>
          <Typography variant="regular" style={styles.price}>
            ${ props.price.toFixed(2) }
          </Typography>
        </View>
        <View style={styles.actions}>
          { props.actions }
        </View>
      </Card>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  root: {
    height: 300,
    margin: 20
  },
  image: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10
  },
  title: {
    fontSize: 18,
    marginBottom: 2
  },
  price: {
    fontSize: 14,
    color: Colors.gray
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20
  }
})
