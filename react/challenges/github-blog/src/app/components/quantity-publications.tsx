interface QuantityPublicationsProps {
  quantityPublication: number
}

export function QuantityPublications({
  quantityPublication,
}: QuantityPublicationsProps) {
  return (
    <div className="flex items-center justify-between mt-16">
      <span className="font-bold text-lg text-subtitle">Publicações</span>
      <span className="text-sm text-span">
        {quantityPublication} publicações
      </span>
    </div>
  )
}
