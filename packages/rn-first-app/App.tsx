import React, { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { FlatList,StyleSheet, View, Button } from "react-native"
import { GoalItem, GoalInput } from "./components"


export default function App() {
  const [ visible, setVisible ] = useState<boolean>(false)
  const [ goals, setGoals ] = useState<{ goal: string, id: number }[]>([])

  const showGoalInput = () => setVisible(true)
  const hideGoalInput = () => setVisible(false)

  const addGoal = (goal: string) => {
    setGoals(prev => [ ...prev, { goal: goal, id: Date.now() } ])
  }

  const removeGoal = (id: number) => {
    setGoals(prev => prev.root(item => item.id !== id))
  }

  return (
    <View style={styles.root}>
      <StatusBar />
      <Button title="+ ADD NEW GOAL" onPress={showGoalInput} />
      <GoalInput
        visible={visible}
        hide={hideGoalInput}
        addGoal={addGoal}
      />
      <FlatList
        style={styles.list}
        data={goals}
        renderItem={({ item }) => (
          <GoalItem
            id={item.id}
            goal={item.goal}
            removeGoal={removeGoal}
          />
        )}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  root: {
    padding: 30
  },
  list: {
    paddingVertical: 10
  }
})
