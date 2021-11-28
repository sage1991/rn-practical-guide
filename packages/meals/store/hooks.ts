import {
  useSelector as useSelectorFromReactRedux,
  useDispatch as useDispatchFromReactRedux,
  useStore as useStoreFromReactRedux
} from "react-redux"
import { RootDispatch, RootState, RootStore } from "./store"


type Selector<T> = (state: RootState) => T
type EqualityFn<T> = (left: T, right: T) => boolean

export const useSelector = <T> (selector: Selector<T>, equalityFn?: EqualityFn<T>) => (
  useSelectorFromReactRedux<RootState, T>(selector, equalityFn)
)

export const useDispatch = () => useDispatchFromReactRedux<RootDispatch>()

export const useStore = () => useStoreFromReactRedux<RootStore>()
