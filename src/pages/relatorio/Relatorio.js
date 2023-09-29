import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './StylesRelatorio';

import { pesquisas } from '../../../data/pesquisas';

export default function ({ navigation, route }) {
  const pesquisa = route.params.pesquisa;

  const [nome, setNome] = useState("")

  function initPesquisa() {
    if (pesquisa != undefined) {
      setNome(pesquisa.nome);
    }
  }

  useEffect(() => {
    initPesquisa();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{nome}</Text>
    </View>
  );
}
