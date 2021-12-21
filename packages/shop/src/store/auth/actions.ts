import { createAction, createAsyncThunk, PrepareAction } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { AuthResult } from "../../models/auth-result"
import { Account } from "../../models/account"
import { Const } from "../../common"
import { NetworkError } from "../../errors"


export namespace Auth {
  export const authenticate = createAsyncThunk<AuthResult>("authentication/init", async () => {
    const authJSON = await AsyncStorage.getItem("auth")
    if (!authJSON) {
      throw new Error("user is not authenticated")
    }
    const auth: AuthResult = JSON.parse(authJSON)
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${Const.FIREBASE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ grant_type: "refresh_token", refresh_token: auth.refreshToken })
    })
    if (!response.ok) {
      let message = response.statusText
      try {
        const error = await response.json()
        message = error.error.message
      } catch (e) {}
      throw new NetworkError(`${response.status}`, message)
    }
    const result = await response.json()
    const newAuth: AuthResult = {
      ...auth,
      refreshToken: result.refresh_token,
      idToken: result.id_token,
      expiresIn: result.expires_in
    }
    await AsyncStorage.setItem("auth", JSON.stringify(newAuth))
    return newAuth
  })

  export const signUp = createAsyncThunk<AuthResult, Account>("authentication/signUp", async (account) => {
    const response = await fetch(`${Const.AUTHENTICATION_URL}/accounts:signUp?key=${Const.FIREBASE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account)
    })
    if (!response.ok) {
      let message = response.statusText
      try {
        const error = await response.json()
        message = error.error.message
      } catch (e) {}
      throw new NetworkError(`${response.status}`, message)
    }
    const auth = await response.json()
    AsyncStorage.setItem("auth", JSON.stringify(auth))
    return auth
  })

  export const signIn = createAsyncThunk<AuthResult, Account>("authentication/signIn", async (account) => {
    const response = await fetch(`${Const.AUTHENTICATION_URL}/accounts:signInWithPassword?key=${Const.FIREBASE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account)
    })
    if (!response.ok) {
      let message = response.statusText
      try {
        const error = await response.json()
        message = error.error.message
      } catch (e) {}
      throw new NetworkError(`${response.status}`, message)
    }
    const auth = await response.json()
    AsyncStorage.setItem("auth", JSON.stringify(auth))
    return auth
  })

  export const logout = createAction<PrepareAction<null>>("authentication/logout", () => {
    AsyncStorage.removeItem("auth")
    return { payload: null }
  })
}
