import { ScrollView, Text, StyleSheet } from 'react-native';

import { cores } from '../estilos/tema';

export default function Sobre() {
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>Sobre o app</Text>
      <Text style={estilos.texto}>
        Trabalho Final da disciplina de Desenvolvimento Front-end, Pós-graduação em
        Desenvolvimento Full Stack, IF Sudeste MG, Campus Manhuaçu.
      </Text>
      <Text style={estilos.texto}>Aluno: Renato William Rodrigues de Souza</Text>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 24,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 12,
  },
  texto: {
    fontSize: 16,
    color: cores.texto,
    lineHeight: 23,
    marginBottom: 10,
  },
});
