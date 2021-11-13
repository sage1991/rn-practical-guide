import React, { FC, useEffect, useState } from "react"
import { Button, Modal, StyleSheet, TextInput, View } from "react-native"


interface Props {
  visible: boolean
  hide: () => void
  addGoal: (goal: string) => void
}

export const GoalInput: FC<Props> = (props) => {
  const [ goal, setGoal ] = useState<string>("")

  useEffect(() => {
    props.visible && setGoal("")
  }, [ props.visible ])

  const onSubmit = () => {
    props.addGoal(goal)
    props.hide()
  }

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
    >
      <View style={styles.root}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          value={goal}
          onChangeText={setGoal}
          onSubmitEditing={onSubmit}
          blurOnSubmit
        />
        <View style={styles.actions}>
          <View style={styles.cancel}>
            <Button title="CANCEL" color="#ff0000" onPress={props.hide} />
          </View>
          <View style={styles.add}>
            <Button title="+ ADD" onPress={onSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "stretch"
  },
  input: {
    borderBottomColor: "#cecece",
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cancel: {
    marginRight: 5,
    flex: 1
  },
  add: {
    flex: 1
  }
})
