import Image from 'next/image'
import { OrderInfo } from './components/order-info'

export default function CheckoutSuccess() {
  return (
    <div className="max-w-[1120px] mx-auto flex justify-between items-end pt-20 sm:px-6">
      <div>
        <h1 className="text-yellow-dark font-baloo2 font-extrabold text-3xl">
          Uhu! Pedido confirmado
        </h1>
        <span className="text-xl text-subtitle">
          Agora é só aguardar que logo o café chegará até você
        </span>

        <div className="max-w-[526px] w-full flex-1 rounded-tr-[36px] rounded-br-[6px] rounded-bl-[36px] rounded-tl-[6px] bg-gradient-to-r from-yellow to-purple p-[1px] mt-10">
          <OrderInfo />
        </div>
      </div>
      <Image
        className="pt-2 sm:hidden"
        src="/delivery.svg"
        width={492}
        height={293}
        alt=""
      />
    </div>
  )
}
