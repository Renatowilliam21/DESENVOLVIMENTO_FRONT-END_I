import { useCallback, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { cores, raio } from '../estilos/tema';
import useResponsivo from '../hooks/useResponsivo';
import Botao from '../componentes/Botao';
import itens from '../servicos/itens';

export default function Inicio({ navigation }) {
  const { paddingTela, escalaFonte, ehTablet } = useResponsivo();
  const [total, setTotal] = useState(0);

  // Atualiza o resumo sempre que a aba ganha foco
  useFocusEffect(
    useCallback(() => {
      itens.listar().then((lista) => setTotal(lista.length));
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={[estilos.container, { padding: paddingTela }]}>
      <View style={[estilos.conteudo, ehTablet && estilos.conteudoLargo]}>
        <Ionicons name="apps" size={64} color={cores.primaria} style={estilos.icone} />
        <Text style={[estilos.titulo, { fontSize: 26 * escalaFonte }]}>Trabalho Final</Text>
        <Text style={[estilos.texto, { fontSize: 16 * escalaFonte }]}>
          Base do projeto com Bottom Tabs, Stack e CRUD em AsyncStorage. Substitua esta tela
          quando o tema for definido.
        </Text>

        <View style={estilos.cartao}>
          <Text style={estilos.numero}>{total}</Text>
          <Text style={estilos.legenda}>itens cadastrados</Text>
        </View>

        <Botao
          titulo="Cadastrar novo item"
          onPress={() => navigation.navigate('Itens', { screen: 'FormularioItem', initial: false })}
        />
        <Botao
          titulo="Ver todos os itens"
          variante="contorno"
          style={estilos.espaco}
          onPress={() => navigation.navigate('Itens', { screen: 'ListaItens' })}
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: cores.fundo,
    alignItems: 'center',
  },
  conteudo: {
    width: '100%',
    maxWidth: 520,
  },
  conteudoLargo: {
    marginTop: 40,
  },
  icone: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  titulo: {
    fontWeight: 'bold',
    color: cores.texto,
    textAlign: 'center',
  },
  texto: {
    color: cores.textoSuave,
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 22,
  },
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raio,
    padding: 24,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  numero: {
    fontSize: 40,
    fontWeight: 'bold',
    color: cores.primaria,
  },
  legenda: {
    color: cores.textoSuave,
  },
  espaco: {
    marginTop: 12,
  },
});
