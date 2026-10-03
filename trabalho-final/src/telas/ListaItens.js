import { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { cores, raio } from '../estilos/tema';
import useResponsivo from '../hooks/useResponsivo';
import EstadoVazio from '../componentes/EstadoVazio';
import itens from '../servicos/itens';

// Tela responsiva (requisito 5): 1, 2 ou 3 colunas conforme a largura
export default function ListaItens({ navigation }) {
  const { colunas, paddingTela } = useResponsivo();
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('FormularioItem')}
          style={estilos.botaoCabecalho}
          accessibilityLabel="Cadastrar novo item"
        >
          <Ionicons name="add-circle" size={28} color={cores.branco} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      itens.listar().then((dados) => {
        setLista(dados);
        setCarregando(false);
      });
    }, [])
  );

  if (carregando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" color={cores.primaria} />
      </View>
    );
  }

  return (
    <FlatList
      key={`colunas-${colunas}`} // FlatList exige remontar quando numColumns muda
      data={lista}
      numColumns={colunas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: paddingTela }}
      columnWrapperStyle={colunas > 1 ? { gap: 16 } : undefined}
      ListEmptyComponent={
        <EstadoVazio mensagem={'Nenhum item cadastrado.\nToque no + para adicionar.'} />
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[estilos.card, colunas > 1 && { maxWidth: `${100 / colunas - 1}%` }]}
          onPress={() => navigation.navigate('DetalheItem', { id: item.id })}
          accessibilityRole="button"
          accessibilityLabel={`Ver ${item.titulo}`}
        >
          <Text style={estilos.titulo} numberOfLines={1}>{item.titulo}</Text>
          <Text style={estilos.descricao} numberOfLines={2}>{item.descricao}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const estilos = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCabecalho: {
    marginRight: 16,
  },
  card: {
    flex: 1,
    backgroundColor: cores.superficie,
    borderRadius: raio,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: cores.secundaria,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '600',
    color: cores.texto,
  },
  descricao: {
    marginTop: 4,
    color: cores.textoSuave,
  },
});
