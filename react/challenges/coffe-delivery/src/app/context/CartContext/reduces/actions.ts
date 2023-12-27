import { CoffeeData } from '@/app/types/coffee'

export enum ActionCoffeeTypes {
  ADD_UPDATED_COFFEE = 'ADD_UPDATED_COFFEE',
  REMOVE_COFFEE = 'REMOVE_COFFEE',
  CLEAR_CART = 'CLEAR_CART',
}

export function addCoffee(coffee: CoffeeData) {
  return {
    type: ActionCoffeeTypes.ADD_UPDATED_COFFEE,
    payload: {
      coffee,
    },
  }
}

export function removeCoffee(coffeeId: string) {
  return {
    type: ActionCoffeeTypes.REMOVE_COFFEE,
    payload: {
      coffee: {
        id: coffeeId,
      },
    },
  }
}

export function clearCart() {
  return {
    type: ActionCoffeeTypes.CLEAR_CART,
  }
}
