import { createAction } from "@reduxjs/toolkit"

import { Product } from "../../models"


export namespace Cart {
  export const add = createAction<Product>("cart/add")
  export const remove = createAction<string>("cart/remove")
  export const removeAll = createAction<string>("cart/removeAll")
  export const clear = createAction("cart/clear")
}

