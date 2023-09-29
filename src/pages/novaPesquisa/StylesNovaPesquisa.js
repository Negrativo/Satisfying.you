import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

  formCadastro: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    backgroundColor: '#372775',
    flex: 2,
    justifyContent: 'center'
  },

  input: {
    backgroundColor: '#FFFFFF',
    width: 300,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },

  imagem: {
    resizeMode: "cover",
    alignItems: 'center',
    width: 40,
    height: 40,
    right: 10
  },

  inputData: {
    backgroundColor: '#FFFFFF',
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    justifyContent: "flex-end",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  form: {
    width: 250,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10
  },

  formImage: {
    width: 250,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    resizeMode: 'contain',
  },

  label: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 25,
    color: 'white'
  },

  labelData: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  },

  labelImage: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  },

  button: {
    backgroundColor: '#37BD6D',
    width: 280,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: -5
  },

  buttonImage: {
    backgroundColor: '#FFFFFF',
    width: 280,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },

  labelCadastro: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,

  },

  cadastrar: {
    color: 'white'
  },

  labelBold: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: "bold",
    marginTop: 10,
    textDecorationLine: 'underline'
  },

  errors: {
    color: '#FD7979'
  },

  errorCadastro: {
    marginBottom: -20,
  }
});
