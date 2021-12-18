import { createAsyncThunk } from "@reduxjs/toolkit"

import { AuthResult } from "../../models/auth-result"
import { Account } from "../../models/account"
import { Const } from "../../common"
import { NetworkError } from "../../errors"


export namespace Authentication {
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
    return await response.json()
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
    return await response.json()
  })
}
