import React, { useState } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import AcaoComponent from '../../components/acaoPesquisa/AcaoComponent';

import styles from './StylesAcoesPesquisa';
import iconModificar from '../../../assets/edit.png';
import iconColetarDados from '../../../assets/confirmation.png';
import iconRelatorio from '../../../assets/report.png';
import iconDelete from '../../../assets/delete.png';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, remove, get, child, query, equalTo } from 'firebase/database';

import Modal from 'react-native-modal';

export default function ({ navigation, route }) {
  const idPesquisa = route.params.idPesquisa;

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

  const [isModalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');

  const nomeModificar = "Modificar"
  const nomeColeta = "Coletar Dados"
  const nomeRelatorio = "Relatório"
  const nomeExcluir = "Excluir"


  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };


  function modificar() {
    navigation.navigate('NovaPesquisa', { idPesquisa });
  }

  function coletarDados() {
    navigation.navigate('ColetarDados', { idPesquisa });
  }

  function relatorio() {
    navigation.navigate('Relatorio', { idPesquisa });
  }

  const excluirPesquisa = async () => {
    try {
      const pesquisasRef = ref(database, 'pesquisas');

      // Encontrar a pesquisa com o _id fornecido
      const pesquisaQuery = await get(pesquisasRef);
      const pesquisasSnapshot = pesquisaQuery.val();

      if (pesquisasSnapshot) {
        const pesquisasList = Object.values(pesquisasSnapshot);
        const pesquisaIndex = pesquisasList.findIndex(pesquisa => pesquisa._id === idPesquisa);

        if (pesquisaIndex !== -1) {
          // Remover a pesquisa com a chave encontrada
          await remove(child(pesquisasRef, `${pesquisaIndex}`));
          // Mostrar mensagem de sucesso ou navegar para onde for necessário
          setMensagemModal('Pesquisa excluída com sucesso!');
        } else {
          console.log('Pesquisa não encontrada.');
        }


        hideModal();
      } else {
        console.log('Pesquisa não encontrada.');
      }
    } catch (error) {
      // Lidar com erros, como mostrá-los ao usuário
      console.error('Erro ao excluir pesquisa:', error);
    }
  }

  return (
    <View style={styles.container}>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.textModal}>Tem certeza que deseja apagar essa pesquisa?</Text>
          <View style={styles.groupModal}>
            <Button style={styles.buttonModal} title="Cancelar" onPress={hideModal} />
            <Button style={styles.buttonModal} title="Confirmar" onPress={excluirPesquisa} />
          </View>

        </View>
      </Modal>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.acao}>
          <AcaoComponent
            onPress={() => modificar()}
            nome={nomeModificar}
            imagem={iconModificar}
          />
        </View>

        <View style={styles.acao}>
        <AcaoComponent
            onPress={() => coletarDados()}
            nome={nomeColeta}
            imagem={iconColetarDados}
          />
        </View>

        <View style={styles.acao}>
        <AcaoComponent
            onPress={() => relatorio()}
            nome={nomeRelatorio}
            imagem={iconRelatorio}
          />
        </View>

        <View style={styles.acao}>
          <AcaoComponent
            onPress={() => showModal()}
            nome={nomeExcluir}
            imagem={iconDelete}
          />
        </View>


    </ScrollView>
    </View>

  );
}
