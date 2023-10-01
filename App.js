import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackRoutes from './src/routes/routes';
import DrawerRoutes from './src/routes/drawer';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )

}
