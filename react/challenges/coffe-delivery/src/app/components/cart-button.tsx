'use client'
import { useCart } from '@/app/context/CartContext'
import { ShoppingCart } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

export function CartButton() {
  const { coffees } = useCart()

  return (
    <Link
      href="/checkout"
      className="h-[38px] w-[38px] bg-yellow-light rounded-md flex items-center justify-center relative hover:brightness-95 ease-in duration-300"
    >
      <ShoppingCart className="text-yellow-dark" size={22} weight="fill" />
      <span className="absolute h-5 w-5 bg-yellow-dark text-white font-bold rounded-full text-xs flex items-center justify-center -top-2 -right-2">
        {coffees.length}
      </span>
    </Link>
  )
}
