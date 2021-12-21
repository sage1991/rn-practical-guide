import { createSlice } from "@reduxjs/toolkit"

import { Auth } from "./actions"
import {
  authenticationPendingReducer,
  authenticationRejectedReducer,
  authenticationReducer,
  initAuthReducer,
  logoutReducer
} from "./reducers"
import { User } from "../../models/user"
import { Token } from "../../models/token"


export interface AuthState {
  loading: boolean
  error: boolean
  user?: User
  token?: Token
}

const INITIAL_STATE: AuthState = {
  loading: false,
  error: false
}

const slice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Auth.authenticate.fulfilled, initAuthReducer)
      .addCase(Auth.signUp.pending, authenticationPendingReducer)
      .addCase(Auth.signUp.rejected, authenticationRejectedReducer)
      .addCase(Auth.signUp.fulfilled, authenticationReducer)
      .addCase(Auth.signIn.pending, authenticationPendingReducer)
      .addCase(Auth.signIn.rejected, authenticationRejectedReducer)
      .addCase(Auth.signIn.fulfilled, authenticationReducer)
      .addCase(Auth.logout, logoutReducer)
  }
})

export const auth = slice.reducer
