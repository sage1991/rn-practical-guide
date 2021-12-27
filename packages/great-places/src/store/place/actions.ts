import { createAsyncThunk } from "@reduxjs/toolkit"
import { documentDirectory, moveAsync } from "expo-file-system"

import { Place } from "../../model/Place"

export namespace PlaceAction {
  export const add = createAsyncThunk<Omit<Place, "id">, Omit<Place, "id">>("place/add", async (place) => {
    const fileName = place.image.split("/").pop()
    const newPath = `${documentDirectory}${fileName}`
    await moveAsync({ from: place.image, to: newPath })
    return { ...place, image: newPath }
  })
}
