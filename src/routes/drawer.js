import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

// ... suas importações existentes de telas
import Home from '../pages/home/home';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          height: 70,
          backgroundColor: "#2B1D62",
        },
        drawerStyle: {
          backgroundColor: '#2B1D62',
          width: 240,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => null,
          headerShown: false
        }} />
    </Drawer.Navigator>
  );
}
