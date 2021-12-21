import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

import { AuthResult } from "../../models/auth-result"
import { AuthState } from "./slice"


export const initAuthReducer: CaseReducer<AuthState, PayloadAction<AuthResult>> = (state, action) => {
  state.user = {
    id: action.payload.localId,
    email: action.payload.email
  }
  state.token = {
    access: action.payload.idToken,
    refresh: action.payload.refreshToken
  }
}

export const authenticationPendingReducer: CaseReducer<AuthState> = state => {
  state.loading = true
  state.error = false
}

export const authenticationRejectedReducer: CaseReducer<AuthState> = state => {
  state.loading = false
  state.error = true
}

export const authenticationReducer: CaseReducer<AuthState, PayloadAction<AuthResult>> = (state, action) => {
  state.loading = false
  state.error = false
  state.user = {
    id: action.payload.localId,
    email: action.payload.email
  }
  state.token = {
    access: action.payload.idToken,
    refresh: action.payload.refreshToken
  }
}

export const logoutReducer: CaseReducer<AuthState> = (state) => {
  state.user = undefined
  state.token = undefined
}
