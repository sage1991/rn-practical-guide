import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import { Typography } from "../components/Typography"
import { FilterSwitch, HeaderButton } from "../components"
import { RootNavigatorParams, ScreenProps } from "../navigation"
import { useDispatch, setFilter, useSelector } from "../store"
import { Fonts } from "../theme"


type Props = ScreenProps<RootNavigatorParams, "filters">

export const FiltersScreen: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.meals.filters)
  const [ isGlutenFree, setIsGlutenFree ] = useState<boolean>(filters.isGlutenFree)
  const [ isVegan, setIsVegan ] = useState<boolean>(filters.isVegan)
  const [ isVegetarian, setIsVegetarian ] = useState<boolean>(filters.isVegetarian)
  const [ isLactoseFree, setIsLactoseFree ] = useState<boolean>(filters.isLactoseFree)

  const saveFilters = useCallback(() => {
    const filters = { isGlutenFree, isVegan, isVegetarian, isLactoseFree }
    dispatch(setFilter(filters))
  }, [ isGlutenFree, isVegan, isVegetarian, isLactoseFree ])

  useEffect(() => {
    const filters = { isGlutenFree, isVegan, isVegetarian, isLactoseFree }
    dispatch(setFilter(filters))
  }, [ saveFilters ])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName="ios-save"
            onPress={saveFilters}
          />
        </HeaderButtons>
      )
    })
  }, [ saveFilters, props.navigation ])

  return (
    <View style={styles.screen}>
      <Typography style={styles.title}>
        Available Filters / Restrictions
      </Typography>
      <FilterSwitch
        style={styles.filter}
        name="Gluten-free"
        value={isGlutenFree}
        onValueChange={setIsGlutenFree}
      />
      <FilterSwitch
        style={styles.filter}
        name="Vegan"
        value={isVegan}
        onValueChange={setIsVegan}
      />
      <FilterSwitch
        style={styles.filter}
        name="Vegetarian"
        value={isVegetarian}
        onValueChange={setIsVegetarian}
      />
      <FilterSwitch
        style={styles.filter}
        name="Lactose-free"
        value={isLactoseFree}
        onValueChange={setIsLactoseFree}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    margin: 20,
    textAlign: "center"
  },
  filter: {
    width: "80%",
    marginBottom: 20
  }
})
