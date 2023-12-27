'use client'
import { CoffeeData } from '@/app/types/coffee'
import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react'
import { AddressAndPaymentFormData } from '../FormProvider'
import { ActionCoffeeTypes } from './reduces/actions'
import { coffeeCartReducer } from './reduces/reduce'

interface CartProviderProps {
  children: ReactNode
}

interface CartContextData {
  coffees: CoffeeData[]
  totalItems: number
  totalOrder: number
  address: AddressAndPaymentFormData
  addCoffeeToCart: (coffee: CoffeeData) => void
  removeCoffeeToCart: (coffee: CoffeeData) => void
  addAddressToOrder(address: AddressAndPaymentFormData): void
  clearCart(): void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
  const [coffeesReducer, dispatch] = useReducer(coffeeCartReducer, {
    coffees: [],
    totalItems: 0,
    totalOrder: Number(process.env.NEXT_PUBLIC_DELIVERY_TAX),
  })

  const [address, setAddress] = useState({} as AddressAndPaymentFormData)

  function addCoffeeToCart(coffee: CoffeeData) {
    dispatch({
      type: ActionCoffeeTypes.ADD_UPDATED_COFFEE,
      payload: {
        coffee,
      },
    })
  }

  function removeCoffeeToCart(coffee: CoffeeData) {
    dispatch({
      type: ActionCoffeeTypes.REMOVE_COFFEE,
      payload: {
        coffee,
      },
    })
  }

  function addAddressToOrder(address: AddressAndPaymentFormData) {
    setAddress(address)
  }

  function clearCart() {
    dispatch({
      type: ActionCoffeeTypes.CLEAR_CART,
      payload: {
        coffee: {} as CoffeeData,
      },
    })
  }

  const { totalItems, totalOrder, coffees } = coffeesReducer

  return (
    <CartContext.Provider
      value={{
        coffees,
        totalItems,
        totalOrder,
        addCoffeeToCart,
        removeCoffeeToCart,
        addAddressToOrder,
        address,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  return useContext(CartContext)
}

export { CartProvider, useCart }
