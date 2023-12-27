import { HtmlHTMLAttributes } from 'react'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'

interface InputTextProps extends HtmlHTMLAttributes<HTMLInputElement> {
  isOptional?: boolean
  mask?: string
  name: string
}

export const InputText = ({
  isOptional = false,
  mask = '',
  name,
  ...rest
}: InputTextProps) => {
  return (
    <div className="relative h-full w-full">
      <Controller
        name={name}
        render={({ field }) => (
          <InputMask
            mask={mask}
            className="p-3 h-full w-full bg-button rounded outline-yellow-dark text-base placeholder:text-label"
            type="text"
            {...field}
            {...rest}
          />
        )}
      />
      {isOptional && (
        <span className="absolute top-3.5 right-3 italic text-xs text-label">
          Opcional
        </span>
      )}
    </div>
  )
}
