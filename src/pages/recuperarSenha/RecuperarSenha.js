import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Formik } from 'formik';

//import api from '../../../services/api';

import validateRecuparSenha from '../../schema/RecuperarSenhaSchema';

import styles from './StylesRecuperarSenha';

export default function ({ navigation }) {
  const [Dados, setDados] = useState('');

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', error: '' }}
        validationSchema={validateRecuparSenha}
        onSubmit={(values, { setErrors }) => {
          let email = values.email;
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
