import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, get, child } from 'firebase/database';

import styles from './StylesRelatorio';

export default function ({ route }) {
  const idPesquisa = route.params.idPesquisa;

  const [nome, setNome] = useState("");
  const [notaPessima, setNotaPessima] = useState(0);
  const [notaRuim, setNotaRuim] = useState(0);
  const [notaNeutra, setNotaNeutra] = useState(0);
  const [notaBom, setNotaBom] = useState(0);
  const [notaExcelente, setNotaExcelente] = useState(0);
  const [total, setTotal] = useState(0);

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

  async function initPesquisa() {
    const pesquisasRef = ref(database, 'pesquisas');

    const pesquisaQuery = await get(pesquisasRef);
    const pesquisasSnapshot = pesquisaQuery.val();

    if (pesquisasSnapshot) {
      const pesquisasList = Object.values(pesquisasSnapshot);
      const pesquisaIndex = pesquisasList.findIndex(pesquisa => pesquisa._id === idPesquisa);

      if (pesquisaIndex !== -1) {
        const pesquisaEncontrada = pesquisasList[pesquisaIndex];
        if (pesquisaEncontrada != undefined) {
          setNome(pesquisaEncontrada.nome);

          const notas = pesquisaEncontrada.notas;

          if (notas && notas.length > 0) {
            setTotal(notas.length);

            notas.forEach(notaa => {
              switch (notaa.nota) {
                case 1:
                  setNotaPessima(prevNotaPessima => prevNotaPessima + 1);
                  break;
                case 2:
                  setNotaRuim(prevNotaRuim => prevNotaRuim + 1);
                  break;
                case 3:
                  setNotaNeutra(prevNotaNeutra => prevNotaNeutra + 1);
                  break;
                case 4:
                  setNotaBom(prevNotaBom => prevNotaBom + 1);
                  break;
                case 5:
                  setNotaExcelente(prevNotaExcelente => prevNotaExcelente + 1);
                  break;
                default:
                  break;
              }
            });
          }
        }
      }

    }

  }

  useEffect(() => {
    initPesquisa();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{nome}</Text>
      {total == 0 && (
        <Text style={styles.valores}>
          Não há dados
        </Text>
      )}
      {total !== 0 && (
        <View>

          <Text style={styles.valoresTitulo}>
            Excelente:
            <Text style={styles.valores}>
              %{(notaExcelente / total) * 100}
            </Text>
          </Text>
          <Text style={styles.valoresTitulo}>
        Bom:
        <Text style={styles.valores}>
          %{(notaBom / total) * 100}
        </Text>
      </Text>

      <Text style={styles.valoresTitulo}>
        Neutra:
        <Text style={styles.valores}>
          %{(notaNeutra / total) * 100}
        </Text>
      </Text>
      <Text style={styles.valoresTitulo}>
        Ruim:
        <Text style={styles.valores}>
          %{(notaRuim / total) * 100}
        </Text>
      </Text>
      <Text style={styles.valoresTitulo}>
        Péssima:
        <Text style={styles.valores}>
          %{(notaPessima / total) * 100}
        </Text>
      </Text>
        </View>
      )}

    </View>
  );
}
