import PurchaseDescriptionItem from './purchase-description-item'

export function PurchaseDescriptions() {
  return (
    <div className="grid grid-cols-2 gap-y-6 text-text sm:grid-cols-1 sm:gap-y-4">
      <PurchaseDescriptionItem
        iconName="shoppingCart"
        bgIcon="bg-yellow-dark"
        description="Compra simples e segura"
      />
      <PurchaseDescriptionItem
        iconName="package"
        bgIcon="bg-text"
        description="Embalagem mantém o café intacto"
      />
      <PurchaseDescriptionItem
        iconName="timer"
        bgIcon="bg-yellow"
        description="Entrega rápida e rastreada"
      />
      <PurchaseDescriptionItem
        iconName="coffee"
        bgIcon="bg-purple"
        description="O café chega fresquinho até você"
      />
    </div>
  )
}
