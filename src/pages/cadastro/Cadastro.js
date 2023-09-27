import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Formik } from 'formik';

//import api from '../../../services/api';

import ValidateCadastro from '../../schema/CadastroSchema';

import styles from './StylesCadastroInicial';

export default function ({ navigation }) {
  const [Dados, setDados] = useState('');

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', senha: '', senha2: '', error: '' }}
        validationSchema={ValidateCadastro}
        onSubmit={(values, { setErrors }) => {
          let nome = values.nome;
          let email = values.email;
          let senha = values.senha;
          // api.post('/login', {
          //   email, senha
          // })
          //   .then(res => {
          //     alert('Usuario já cadastrado');
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

            <Text style={styles.label}>Senha</Text>
            <View style={styles.form} >
              <TextInput
                style={styles.input}
                textAlign="center"
                textContentType='password'
                secureTextEntry={true}
                placeholder="Senha"
                placeholderTextColor="#3F92C5"
                autoCompleteType="password"
                autoCapitalize="none"
                autoCorrect={false}
                value={props.values.senha}
                onChangeText={text => props.setFieldValue('senha', text)}
              />
              {props.dirty && props.errors.senha && <Text style={styles.errors}>{props.errors.senha}</Text>}
            </View>

            <Text style={styles.label}>Repetir senha</Text>
            <View style={styles.form} >
              <TextInput
                style={styles.input}
                textAlign="center"
                textContentType='password'
                secureTextEntry={true}
                placeholder="Confirmar Senha"
                placeholderTextColor="#3F92C5"
                autoCompleteType="password"
                autoCapitalize="none"
                autoCorrect={false}
                value={props.values.senha2}
                onChangeText={text => props.setFieldValue('senha2', text)}
              />
              {props.dirty && props.errors.senha2 && <Text style={styles.errors}>{props.errors.senha2}</Text>}
            </View>

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
