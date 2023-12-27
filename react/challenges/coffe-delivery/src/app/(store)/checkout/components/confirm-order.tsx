'use client'
import { useCart } from '@/app/context/CartContext'
import {
  AddressAndPaymentFormData,
  addressAndPaymentFormValidationSchema,
} from '@/app/context/FormProvider'
import { useLoadingNotification } from '@/app/context/LoadingNotification'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { ZodError } from 'zod'

export function ConfirmOrder() {
  const { coffees, addAddressToOrder, clearCart } = useCart()
  const { updateLoading, setMessageAlert } = useLoadingNotification()
  const { getValues } = useFormContext<AddressAndPaymentFormData>()
  const { push } = useRouter()
  const enableConfirmOrder = !coffees.length

  async function handleConfirmationOrder() {
    try {
      const address = addressAndPaymentFormValidationSchema.parse(getValues())
      addAddressToOrder(address)
      updateLoading(true)
      await new Promise((resolve) => setTimeout(() => resolve(''), 5000))
      clearCart()
      push('checkout/success')
    } catch (error) {
      if (error instanceof ZodError) setMessageAlert(error?.issues[0]?.message)
    } finally {
      updateLoading(false)
    }
  }

  return (
    <button
      className="w-full p-3 bg-yellow rounded-md uppercase font-bold text-white text-sm hover:brightness-90 ease-in duration-300 disabled:brightness-90 disabled:cursor-not-allowed"
      onClick={handleConfirmationOrder}
      disabled={enableConfirmOrder}
    >
      Confirmar pedido
    </button>
  )
}
