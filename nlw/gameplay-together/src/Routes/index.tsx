import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { PublicRoutes } from './public.routes'
import { useAuth } from '../hooks/auth'

export function Routes() {

  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.id ? <AuthRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  )
}