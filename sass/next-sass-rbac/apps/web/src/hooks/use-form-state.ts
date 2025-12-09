import { type FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: {
    errors: string[]
    properties?:
      | {
          [key: string]:
            | {
                errors: string[]
              }
            | undefined
        }
      | undefined
  } | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      success: false,
      message: null,
      errors: {
        errors: [],
        properties: undefined,
      },
    },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
