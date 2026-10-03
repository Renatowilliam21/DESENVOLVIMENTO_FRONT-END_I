import { useCallback, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { cores, raio } from '../estilos/tema';
import Botao from '../componentes/Botao';
import EstadoVazio from '../componentes/EstadoVazio';
import itens from '../servicos/itens';
import { confirmar } from '../mensagens';

export default function DetalheItem({ route, navigation }) {
  const { id } = route.params;
  const [item, setItem] = useState(undefined); // undefined = carregando, null = não existe

  useFocusEffect(
    useCallback(() => {
      itens.buscar(id).then(setItem);
    }, [id])
  );

  if (item === undefined) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={cores.primaria} />;
  }
  if (item === null) {
    return <EstadoVazio icone="alert-circle-outline" mensagem="Item não encontrado." />;
  }

  function excluir() {
    confirmar('Excluir item', `Deseja excluir "${item.titulo}"?`, async () => {
      await itens.remover(id);
      navigation.goBack();
    });
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.cartao}>
        <Text style={estilos.titulo}>{item.titulo}</Text>
        <Text style={estilos.descricao}>{item.descricao}</Text>
        <Text style={estilos.data}>
          Criado em {new Date(item.criadoEm).toLocaleString('pt-BR')}
        </Text>
      </View>

      <Botao titulo="Editar" onPress={() => navigation.navigate('FormularioItem', { id })} />
      <Botao titulo="Excluir" variante="perigo" onPress={excluir} style={estilos.espaco} />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raio,
    padding: 20,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: cores.texto,
  },
  descricao: {
    fontSize: 16,
    color: cores.texto,
    marginTop: 12,
    lineHeight: 23,
  },
  data: {
    marginTop: 16,
    fontSize: 13,
    color: cores.textoSuave,
  },
  espaco: {
    marginTop: 12,
  },
});
