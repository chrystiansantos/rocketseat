import { CoffeeData } from '@/app/types/coffee'

export function totalOrder(coffees: CoffeeData[]) {
  return coffees.reduce(
    (total, { price, amount }) => (total += price * amount),
    0,
  )
}
