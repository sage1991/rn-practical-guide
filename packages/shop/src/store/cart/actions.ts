import { createAction } from "@reduxjs/toolkit"

import { Product } from "../../models"


export namespace Cart {
  export const add = createAction<Product>("cart/add")
  export const remove = createAction<number>("cart/remove")
  export const removeAll = createAction<number>("cart/removeAll")
  export const clear = createAction("cart/clear")
}

