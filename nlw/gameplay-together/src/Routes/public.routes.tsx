import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { theme } from '../global/styles/theme';

import { SignIn } from '../Pages/SignIn'

const { Navigator, Screen } = createStackNavigator();

export function PublicRoutes() {
  return (
    <Navigator headerMode="none" screenOptions={{ cardStyle: { backgroundColor: theme.colors.secondary100 } }}>
      <Screen name="SignIn" component={SignIn}></Screen>
    </Navigator>
  )
}

