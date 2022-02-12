import { createAsyncThunk } from "@reduxjs/toolkit"
import { documentDirectory, moveAsync } from "expo-file-system"

import { Place } from "../../model/Place"
import { Places } from "../../repository"
import { Location } from "../../model/Location"
import { Const } from "../../common/const"

export namespace PlaceAction {
  const getGeoCode = async (location: Location) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${Const.GOOGLE_MAP_API_KEY}`)
    if (!response.ok) {
      throw new Error("fail to fetch geo code")
    }
    return response.json()
  }

  export const add = createAsyncThunk<Place, Omit<Place, "id">>("place/add", async (place) => {
    const response = await getGeoCode({ lat: place.lat, lng: place.lng })
    const address = response.results[0].formatted_address

    const fileName = place.image.split("/").pop()
    const newPath = `${documentDirectory}${fileName}`
    await moveAsync({ from: place.image, to: newPath })

    const result = await Places.insert({ ...place, image: newPath, address })
    return { ...place, image: newPath, id: result.insertId!, address }
  })

  export const init = createAsyncThunk<Place[]>("place/init", async () => {
    const result = await Places.fetchAll()
    return result.rows._array
  })

  export const removeAll = createAsyncThunk<void>("place/removeAll", async () => {
    await Places.truncate()
  })
}
