import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { firebaseConfig } from './src/api/FirebaseConfig';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getDatabase, ref, update, get, child } from 'firebase/database';
import { initializeApp } from 'firebase/app';
// import { FirebaseAppProvider } from 'expo-firebase-app';

import StackRoutes from './src/routes/routes';
import DrawerRoutes from './src/routes/drawer';

const app = initializeApp(firebaseConfig);

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )

}
