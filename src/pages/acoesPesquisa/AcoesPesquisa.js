import React, { useState } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import AcaoComponent from '../../components/acaoPesquisa/AcaoComponent';

import styles from './StylesAcoesPesquisa';
import iconModificar from '../../../assets/edit.png';
import iconColetarDados from '../../../assets/confirmation.png';
import iconRelatorio from '../../../assets/report.png';
import iconDelete from '../../../assets/delete.png';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

export default function ({ navigation, route }) {
  const pesquisa = route.params.pesquisa;


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
    navigation.navigate('NovaPesquisa', { pesquisa });
  }

  function coletarDados() {
    navigation.navigate('ColetarDados', { pesquisa });
  }

  function relatorio() {
    navigation.navigate('Relatorio', { pesquisa });
  }

  function excluirPesquisa() {
    hideModal
  }

  return (
    <View style={styles.container}>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text style={styles.textModal}>Tem certeza que deseja apagar essa pesquisa?</Text>
          <View style={styles.groupModal}>
            <Button style={styles.buttonModal} title="Cancelar" onPress={hideModal} />
            <Button style={styles.buttonModal} title="Confirmar" onPress={excluirPesquisa()} />
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
