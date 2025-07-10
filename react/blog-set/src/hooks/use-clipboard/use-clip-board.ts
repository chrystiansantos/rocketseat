'use client'
import { useCallback, useEffect, useState } from "react"

interface useClipBoardProps {
  timeout?: number
}

export function useClipBoard({ timeout = 2000 }: useClipBoardProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.error('Clipboard não suportado')
      return false
    }
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
    } catch (error) {
      console.error('Falha ao copiar o texto: ', error)
      setIsCopied(false)
    }
  }, [])

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, timeout);

      return () => clearTimeout(timer)
    }
  }, [isCopied, timeout])

  return {
    isCopied,
    handleCopy
  }
}