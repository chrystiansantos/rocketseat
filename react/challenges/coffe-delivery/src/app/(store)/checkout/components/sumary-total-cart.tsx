'use client'
import { useCart } from '@/app/context/CartContext'

export function SummaryTotalCart() {
  const { totalOrder } = useCart()
  return (
    <div className="flex items-center justify-between">
      <span className="text-subtitle text-xl font-bold">Total</span>
      <span className="text-subtitle text-xl font-bold">
        R${' '}
        {new Intl.NumberFormat('pt-BR', {
          style: 'decimal',
          minimumFractionDigits: 2,
        }).format(totalOrder)}
      </span>
    </div>
  )
}
