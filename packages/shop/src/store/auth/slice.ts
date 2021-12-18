import { createSlice } from "@reduxjs/toolkit"
import { Authentication } from "./actions"
import { authenticationPendingReducer, authenticationRejectedReducer, authenticationReducer } from "./reducers"
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
      .addCase(Authentication.signUp.pending, authenticationPendingReducer)
      .addCase(Authentication.signUp.rejected, authenticationRejectedReducer)
      .addCase(Authentication.signUp.fulfilled, authenticationReducer)
      .addCase(Authentication.signIn.pending, authenticationPendingReducer)
      .addCase(Authentication.signIn.rejected, authenticationRejectedReducer)
      .addCase(Authentication.signIn.fulfilled, authenticationReducer)
  }
})

export const auth = slice.reducer
