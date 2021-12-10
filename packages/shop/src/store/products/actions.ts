import { createAction } from "@reduxjs/toolkit"

import { Product } from "../../models"


export namespace Products {
  export const remove = createAction<number>("products/remove")
  export const create = createAction<Product>("products/create")
  export const update = createAction<Product>("products/update")
}
