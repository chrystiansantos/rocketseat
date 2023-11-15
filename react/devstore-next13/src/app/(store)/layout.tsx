import { Header } from '@/components/header'
import { CartProvider } from '@/contexts/cart-context'
import { ReactNode } from 'react'

interface StoreLayoutProps {
  children: ReactNode
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <CartProvider>
      <div className="mx-auto grid grid-rows-[min-content_max-content] gap-5 p-8 min-h-screen w-full max-w-[1600px]">
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}
