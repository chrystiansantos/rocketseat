import { ThemeProvider } from 'styled-components'

import { Router } from './Router'
import { CyclesContextProvider } from './context/CyclesContext'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

import { Suspense } from 'react'
import './i18n'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <Suspense fallback={null}>
          <Router />
        </Suspense>
      </CyclesContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
