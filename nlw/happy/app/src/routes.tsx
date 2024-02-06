import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrphanagesMap from './pages/OrphanageMap';
import OrphanageDetail from './pages/OrphanageDetails';

const { Navigator, Screen } = createStackNavigator();

// Navegador precisa ficar em volta de todas as telas

const Routes: React.FC = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="OrphanagesMap" component={OrphanagesMap} />
      <Screen name="OrphanageDetail" component={OrphanageDetail} />
    </Navigator>
  </NavigationContainer>
);

export default Routes;
