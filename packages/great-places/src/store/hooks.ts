import {
  useSelector as useReactReduxSelector,
  useDispatch as useReactReduxDispatch
} from "react-redux"

import { RootDispatch, RootState } from "./store"


type Selector<T> = (state: RootState) => T
type EqualityFn<T> = (left: T, right: T) => boolean

export const useSelector = <T> (selector: Selector<T>, equalityFn?: EqualityFn<T>) => (
  useReactReduxSelector<RootState, T>(selector, equalityFn)
)

export const useDispatch = () => useReactReduxDispatch<RootDispatch>()
