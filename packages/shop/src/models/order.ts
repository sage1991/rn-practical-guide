import { CartItem } from "./cart-item"

export interface Order {
  id: number
  items: CartItem[]
  amount: number
  date: string
}
