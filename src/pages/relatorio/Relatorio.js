import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import styles from './StylesRelatorio';

export default function ({ route }) {
  const pesquisa = route.params.pesquisa;

  const [nome, setNome] = useState("");
  const [notaPessima, setNotaPessima] = useState(0);
  const [notaRuim, setNotaRuim] = useState(0);
  const [notaNeutra, setNotaNeutra] = useState(0);
  const [notaBom, setNotaBom] = useState(0);
  const [notaExcelente, setNotaExcelente] = useState(0);
  const [total, setTotal] = useState(0);

  function initPesquisa() {
    if (pesquisa != undefined) {
      setNome(pesquisa.nome);

      const notas = pesquisa.dados[0].notas;

      if (notas && notas.length > 0) {
        setTotal(notas.length);

        notas.forEach(notaa => {
          switch (notaa.nota) {
            case "1":
              setNotaPessima(prevNotaPessima => prevNotaPessima + 1);
              break;
            case "2":
              setNotaRuim(prevNotaRuim => prevNotaRuim + 1);
              break;
            case "3":
              setNotaNeutra(prevNotaNeutra => prevNotaNeutra + 1);
              break;
            case "4":
              setNotaBom(prevNotaBom => prevNotaBom + 1);
              break;
            case "5":
              setNotaExcelente(prevNotaExcelente => prevNotaExcelente + 1);
              break;
            default:
              break;
          }
        });
      }
    }
  }

  useEffect(() => {
    initPesquisa();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{nome}</Text>
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
  );
}
