import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { theme } from '../global/styles/theme';

import { Home } from '../Pages/Home'
import { AppointmentDetails } from '../Pages/AppointmentDetails'
import { AppointmentCreate } from '../Pages/AppointmentCreate';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator headerMode="none" screenOptions={{ cardStyle: { backgroundColor: theme.colors.secondary100 } }}>
      <Screen name="Home" component={Home}></Screen>
      <Screen name="AppointmentDetails" component={AppointmentDetails}></Screen>
      <Screen name="AppointmentCreate" component={AppointmentCreate}></Screen>
    </Navigator>
  )
}

