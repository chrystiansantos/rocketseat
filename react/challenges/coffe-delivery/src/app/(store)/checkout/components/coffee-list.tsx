'use client'
import { useCart } from '@/app/context/CartContext'

import { Counter } from '@/app/components/counter'
import { CoffeeData } from '@/app/types/coffee'
import Image from 'next/image'
import { RemoveCoffee } from './remove-coffee'

export default function CoffeeListCheckout() {
  const { coffees, addCoffeeToCart, removeCoffeeToCart } = useCart()

  function handleIncrementCoffee(coffee: CoffeeData) {
    addCoffeeToCart({
      ...coffee,
      amount: coffee.amount + 1,
    })
  }

  function handleDecrementCoffee(coffee: CoffeeData) {
    addCoffeeToCart({
      ...coffee,
      amount: coffee.amount - 1,
    })
  }

  function handleRemoveCoffeeToCart(coffee: CoffeeData) {
    removeCoffeeToCart(coffee)
  }

  return (
    <ul className="overflow-y-auto h-full">
      {coffees.map((coffee) => (
        <li
          key={coffee.id}
          className="border-b border-button px-1 py-6 flex justify-between"
        >
          <div className="flex gap-5 items-center">
            <Image src={coffee.imageUrl} width={64} height={64} alt="" />
            <div className="flex flex-col gap-2">
              <strong className="text-subtitle font-normal">
                {coffee.name}
              </strong>
              <div className="flex gap-2">
                <Counter
                  decreaseCoffee={() => handleDecrementCoffee(coffee)}
                  incrementCoffee={() => handleIncrementCoffee(coffee)}
                  quantityCoffeeSelect={coffee.amount}
                />
                <RemoveCoffee
                  removeCoffee={() => handleRemoveCoffeeToCart(coffee)}
                />
              </div>
            </div>
          </div>
          <span className="font-bold text-text">
            R$
            {new Intl.NumberFormat('pt-BR', {
              style: 'decimal',
              minimumFractionDigits: 2,
            }).format(coffee.amount * coffee.price)}
          </span>
        </li>
      ))}
    </ul>
  )
}
