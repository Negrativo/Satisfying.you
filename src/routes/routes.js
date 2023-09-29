import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login/Login';
import Cadastro from '../pages/cadastro/Cadastro';
import RecuperarSenha from '../pages/recuperarSenha/RecuperarSenha';
import Home from '../pages/home/home';
import NovaPesquisa from '../pages/novaPesquisa/NovaPesquisa';
import AcoesPesquisa from '../pages/acoesPesquisa/AcoesPesquisa';
import ColetarDados from '../pages/coleta/Coleta';
import AgradecimentoColeta from '../pages/agradecimentoColeta/AgradecimentoColeta'
import Relatorio from '../pages/relatorio/Relatorio';

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

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            height: 70,
            backgroundColor: "#2B1D62"
          }
        }}
      />

      <Stack.Screen
        name="NovaPesquisa"
        component={NovaPesquisa}
        options={{
          headerStyle: {
            height: 70,
            backgroundColor: "#2B1D62"
          }
        }}
      />

      <Stack.Screen
        name="AcaoPesquisa"
        component={AcoesPesquisa}
        options={{
          headerStyle: {
            height: 70,
            backgroundColor: "#2B1D62"
          }
        }}
      />

      <Stack.Screen
        name="ColetarDados"
        component={ColetarDados}
        options={{
          headerStyle: {
            height: 70,
            backgroundColor: "#2B1D62"
          }
        }}
      />

      <Stack.Screen
        name="AgradecimentoColeta"
        component={AgradecimentoColeta}
        options={{
          headerStyle: {
            height: 70,
            backgroundColor: "#2B1D62"
          }
        }}
      />

      <Stack.Screen
        name="Relatorio"
        component={Relatorio}
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

