interface ChipProps {
  title?: string
}

export function Chip({ title = 'Tradicional' }: ChipProps) {
  return (
    <div className="bg-yellow-light text-yellow-dark px-2 py-1 rounded-full font-bold text-[10px] uppercase">
      {title}
    </div>
  )
}
