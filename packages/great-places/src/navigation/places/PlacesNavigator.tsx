import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import { MapScreen, NewPlaceScreen, PlaceDetailScreen, PlacesListScreen } from "../../screens"
import { HeaderButton } from "../../components/ui"
import { Colors } from "../../theme/colors"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "@react-navigation/core/src/types"
import { Ionicons } from "@expo/vector-icons"


export type PlacesNavigatorParams = {
  places: undefined
  "places-detail": undefined
  "new-place": undefined
  map: undefined
}

const Stack = createStackNavigator<PlacesNavigatorParams>()

export const PlacesNavigator: FC = () => {
  const navigation = useNavigation<NavigationProp<PlacesNavigatorParams>>()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.white
        },
        headerTintColor: Colors.primary,
        headerLeft: (props) => (
          props.canGoBack &&
          <HeaderButtons {...props} HeaderButtonComponent={HeaderButton}>
            <Item title="add place" iconName="arrow-back" onPress={navigation.goBack} />
          </HeaderButtons>
        )
      }}
    >
      <Stack.Screen
        name="places"
        component={PlacesListScreen}
        options={{
          headerTitle: "All Places",
          headerRight: (props) => (
            <HeaderButtons {...props} HeaderButtonComponent={HeaderButton}>
              <Item title="add place" iconName="ios-add" onPress={() => navigation.navigate("new-place")} />
            </HeaderButtons>
          )
        }}
      />
      <Stack.Screen name="places-detail" component={PlaceDetailScreen} />
      <Stack.Screen
        name="new-place"
        component={NewPlaceScreen}
        options={{ headerTitle: "Add Place" }}
      />
      <Stack.Screen name="map" component={MapScreen} />
    </Stack.Navigator>
  )
}
