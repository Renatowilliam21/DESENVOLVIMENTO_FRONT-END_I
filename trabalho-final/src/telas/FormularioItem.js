import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Botao from '../componentes/Botao';
import Campo from '../componentes/Campo';
import itens from '../servicos/itens';
import { avisar } from '../mensagens';

// Serve tanto para criar quanto para editar (se receber um id)
export default function FormularioItem({ route, navigation }) {
  const id = route.params?.id;
  const editando = Boolean(id);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar item' : 'Novo item' });
    if (editando) {
      itens.buscar(id).then((item) => {
        if (item) {
          setTitulo(item.titulo);
          setDescricao(item.descricao);
        }
      });
    }
  }, [id]);

  function validar() {
    const novosErros = {};
    if (!titulo.trim()) novosErros.titulo = 'Informe o título.';
    if (!descricao.trim()) novosErros.descricao = 'Informe a descrição.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function salvar() {
    if (!validar()) return;
    setSalvando(true);
    const dados = { titulo: titulo.trim(), descricao: descricao.trim() };

    if (editando) {
      await itens.atualizar(id, dados);
      avisar('Pronto', 'Item atualizado.');
    } else {
      await itens.criar(dados);
      avisar('Pronto', 'Item cadastrado.');
    }
    setSalvando(false);
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={estilos.container} keyboardShouldPersistTaps="handled">
      <Campo
        rotulo="Título"
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ex.: Meu primeiro item"
        erro={erros.titulo}
        maxLength={60}
      />
      <Campo
        rotulo="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Detalhes do item"
        erro={erros.descricao}
        multiline
      />
      <Botao
        titulo={salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Cadastrar'}
        onPress={salvar}
        desabilitado={salvando}
      />
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
});
