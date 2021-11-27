export interface Meal {
  id: number
  categoryIds: number[]
  title: string
  imageUrl: string
  ingredients: string[]
  steps: string[]
  duration: number
  complexity: "simple" | "hard" |"challenging"
  affordability: "affordable" | "pricey" | "luxurious"
  isGlutenFree: boolean
  isVegan: boolean
  isVegetarian: boolean
  isLactoseFree: boolean
}
