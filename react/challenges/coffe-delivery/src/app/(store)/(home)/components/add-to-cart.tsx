import { ShoppingCartSimple } from '@phosphor-icons/react'

interface AddToCartProps {
  addCoffeeInCart: () => void
  disabled: boolean
}

export function AddToCart({ addCoffeeInCart, disabled }: AddToCartProps) {
  return (
    <button
      className="h-[38px] w-[38px] flex items-center justify-center bg-purple-dark rounded-md hover:bg-purple transition duration-200 disabled:opacity-75"
      disabled={disabled}
      onClick={addCoffeeInCart}
    >
      <ShoppingCartSimple className="text-card" size={22} weight="fill" />
    </button>
  )
}
