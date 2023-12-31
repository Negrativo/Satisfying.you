import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import styles from './StylesLogin';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../api/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import ValidateLogin from '../../schema/LoginSchema';

const app = initializeApp(firebaseConfig);
export default function Login({ navigation }) {
  const auth = getAuth();
  async function handleSubmitCadastro() {
    navigation.navigate('Cadastro');
  };

  async function handleSubmitEsqueciSenha() {
    navigation.navigate('RecuperarSenha');
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', senha: '', error: '' }}
        validationSchema={ValidateLogin}
        onSubmit={async (values, { setErrors }) => {
          let email = values.email;
          let senha = values.senha;
          try {
            await signInWithEmailAndPassword(auth, email, senha);
            navigation.navigate('Home');
            console.log('Usuário logado com sucesso!');
          } catch (error) {
            console.error('Erro ao fazer login:', error);
          }
        }}
      >
        {(props) => (
          <View style={styles.formLogin}>
            <View>
              <Text style={styles.labelTitulo}>Satisfying.you 🙂</Text>
            </View>
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

            <Text style={styles.label}>SENHA</Text>
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

            <View style={styles.buttonContainer}>
              {props.errors.error && <Text style={styles.errors}>{props.errors.error}</Text>}
              <TouchableOpacity type="submit" onPress={props.handleSubmit} style={styles.buttonLogin}>
                <Text style={styles.labelEntrar} >ENTRAR</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonCriarConta} onPress={handleSubmitCadastro}>
              <Text style={styles.labelCriarConta}>Criar minha conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonEsqueciSenha} onPress={handleSubmitEsqueciSenha}>
              <Text style={styles.labelEntrar}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}