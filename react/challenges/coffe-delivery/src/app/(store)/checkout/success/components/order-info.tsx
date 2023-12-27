'use client'
import { IconDescription } from '@/app/components/icon-description'
import { useCart } from '@/app/context/CartContext'

export function OrderInfo() {
  const { address } = useCart()

  return (
    <div className="w-full h-full bg-white rounded-tr-[34px] rounded-br-[6px] rounded-bl-[34px] rounded-tl-[6px] p-10 flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <IconDescription name="mapPin" className="bg-purple" />
        <div>
          <span className="block text-text">
            Entrega em{' '}
            <span className="font-bold">
              {`${address.street}, ${address.number_house}`}
            </span>
          </span>
          <span className="text-text">
            {address.neighborhood} - {address.city}, {address.state}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <IconDescription name="timer" className="bg-yellow" />
        <div>
          <span className="block text-text">Previsão de entrega</span>
          <span className="text-text font-bold">20 min - 30 min </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <IconDescription name="currencyDollar" className="bg-yellow-dark" />
        <div>
          <span className="block text-text">Pagamento na entrega</span>
          <span className="text-text font-bold">{address.payment_mode}</span>
        </div>
      </div>
    </div>
  )
}
