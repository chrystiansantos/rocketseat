import styled from 'styled-components'

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const CardContainer = styled.div`
  margin-top: 0.75rem;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme['gray-700']};
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &:last-child {
    margin-bottom: 3rem;
  }

  @media (min-width: 720px) {
    display: none;
  }
`

export const PriceHighlight = styled.span<PriceHighlightProps>`
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 160%;
  color: ${({ theme, variant }) =>
    variant === 'income' ? theme['green-300'] : theme['red-300']};
`

export const Description = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: ${({ theme }) => theme['gray-500']};
  }
`
