import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react'
import { api } from '../lib/axios'

interface CartProviderProps {
  children: ReactNode
}

export interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  description: string | null
  quantity?: number
  priceFormat: string
  defaultPriceId: string
}

interface CartContextProps {
  openSidebar: 'open' | 'close' | ''
  changeSidebarStatus: () => void
  productsInCart: Product[]
  addProductInCar: (product: Product) => void
  handleBuyProduct: () => void
  removeProductInCart: (productId: string) => void
}

enum ActionTypes {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

interface ActionProps {
  type: ActionTypes
  payload: {
    product: Product
  }
}

const CartContext = createContext({} as CartContextProps)

function reducer(state: Product[], action: ActionProps) {
  switch (action.type) {
    case ActionTypes.ADD: {
      const product = action.payload.product
      const hasProductInCart = state.find(({ id }) => id === product?.id)
      if (hasProductInCart) {
        return state.map((productInCart) => {
          if (productInCart.id === product?.id) {
            return {
              ...productInCart,
              quantity: productInCart?.quantity
                ? productInCart?.quantity + 1
                : 0,
            }
          }
          return productInCart
        })
      }
      return [...state, { ...product, quantity: 1 }]
    }
    case ActionTypes.REMOVE: {
      const id = action.payload.product.id
      return state
        .map((product) => {
          if (product.id === id) {
            return {
              ...product,
              quantity: product?.quantity ? product.quantity - 1 : 0,
            }
          }
          return product
        })
        .filter((product) => product.quantity !== 0)
    }
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const [openSidebar, setOpenSidebar] = useState<'open' | 'close' | ''>('')
  const [productsInCart, dispatch] = useReducer(reducer, [])

  function changeSidebarStatus() {
    setOpenSidebar((value) =>
      value === '' || value === 'close' ? 'open' : 'close',
    )
  }

  function addProductInCar(product: Product) {
    dispatch({
      type: ActionTypes.ADD,
      payload: {
        product,
      },
    })
  }

  function removeProductInCart(productId: string) {
    dispatch({
      type: ActionTypes.REMOVE,
      payload: {
        product: {
          id: productId,
        } as Product,
      },
    })
  }

  async function handleBuyProduct() {
    try {
      const purchasedProducts = productsInCart.map((product) => ({
        price: product.defaultPriceId,
        quantity: 1,
      }))

      const { data } = await api.post('api/checkout', {
        purchasedProducts,
      })

      const { checkoutUrl } = data

      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com alguma ferramente de observalidade (Sentry)
      // setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <CartContext.Provider
      value={{
        openSidebar,
        changeSidebarStatus,
        productsInCart,
        addProductInCar,
        handleBuyProduct,
        removeProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
