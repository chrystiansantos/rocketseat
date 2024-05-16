import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const ButtonCart = styled('button', {
  width: '3rem',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  color: '$gray500',
  background: '$gray800',
  border: 'none',
  cursor: 'pointer',
  transition: 'filter 0.2s',
  position: 'relative',
  marginLeft: 'auto',
  '&:hover': {
    filter: 'brightness(90%)',
  },
})

export const QuantityInCart = styled('span', {
  width: 24,
  height: 24,
  background: '$green500',
  color: '$white',
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  position: 'absolute',
  top: -8,
  right: -8,
})
