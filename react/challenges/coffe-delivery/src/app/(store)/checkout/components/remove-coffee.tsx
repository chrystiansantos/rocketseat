import { Trash } from '@phosphor-icons/react/dist/ssr'

interface RemoveCoffeeProps {
  removeCoffee: () => void
}

export function RemoveCoffee({ removeCoffee }: RemoveCoffeeProps) {
  return (
    <button
      onClick={removeCoffee}
      className="flex items-center h-[38px] gap-1 bg-button rounded-md py-1.5 px-2 text-xs text-text uppercase"
    >
      <Trash size={18} className="text-purple" weight="regular" />
      Remover
    </button>
  )
}
