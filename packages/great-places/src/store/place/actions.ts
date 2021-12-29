import { createAsyncThunk } from "@reduxjs/toolkit"
import { documentDirectory, moveAsync } from "expo-file-system"

import { Place } from "../../model/Place"
import { Places } from "../../repository"

export namespace PlaceAction {
  export const add = createAsyncThunk<Place, Omit<Place, "id">>("place/add", async (place) => {
    const fileName = place.image.split("/").pop()
    const newPath = `${documentDirectory}${fileName}`
    await moveAsync({ from: place.image, to: newPath })

    const result = await Places.insert({ ...place, image: newPath })
    return { ...place, image: newPath, id: result.insertId! }
  })

  export const init = createAsyncThunk<Place[]>("place/init", async () => {
    const result = await Places.fetchAll()
    return result.rows._array
  })
}
