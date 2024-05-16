import { keyframes } from '@stitches/react'
import { styled } from '..'

const animationOpenSidebar = keyframes({
  '0%': { right: '-480px', opacity: 0 },
  '100%': { right: '0px', opacity: 1 },
})

const animationCloseSidebar = keyframes({
  '0%': { right: '0px', opacity: 1 },
  '100%': { right: '-480px', opacity: 0 },
})

const animationOpenBackgroundSidebar = keyframes({
  '0%': { visibility: 'hidden', background: 'transparent' },
  '100%': { visibility: 'visible', background: '$gray900' },
})

const animationCloseBackgroundSidebar = keyframes({
  '0%': { visibility: 'visible', background: '$gray900' },
  '100%': { visibility: 'hidden', background: 'transparent' },
})

export const Container = styled('div', {
  position: 'fixed',
  opacity: 0.95,
  inset: 0,
  visibility: 'hidden',

  '&.open': {
    animation: `${animationOpenBackgroundSidebar} 1s`,
    visibility: 'visible',
    background: '$gray900',
    // animationFillMode: 'forwards',
  },
  '&.close': {
    animation: `${animationCloseBackgroundSidebar} 1s`,
    // animationFillMode: 'forwards',
    visibility: 'hidden',
    background: 'transparent',
  },
})

export const Sidebar = styled('div', {
  height: '100vh',
  width: 480,
  right: '-480px',
  backgroundColor: '$gray800',
  position: 'fixed',
  padding: 48,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 9,

  '&.open': {
    right: 0,
    animation: `${animationOpenSidebar} 1s`,
  },
  '&.close': {
    right: '-480px',
    animation: `${animationCloseSidebar} 1s`,
  },
})

export const CloseSidebar = styled('div', {
  display: 'flex',
  justifyContent: 'end',

  button: {
    background: 'transparent',
    border: 'none',
    color: '$gray500',
    cursor: 'pointer',
  },
})

export const Cart = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  header: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    color: '$gray100',
  },
})

export const CartProducts = styled('div', {
  flex: 1,
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  h2: {
    fontSize: 16,
    letterSpacing: 1.5,
    fontWeight: 400,
  },

  div: {
    span: {
      span: {
        fontSize: '0.875rem',
        marginRight: '0.25rem',
      },
    },
  },
})

export const CartItem = styled('div', {
  display: 'flex',
  gap: 20,
  div: {
    padding: '0.25rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',

    strong: {
      color: '$gray300',
      fontWeight: '400',
      fontSize: '1.125rem',
      lineHeight: 1.6,
    },
    span: {
      fontWeight: 'bold',
      fontSize: '1.125rem',
      lineHeight: 1.6,
      marginTop: 2,
    },
    button: {
      border: 'none',
      color: '$green500',
      background: 'transparent',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'color 0.2s',
      lineHeight: 1.6,
      marginTop: 8,
      '&:hover': {
        color: '$green300',
      },
    },
  },
})

export const ContainerImage = styled('div', {
  width: 102,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
})

export const CartSummary = styled('footer', {
  div: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 7,
    span: {
      lineHeight: 1.6,
      color: '$gray100',
      fontSize: '1rem',
      fontWeight: '400',
    },
    strong: {
      lineHeight: 1.6,
      color: '$gray300',
      fontSize: '1.125rem',
      fontWeight: '400',
    },
  },

  'div + div': {
    span: {
      lineHeight: 1.6,
      color: '$gray100',
      fontSize: '1.125rem',
      fontWeight: 'bold',
    },
    strong: {
      lineHeight: 1.6,
      color: '$gray100',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  },

  button: {
    marginTop: 57,
    padding: 20,
    borderRadius: 8,
    width: '100%',
    fontWeight: 'bold',
    background: '$green500',
    fontSize: '1.125rem',
    color: '$white',
    cursor: 'pointer',
    transition: 'background 0.2s',

    '&:hover': {
      background: '$green300',
    },
  },
})
