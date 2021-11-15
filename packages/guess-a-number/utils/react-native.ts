import { Alert } from "react-native"


interface AlertConfig {
  title: string
  message: string
  button: string
  style?: "default" | "cancel" | "destructive"
}
export const alert = (config: AlertConfig) => {
  return new Promise(resolve => Alert.alert(
    config.title,
    config.message,
    [{
      text: config.button,
      style: config.style,
      onPress: resolve
    }]
  ))
}
