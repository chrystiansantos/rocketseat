import { CoffeeData } from '@/app/types/coffee'
import { Coffee } from './coffee'

interface CoffeeListProps {
  coffees: CoffeeData[]
}

export function CoffeeList({ coffees }: CoffeeListProps) {
  return (
    <div className="mt-8 max-w-[1120px] mx-auto pb-40">
      <h2 className="mb-14 text-3xl font-extrabold font-baloo2 sm:text-center">
        Nossos cafés
      </h2>

      <div className="mt-14 grid grid-cols-4 gap-y-10 gap-x-8 sm:grid-cols-1 sm:justify-items-center">
        {coffees.map((coffee) => (
          <Coffee key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </div>
  )
}
