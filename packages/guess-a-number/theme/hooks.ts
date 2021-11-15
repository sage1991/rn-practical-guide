import { useMemo } from "react"
import { StyleSheet, ScaledSize, useWindowDimensions } from "react-native"


type StyleFactory<T> = (screen: ScaledSize) => T

export const createStyle = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>> (factory: StyleFactory<T | StyleSheet.NamedStyles<T>>) => (): T => {
  const dimensions = useWindowDimensions()
  return useMemo(() => StyleSheet.create(factory(dimensions)), [ dimensions ])
}
