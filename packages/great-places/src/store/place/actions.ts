import { createAction } from "@reduxjs/toolkit"

export namespace PlaceAction {
  export const add = createAction<string>("place/add")
}
