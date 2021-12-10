import { createAction } from "@reduxjs/toolkit"

import { Order } from "../../models/order"


export namespace Orders {
  export const add = createAction<Order>("orders/add")
}
