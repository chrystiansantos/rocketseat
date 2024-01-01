import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/api'

interface Transactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

interface TransactionContextType {
  transactions: Transactions[]
  fetchTransaction: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  const fetchTransaction = useCallback(async (query?: string) => {
    const { data } = await api.get<Transactions[]>('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setTransactions(data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data
      const { data: transactionCreated } = await api.post('/transactions', {
        category,
        description,
        price,
        type,
        createdAt: new Date(),
      })
      setTransactions((state) => [transactionCreated, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransaction()
  }, [fetchTransaction])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransaction,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
