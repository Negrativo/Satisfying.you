import React from 'react';
import { View, Image, Text, TextInput, FlatList, SafeAreaView } from 'react-native';

import iconPesquisa from '../../../assets/pesquisar.png';

import { pesquisas } from '../../../data/pesquisas';
import styles from './StylesHome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PesquisaComponent } from '../../components/pesquisas/PesquisasComponent'

export default function ({ route, navigation }) {

  function novaPesquisa() {
    navigation.navigate('NovaPesquisa');
  }

  function acessaServicos(pesquisa) {
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
          numColumns={2}
          data={pesquisas}
          keyExtractor={dadosLista => dadosLista._id}
          renderItem={({ item }) => (
            <PesquisaComponent
              onPress={() => acessaPesquisa(item)}
              nome={item.nome}
              foto={item.imagem}
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