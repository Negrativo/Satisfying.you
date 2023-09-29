import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './StylesAgradecimentoColeta';

export default function ({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Obrigado por participar da pesquisa!</Text>
      <Text style={styles.text}>Aguardamos você no próximo ano!</Text>
      <TouchableOpacity>
        <Text style={styles.text}>Aguardamos você no próximo ano!</Text>
      </TouchableOpacity>
    </View>
  );
}
