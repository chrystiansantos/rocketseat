import { Minus, Plus } from '@phosphor-icons/react/dist/ssr'

interface CounterProps {
  quantityCoffeeSelect: number
  incrementCoffee: () => void
  decreaseCoffee: () => void
}

export function Counter({
  quantityCoffeeSelect,
  decreaseCoffee,
  incrementCoffee,
}: CounterProps) {
  return (
    <div className="w-[72px] h-[38px] rounded-md bg-button flex items-center justify-center gap-1 text">
      <button
        onClick={decreaseCoffee}
        disabled={quantityCoffeeSelect === 0}
        className="text-purple disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={14} weight="bold" />
      </button>
      <span>{quantityCoffeeSelect}</span>
      <button className="text-purple" onClick={incrementCoffee}>
        <Plus size={14} weight="bold" />
      </button>
    </div>
  )
}
