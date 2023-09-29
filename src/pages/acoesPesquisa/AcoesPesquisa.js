import React from 'react';
import { ScrollView } from 'react-native';
import AcaoComponent from '../../components/acaoPesquisa/AcaoComponent';

import styles from './StylesAcoesPesquisa';
import iconModificar from '../../../assets/edit.png';
import iconColetarDados from '../../../assets/confirmation.png';
import iconRelatorio from '../../../assets/report.png';

export default function ({ navigation, route }) {
  const pesquisa = route.params.pesquisa;

  const nomeModificar = "Modificar"
  const nomeColeta = "Coletar Dados"
  const nomeRelatorio = "Relatório"

  function modificar() {
    navigation.navigate('NovaPesquisa', { pesquisa });
  }

  function coletarDados() {
    navigation.navigate('ColetarDados', { pesquisa });
  }

  function relatorio() {
    navigation.navigate('Relatorio', { pesquisa });
  }
  return (
    <ScrollView horizontal={true} style={styles.container}>
      <AcaoComponent
        onPress={() => modificar()}
        nome={nomeModificar}
        imagem={iconModificar}
      />

      <AcaoComponent
        onPress={() => coletarDados()}
        nome={nomeColeta}
        imagem={iconColetarDados}
      />

      <AcaoComponent
        onPress={() => relatorio()}
        nome={nomeRelatorio}
        imagem={iconRelatorio}
      />
    </ScrollView>
  );
}
