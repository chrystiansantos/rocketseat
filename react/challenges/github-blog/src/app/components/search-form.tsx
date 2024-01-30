'use client'
import { useFormContext } from 'react-hook-form'

export function SearchForm() {
  const { register } = useFormContext()

  return (
    <form>
      <input
        type="text"
        placeholder="Buscar conteúdo"
        className="bg-transparent border border-border rounded-md w-full h-12 px-3 py-4 placeholder:text-label text-text outline-none mt-3"
        {...register('slugSearch')}
      />
    </form>
  )
}
