import { Reducer, useCallback, useMemo, useReducer } from "react"


export type Validate = (text: string) => boolean

type InputState = {
  touched: boolean
  valid: boolean
  error: boolean
  value: string
}

export const useInput = (initialState: string = "", validate?: Validate) => {
  const [ input, dispatch ] = useReducer<Reducer<InputState, InputAction>>(reducer, {
    touched: false,
    valid: validate ? validate(initialState) : false,
    error: false,
    value: initialState
  })

  const set = useCallback((text: string) => {
    dispatch({
      type: "set",
      payload: {
        valid: validate ? validate(text) : true,
        value: text
      }
    })
  }, [])

  const reset = useCallback(() => {
    dispatch({
      type: "reset",
      payload: initialState
    })
  }, [])

  return useMemo(() => {
    return {
      ...input,
      set, reset
    }
  }, [ input, set, reset ])
}


type InputAction = SetInputAction | ResetInputAction

type SetInputAction = {
  type: "set"
  payload: {
    valid: boolean
    value: string
  }
}

type ResetInputAction = {
  type: "reset"
  payload?: string
}

const reducer: Reducer<InputState, InputAction> = (state, action) => {
  switch (action.type) {
    case "set":
      return {
        ...action.payload,
        touched: true,
        error: !action.payload.valid,
      }
    case "reset":
      return {
        touched: false,
        valid: false,
        error: false,
        value: action.payload ?? ""
      }
    default:
      return state
  }
}
