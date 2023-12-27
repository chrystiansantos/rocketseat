import { ConfirmOrder } from './confirm-order'
import { SummaryTotalCart } from './sumary-total-cart'
import { SummaryTotalProducts } from './summary-total-products'

export function SummaryTotal() {
  return (
    <div className="flex flex-col gap-3">
      <SummaryTotalProducts />
      <div className="flex items-center justify-between">
        <span className="text-sm text-text">Entrega</span>
        <span className="text-text">R$ 3,50</span>
      </div>
      <SummaryTotalCart />
      <ConfirmOrder />
    </div>
  )
}
