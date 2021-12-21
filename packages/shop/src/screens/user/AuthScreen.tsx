import React, { FC, useCallback, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
  ActivityIndicator
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { unwrapResult } from "@reduxjs/toolkit"

import { Card, Input } from "../../components/ui"
import { RootNavigatorParams } from "../../navigation"
import { useInput } from "../../hooks"
import { Colors } from "../../theme"
import { Auth, useSelector } from "../../store"
import { useDispatch } from "../../store"



type Props = StackScreenProps<RootNavigatorParams, "auth">

export const AuthScreen: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)
  const [ mode, setMode ] = useState<"sign-in" | "sign-up">("sign-in")
  const email = useInput("", isValidEmail)
  const password = useInput("", isNotEmpty)
  const submittable = email.valid && password.valid

  const requestAuthentication = async () => {
    try {
      if (mode === "sign-in") {
        await signIn()
      }
      if (mode === "sign-up") {
        await signUp()
      }
    } catch (e) {
      let message = e.message
      if (e.message === "EMAIL_EXISTS") {
        message = "The email exists already!"
      } else if (e.message === "EMAIL_NOT_FOUND") {
        message = "There's no user for given email!"
      } else if (e.message === "INVALID_PASSWORD") {
        message = "The password is not valid!"
      }
      Alert.alert("Authentication Fail", message)
    }
  }

  const signIn = () => dispatch(
    Auth.signIn({
      email: email.value,
      password: password.value,
      returnSecureToken: true
    })
  ).then(unwrapResult)

  const signUp = () => dispatch(
    Auth.signUp({
      email: email.value,
      password: password.value,
      returnSecureToken: true
    })
  ).then(unwrapResult)

  const switchMode = useCallback(() => setMode(prev => (
    prev === "sign-in" ? "sign-up" : "sign-in"
  )), [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior="padding"
      >
        <LinearGradient
          colors={[ "#ffedff", "#ffe3ff" ]}
          style={styles.gradient}
        >
          <Card style={styles.form}>
            <ScrollView>
              <Input
                label="Email"
                value={email.value}
                onChangeText={email.set}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                error={email.error}
                errorText="Please enter a valid email address"
              />
              <Input
                label="Password"
                value={password.value}
                onChangeText={password.set}
                keyboardType="default"
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                error={password.error}
                errorText="Please enter a valid password"
              />
              <View style={styles.button}>
                {
                  loading
                    ? <ActivityIndicator size="small" color={Colors.primary} />
                    : (
                      <Button
                        disabled={!submittable}
                        title={mode === "sign-in" ? "Login" : "Sign Up"}
                        color={Colors.primary}
                        onPress={requestAuthentication}
                      />
                    )
                }
              </View>
              <View style={styles.button}>
                <Button
                  title={`Switch to ${mode === "sign-in" ? "Sign Up" : "Sign In"}`}
                  color={Colors.accent}
                  onPress={switchMode}
                />
              </View>
            </ScrollView>
          </Card>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  button: {
    marginTop: 10
  }
})

const isNotEmpty = (text: string) => !!text.trim()
const isValidEmail = (text: string) => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/.test(text)
