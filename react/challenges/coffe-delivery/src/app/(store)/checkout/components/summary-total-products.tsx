'use client'
import { useCart } from '@/app/context/CartContext'

export function SummaryTotalProducts() {
  const { totalItems } = useCart()

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text">Total de itens</span>
      <span className="text-text">
        R${' '}
        {new Intl.NumberFormat('pt-BR', {
          style: 'decimal',
          minimumFractionDigits: 2,
        }).format(totalItems)}
      </span>
    </div>
  )
}
