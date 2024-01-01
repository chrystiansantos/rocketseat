import { CalendarBlank, TagSimple } from '@phosphor-icons/react'

import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { CardContainer, Description, PriceHighlight } from './styles'

interface Transactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TransactionCardProps {
  transaction: Transactions
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <CardContainer>
      <span>{transaction.description}</span>
      <PriceHighlight variant={transaction.type}>
        {transaction.type === 'outcome' && '- '}
        {priceFormatter.format(transaction.price)}
      </PriceHighlight>
      <Description>
        <span>
          <TagSimple />
          {transaction.category}
        </span>

        <span>
          <CalendarBlank />
          {dateFormatter.format(new Date(transaction.createdAt))}
        </span>
      </Description>
    </CardContainer>
  )
}
