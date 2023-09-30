import React from 'react';
import { View, Image, Text, TextInput, FlatList, SafeAreaView } from 'react-native';

import iconPesquisa from '../../../assets/pesquisar.png';
import styles from './StylesHome';

import { pesquisas } from '../../../data/pesquisas';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PesquisasComponent from '../../components/pesquisas/PesquisasComponent'

export default function ({ route, navigation }) {

  // const firebaseConfig = {
  //   apiKey: "AIzaSyCUkhpKtz-NuWwSP1awNY9Acqr1Vs5f6W8",
  //   authDomain: "satisfyng-743f8.firebaseapp.com",
  //   databaseURL: "https://satisfyng-743f8-default-rtdb.firebaseio.com",
  //   projectId: "satisfyng-743f8",
  //   storageBucket: "satisfyng-743f8.appspot.com",
  //   messagingSenderId: "263888927863",
  //   appId: "1:263888927863:web:62eaec58cf9b6c55c11a72",
  //   measurementId: "G-SBMTHJS0CG"
  // };
  // firebase.initializeApp(config);
  // const database = firebase.database();

  console.log(pesquisas)

  function novaPesquisa() {
    navigation.navigate('NovaPesquisa');
  }

  function AcaoPesquisa(pesquisa) {
    navigation.navigate('AcaoPesquisa', { pesquisa });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formBarraPesquisa}>
        <Image source={iconPesquisa} style={styles.imagem} />
        <TextInput
          style={styles.barraPesquisa}
          textAlign="left"
          placeholderTextColor="#000000"
          placeholder="Insira o termo de busca...">
        </TextInput>
      </View>


      <SafeAreaView style={styles.formNavegacaoPrincipal}>
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={true}
          data={pesquisas}
          keyExtractor={pesquisa => pesquisa._id}
          renderItem={({ item }) => (
            <PesquisasComponent
              onPress={() => AcaoPesquisa(item)}
              nome={item.nome}
              imagem={item.imagem}
              dataCriacao={item.data}
            />
          )}
        />
      </SafeAreaView>

      <View>
        <TouchableOpacity style={styles.buttonNovaPesquisa} onPress={novaPesquisa}>
          <Text style={styles.labelNovaPesquisa}>NOVA PESQUISA</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );

}