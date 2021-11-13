import React, { FC } from "react"
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"


interface Props {
  id: number
  goal: string
  removeGoal: (id: number) => void
}

export const GoalItem: FC<Props> = (props) => {
  const onRemove = () => props.removeGoal(props.id)

  return (
    <View style={styles.root}>
      <Text>{ props.goal }</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.remove}
        onPress={onRemove}
      >
        <Text style={{ color: "#ffffff" }}>X</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  root: {
    padding: 10,
    borderColor: "#cecece",
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  remove: {
    backgroundColor: "red",
    paddingVertical: 3,
    paddingHorizontal: 6,
  }
})
