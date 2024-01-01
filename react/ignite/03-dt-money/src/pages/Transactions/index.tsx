import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionCard } from '../../components/TransactionCard'
import { TransactionContext } from '../../contexts/TransactionContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from '../components/SearchForm'
import {
  PriceHighlight,
  QuantityTransaction,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transaction() {
  const transactions = useContextSelector(TransactionContext, (ctx) => {
    return ctx.transactions
  })

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <QuantityTransaction>
          <strong>Transações</strong>
          <span>{transactions.length} itens</span>
        </QuantityTransaction>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </TransactionsContainer>
    </div>
  )
}
