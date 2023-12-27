import { CoffeeData } from '@/app/types/coffee'
import { totalOrder } from '@/utils/total-order'
import { ActionCoffeeTypes } from './actions'

interface ActionCoffeeProps {
  type: ActionCoffeeTypes
  payload: {
    coffee: CoffeeData
  }
}

interface CartState {
  coffees: CoffeeData[]
  totalItems: number
  totalOrder: number
}

export function coffeeCartReducer(state: CartState, action: ActionCoffeeProps) {
  switch (action.type) {
    case ActionCoffeeTypes.ADD_UPDATED_COFFEE: {
      const coffeeExists = state.coffees.findIndex(
        (coffee) => coffee.id === action.payload.coffee.id,
      )
      let coffees = state.coffees

      if (coffeeExists !== -1) {
        coffees[coffeeExists].amount = action.payload.coffee.amount
      } else {
        coffees = [...coffees, action.payload.coffee]
      }

      const total = totalOrder(coffees)

      return {
        coffees,
        totalItems: total,
        totalOrder: total + Number(process.env.NEXT_PUBLIC_DELIVERY_TAX),
      }
    }

    case ActionCoffeeTypes.REMOVE_COFFEE: {
      const coffees = state.coffees.filter(
        (coffee) => coffee.id !== action.payload.coffee.id,
      )

      const total = totalOrder(coffees)
      return {
        coffees,
        totalItems: total,
        totalOrder: total + Number(process.env.NEXT_PUBLIC_DELIVERY_TAX),
      }
    }

    case ActionCoffeeTypes.CLEAR_CART: {
      return {
        coffees: [],
        totalItems: 0,
        totalOrder: Number(process.env.NEXT_PUBLIC_DELIVERY_TAX),
      }
    }

    default:
      return state
  }
}
