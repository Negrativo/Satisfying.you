import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../api/FirebaseConfig';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

//import api from '../../../services/api';
const app = initializeApp(firebaseConfig);

import validateRecuparSenha from '../../schema/RecuperarSenhaSchema';

import styles from './StylesRecuperarSenha';

export default function ({ navigation }) {
  const auth = getAuth();
  const [Dados, setDados] = useState('');
  const [mensagem, setMessagem] = useState('');

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', error: '' }}
        validationSchema={validateRecuparSenha}
        onSubmit={async (values, { setErrors }) => {
          let email = values.email;

          try {
            await sendPasswordResetEmail(auth, email);
            // navigation.navigate('Login');
            console.info('Enviado email de recuperacao');
            setMessagem('E-mail de recuperação enviado!')
          } catch (error) {
            setMessagem('Houve um problema com o e-mail!')
            console.error('Erro ao fazer cadastro:', error);
          }
          // api.post('/recuperar-senha', {
          //   email
          // })
          //   .then(res => {
          //     alert('nova senha enviada');
          //   })
          //   .catch(error => {
          //     navigation.navigate('Finalização de cadastro', { nome, email, senha });
          //   });
        }}
      >
        {(props) => (
          <View style={styles.formCadastro}>

            <Text style={styles.label}>E-mail</Text>
            <View style={styles.form} >
              <TextInput
                style={styles.input}
                textAlign="center"
                textContentType='emailAddress'
                placeholder="E-mail"
                placeholderTextColor="#3F92C5"
                keyboardType="email-address"
                autoCompleteType="email"
                autoCapitalize="none"
                autoCorrect={false}
                value={props.values.email}
                onChangeText={text => props.setFieldValue('email', text)}
              />
              {props.dirty && props.errors.email && <Text style={styles.errors}>{props.errors.email}</Text>}
              {mensagem.length > 0 && <Text style={styles.errors}>{mensagem}</Text>}
            </View>

            {props.errors.error && <Text style={styles.errorCadastro}>{props.errors.error}</Text>}
            <TouchableOpacity style={styles.button} type="submit" onPress={props.handleSubmit}>
              <Text style={styles.cadastrar}>RECUPERAR</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
