import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'

export default async function AppLayout({
  children,
  teste,
}: {
  children: ReactNode
  teste: ReactNode
}) {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      {children}
      {teste}
    </>
  )
}
