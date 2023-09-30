import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import iconPesquisa from '../../../assets/calendar.png';
// Importe a função 'format' do pacote 'date-fns' para formatar a data selecionada.
import { format } from 'date-fns';

// Remova as importações não utilizadas.

import ValidateCadastro from '../../schema/CadastroSchema';

import styles from './StylesNovaPesquisa';
import { pesquisas } from '../../../data/pesquisas';

export default function ({ navigation, route }) {
  const pesquisa = route.params?.pesquisa;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [nome, setNome] = useState("");

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


  function initPesquisa() {
    if (pesquisa != undefined) {
      const [dia, mes, ano] = pesquisa?.data.split('/').map(Number);
      const dataInicial = new Date(ano, mes - 1, dia);
      setSelectedDate(dataInicial);
      setImage(pesquisa.imagem);
      setNome(pesquisa.nome);
    }
  }

  useEffect(() => {
    initPesquisa();
  }, []);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ nomeFormik: nome, data: selectedDate.toLocaleDateString(), imagem: image, error: '' }}
        onSubmit={(values, { setErrors }) => {
          let nomeForm = values.nomeFormik ? values.nomeFormik : nome;
          let data = selectedDate.toLocaleDateString();
          let imagem = values.imagem ? values.imagem : image;

          const indexToUpdate = pesquisas.findIndex(pesquisa => pesquisa.nome === nome)

          if (indexToUpdate !== -1) {
            console.log(indexToUpdate, pesquisas[indexToUpdate])
            pesquisas[indexToUpdate].nome = nomeForm;
            pesquisas[indexToUpdate].imagem = imagem;
            pesquisas[indexToUpdate].data = data;
          } else {
            const pesquisaForm = {
              "_id": toString(Math.random()),
              "nome": nomeForm,
              "imagem": imagem,
              "data": data
            };

            pesquisas.push(pesquisaForm)

            console.log(pesquisas)
          }

          navigation.navigate('Home');
        }}
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
