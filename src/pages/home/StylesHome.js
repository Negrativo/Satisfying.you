import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    backgroundColor: '#372775',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  containerPesquisa: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  containerListaServicos: {
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    borderWidth: 0.2,
    width: 400,
    paddingHorizontal: 10
  },
  contornoDadosLista: {
    height: 30,
    justifyContent: 'center'
  },
  Text: {
    fontSize: 18,
  },
  textoCategorias: {
    fontSize: 22,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    marginVertical: 10
  },
  barraPesquisa: {
    backgroundColor: '#FFFFFF',
    width: 290,
    marginVertical: 5
  },
  imagem: {
    resizeMode: "cover",
    alignItems: 'center',
    width: 40,
    height: 40,
    right: 10
  },
  formBarraPesquisa: {
    backgroundColor: '#FFFFFF',
    width: 350,
    height: 40,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginVertical: 15
  },
  formNavegacaoPrincipal: {
    flex: 1,
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 10,
  },
  formNavegacaoFavoritos: {
    width: 350,
    height: 4,
    flex: 1,
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 15
  },
  formRecomendacao: {
    backgroundColor: '#1087AC',
    width: 170,
    height: 25,
    borderWidth: 0.2,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center'
  },
  formCategorias: {

  },
  formGrupoRecomendacao: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15
  },
  scrollView: {
    marginHorizontal: 20,
    flex: 1,
    marginTop: 30
  },
  imagem: {
    resizeMode: "cover",
    alignItems: 'center',
    width: 40,
    height: 40,
    right: 10
  },
  grupoCargosPesquisa: {
    padding: 10,
  },
  buttonNovaPesquisa: {
    backgroundColor: '#37BD6D',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  labelNovaPesquisa: {
    color: "#FFFFFF",
    fontWeight: "bold",
  }
})