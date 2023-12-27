'use client'
import { useCart } from '@/app/context/CartContext'

import { Counter } from '@/app/components/counter'
import { CoffeeData } from '@/app/types/coffee'
import { useState } from 'react'
import { AddToCart } from './add-to-cart'

interface BuyCoffeeProps {
  coffee: CoffeeData
}

export default function BuyCoffee({ coffee }: BuyCoffeeProps) {
  const { coffees, addCoffeeToCart } = useCart()
  const quantityCoffeeSelect =
    coffees.find(({ id }) => id === coffee.id)?.amount || 1

  const [quantityCoffee, setQuantityCoffee] = useState(quantityCoffeeSelect)

  function handleAddCoffee() {
    addCoffeeToCart({
      ...coffee,
      amount: quantityCoffee,
    })
  }

  function incrementCoffee() {
    setQuantityCoffee((state) => state + 1)
  }

  function decrementCoffee() {
    setQuantityCoffee((state) => state - 1)
  }

  const disableButtonBuyCoffee = quantityCoffee === 0

  return (
    <div className="flex items-center gap-6">
      <span className="text-sm text-text flex items-center">
        R$
        <strong className="font-bold text-2xl font-baloo2 ml-1">
          {new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumFractionDigits: 2,
          }).format(coffee.price)}
        </strong>
      </span>
      <div className="flex gap-1">
        <Counter
          quantityCoffeeSelect={quantityCoffee}
          decreaseCoffee={decrementCoffee}
          incrementCoffee={incrementCoffee}
        />
        <AddToCart
          disabled={disableButtonBuyCoffee}
          addCoffeeInCart={handleAddCoffee}
        />
      </div>
    </div>
  )
}
