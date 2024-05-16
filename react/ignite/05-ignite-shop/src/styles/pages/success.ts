import { styled } from '..'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
  height: 640,

  h1: {
    marginTop: 48,
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    marginTop: '2rem',
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    lineHeight: 1.4,
  },

  a: {
    marginTop: '5rem',
    display: 'block',
    fontSize: '$lg',
    color: '$green500',
    transition: 'color 0.2s ease, border-color 0.2s ease',

    textDecoration: 'none',
    fontWeight: 'bold',
    borderBottom: '0.125rem solid transparent',
    paddingBottom: '0.25rem',

    '&:hover': {
      color: '$green300',
      borderColor: '$green300',
    },
  },
})

export const ProductsBuy = styled('div', {
  display: 'flex',
})

export const ImageContainer = styled('div', {
  width: 140,
  height: 140,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 70,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '4rem',
  '~ :not(:first-child)': {
    marginLeft: -70,
  },
  img: {
    objectFit: 'cover',
  },
})
