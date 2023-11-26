import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, FlatList, SafeAreaView } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import iconPesquisa from '../../../assets/pesquisar.png';
import styles from './StylesHome';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';

import { TouchableOpacity } from 'react-native-gesture-handler';
import PesquisasComponent from '../../components/pesquisas/PesquisasComponent'

export default function ({ route, navigation }) {
  const [pesquisas, setPesquisas] = useState([]);
  const [recarregarPesquisas, setRecarregarPesquisas] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyCUkhpKtz-NuWwSP1awNY9Acqr1Vs5f6W8",
    authDomain: "satisfyng-743f8.firebaseapp.com",
    databaseURL: "https://satisfyng-743f8-default-rtdb.firebaseio.com",
    projectId: "satisfyng-743f8",
    storageBucket: "satisfyng-743f8.appspot.com",
    messagingSenderId: "263888927863",
    appId: "1:263888927863:web:62eaec58cf9b6c55c11a72",
    measurementId: "G-SBMTHJS0CG"
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => {
    const pesquisasRef = ref(database, 'pesquisas');

    const handleData = snapshot => {
      if (snapshot.val()) {
        setPesquisas(Object.values(snapshot.val()));
      }
    };

    onValue(pesquisasRef, handleData);

    return () => {
      off(pesquisasRef, 'value', handleData);
    };
  }, [recarregarPesquisas]);


  function novaPesquisa() {
    navigation.navigate('NovaPesquisa');
  }

  function AcaoPesquisa(pesquisa) {
    const idPesquisa = pesquisa._id
    navigation.navigate('AcaoPesquisa', { idPesquisa });
  }

  function forcarRecarga() {
    setRecarregarPesquisas(prevState => !prevState);
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