'use client'
import { ReactNode } from 'react'
import { FormProvider as FormProviderRHF, useForm } from 'react-hook-form'

import * as zod from 'zod'

const PaymentEnum = zod.enum([
  'Cartão de crédito',
  'Cartão de débito',
  'Dinheiro',
])

export const addressAndPaymentFormValidationSchema = zod.object({
  cep: zod.string().length(9, 'O CEP deve conter exatamente 8 dígitos.'),
  city: zod.string().min(3, 'A cidade deve ter, no mínimo, 3 letras.'),
  state: zod.string().length(2, 'Por favor, informe o estado corretamente.'),
  complement: zod.optional(zod.string()),
  neighborhood: zod.string().min(1, 'É obrigatório informar o bairro.'),
  number_house: zod.string().min(1, '"Por favor, informe o número da casa.'),
  payment_mode: zod.enum(PaymentEnum.options),
  street: zod.string().min(1, 'A informação da rua é obrigatória.'),
})

export type AddressAndPaymentFormData = zod.infer<
  typeof addressAndPaymentFormValidationSchema
>

export function FormProvider({ children }: { children: ReactNode }) {
  const methods = useForm<AddressAndPaymentFormData>({
    defaultValues: {
      payment_mode: 'Cartão de crédito',
      number_house: '',
      cep: '',
      city: '',
      complement: '',
      neighborhood: '',
      state: '',
      street: '',
    },
  })

  return <FormProviderRHF {...methods}>{children}</FormProviderRHF>
}
