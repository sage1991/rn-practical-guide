import { CartItem } from "./cart-item"


export interface Order {
  id: string
  items: CartItem[]
  amount: number
  date: string
}
