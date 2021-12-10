import React, { FC } from "react"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, TouchableOpacity, View } from "react-native"

import { Card, Typography } from "../ui"
import { Colors } from "../../theme"


interface Props {
  quantity: number
  title: string
  amount: number
  deletable?: boolean
  removeItem?: () => void
}

export const CartItem: FC<Props> = (props) => {
  const action = props.deletable && (
    <TouchableOpacity
      style={styles.delete}
      onPress={props.removeItem}
    >
      <Ionicons
        name="md-trash"
        size={23}
        color={Colors.warning}
      />
    </TouchableOpacity>
  )

  return (
    <Card style={styles.root}>
      <Typography style={styles.info}>
        <Typography style={styles.quantity}>
          { `${props.quantity} ` }
        </Typography>
        <Typography variant="bold" style={styles.title}>
          { props.title }
        </Typography>
      </Typography>
      <View style={styles.info}>
        <Typography variant="bold" style={styles.amount}>
          ${ props.amount.toFixed(2) }
        </Typography>
        { action }
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    alignItems: "center"
  },
  quantity: {
    color: Colors.gray,
    fontSize: 16
  },
  title: {
    fontSize: 16
  },
  amount: {
    fontSize: 16
  },
  delete: {
    marginLeft: 20
  }
})
