import React, { FC, useState } from "react"
import { Button, StyleSheet, View } from "react-native"

import { Colors } from "../../theme"
import { Card, Typography } from "../ui"


interface Props {
  amount: number
  date: string
}

export const OrderItem: FC<Props> = (props) => {
  const [ isExpanded, setIsExpanded ] = useState<boolean>(false)
  const toggleList = () => setIsExpanded(prev => !prev)

  const list = isExpanded && <View>{ props.children }</View>

  return (
    <Card style={styles.root}>
      <View style={styles.summary}>
        <Typography style={styles.amount}>
          ${ props.amount.toFixed(2) }
        </Typography>
        <Typography variant="bold" style={styles.date}>
          { props.date }
        </Typography>
      </View>
      <Button
        title={isExpanded ? "Hide Detail" : "Show Detail"}
        onPress={toggleList}
        color={Colors.primary}
      />
      { list }
    </Card>
  )
}

const styles = StyleSheet.create({
  root: {
    margin: 20,
    padding: 10
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  amount: {
    fontSize: 16
  },
  date: {
    fontSize: 16,
    color: Colors.gray
  }
})
