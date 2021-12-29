import { Place } from "../../model/Place"
import { DELETE_ALL_FROM_PLACE, INSERT_INTO_PLACE, SELECT_ALL_FROM_PLACE } from "./sql"
import { execute } from "../db"


export namespace Places {
  export const insert = (place: Omit<Place, "id">) => execute({
    query: INSERT_INTO_PLACE,
    args: [ place.title, place.image, "address", 123, 123 ]
  })

  export const fetchAll = () => execute({ query: SELECT_ALL_FROM_PLACE })

  export const truncate = () => execute({ query: DELETE_ALL_FROM_PLACE })
}

