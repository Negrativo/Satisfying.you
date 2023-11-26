import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, TouchableOpacity, Image, TextInput } from 'react-native';
import { Formik } from 'formik';
import uuid from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import iconPesquisa from '../../../assets/calendar.png';
// Importe a função 'format' do pacote 'date-fns' para formatar a data selecionada.
import { format } from 'date-fns';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, push, child, off } from 'firebase/database';

// Remova as importações não utilizadas.

import ValidateCadastro from '../../schema/CadastroSchema';

import styles from './StylesNovaPesquisa';
import { pesquisas } from '../../../data/pesquisas';

export default function ({ navigation, route }) {
  const idPesquisa = route.params?.idPesquisa;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [nome, setNome] = useState("");

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
  const pesquisasRef = ref(database, 'pesquisas');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate) => {
    hideDatePicker();
    setSelectedDate(selectedDate);
  };

  const selectImage = async () => {
    const options = {
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    // const [status, requestPermission] = ImagePicker.useCameraPermissions();
    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  async function initPesquisa() {
    if (idPesquisa != undefined) {


      const pesquisasRef = ref(database, 'pesquisas');

      // Encontrar a pesquisa com o _id fornecido
      const pesquisaQuery = await get(pesquisasRef);
      const pesquisasSnapshot = pesquisaQuery.val();

      if (pesquisasSnapshot) {
        const pesquisasList = Object.values(pesquisasSnapshot);
        const pesquisaEncontrada = pesquisasList.find(pesquisa => pesquisa._id === idPesquisa);

        if (pesquisaEncontrada) {
          const [dia, mes, ano] = pesquisaEncontrada.data.split('/').map(Number);
          const dataInicial = new Date(ano, mes - 1, dia);
          setSelectedDate(dataInicial);
          setImage(pesquisaEncontrada.imagem);
          setNome(pesquisaEncontrada.nome);
        } else {
          console.log('Nenhuma pesquisa encontrada com o ID fornecido.');
        }
      }

    }
  }

  useEffect(() => {
    initPesquisa(); 
  }, []);

  const onSubmit = useCallback(async (values, { setErrors }) => {
    try {
      let nomeForm = values.nomeFormik ? values.nomeFormik : nome;
      let data = selectedDate.toLocaleDateString();
      let imagem = values.imagem ? values.imagem : image;

      const novaPesquisa = {
        "nome": nomeForm,
        "imagem": imagem,
        "data": data,
        "notas": []
      };
      const snapshot = await get(pesquisasRef);
      let pesquisasExistentes = snapshot.val();

      if (!pesquisasExistentes) {
        pesquisasExistentes = [];
      } else if (!Array.isArray(pesquisasExistentes)) {
        pesquisasExistentes = Object.values(pesquisasExistentes);
      }

      // Verifica se a pesquisa já existe pelo _id
      const pesquisaExistente = pesquisasExistentes.find(pesquisa => pesquisa._id === idPesquisa);

      if (pesquisaExistente) {
        // Atualiza os dados da pesquisa existente
        const pesquisaIndex = pesquisasExistentes.findIndex(pesquisa => pesquisa._id === idPesquisa);
        pesquisasExistentes[pesquisaIndex] = {
          ...pesquisasExistentes[pesquisaIndex],
          ...novaPesquisa
        };
      } else {
        // Caso não exista, adiciona a nova pesquisa
        novaPesquisa["_id"] = uuid.v4();
        pesquisasExistentes.push(novaPesquisa);
      }

      // Salva as pesquisas atualizadas no banco
      await set(pesquisasRef, pesquisasExistentes);

      navigation.navigate('Home');
    } catch (error) {
      console.error("Erro ao salvar pesquisa:", error);
    }
  }, [pesquisasRef, selectedDate, image, nome, navigation]);

  useEffect(() => {
    return () => {
      // Desinscreva o listener quando o componente for desmontado
      off(pesquisasRef);
    };
  }, [pesquisasRef]);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ nomeFormik: nome, data: selectedDate.toLocaleDateString(), imagem: image, error: '' }}
        onSubmit={onSubmit}
      >
        {(props) => (
          <View style={styles.formCadastro}>
            <Text style={styles.label}>Nome</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                textAlign="start"
                textContentType='name'
                placeholder="Nome"
                placeholderTextColor="#D9DBDC"
                autoCapitalize="none"
                autoCorrect={false}
                value={nome}
                onChangeText={text => setNome(text)}
              />
              {props.dirty && props.errors.nome && <Text style={styles.errors}>{props.errors.nome}</Text>}
            </View>

            <Text style={styles.label}>Data</Text>
            <View style={styles.inputData}>
              <Text style={styles.labelData}>{selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}</Text>
              <TouchableOpacity onPress={showDatePicker}>
                <Image source={iconPesquisa} style={styles.imagem} />
              </TouchableOpacity>

              <DateTimePickerModal
                date={selectedDate}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>

            <Text style={styles.label}>Imagem</Text>
            <TouchableOpacity style={styles.buttonImage} onPress={selectImage}>
              {!image && (<Text style={styles.labelImage}>Selecionar Imagem</Text>)}
              {image && (<Image source={{ uri: image }} style={{ width: 120, height: 120 }} />)}
            </TouchableOpacity>

            {props.errors.error && <Text style={styles.errorCadastro}>{props.errors.error}</Text>}
            <TouchableOpacity style={styles.button} type="submit" onPress={props.handleSubmit}>
              <Text style={styles.cadastrar}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
