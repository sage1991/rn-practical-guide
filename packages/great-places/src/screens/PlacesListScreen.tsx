import React, { FC, useEffect } from "react"
import { StyleSheet, FlatList, ListRenderItem } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { PlaceAction, useDispatch, useSelector } from "../store"
import { Place } from "../model/Place"
import { PlaceItem } from "../components/place"
import { PlacesNavigatorParams } from "../navigation"


type Props = StackScreenProps<PlacesNavigatorParams, "places">

export const PlacesListScreen: FC<Props> = (props) => {
  const places = useSelector(state => state.place.places)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(PlaceAction.init())
  }, [])

  console.log(places)
  const onSelect = (place: Place) => {
    props.navigation.navigate("places-detail", {
      id: place.id,
      title: place.title
    })
  }

  const renderItem: ListRenderItem<Place> = ({ item }) => (
    <PlaceItem
      title={item.title}
      address=""
      image={item.image}
      onSelect={onSelect.bind(null, item)}
    />
  )

  return (
    <FlatList
      data={places}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({})
