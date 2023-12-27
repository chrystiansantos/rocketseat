'use client'
import { AddressAndPaymentFormData } from '@/app/context/FormProvider'
import { useLoadingNotification } from '@/app/context/LoadingNotification'
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from '@phosphor-icons/react'
import { useFormContext } from 'react-hook-form'
import { InputText } from './input-text'

export function FormAddress() {
  const { register, watch, setValue, getValues } =
    useFormContext<AddressAndPaymentFormData>()
  const { updateLoading } = useLoadingNotification()
  const paymentSelect = watch('payment_mode')

  async function handleBlurCep() {
    try {
      const cep =
        getValues('cep').length === 9
          ? getValues('cep').replace('-', '')
          : undefined
      if (cep) {
        updateLoading(true)
        const addressRequest = await fetch(
          `https://viacep.com.br/ws/${cep}/json/`,
        )
        const addressData = await addressRequest.json()

        setValue('street', addressData.logradouro)
        setValue('neighborhood', addressData.bairro)
        setValue('city', addressData.localidade)
        setValue('state', addressData.uf)
      }
    } finally {
      updateLoading(false)
    }
  }

  return (
    <div className="rounded-md flex flex-col gap-3">
      <div className="bg-card p-10">
        <div className="flex gap-1 items-start">
          <MapPinLine className="text-yellow-dark" size={22} weight="bold" />
          <div className="flex flex-col">
            <strong className="font-normal text-subtitle leading-5">
              Endereço de entrega
            </strong>
            <span className="text-sm text-text">
              Informe o endereço onde deseja receber seu pedido
            </span>
          </div>
        </div>
        <form className="mt-8 grid grid-cols-12 gap-y-4 gap-x-3">
          <div className="col-start-1 col-end-4 sm:col-end-6">
            <InputText
              placeholder="CEP"
              mask="99999-999"
              name="cep"
              onBlur={handleBlurCep}
            />
          </div>
          <div className="col-start-1 col-end-12">
            <InputText placeholder="Rua" name="street" />
          </div>
          <div className="col-start-1 col-end-4">
            <InputText placeholder="Número" name="number_house" />
          </div>
          <div className="col-start-4 col-end-12">
            <InputText placeholder="Complemento" isOptional name="complement" />
          </div>
          <div className="col-start-1 col-end-4">
            <InputText placeholder="Bairro" name="neighborhood" />
          </div>
          <div className="col-start-4 col-end-10">
            <InputText placeholder="Cidade" name="city" />
          </div>
          <div className="col-start-10 col-end-12">
            <InputText placeholder="UF" name="state" />
          </div>
        </form>
      </div>

      <div className="rounded-md bg-card p-10 flex flex-col gap-8">
        <div className="flex gap-1 items-start">
          <CurrencyDollar className="text-purple" size={22} weight="bold" />
          <div className="flex flex-col">
            <strong className="font-normal text-subtitle">Pagamento</strong>
            <span className="text-sm text-text">
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-3 sm:grid-cols-1 sm:gap-y-2">
          <label
            htmlFor="credit"
            className={`flex gap-3 p-4 items-center justify-start text-xs uppercase rounded-md font-extralight border cursor-pointer ${
              paymentSelect === 'Cartão de crédito'
                ? 'border-purple bg-purple-light'
                : 'border-button bg-button'
            } `}
          >
            <CreditCard className="text-purple" size={16} weight="regular" />
            <span>Cartão de crédito</span>
            <input
              id="credit"
              type="radio"
              value="Cartão de crédito"
              className="hidden"
              {...register('payment_mode')}
            />
          </label>

          <label
            htmlFor="debit"
            className={`flex gap-3 p-4 items-center justify-start text-xs uppercase rounded-md font-extralight border cursor-pointer ${
              paymentSelect === 'Cartão de débito'
                ? 'border-purple bg-purple-light'
                : 'border-button bg-button'
            } `}
          >
            <Bank className="text-purple" size={16} weight="regular" />
            <span>Cartão de debito</span>
            <input
              id="debit"
              type="radio"
              value="Cartão de débito"
              className="hidden"
              {...register('payment_mode')}
            />
          </label>

          <label
            htmlFor="money"
            className={`flex gap-3 p-4 items-center justify-start text-xs uppercase rounded-md font-extralight border cursor-pointer ${
              paymentSelect === 'Dinheiro'
                ? 'border-purple bg-purple-light'
                : 'border-button bg-button'
            } `}
          >
            <Money className="text-purple" size={16} weight="regular" />
            <span>Dinheiro</span>
            <input
              id="money"
              type="radio"
              value="Dinheiro"
              className="hidden"
              {...register('payment_mode')}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
