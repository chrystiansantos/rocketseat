import { FormProvider } from '@/app/context/FormProvider'
import CoffeeListCheckout from './components/coffee-list'
import { FormAddress } from './components/form-address'
import { SummaryTotal } from './components/summary-total'

export default function Checkout() {
  return (
    <FormProvider>
      <div className="max-w-[1120px] mt-10 mx-auto grid grid-cols-checkout gap-x-8 sm:grid-cols-1 sm:px-6">
        <div>
          <strong className="font-baloo2 text-lg font-extrabold text-subtitle mb-4 inline-block">
            Complete seu pedido
          </strong>
          <FormAddress />
        </div>
        <div className="max-h-[591px] flex flex-col">
          <strong className="font-baloo2 text-lg font-extrabold text-subtitle mb-4">
            Cafés selecionados
          </strong>
          <div className="p-10 bg-card flex flex-col gap-6 max-h-full rounded-tr-[44px] rounded-br-[6px] rounded-bl-[44px] rounded-tl-[6px]">
            <CoffeeListCheckout />
            <SummaryTotal />
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
