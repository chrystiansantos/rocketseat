import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/react-query'

import { SignIn } from './sign-in'

describe('SignIn', () => {
  it('should set default email input value if email is present on search params', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <MemoryRouter initialEntries={['/sign-in?email=fulano@gmail.com']}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        </HelmetProvider>
      ),
    })
    const emailInput = wrapper.getByLabelText('Seu e-mail') as HTMLInputElement

    expect(emailInput.value).toEqual('fulano@gmail.com')
  })
})
