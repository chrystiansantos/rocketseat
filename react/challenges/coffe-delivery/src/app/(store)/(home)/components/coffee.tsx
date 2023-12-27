import { CoffeeData } from '@/app/types/coffee'
import Image from 'next/image'
import BuyCoffee from './buy-coffee'
import { Chip } from './chip'

interface CoffeeProps {
  coffee: CoffeeData
}

export function Coffee({ coffee }: CoffeeProps) {
  return (
    <div className="h-[310px] w-64 bg-card rounded-tl-md rounded-tr-2.25 rounded-br-md rounded-bl-2.25 flex flex-col items-center">
      <Image
        className="-mt-5"
        src={coffee.imageUrl}
        width={120}
        height={120}
        alt=""
      />
      <div className="flex mt-3 items-center gap-1">
        {coffee.type.map((coffeeType) => (
          <Chip key={coffeeType} title={coffeeType} />
        ))}
      </div>
      <div className="mt-4 mb-8 flex flex-col items-center px-5">
        <strong className="font-baloo2 text-xl text-subtitle">
          {coffee.name}
        </strong>
        <span className="mt-2 text-sm text-label text-center">
          {coffee.description}
        </span>
      </div>
      <BuyCoffee coffee={coffee} />
    </div>
  )
}
