import styled from 'styled-components'

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  @media (max-width: 720px) {
    display: none;
  }

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

export const QuantityTransaction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 0.75rem;

  strong {
    font-size: 1.125rem;
    color: ${({ theme }) => theme['gray-300']};
    font-weight: 500;
  }

  span {
    color: ${({ theme }) => theme['gray-500']};
  }

  @media (min-width: 720px) {
    visibility: hidden;
  }
`

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ theme, variant }) =>
    variant === 'income' ? theme['green-300'] : theme['red-300']};
`
