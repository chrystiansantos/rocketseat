import {
  Coffee,
  CurrencyDollar,
  MapPin,
  Package,
  ShoppingCart,
  Timer,
} from '@phosphor-icons/react/dist/ssr'
import { twMerge } from 'tailwind-merge'

const icons = {
  shoppingCart: ShoppingCart,
  package: Package,
  timer: Timer,
  coffee: Coffee,
  mapPin: MapPin,
  currencyDollar: CurrencyDollar,
}

export type IconPurchase = keyof typeof icons

interface IconDescription {
  name: IconPurchase
  className: string
  weight?: 'fill' | 'regular'
}

export function IconDescription({
  className,
  name,
  weight = 'fill',
}: IconDescription) {
  const Icon = icons[name]

  return (
    <div
      className={twMerge(
        'h-8 w-8 rounded-full text-white flex items-center justify-center',
        className,
      )}
    >
      <Icon size={16} weight={weight} />
    </div>
  )
}
