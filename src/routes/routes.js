import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login/Login';
import Cadastro from '../pages/cadastro/Cadastro';
import RecuperarSenha from '../pages/recuperarSenha/RecuperarSenha';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerLeft: () => null,
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          headerStyle: {
            height: 70,
            backgroundColor: "#2B1D62"
          }
        }}
      />
      <Stack.Screen
        name="RecuperarSenha"
        component={RecuperarSenha}
        options={{
          headerStyle: {
            height: 70,
            backgroundColor: "#2B1D62"
          }
        }}
      />
    </Stack.Navigator>
  )

}

